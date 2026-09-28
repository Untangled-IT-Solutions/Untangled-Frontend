// src/pages/track-quote.tsx
import { useState } from "react";
import { CheckCircle2, Clock, FileSearch, MessageSquare } from "lucide-react";
import { trackQuote, type TrackedQuote } from "../lib/api";

const STATUS: Record<TrackedQuote["status"], { label: string; hint: string; color: string }> = {
  received: { label: "Received", hint: "We have your request and are looking at it.", color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400" },
  in_review: { label: "In review", hint: "We're checking stock and pricing.", color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400" },
  quoted: { label: "Quoted", hint: "Your pricing is ready — see our reply below.", color: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400" },
  closed: { label: "Closed", hint: "This request has been completed.", color: "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400" },
};

export default function TrackQuotePage() {
  const [reference, setReference] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('ref')?.toUpperCase() ?? "";
  });
  const [email, setEmail] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quote, setQuote] = useState<TrackedQuote | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    setError(null);
    setQuote(null);

    try {
      const response = await trackQuote(reference.trim().toUpperCase(), email.trim());

      if (response.success && response.quote) {
        setQuote(response.quote);
      } else {
        setNotFound(true);
      }
    } catch {
      setError('Failed to connect to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="space-y-1.5">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Quote tracking
        </p>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl text-foreground">
          Track Your Quote
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Enter the reference we gave you and the email you used. No account needed.
        </p>
      </header>

      <form
        className="mt-6 grid gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="t-ref" className="text-sm font-medium text-foreground">
            Quote reference
          </label>
          <input
            id="t-ref"
            required
            value={reference}
            onChange={(e) => setReference(e.target.value.toUpperCase())}
            placeholder="UQ-XXXXXX"
            className="mt-1.5 h-12 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label htmlFor="t-email" className="text-sm font-medium text-foreground">
            Email used
          </label>
          <input
            id="t-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.co.za"
            className="mt-1.5 h-12 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="h-12 rounded-xl bg-[#839705] px-6 text-sm font-semibold text-white hover:bg-[#98ab06] disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
        >
          {loading ? "Checking..." : "Track quote"}
        </button>
      </form>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {notFound && !loading && (
        <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center">
          <FileSearch className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-3 font-semibold text-foreground">We couldn't find that quote</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Double-check the reference and use the same email you submitted with.
          </p>
        </div>
      )}

      {quote && (
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Reference</p>
                <p className="text-xl font-extrabold text-foreground">{quote.reference}</p>
              </div>
              <span className={`rounded-full px-3 py-1.5 text-sm font-bold ${STATUS[quote.status].color}`}>
                {STATUS[quote.status].label}
              </span>
            </div>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {STATUS[quote.status].hint}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="text-base font-extrabold text-foreground">Items on this quote</h2>
            <ul className="mt-3 space-y-2">
              {quote.items.map((i) => (
                <li key={i.id} className="flex items-center justify-between gap-4 border-b border-border pb-2 text-sm last:border-0">
                  <span className="min-w-0 truncate font-semibold text-foreground">{i.name}</span>
                  <span className="shrink-0 text-muted-foreground">x{i.qty}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-base font-extrabold text-foreground">
              <MessageSquare className="h-4 w-4" /> Our reply
            </h2>
            {quote.replyMessage ? (
              <>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground">{quote.replyMessage}</p>
                {quote.repliedAt && (
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    Replied {new Date(quote.repliedAt).toLocaleString()}
                  </p>
                )}
              </>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                No reply yet — we usually come back within 24 hours.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
