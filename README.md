# Untangled IT Solution Shop

A React and TypeScript storefront with a dependency-free Node API for quote requests, quote tracking and orders.

## Local development

Install dependencies once:

```bash
npm install
```

Run the API in one terminal:

```bash
npm run dev:api
```

Run the frontend in another terminal:

```bash
npm run dev
```

The frontend runs at `http://localhost:5173` and uses `http://localhost:5000/api` while in development.

## Production

Build and run the combined frontend and API:

```bash
npm run check
npm start
```

The Node server serves both `/api/*` and the built frontend. Set these environment variables on the host when needed:

- `PORT`: HTTP port, default `5000`.
- `CORS_ORIGIN`: comma-separated allowed frontend origins. Same-origin production traffic does not require it.
- `DATA_FILE`: persistent JSON database location. Default: `server/data/db.json`.
- `VITE_API_URL`: optional API URL override. Leave unset when the frontend and API share a domain.

Use a host with persistent disk storage for `DATA_FILE`. For horizontally scaled or serverless deployment, replace the JSON persistence layer with a managed database.

## API routes

- `GET /api` — health check.
- `POST /api/quotes` — create a quote request and return its reference.
- `GET /api/quotes/track?ref=...&email=...` — track a quote request.
- `POST /api/orders` — create an order.

## Checks

```bash
npm run lint
npm run build
```
