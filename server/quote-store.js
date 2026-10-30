import pg from 'pg'

export function createQuoteStore(env = process.env, request = fetch) {
  if (env.DATABASE_URL) {
    const pool = new pg.Pool({
      connectionString: env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000,
    })
    return {
      async save(quote) {
        const keys = Object.keys(quote)
        await pool.query(
          `INSERT INTO quotes (${keys.join(', ')}) VALUES (${keys.map((_, i) => `$${i + 1}`).join(', ')})`,
          keys.map(key => key === 'items' ? JSON.stringify(quote[key]) : quote[key]),
        )
      },
      async find(reference, email) {
        const result = await pool.query('SELECT * FROM quotes WHERE reference = $1 AND email = $2 LIMIT 1', [reference, email])
        return result.rows[0]
      },
    }
  }

  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_KEY
  if (!env.SUPABASE_URL || !key) {
    throw new Error('Configure DATABASE_URL or SUPABASE_URL and a server-side Supabase service key.')
  }
  const endpoint = `${env.SUPABASE_URL.replace(/\/$/, '')}/rest/v1/quotes`
  const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }
  async function send(url, options) {
    const response = await request(url, { ...options, headers, signal: AbortSignal.timeout(10000) })
    if (!response.ok) throw new Error(`Quote database request failed (${response.status})`)
    return response
  }
  return {
    async save(quote) {
      await send(endpoint, { method: 'POST', body: JSON.stringify(quote) })
    },
    async find(reference, email) {
      const query = new URLSearchParams({ reference: `eq.${reference}`, email: `eq.${email}`, select: '*', limit: '1' })
      const response = await send(`${endpoint}?${query}`, { method: 'GET' })
      const rows = await response.json()
      return rows[0]
    },
  }
}
