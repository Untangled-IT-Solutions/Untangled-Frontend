import { createServer } from 'node:http'
import { randomBytes, randomUUID } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabase = createClient(
  'https://104.18.22.5', 
  process.env.SUPABASE_SERVICE_KEY,
  {
    global: {
      headers: { 'Host': 'yncqqwiuodbpgfcxxkzo.supabase.co' }
    }
  }
)

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
    sendJson(response, 200, { success: true, service: 'Untangled IT Solutions API (Supabase)' })
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

    const { error } = await supabase.from('quotes').insert(quote)
    if (error) {
      console.error('Supabase error:', error)
      return sendJson(response, 500, { success: false, message: 'Database error' })
    }

    sendJson(response, 201, { success: true, reference: quote.reference })
    return
  }

  if (request.method === 'POST' && url.pathname === '/api/quotes/track') {
    if (!enforceRateLimit(request, response)) return
    const payload = await readJson(request)
    const reference = cleanText(payload.reference, 50).toUpperCase()
    const email = cleanText(payload.email, 200).toLowerCase()
    if (!reference || !email) return sendJson(response, 400, { success: false, message: 'Reference and email are required' })

    const { data: quote, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('reference', reference)
      .eq('email', email)
      .single()

    if (error || !quote) {
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

    const { error } = await supabase.from('orders').insert(order)
    if (error) {
      console.error('Supabase error:', error)
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