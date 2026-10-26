import { createServer } from 'node:http'
import { randomBytes, randomUUID } from 'node:crypto'
import pg from 'pg'
import 'dotenv/config'

const { Pool } = pg

// Use the connection string from Render's Environment Variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

const port = Number(process.env.PORT || 5000)
const allowedOrigins = new Set(
  (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:5174')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
)
const rateBuckets = new Map()
const RATE_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT = 60

function setCorsHeaders(request, response) {
  const origin = request.headers.origin
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Vary', 'Origin')
  }
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...securityHeaders(),
  })
  response.end(JSON.stringify(payload))
}

function securityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'",
  }
}

function clientAddress(request) {
  return request.socket.remoteAddress || 'unknown'
}

function enforceRateLimit(request, response) {
  const now = Date.now()
  const key = clientAddress(request)
  const bucket = (rateBuckets.get(key) || []).filter((time) => now - time < RATE_WINDOW_MS)
  if (bucket.length >= RATE_LIMIT) {
    sendJson(response, 429, { success: false, message: 'Too many requests. Try again later.' })
    return false
  }
  bucket.push(now)
  rateBuckets.set(key, bucket)
  return true
}

async function readJson(request) {
  let body = ''
  for await (const chunk of request) {
    body += chunk
    if (body.length > 1_000_000) throw new Error('Request body is too large')
  }
  try {
    return JSON.parse(body || '{}')
  } catch {
    throw new Error('Request body must be valid JSON')
  }
}

function cleanText(value, maximumLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maximumLength) : ''
}

function cleanItems(items) {
  if (!Array.isArray(items)) return []
  return items.slice(0, 100).map((item) => ({
    id: cleanText(item?.id, 100),
    name: cleanText(item?.name, 200),
    ...(item?.kind === 'service' || item?.kind === 'product' ? { kind: item.kind } : {}),
    qty: Math.max(1, Math.min(999, Number(item?.qty) || 1)),
  })).filter((item) => item.id && item.name)
}

function validateContact(payload) {
  const customerName = cleanText(payload.customerName, 100)
  const email = cleanText(payload.email, 200).toLowerCase()
  const phone = cleanText(payload.phone, 50)
  if (customerName.length < 2) return 'Please provide a valid customer name'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please provide a valid email address'
  if (phone.length < 7) return 'Please provide a valid phone number'
  return null
}

function createReference(prefix) {
  return `${prefix}-${randomBytes(8).toString('hex').toUpperCase()}`
}

