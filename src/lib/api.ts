// src/lib/api.ts

const API_BASE_URL = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api')).replace(/\/$/, '');

// Helper to handle fetch responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
}

// ============================================
// 1. QUOTE API
// ============================================

export interface SubmitQuotePayload {
  customerName: string;
  company?: string;
  email: string;
  phone: string;
  notes?: string;
  items: Array<{
    id: string;
    name: string;
    kind: 'product' | 'service';
    qty: number;
  }>;
}

export interface SubmitQuoteResponse {
  success: boolean;
  reference: string;
}

export async function submitQuote(payload: SubmitQuotePayload): Promise<SubmitQuoteResponse> {
  const response = await fetch(`${API_BASE_URL}/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse<SubmitQuoteResponse>(response);
}

// ============================================
// 2. TRACK QUOTE API
// ============================================

export interface TrackedQuote {
  id: string;
  reference: string;
  customerName: string;
  email: string;
  phone: string;
  status: 'received' | 'in_review' | 'quoted' | 'closed';
  items: Array<{ id: string; name: string; qty: number }>;
  replyMessage: string | null;
  repliedAt: string | null;
  createdAt: string;
}

export async function trackQuote(reference: string, email: string): Promise<{ success: boolean; quote: TrackedQuote | null }> {
  const response = await fetch(`${API_BASE_URL}/quotes/track?ref=${encodeURIComponent(reference)}&email=${encodeURIComponent(email)}`);
  return handleResponse<{ success: boolean; quote: TrackedQuote | null }>(response);
}

// ============================================
// 3. ORDER / CHECKOUT API
// ============================================

export interface SubmitOrderPayload {
  customerName: string;
  company?: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  items: Array<{
    id: string;
    name: string;
    qty: number;
    price: number;
  }>;
  total: number;
}

export interface SubmitOrderResponse {
  success: boolean;
  orderId: string;
}

export async function submitOrder(payload: SubmitOrderPayload): Promise<SubmitOrderResponse> {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse<SubmitOrderResponse>(response);
}
