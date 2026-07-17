import { useShop, ShopProvider } from './context/ShopContext';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';

// Import All Views
import HomeView from './views/HomeView';
import ShopView from './views/ShopView';
import ProductDetailsView from './views/ProductDetailsView';
import CustomOrderView from './views/CustomOrderView';
import CartView from './views/CartView';
import CheckoutView from './views/CheckoutView';
import AccountView from './views/AccountView';
import AdminView from './views/AdminView';
import ContactView from './views/ContactView';
import AboutView from './views/AboutView';
import FaqView from './views/FaqView';
import PolicyViews from './views/PolicyViews';

function AppContent() {
  const { currentView } = useShop();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <ShopView />;
      case 'product-details':
        return <ProductDetailsView />;
      case 'custom-order':
        return <CustomOrderView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'account':
        return <AccountView />;
      case 'admin':
        return <AdminView />;
      case 'contact':
        return <ContactView />;
      case 'about':
        return <AboutView />;
      case 'faq':
        return <FaqView />;
      case 'policies':
        return <PolicyViews />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col font-sans select-none selection:bg-brand-100 selection:text-brand-850">
      {/* Dynamic Header & Promos Ticker */}
      <AnnouncementBar />
      <Header />

      {/* Main viewport stage with fade transition */}
      <main className="flex-grow pb-16">
        {renderCurrentView()}
      </main>

      {/* Elegant footer with site mapping links */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