async function handleApi(request, response, url) {
  if (request.method === 'GET' && url.pathname === '/api') {
    sendJson(response, 200, { success: true, service: 'Untangled IT Solutions API (Postgres)' })
    return
  }

  if (request.method === 'POST' && url.pathname === '/api/quotes') {
    if (!enforceRateLimit(request, response)) return
    const payload = await readJson(request)
    const validationError = validateContact(payload)
    if (validationError) return sendJson(response, 400, { success: false, message: validationError })

    const quote = {
      id: randomUUID(),
      reference: createReference('UQ'),
      customer_name: cleanText(payload.customerName, 100),
      company: cleanText(payload.company, 100),
      email: cleanText(payload.email, 200).toLowerCase(),
      phone: cleanText(payload.phone, 50),
      notes: cleanText(payload.notes, 5000),
      items: cleanItems(payload.items),
      status: 'received',
      reply_message: null,
      replied_at: null,
      created_at: new Date().toISOString(),
    }

    try {
      await pool.query(
        `INSERT INTO quotes (id, reference, customer_name, company, email, phone, notes, items, status, reply_message, replied_at, created_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          quote.id, quote.reference, quote.customer_name, quote.company, 
          quote.email, quote.phone, quote.notes, JSON.stringify(quote.items), 
          quote.status, quote.reply_message, quote.replied_at, quote.created_at
        ]
      )
    } catch (err) {
      console.error('Database error:', err)
      return sendJson(response, 500, { success: false, message: 'Database error' })
    }

    // --- DUAL EMAIL SYSTEM ---
    try {
      // 1. EMAIL TO STAFF (Internal Notification)
      const staffEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #83B70F; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">UNTANGLED IT SOLUTIONS</h1>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #111; margin-top: 0;">New Quote Request (Action Required)</h2>
            <p style="font-size: 16px;">A customer has submitted a new quote request. Please process this in Nexus.</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Reference:</td><td style="padding: 10px; border-bottom: 1px solid #eee; color: #83B70F; font-weight: bold;">${quote.reference}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Name:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${quote.customer_name}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${quote.company || 'N/A'}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${quote.email}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${quote.phone}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Notes:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${quote.notes || 'None'}</td></tr>
            </table>
            <h3 style="margin-top: 30px; border-bottom: 2px solid #eee; padding-bottom: 10px;">Items Requested:</h3>
            <ul style="padding-left: 20px; line-height: 1.6;">
              ${quote.items.map(item => `<li><strong>${item.name}</strong> (Qty: ${item.qty})</li>`).join('')}
            </ul>
          </div>
        </div>
      `;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: 'Untangled Website <onboarding@resend.dev>',
          // TEST MODE: routing to your main email to bypass domain verification
          to: ['nhlatshwayo@untangledits.co.za'],
          subject: `New Quote: ${quote.reference} - ${quote.customer_name}`,
          html: staffEmailHtml
        })
      });

      // 2. EMAIL TO CLIENT (Auto-Responder with Reference)
      // TEST MODE: routed to your main email for workflow verification
      const clientEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #83B70F; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">UNTANGLED IT SOLUTIONS</h1>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #111; margin-top: 0;">Quote Request Received!</h2>
            <p style="font-size: 16px;">Hi ${quote.customer_name},</p>
            <p style="font-size: 16px;">Thank you for requesting a quote from Untangled IT Solutions. We have received your request and our team is currently reviewing it.</p>
            
            <div style="background-color: #f8f9fa; border-left: 4px solid #83B70F; padding: 15px; margin: 25px 0;">
              <p style="margin: 0; font-size: 16px;">Your Quote Reference Number is:</p>
              <p style="margin: 5px 0 0 0; font-size: 22px; font-weight: bold; color: #83B70F;">${quote.reference}</p>
            </div>

            <p style="font-size: 16px;">You can track the status of your quote at any time by clicking the button below and entering this reference number along with your email address.</p>
            
            <div style="margin-top: 30px; text-align: center;">
              <a href="https://untangled-frontend.vercel.app/" style="background-color: #83B70F; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Track My Quote</a>
            </div>
          </div>
          <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #e0e0e0;">
            © ${new Date().getFullYear()} Untangled IT Solutions. All rights reserved.
          </div>
        </div>
      `;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: 'Untangled IT Solutions <onboarding@resend.dev>',
          // TEST MODE: routing to your main email to bypass domain verification
          to: ['nhlatshwayo@untangledits.co.za'],
          subject: `TEST CLIENT - We received your quote request (${quote.reference})`,
          html: clientEmailHtml
        })
      });

    } catch (emailError) {
      console.error('Failed to send email:', emailError);
    }
    // --- END DUAL EMAIL SYSTEM ---

    sendJson(response, 201, { success: true, reference: quote.reference })
    return
  }

  if (request.method === 'POST' && url.pathname === '/api/quotes/track') {
    if (!enforceRateLimit(request, response)) return
    const payload = await readJson(request)
    const reference = cleanText(payload.reference, 50).toUpperCase()
    const email = cleanText(payload.email, 200).toLowerCase()
    if (!reference || !email) return sendJson(response, 400, { success: false, message: 'Reference and email are required' })

    let quote
    try {
      const res = await pool.query(
        'SELECT * FROM quotes WHERE reference = $1 AND email = $2 LIMIT 1',
        [reference, email]
      )
      quote = res.rows[0]
    } catch (err) {
      console.error('Database error:', err)
      return sendJson(response, 500, { success: false, message: 'Database error' })
    }

    if (!quote) {
      return sendJson(response, 200, { success: false, quote: null })
    }

    const publicQuote = {
      reference: quote.reference,
      status: quote.status,
      items: quote.items,
      replyMessage: quote.reply_message,
      repliedAt: quote.replied_at,
      createdAt: quote.created_at,
    }
    
    sendJson(response, 200, { success: true, quote: publicQuote })
    return
  }

  if (request.method === 'POST' && url.pathname === '/api/orders') {
    if (!enforceRateLimit(request, response)) return
    const payload = await readJson(request)
    const validationError = validateContact(payload)
    if (validationError) return sendJson(response, 400, { success: false, message: validationError })
    const address = cleanText(payload.address, 500)
    const items = cleanItems(payload.items)
    if (!address) return sendJson(response, 400, { success: false, message: 'Please provide a delivery address' })
    if (items.length === 0) return sendJson(response, 400, { success: false, message: 'The order must contain at least one item' })

    const order = {
      id: randomUUID(),
      order_id: createReference('ORD'),
      customer_name: cleanText(payload.customerName, 100),
      company: cleanText(payload.company, 100),
      email: cleanText(payload.email, 200).toLowerCase(),
      phone: cleanText(payload.phone, 50),
      address,
      notes: cleanText(payload.notes, 2000),
      items,
      pricing_status: 'pending_server_quote',
      status: 'received',
      created_at: new Date().toISOString(),
    }

    try {
      await pool.query(
        `INSERT INTO orders (id, order_id, customer_name, company, email, phone, address, notes, items, pricing_status, status, created_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          order.id, order.order_id, order.customer_name, order.company, 
          order.email, order.phone, order.address, order.notes, 
          JSON.stringify(order.items), order.pricing_status, order.status, order.created_at
        ]
      )
    } catch (err) {
      console.error('Database error:', err)
      return sendJson(response, 500, { success: false, message: 'Database error' })
    }

    sendJson(response, 201, { success: true, orderId: order.order_id })
    return
  }

  sendJson(response, 404, { success: false, message: 'API route not found' })
}

const server = createServer(async (request, response) => {
  setCorsHeaders(request, response)
  if (request.method === 'OPTIONS') {
    response.writeHead(204)
    response.end()
    return
  }

  try {
    const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`)
    if (url.pathname.startsWith('/api')) await handleApi(request, response, url)
    else sendJson(response, 404, { success: false, message: 'Not found. Frontend is served by Vite or Vercel.' })
  } catch (error) {
    console.error(error)
    sendJson(response, 500, { success: false, message: 'Internal server error' })
  }
})

server.listen(port, () => {
  console.log(`Untangled API listening on http://localhost:${port}`)
})