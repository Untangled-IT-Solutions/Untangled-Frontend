import test from 'node:test'
import assert from 'node:assert/strict'
import { createQuoteStore } from './quote-store.js'

const env = { SUPABASE_URL: 'https://database.example', SUPABASE_SERVICE_KEY: 'server-only-test-key' }

test('Supabase stores quotes and finds them by both reference and email', async () => {
  const calls = []
  const quote = { reference: 'UQ-TEST', email: 'test@example.com', items: [{ id: 'test', qty: 1 }] }
  const store = createQuoteStore(env, async (url, options) => {
    calls.push({ url, options })
    return options.method === 'POST' ? new Response(null, { status: 201 }) : Response.json([quote])
  })
  await store.save(quote)
  assert.deepEqual(JSON.parse(calls[0].options.body), quote)
  assert.equal(calls[0].options.headers.Authorization, 'Bearer server-only-test-key')
  assert.deepEqual(await store.find(quote.reference, quote.email), quote)
  const url = new URL(calls[1].url)
  assert.equal(url.searchParams.get('reference'), 'eq.UQ-TEST')
  assert.equal(url.searchParams.get('email'), 'eq.test@example.com')
})

test('a failed database write cannot be reported as a saved quote', async () => {
  const store = createQuoteStore(env, async () => new Response(null, { status: 503 }))
  await assert.rejects(store.save({}), /Quote database request failed \(503\)/)
})

test('missing database settings fail clearly instead of connecting to an unintended database', () => {
  assert.throws(() => createQuoteStore({}), /Configure DATABASE_URL/)
})

test('a missing quote returns undefined', async () => {
  const store = createQuoteStore(env, async () => Response.json([]))
  assert.equal(await store.find('UQ-MISSING', 'test@example.com'), undefined)
})
