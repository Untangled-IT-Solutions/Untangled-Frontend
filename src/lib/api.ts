// src/lib/api.ts

const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

async function requestApi(path: string, payload: unknown): Promise<Response> {
  try {
    return await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('We could not reach the quote service. Your details are still here. Please try again shortly or contact sales@untangledits.co.za.');
  }
}

// Helper to handle fetch responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'The quote service is temporarily unavailable. Your details are still here. Please try again shortly or contact sales@untangledits.co.za.');
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
  const response = await requestApi('/quotes', payload);
  const result = await handleResponse<SubmitQuoteResponse>(response);
  if (!result.success || !result.reference) {
    throw new Error('We could not confirm your quote request. Please contact sales@untangledits.co.za before submitting again.');
  }
  return result;
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
  const response = await requestApi('/quotes/track', { reference, email });
  return handleResponse<{ success: boolean; quote: TrackedQuote | null }>(response);
}

// Wake up the free Render server when the user visits the site
export async function wakeUpServer() {
  try {
    await fetch(`${API_BASE_URL}`);
  } catch {
    // Ignore errors, this is just a gentle wake-up nudge
  }
}
