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