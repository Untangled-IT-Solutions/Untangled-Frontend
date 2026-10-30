// src/lib/store-context.tsx
/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./store-data";

export type QuoteLine = { id: string; qty: number; kind: "product" | "service"; name: string };

type StoreCtx = {
  quote: QuoteLine[];
  addToQuote: (item: { id: string; name: string; kind: "product" | "service"; qty?: number }) => void;
  setQuoteQty: (id: string, qty: number) => void;
  removeFromQuote: (id: string) => void;
  clearQuote: () => void;
  quoteCount: number;
};

const Ctx = createContext<StoreCtx | null>(null);

const QUOTE_KEY = "uits.quote";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [quote, setQuote] = useState<QuoteLine[]>(() => read<QuoteLine[]>(QUOTE_KEY, []));

  useEffect(() => {
    window.localStorage.setItem(QUOTE_KEY, JSON.stringify(quote));
  }, [quote]);

  const addToQuote = useCallback(
    (item: { id: string; name: string; kind: "product" | "service"; qty?: number }) => {
      setQuote((prev) => {
        const found = prev.find((l) => l.id === item.id);
        if (found) return prev.map((l) => (l.id === item.id ? { ...l, qty: l.qty + (item.qty ?? 1) } : l));
        return [...prev, { id: item.id, name: item.name, kind: item.kind, qty: item.qty ?? 1 }];
      });
    },
    [],
  );

  const setQuoteQty = useCallback((id: string, qty: number) => {
    setQuote((prev) => (qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))));
  }, []);
  
  const removeFromQuote = useCallback((id: string) => setQuote((p) => p.filter((l) => l.id !== id)), []);
  const clearQuote = useCallback(() => setQuote([]), []);

  const value = useMemo<StoreCtx>(() => {
    return {
      quote,
      addToQuote,
      setQuoteQty,
      removeFromQuote,
      clearQuote,
      quoteCount: quote.reduce((s, l) => s + l.qty, 0),
    };
  }, [quote, addToQuote, setQuoteQty, removeFromQuote, clearQuote]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function productById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
