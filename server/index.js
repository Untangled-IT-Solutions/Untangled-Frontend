import { createServer } from 'node:http'
import { randomBytes, randomUUID } from 'node:crypto'
import { mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import { dirname, extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const serverDirectory = dirname(fileURLToPath(import.meta.url))
const projectDirectory = join(serverDirectory, '..')
const distributionDirectory = join(projectDirectory, 'dist')
const dataFile = process.env.DATA_FILE || join(serverDirectory, 'data', 'db.json')
const port = Number(process.env.PORT || 5000)
const allowedOrigins = new Set(
  (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
)

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

async function loadDatabase() {
  await mkdir(dirname(dataFile), { recursive: true })
  try {
    const parsed = JSON.parse(await readFile(dataFile, 'utf8'))
    return {
      quotes: Array.isArray(parsed.quotes) ? parsed.quotes : [],
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') console.error('Could not read API data; starting with an empty database.', error)
    return { quotes: [], orders: [] }
  }
}

const database = await loadDatabase()
let pendingWrite = Promise.resolve()

function persistDatabase() {
  pendingWrite = pendingWrite.then(async () => {
    const temporaryFile = `${dataFile}.tmp`
    await writeFile(temporaryFile, JSON.stringify(database, null, 2), 'utf8')
    await rename(temporaryFile, dataFile)
  })
  return pendingWrite
}

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
    'X-Content-Type-Options': 'nosniff',
  })
  response.end(JSON.stringify(payload))
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

function cleanItems(items, includePrice = false) {
  if (!Array.isArray(items)) return []
  return items.slice(0, 100).map((item) => ({
    id: cleanText(item?.id, 100),
    name: cleanText(item?.name, 200),
    ...(item?.kind === 'service' || item?.kind === 'product' ? { kind: item.kind } : {}),
    qty: Math.max(1, Math.min(999, Number(item?.qty) || 1)),
    ...(includePrice ? { price: Math.max(0, Number(item?.price) || 0) } : {}),
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
  return `${prefix}-${randomBytes(3).toString('hex').toUpperCase()}`
}

async function handleApi(request, response, url) {
  if (request.method === 'GET' && url.pathname === '/api') {
    sendJson(response, 200, { success: true, service: 'Untangled IT Solutions API' })
    return
  }

  if (request.method === 'POST' && url.pathname === '/api/quotes') {
    const payload = await readJson(request)
    const validationError = validateContact(payload)
    if (validationError) return sendJson(response, 400, { success: false, message: validationError })

    const quote = {
      id: randomUUID(),
      reference: createReference('UQ'),
      customerName: cleanText(payload.customerName, 100),
      company: cleanText(payload.company, 100),
      email: cleanText(payload.email, 200).toLowerCase(),
      phone: cleanText(payload.phone, 50),
      notes: cleanText(payload.notes, 5000),
      items: cleanItems(payload.items),
      status: 'received',
      replyMessage: null,
      repliedAt: null,
      createdAt: new Date().toISOString(),
    }
    database.quotes.push(quote)
    await persistDatabase()
    sendJson(response, 201, { success: true, reference: quote.reference })
    return
  }

  if (request.method === 'GET' && url.pathname === '/api/quotes/track') {
    const reference = cleanText(url.searchParams.get('ref'), 50).toUpperCase()
    const email = cleanText(url.searchParams.get('email'), 200).toLowerCase()
    if (!reference || !email) return sendJson(response, 400, { success: false, message: 'Reference and email are required' })

    const quote = database.quotes.find((item) => item.reference === reference && item.email === email)
    sendJson(response, 200, { success: Boolean(quote), quote: quote || null })
    return
  }

  if (request.method === 'POST' && url.pathname === '/api/orders') {
    const payload = await readJson(request)
    const validationError = validateContact(payload)
    if (validationError) return sendJson(response, 400, { success: false, message: validationError })
    const address = cleanText(payload.address, 500)
    const items = cleanItems(payload.items, true)
    if (!address) return sendJson(response, 400, { success: false, message: 'Please provide a delivery address' })
    if (items.length === 0) return sendJson(response, 400, { success: false, message: 'The order must contain at least one item' })

    const order = {
      id: randomUUID(),
      orderId: createReference('ORD'),
      customerName: cleanText(payload.customerName, 100),
      company: cleanText(payload.company, 100),
      email: cleanText(payload.email, 200).toLowerCase(),
      phone: cleanText(payload.phone, 50),
      address,
      notes: cleanText(payload.notes, 2000),
      items,
      total: Math.max(0, Number(payload.total) || 0),
      status: 'received',
      createdAt: new Date().toISOString(),
    }
    database.orders.push(order)
    await persistDatabase()
    sendJson(response, 201, { success: true, orderId: order.orderId })
    return
  }

  sendJson(response, 404, { success: false, message: 'API route not found' })
}

async function fileExists(path) {
  try {
    return (await stat(path)).isFile()
  } catch {
    return false
  }
}

async function serveFrontend(response, pathname) {
  let decodedPath
  try {
    decodedPath = decodeURIComponent(pathname)
  } catch {
    response.writeHead(400)
    response.end('Bad request')
    return
  }
  const relativePath = normalize(decodedPath === '/' ? 'index.html' : decodedPath.replace(/^\/+/, ''))
  const requestedFile = join(distributionDirectory, relativePath)
  const safeFile = requestedFile.startsWith(distributionDirectory) && await fileExists(requestedFile)
    ? requestedFile
    : join(distributionDirectory, 'index.html')

  if (!(await fileExists(safeFile))) {
    sendJson(response, 404, { success: false, message: 'Frontend build not found. Run npm run build first.' })
    return
  }

  response.writeHead(200, {
    'Content-Type': contentTypes[extname(safeFile)] || 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
  })
  createReadStream(safeFile).pipe(response)
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
    else if (request.method === 'GET' || request.method === 'HEAD') await serveFrontend(response, url.pathname)
    else sendJson(response, 405, { success: false, message: 'Method not allowed' })
  } catch (error) {
    console.error(error)
    sendJson(response, 500, { success: false, message: error instanceof Error ? error.message : 'Internal server error' })
  }
})

server.listen(port, () => {
  console.log(`Untangled API listening on http://localhost:${port}`)
})
