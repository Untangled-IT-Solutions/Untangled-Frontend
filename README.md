# Untangled IT Solutions

A quote-only React and TypeScript site with a Node API for quote requests and tracking.

## Local development

Install dependencies with `npm install`, then configure the server settings in `.env` using `.env.example` as a guide.

Run `npm run dev` to start both the quote API on port 5000 and the Vite frontend. Vite proxies `/api` to the local API, including when Vite selects another frontend port.

For separate processes, use `npm run dev:api` and `npm run dev:web` instead. Do not start a second API on the same port.

## Database configuration

The backend supports either `DATABASE_URL` for Postgres, or `SUPABASE_URL` with `SUPABASE_SERVICE_ROLE_KEY` (the existing `SUPABASE_SERVICE_KEY` name is also accepted) for Supabase REST. Both options use the existing `quotes` table. Database credentials stay on the server and must never use a `VITE_` prefix.

Optional email notifications require `RESEND_API_KEY`. The current email template uses test-mode recipients; production customer email delivery requires a verified sender and recipient configuration. Saving a quote does not require the email key.

## Deployment

Run `npm run check` to validate and build the frontend. Deploy `dist` to the frontend host and run `npm start` on the Node API host. The Node server serves API routes only.

Set `VITE_API_URL` to the deployed API URL ending in `/api` when the frontend and API use different domains, and configure `CORS_ORIGIN` on the API with the allowed frontend origin. When a production reverse proxy routes `/api` to the backend on the same domain, leave `VITE_API_URL` blank. Rebuild the frontend after changing its environment settings.

## API routes

- `GET /api`: API health check; does not verify database connectivity.
- `POST /api/quotes`: save a quote request and return its reference.
- `POST /api/quotes/track`: look up a quote using its reference and email address.

## Checks

- `npm run check`: lint and production build.
- `node --test server/quote-store.test.js`: database adapter tests using simulated responses, without sending emails or writing real quote records.
