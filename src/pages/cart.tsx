// src/pages/cart.tsx
import { Minus, Plus, ShoppingCart, Trash2, ArrowRight, Package } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useStore, productById } from "../lib/store-context";
import { formatPrice } from "../lib/store-data";

interface CartPageProps {
  onNavigate?: (page: string) => void;
}

export default function CartPage({ onNavigate }: CartPageProps) {
  const { theme } = useTheme();
  const { cart, setCartQty, removeFromCart, cartTotal, cartCount, clearCart } = useStore();

  const handleContinueShopping = () => {
    if (onNavigate) {
      onNavigate('products');
    } else {
      window.history.back();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-extrabold text-foreground">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">Browse our products and add items you need.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={handleContinueShopping}
            className="rounded-xl bg-[#839705] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#98ab06] transition-colors inline-flex items-center gap-2"
          >
            <Package className="h-4 w-4" />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl text-foreground">
            Your Cart
          </h1>
          <p className="text-sm text-muted-foreground">
            {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700 transition-colors"
        >
          Clear cart
        </button>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <ul className="space-y-3">
          {cart.map((line) => {
            const product = productById(line.id);
            if (!product) return null;
            
            return (
              <li
                key={line.id}
                className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border p-4 ${
                  theme === "light"
                    ? "border-[#D7E2C8] bg-white"
                    : "border-[#3A4331] bg-[#1A1A1A]"
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.shortDescription}</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {formatPrice(product.price || 0)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <div className={`flex items-center rounded-full border ${
                    theme === "light" ? "border-[#D7E2C8]" : "border-[#3A4331]"
                  }`}>
                    <button
                      aria-label="Decrease quantity"
                      className={`grid h-9 w-9 place-items-center rounded-l-full ${
                        theme === "light" ? "hover:bg-[#EEF3E7]" : "hover:bg-[#2A2E24]"
                      }`}
                      onClick={() => setCartQty(line.id, line.qty - 1)}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-foreground">{line.qty}</span>
                    <button
                      aria-label="Increase quantity"
                      className={`grid h-9 w-9 place-items-center rounded-r-full ${
                        theme === "light" ? "hover:bg-[#EEF3E7]" : "hover:bg-[#2A2E24]"
                      }`}
                      onClick={() => setCartQty(line.id, line.qty + 1)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    aria-label="Remove item"
                    className={`rounded-lg p-2 ${
                      theme === "light" ? "hover:bg-red-50" : "hover:bg-red-900/20"
                    }`}
                    onClick={() => removeFromCart(line.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className={`h-fit rounded-2xl border p-5 ${
          theme === "light"
            ? "border-[#D7E2C8] bg-white"
            : "border-[#3A4331] bg-[#1A1A1A]"
        }`}>
          <h2 className="text-base font-extrabold text-foreground">Order summary</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal ({cartCount} items)</dt>
              <dd className="font-semibold text-foreground">{formatPrice(cartTotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd className="font-semibold text-foreground">Calculated at checkout</dd>
            </div>
            <div className={`flex justify-between border-t pt-3 text-base font-extrabold ${
              theme === "light" ? "border-[#D7E2C8]" : "border-[#3A4331]"
            }`}>
              <dt className="text-foreground">Total</dt>
              <dd className="text-foreground">{formatPrice(cartTotal)}</dd>
            </div>
          </dl>
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('checkout');
              } else {
                window.location.href = '/checkout';
              }
            }}
            className="mt-5 h-12 w-full rounded-xl bg-[#839705] text-sm font-semibold text-white hover:bg-[#98ab06] transition-colors inline-flex items-center justify-center gap-2"
          >
            Proceed to Checkout
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={handleContinueShopping}
            className={`mt-2 h-11 w-full rounded-xl border text-sm font-medium transition-colors ${
              theme === "light"
                ? "border-[#D7E2C8] hover:bg-[#EEF3E7] text-foreground"
                : "border-[#3A4331] hover:bg-[#2A2E24] text-foreground"
            }`}
          >
            Continue shopping
          </button>
        </aside>
      </div>
    </div>
  );
}