import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User as UserIcon, Settings, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const {
    currentView,
    setView,
    cart,
    wishlist,
    user,
    logout,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setView('shop');
  };

  const navItems = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'Custom Order', view: 'custom-order' },
    { label: 'FAQ', view: 'faq' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-sm" id="main-header">
      {/* Top Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-500 hover:text-stone-800 transition-colors"
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo - Cute Handmade Style */}
        <div 
          onClick={() => setView('home')} 
          className="flex items-center gap-2 cursor-pointer select-none group"
          id="brand-logo"
        >
          <div className="w-10 h-10 rounded-full bg-pastel-pink flex items-center justify-center border-2 border-brand-200 shadow-sm group-hover:scale-105 transition-transform duration-300">
            <span className="text-xl">🌸</span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-brand-500 flex items-center gap-1 font-display">
              Yarnova
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold -mt-1">Handmade Magic</p>
          </div>
        </div>

        {/* Desktop Search */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-sm relative" id="search-form-desktop">
          <input
            type="text"
            placeholder="Search cute plushies, bags, sweaters..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-[#fbfbf8] border border-stone-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition-all text-stone-700"
          />
          <button type="submit" className="absolute right-3 text-stone-400 hover:text-brand-500 transition-colors">
            <Search size={18} />
          </button>
        </form>

        {/* Navigation Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3" id="header-actions">
          {/* Role Status Badge (User vs Admin helpful for validation) */}
          {user && (
            <div className={`hidden lg:flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
              user.role === 'admin' 
                ? 'bg-amber-50 text-amber-700 border-amber-200' 
                : 'bg-pastel-pink text-brand-700 border-brand-200'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
              {user.role === 'admin' ? 'Admin Access' : 'Loyal Customer'}
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={() => setView('account')}
            className="p-2 text-stone-600 hover:text-brand-500 hover:bg-pastel-pink/30 rounded-full transition-all relative"
            title="Wishlist"
            id="header-wishlist-btn"
          >
            <Heart size={20} className={wishlist.length > 0 ? 'fill-brand-400 text-brand-500' : ''} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-brand-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag */}
          <button
            onClick={() => setView('cart')}
            className="p-2 text-stone-600 hover:text-brand-500 hover:bg-pastel-pink/30 rounded-full transition-all relative"
            title="Shopping Cart"
            id="header-cart-btn"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-brand-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account/Dashboard Trigger */}
          <div className="h-8 w-[1px] bg-stone-200 hidden sm:block"></div>

          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView(user.role === 'admin' ? 'admin' : 'account')}
                className="flex items-center gap-1.5 bg-[#fbfbf8] hover:bg-stone-100 border border-stone-200 text-stone-700 font-medium text-xs sm:text-sm py-1.5 px-3 rounded-full transition-all"
                id="header-user-dashboard-btn"
              >
                {user.role === 'admin' ? (
                  <Settings size={16} className="text-amber-600 animate-spin-slow" />
                ) : (
                  <UserIcon size={16} className="text-stone-500" />
                )}
                <span className="max-w-[80px] truncate hidden sm:inline">{user.name.split(' ')[0]}</span>
              </button>
              
              <button
                onClick={logout}
                className="hidden md:block text-stone-400 hover:text-brand-500 text-xs font-semibold uppercase tracking-wider"
                id="header-logout-btn"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setView('account')}
              className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-semibold py-2 px-4 rounded-full transition-all shadow-sm shadow-brand-200"
              id="header-login-btn"
            >
              <UserIcon size={16} />
              <span>Join Nest</span>
            </button>
          )}
        </div>
      </div>

      {/* Desktop Main Navigation Links */}
      <nav className="hidden md:block border-t border-stone-100 bg-[#fcfaf7]" id="desktop-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center gap-8 py-3">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <li key={item.view}>
                  <button
                    onClick={() => setView(item.view)}
                    className={`text-sm font-medium tracking-wide transition-all relative py-1 hover:text-brand-500 ${
                      isActive ? 'text-brand-600 font-bold' : 'text-stone-600'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Slideout */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-stone-900 z-45"
              id="mobile-menu-backdrop"
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl z-50 p-6 flex flex-col justify-between border-r border-stone-100"
              id="mobile-navigation-sidebar"
            >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌸</span>
                  <span className="text-xl font-bold font-display">Yarnova</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-800"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mt-6 relative" id="search-form-mobile">
                <input
                  type="text"
                  placeholder="Search toys, bags..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-[#fbfbf8] border border-stone-200 rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
                />
                <button type="submit" className="absolute right-3 top-3 text-stone-400">
                  <Search size={16} />
                </button>
              </form>

              {/* Navigation links */}
              <ul className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item.view}>
                    <button
                      onClick={() => {
                        setView(item.view);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-lg font-medium w-full text-left py-2 px-3 rounded-xl transition-all flex items-center justify-between ${
                        currentView === item.view
                          ? 'bg-pastel-pink text-brand-700 font-bold'
                          : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight size={16} className="opacity-50" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Profile footer inside sidebar */}
            <div className="pt-6 border-t border-stone-100">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pastel-yellow flex items-center justify-center font-bold text-stone-700">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-800">{user.name}</h4>
                      <p className="text-xs text-stone-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setView(user.role === 'admin' ? 'admin' : 'account');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-medium py-2 rounded-xl transition-colors"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-[#fbebeb] hover:bg-brand-100 text-brand-600 text-sm font-medium py-2 rounded-xl transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setView('account');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-md shadow-brand-100 flex items-center justify-center gap-1.5"
                >
                  <Sparkles size={16} />
                  <span>Join Cozy Nest</span>
                </button>
              )}
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
