// src/App.tsx (Full updated file)
import { useState } from 'react'
import Header from './components/header'
import Home from './pages/home'
import QuotePage from './pages/quote'
import ProductsPage from './pages/products'
import RefurbishedPage from './pages/refurbished'
import SoftwarePage from './pages/software'
import SupportPage from './pages/support'
import SolutionsPage from './pages/solutions'
import HelpMeChoosePage from './pages/help-me-choose'
import CartPage from './pages/cart'
import CheckoutPage from './pages/checkout'
import TrackQuotePage from './pages/track-quote' // <--- IMPORT THIS
import { StoreProvider } from './lib/store-context'
import './App.css'

// UPDATE: Add 'track-quote' to this type
export type Page = 'home' | 'products' | 'refurbished' | 'software' | 'support' | 'solutions' | 'help-me-choose' | 'cart' | 'checkout' | 'quote' | 'track-quote'

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [showQuote, setShowQuote] = useState(false)

  const navigateTo = (page: string) => {
    const allowedPages: Page[] = ['home', 'products', 'refurbished', 'software', 'support', 'solutions', 'help-me-choose', 'cart', 'checkout', 'quote', 'track-quote']
    if (!allowedPages.includes(page as Page)) return
    const nextPage = page as Page
    setCurrentPage(nextPage)
    if (nextPage !== 'quote') {
      setShowQuote(false)
    }
  }

  const openQuote = () => {
    setShowQuote(true)
  }

  const closeQuote = () => {
    setShowQuote(false)
  }

  const navigateToStore = () => {
    setCurrentPage('products')
    setShowQuote(false)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'products':
        return <ProductsPage onNavigate={navigateTo} />
      case 'refurbished':
        return <RefurbishedPage onNavigate={navigateTo} />
      case 'software':
        return <SoftwarePage />
      case 'support':
        return <SupportPage />
      case 'solutions':
        return <SolutionsPage />
      case 'help-me-choose':
        return <HelpMeChoosePage onNavigate={navigateTo} onRequestQuote={openQuote} />
      case 'cart':
        return <CartPage onNavigate={navigateTo} />
      case 'checkout':
        return <CheckoutPage />
      case 'quote':
        return (
          <QuotePage 
            onClose={closeQuote} 
            onNavigateToStore={navigateToStore} 
            onNavigate={navigateTo} // <--- PASS THIS PROP
          />
        );
      case 'track-quote': // <--- ADD THIS CASE
        return <TrackQuotePage />
      default:
        return <Home />
    }
  }

  return (
    <>
      <Header 
        onNavigate={navigateTo}
        currentPage={currentPage}
        onRequestQuote={openQuote}
      />
      <div id="center">
        {renderPage()}
      </div>

      {/* Quote Modal/Overlay */}
      {showQuote && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
          <div className="min-h-screen px-4 py-8">
            <div className="mx-auto max-w-3xl rounded-2xl bg-background shadow-2xl">
              <QuotePage 
                onClose={closeQuote}
                onNavigateToStore={navigateToStore}
                onNavigate={navigateTo} // <--- PASS THIS PROP HERE TOO
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  )
}

export default App
