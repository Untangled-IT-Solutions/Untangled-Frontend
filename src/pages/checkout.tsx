// src/pages/checkout.tsx
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useStore, productById } from "../lib/store-context";
import { formatPrice } from "../lib/store-data";
import { submitOrder } from "../lib/api";

export default function CheckoutPage() {
  const { theme } = useTheme();
  const { cart, clearCart, cartTotal } = useStore();
  const [placed, setPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green-500" />
        <h1 className="mt-4 text-3xl font-extrabold text-foreground">Order received</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you. We'll confirm stock and delivery by email within 24 hours.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 rounded-xl bg-[#839705] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#98ab06] transition-colors"
        >
          Back to the store
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-extrabold text-foreground">Your cart is empty</h1>
        <button
          onClick={() => window.history.back()}
          className="mt-5 rounded-xl bg-[#839705] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#98ab06] transition-colors"
        >
          Shop Products
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare order items
      const orderItems = cart.map(line => {
        const product = productById(line.id);
        return {
          id: line.id,
          name: product?.name || line.id,
          qty: line.qty,
          price: product?.price || 0
        };
      });

      // Send order to backend
      await submitOrder({
        customerName: formData.name.trim(),
        company: formData.company.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        notes: formData.notes.trim(),
        items: orderItems,
        total: cartTotal
      }); // <--- THE MISSING CLOSING BRACKET WAS HERE!

      clearCart();
      setPlaced(true);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="space-y-1.5">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Step 4 of 5 — Checkout
        </p>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl text-foreground">
          Checkout
        </h1>
        <p className="text-sm text-muted-foreground">
          Just the details we need to get your order to you.
        </p>
      </header>

      <form
        className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
        onSubmit={handleSubmit}
      >
        <div className={`rounded-2xl border p-5 ${
          theme === "light"
            ? "border-[#D7E2C8] bg-white"
            : "border-[#3A4331] bg-[#1A1A1A]"
        }`}>
          <h2 className="text-base font-extrabold text-foreground">Your details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">Full name</label>
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Company (optional)</label>
              <input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Phone</label>
              <input
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-foreground">Delivery address</label>
              <textarea
                required
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-foreground">Order notes (optional)</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        <aside className={`h-fit rounded-2xl border p-5 ${
          theme === "light"
            ? "border-[#D7E2C8] bg-white"
            : "border-[#3A4331] bg-[#1A1A1A]"
        }`}>
          <h2 className="text-base font-extrabold text-foreground">Your order</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {cart.map((line) => {
              const product = productById(line.id);
              return (
                <li key={line.id} className="flex justify-between gap-3">
                  <span className="min-w-0 text-muted-foreground">
                    {line.qty} × {product?.name || line.id}
                  </span>
                  <span className="shrink-0 font-semibold text-foreground">
                    {formatPrice((product?.price || 0) * line.qty)}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className={`mt-4 flex justify-between border-t pt-3 text-base font-extrabold ${
            theme === "light" ? "border-[#D7E2C8]" : "border-[#3A4331]"
          }`}>
            <span className="text-foreground">Total</span>
            <span className="text-foreground">{formatPrice(cartTotal)}</span>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 h-12 w-full rounded-xl bg-[#839705] text-sm font-semibold text-white hover:bg-[#98ab06] transition-colors"
          >
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            We confirm stock and delivery before taking payment.
          </p>
        </aside>
      </form>
    </div>
  );
}
