// src/App.tsx
import { useState, useEffect } from 'react'
import { wakeUpServer } from './lib/api'
import Header from './components/header'
import SiteFooter from './components/SiteFooter'
import Home from './pages/home'
import QuotePage from './pages/quote'
import ProductsPage from './pages/products'
import SoftwarePage from './pages/software'
import SupportPage from './pages/support'
import SolutionsPage from './pages/solutions'
import HelpMeChoosePage from './pages/help-me-choose'
import CartPage from './pages/cart'
import CheckoutPage from './pages/checkout'
import TrackQuotePage from './pages/track-quote'
import TermsPage from './pages/terms'
import RefundPolicyPage from './pages/refund'
import { StoreProvider } from './lib/store-context'
import './App.css'

export type Page = 'home' | 'products' | 'software' | 'support' | 'solutions' | 'help-me-choose' | 'cart' | 'checkout' | 'quote' | 'track-quote' | 'terms' | 'refund'

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [showQuote, setShowQuote] = useState(false)

  const navigateTo = (page: string) => {
    const allowedPages: Page[] = ['home', 'products', 'software', 'support', 'solutions', 'help-me-choose', 'cart', 'checkout', 'quote', 'track-quote', 'terms', 'refund']
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
            onNavigate={navigateTo}
          />
        );
      case 'track-quote':
        return <TrackQuotePage />
      case 'terms':
        return <TermsPage />
      case 'refund':
        return <RefundPolicyPage />
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
      <div id="center" className={currentPage === 'home' ? undefined : 'internal-page'}>
        {renderPage()}
      </div>

      <SiteFooter onNavigate={navigateTo} />

      {/* Quote Modal/Overlay */}
      {showQuote && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
          <div className="min-h-screen px-4 py-8">
            <div className="internal-page mx-auto max-w-3xl rounded-2xl bg-background shadow-2xl">
              <QuotePage 
                onClose={closeQuote}
                onNavigateToStore={navigateToStore}
                onNavigate={navigateTo}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function App() {
  useEffect(() => {
    wakeUpServer()
  }, [])

  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  )
}

export default App
