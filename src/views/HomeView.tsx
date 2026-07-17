import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Sparkles, ArrowRight, Heart, Gift, ShieldCheck, RefreshCw, Send, CheckCircle } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/initialData';
import { motion, AnimatePresence } from 'motion/react';

export default function HomeView() {
  const { setView, products, categories, banners } = useShop();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filter products by tags, or fallback to any available products if none are tagged
  const featuredProducts = (() => {
    const tagged = products.filter((p) => p.tags.includes('Featured')).slice(0, 4);
    if (tagged.length === 0 && products.length > 0) {
      return products.slice(0, 4);
    }
    return tagged;
  })();

  const bestSellers = (() => {
    const tagged = products.filter((p) => p.tags.includes('Best Seller')).slice(0, 4);
    if (tagged.length === 0 && products.length > 0) {
      // reverse to show newest or different ones
      return [...products].reverse().slice(0, 4);
    }
    return tagged;
  })();

  // Banner carousel auto-slide
  useEffect(() => {
    const activeBanners = banners.filter((b) => b.active);
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % activeBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners]);

  const activeBanners = banners.filter((b) => b.active);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  return (
    <div className="space-y-16 pb-16" id="home-view-container">
      
      {/* 1. HERO CAROUSEL BLOCK */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white py-1.5" id="hero-carousel-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[32px] overflow-hidden bg-[#faf4ec] h-[450px] sm:h-[500px] shadow-sm border border-stone-100">
            <AnimatePresence mode="wait">
              {activeBanners.length > 0 && (
                <motion.div
                  key={currentBanner}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between"
                >
                  {/* Left content block */}
                  <div className="absolute lg:relative inset-0 lg:inset-auto p-6 sm:p-12 lg:p-16 text-center lg:text-left flex flex-col justify-center items-center lg:items-start space-y-4 sm:space-y-6 z-20 bg-gradient-to-t from-[#faf4ec] via-[#faf4ec]/90 lg:from-transparent lg:via-transparent lg:bg-transparent">
                    <div className="inline-flex items-center gap-1.5 bg-[#fce4ec] text-[#bc4747] text-[10px] sm:text-xs font-extrabold uppercase tracking-widest py-1.5 px-3 rounded-full">
                      <Sparkles size={12} fill="currentColor" />
                      <span>100% Hand-Stitched Happiness</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-850 leading-tight font-display max-w-xl">
                      {activeBanners[currentBanner].title}
                    </h2>
                    <p className="text-xs sm:text-sm sm:text-base text-stone-600 max-w-lg leading-relaxed">
                      {activeBanners[currentBanner].subtitle}
                    </p>
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                      <button
                        onClick={() => setView(activeBanners[currentBanner].link)}
                        className="bg-brand-500 hover:bg-brand-600 text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full transition-all shadow-md shadow-brand-100 flex items-center gap-2 text-xs sm:text-base"
                      >
                        <span>Explore Now</span>
                        <ArrowRight size={14} />
                      </button>
                      <button
                        onClick={() => setView('custom-order')}
                        className="bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-semibold py-2 px-5 sm:py-3 sm:px-6 rounded-full transition-all text-xs sm:text-base shadow-sm"
                      >
                        Create Custom Order
                      </button>
                    </div>
                  </div>

                  {/* Right Image stage */}
                  <div className="absolute lg:relative inset-0 lg:inset-auto lg:flex-1 lg:w-1/2 lg:h-full w-full h-full z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#faf4ec] via-[#faf4ec]/20 to-transparent z-10"></div>
                    <img
                      src={activeBanners[currentBanner].image}
                      alt={activeBanners[currentBanner].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Slider Dots indicators */}
            {activeBanners.length > 1 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 lg:left-16 lg:translate-x-0 z-20 flex gap-2">
                {activeBanners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentBanner(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentBanner === i ? 'bg-brand-500 w-6' : 'bg-stone-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPS BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="values-section">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-pastel-pink/45 border border-stone-100/50 p-6 rounded-3xl flex gap-4 items-start shadow-sm">
            <div className="p-3 bg-white text-[#bc4747] rounded-2xl shadow-sm">
              <Heart size={20} className="fill-[#bc4747]" />
            </div>
            <div>
              <h4 className="font-bold text-stone-800 text-sm sm:text-base font-display">100% Handmade</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">Each item has its own charming character and unique stitching.</p>
            </div>
          </div>

          <div className="bg-pastel-yellow/45 border border-stone-100/50 p-6 rounded-3xl flex gap-4 items-start shadow-sm">
            <div className="p-3 bg-white text-amber-600 rounded-2xl shadow-sm">
              <Gift size={20} />
            </div>
            <div>
              <h4 className="font-bold text-stone-800 text-sm sm:text-base font-display">Custom Order System</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">Customize colors, sizes, and styling to fit your exact dream idea.</p>
            </div>
          </div>

          <div className="bg-pastel-green/45 border border-stone-100/50 p-6 rounded-3xl flex gap-4 items-start shadow-sm">
            <div className="p-3 bg-white text-emerald-600 rounded-2xl shadow-sm">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="font-bold text-stone-800 text-sm sm:text-base font-display">Hypoallergenic & Safe</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">We use ultra-safe locked eyes and non-toxic baby-safe yarns.</p>
            </div>
          </div>

          <div className="bg-pastel-blue/45 border border-stone-100/50 p-6 rounded-3xl flex gap-4 items-start shadow-sm">
            <div className="p-3 bg-white text-blue-600 rounded-2xl shadow-sm">
              <RefreshCw size={20} />
            </div>
            <div>
              <h4 className="font-bold text-stone-800 text-sm sm:text-base font-display">Replaceable / Secure</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">Secure SSL checkouts with WhatsApp support and care guarantees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="categories-grid-section">
        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-800 font-display">Shop by Cute Categories</h2>
            <p className="text-sm text-stone-500 mt-1">Soft fibers meticulously hand-knitted into whimsical aesthetics.</p>
          </div>
          <button
            onClick={() => setView('shop')}
            className="text-brand-600 hover:text-brand-700 text-sm font-semibold flex items-center gap-1 group shrink-0"
          >
            <span>View All Products</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setView('shop', null, cat.id)}
              className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-300 flex flex-col h-full"
              id={`category-card-${cat.id}`}
            >
              <div className="relative aspect-[4/3] bg-stone-50 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-stone-800 text-lg group-hover:text-brand-500 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-stone-50">
                  <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">
                    {cat.count} Items Available
                  </span>
                  <span className="text-xs text-brand-600 font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="featured-products-section">
        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-800 font-display">Featured Creations</h2>
            <p className="text-sm text-stone-500 mt-1">Our latest, most loved stitches, straight from the knitting table.</p>
          </div>
          <div className="flex gap-2">
            <span className="bg-brand-50 text-brand-700 text-xs font-bold py-1 px-3 rounded-full">★ Highly Rated</span>
          </div>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="bg-[#FAF9F5] border border-stone-200/80 rounded-3xl p-8 text-center space-y-3 max-w-2xl mx-auto font-sans">
            <span className="text-3xl inline-block animate-bounce">🧶</span>
            <div className="space-y-1">
              <h3 className="font-bold text-stone-850 text-sm">Practice Store Mode Is Active!</h3>
              <p className="text-xs text-stone-500 leading-relaxed max-w-md mx-auto">
                You have successfully cleared the pre-loaded products. Go to the <strong>Admin Portal &gt; Practice / Reset</strong> tab or <strong>Manage Products</strong> tab to add your own custom crochet items to see them here!
              </p>
            </div>
            <button
              onClick={() => setView('admin')}
              className="bg-[#bc4747] hover:bg-[#a33939] text-white font-bold text-[11px] py-2 px-5 rounded-full transition-all inline-block shadow-sm"
            >
              Open Admin Portal & Start Practicing
            </button>
          </div>
        )}
      </section>

      {/* 5. CUSTOM ORDER BANNER (SRS REQUIREMENT TEASER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="custom-order-cta-section">
        <div className="bg-[#f5f0f9] rounded-[36px] p-8 sm:p-12 border border-purple-100 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-200/40 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#fcd4db]/45 rounded-full blur-3xl -z-10"></div>

          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-1 bg-[#f5eefc] text-purple-700 text-xs font-bold py-1.5 px-3 rounded-full">
              <span>🎨 Design Your Dream Idea</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-800 font-display leading-tight max-w-xl">
              Can’t find exactly what you want? Custom Order it today!
            </h2>
            <p className="text-sm sm:text-base text-stone-600 max-w-lg leading-relaxed">
              Choose your custom color combinations, soft sizing, specific characters, and budget. Our master knitters will turn your sketch or reference photo into soft, cuddly reality!
            </p>
            <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-4">
              <button
                onClick={() => setView('custom-order')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-md shadow-purple-100 flex items-center gap-2 text-sm sm:text-base"
              >
                <span>Launch Custom Order Wizard</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 max-w-md w-full relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-sm border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=600"
                alt="Crocheting"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. BEST SELLERS BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="best-sellers-section">
        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-800 font-display">Best Sellers</h2>
            <p className="text-sm text-stone-500 mt-1">Customer favorites that fly off our cozy shelves instantly.</p>
          </div>
        </div>

        {bestSellers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="bg-[#FAF9F5] border border-stone-150 rounded-3xl p-6 text-center text-xs text-stone-400 font-sans max-w-md mx-auto">
            <span>No best sellers recorded yet. Add items in the Admin portal to populate this section.</span>
          </div>
        )}
      </section>

      {/* 7. INSTAGRAM GALLERY FEED (SRS REQUIREMENT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="instagram-gallery-section">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs text-brand-500 font-extrabold uppercase tracking-widest">Aesthetic Inspiration</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-800 font-display">Join Our Instagram Nest</h2>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Tag <span className="font-bold text-stone-700">@FloraCrochetShop</span> to be featured! Share your unboxings and cuddly moments.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-stone-100 cursor-pointer shadow-sm border border-stone-50"
            >
              <img
                src={post.image}
                alt="Instagram Crochet"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-1 text-white">
                <Heart size={18} className="fill-white" />
                <span className="text-xs font-bold">{post.likes} Likes</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. NEWSLETTER CARD SIGN-UP (SRS REQUIREMENT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="newsletter-signup-section">
        <div className="bg-[#fbfbf8] rounded-[36px] border border-stone-200/70 p-8 sm:p-12 text-center space-y-6 max-w-4xl mx-auto relative shadow-sm">
          <span className="text-2xl">💌</span>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-800 font-display">Subscribe to Yarn Tales</h2>
            <p className="text-sm text-stone-500 max-w-md mx-auto">
              Get secret discounts, free crochet patterns, first updates on new amigurumi drops, and restock alerts!
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!newsletterSubscribed ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white border border-stone-200 rounded-full py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 flex-1"
                />
                <button
                  type="submit"
                  className="bg-stone-850 hover:bg-stone-950 text-white font-semibold py-3 px-6 rounded-full text-sm transition-all shadow-sm flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Subscribe</span>
                  <Send size={14} />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="subscribed"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-pastel-green text-emerald-800 p-4 rounded-2xl max-w-md mx-auto flex items-center justify-center gap-2"
              >
                <CheckCircle size={18} className="text-emerald-600 shrink-0" />
                <span className="text-sm font-semibold">Thank you! Welcome to our cozy crochet family. Check your inbox!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
}
