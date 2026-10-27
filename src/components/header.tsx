// src/components/header.tsx
import { useState } from "react";
import { Menu, Moon, Sun, X, ShoppingCart, FileText, PackageSearch } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useStore } from "../lib/store-context";

interface HeaderProps {
  onNavigate: (page: 'home' | 'products' | 'refurbished' | 'software' | 'support' | 'solutions' | 'help-me-choose' | 'cart' | 'checkout' | 'quote' | 'track-quote' | 'terms' | 'refund') => void;
  onRequestQuote: () => void;
  currentPage: 'home' | 'products' | 'refurbished' | 'software' | 'support' | 'solutions' | 'help-me-choose' | 'cart' | 'checkout' | 'quote' | 'track-quote' | 'terms' | 'refund';
}

type Page = HeaderProps["currentPage"];

const NAV_ITEMS: Array<{ label: string; page: Page }> = [
  { label: "Home", page: "home" },
  { label: "Products", page: "products" },
  { label: "Refurbished", page: "refurbished" },
  { label: "Software", page: "software" },
  { label: "Support", page: "support" },
  { label: "Solutions", page: "solutions" },
  { label: "Help", page: "help-me-choose" },
];

export default function Header({ onNavigate, onRequestQuote, currentPage }: HeaderProps) {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const store = useStore();

  const handleNavigation = (page: Page) => {
    onNavigate(page);
    setOpen(false);
  };

  const isHome = currentPage === 'home';

  return (
    <header 
      className={`w-full transition-all duration-300 ${
        isHome 
          ? 'absolute top-0 left-0 right-0 z-50 bg-transparent' // Home page: Transparent (Green)
          : 'bg-black border-b border-[#3A4331]' // Internal pages: ALWAYS Black
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-3 sm:px-5 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-3">
          
          <button onClick={() => handleNavigation('home')} className="flex items-center shrink-0 cursor-pointer">
            <img
              src={
                theme === "dark" 
                  ? "/logo-white.svg" 
                  : isHome 
                    ? "/logos-trans.svg" // Use the transparent colored logo
                    : "/logo-white.svg"  // Internal pages use white logo
              }
              alt="Untangled IT Solutions"
              // If on Home + Light mode, force the colored logo to pure black but keep it transparent
              className={`h-14 w-auto object-contain sm:h-16 md:h-[72px] ${
                isHome && theme === "light" ? "brightness-0" : ""
              }`}
            />
          </button>

          <nav className="hidden items-center gap-1.5 md:flex lg:gap-2">
            {NAV_ITEMS.map((item) => {
              if (currentPage === item.page) return null;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.page)}
                  className={`rounded-lg px-2.5 py-2 text-xs font-semibold tracking-[0.01em] transition-colors lg:px-3 lg:text-[13px] ${
                    isHome && theme === "light"
                      ? "text-black hover:bg-black/10" // Home + Light Mode = Black text on green
                      : "text-white hover:bg-white/10" // All other cases = White text on black
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2">
            <button onClick={toggle} className={`rounded-lg p-2 transition-colors ${isHome && theme === "light" ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"}`}>
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            <button onClick={() => handleNavigation('cart')} className={`relative rounded-lg p-2 transition-colors ${isHome && theme === "light" ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"}`}>
              <ShoppingCart className="h-5 w-5" />
              {store.cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full px-1 text-xs font-bold bg-[#b4d334] text-white">
                  {store.cartCount}
                </span>
              )}
            </button>

            <button onClick={() => handleNavigation('track-quote')} className={`relative inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold tracking-[0.01em] transition-colors lg:gap-2 lg:px-3 lg:text-sm ${isHome && theme === "light" ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"}`}>
              <PackageSearch className="h-5 w-5" />
              <span>Quote track</span>
              {store.quoteCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full px-1 text-xs font-bold bg-[#b4d334] text-white">
                  {store.quoteCount}
                </span>
              )}
            </button>

            <button onClick={onRequestQuote} className={`relative hidden items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold tracking-[0.01em] transition-colors xl:inline-flex lg:px-4 lg:text-sm ${isHome && theme === "light" ? "bg-[#111111] text-white hover:bg-black" : "bg-[#b4d334] text-white hover:bg-[#98ab06]"}`}>
              <FileText className="h-4 w-4" />
              Request a Quote
            </button>

            <button onClick={() => setOpen((o) => !o)} className={`rounded-lg p-2 transition-colors md:hidden ${isHome && theme === "light" ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"}`}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className={`border-t pt-4 pb-6 md:hidden ${isHome ? (theme === "light" ? "border-black/10 bg-[#d1de39]" : "border-white/20 bg-black/80") : "border-white/20 bg-black"}`}>
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    handleNavigation(item.page);
                    setOpen(false);
                  }}
                  className={`rounded-lg px-4 py-3 text-base font-medium transition-colors text-left ${
                    currentPage === item.page 
                      ? "text-[#b4d334]" 
                      : isHome && theme === "light" ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="mt-4 flex flex-col gap-3">
              <button onClick={() => { handleNavigation('cart'); setOpen(false); }} className={`rounded-lg px-4 py-3 text-center text-base font-semibold transition-colors inline-flex items-center justify-center gap-2 ${isHome && theme === "light" ? "border border-black/20 bg-black/5 text-black hover:bg-black/10" : "border border-[#3A4331] bg-[#111111] text-[#F9FAFB] hover:bg-[#2A2E24]"}`}>
                <ShoppingCart className="h-4 w-4" />
                Cart ({store.cartCount} items)
              </button>
              
              <button onClick={() => { handleNavigation('track-quote'); setOpen(false); }} className={`rounded-lg px-4 py-3 text-center text-base font-semibold transition-colors inline-flex items-center justify-center gap-2 ${isHome && theme === "light" ? "border border-black/20 bg-black/5 text-black hover:bg-black/10" : "border border-[#3A4331] bg-[#111111] text-[#F9FAFB] hover:bg-[#2A2E24]"}`}>
                <PackageSearch className="h-4 w-4" />
                Quote track
                {store.quoteCount > 0 && <span className="ml-1 text-xs font-bold text-[#b4d334]">({store.quoteCount})</span>}
              </button>
              
              <button onClick={() => { onRequestQuote(); setOpen(false); }} className={`relative rounded-lg px-4 py-3 text-center text-base font-semibold transition-colors inline-flex items-center justify-center gap-2 ${isHome && theme === "light" ? "bg-[#111111] text-white hover:bg-black" : "bg-[#b4d334] text-white hover:bg-[#98ab06]"}`}>
                <FileText className="h-4 w-4" />
                Request a Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}