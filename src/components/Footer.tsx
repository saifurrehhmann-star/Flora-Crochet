import { useShop } from '../context/ShopContext';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Heart } from 'lucide-react';

export default function Footer() {
  const { setView } = useShop();

  const handlePolicyClick = (viewName: string) => {
    setView(viewName);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800" id="main-footer">
      
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-9 h-9 rounded-full bg-pastel-pink flex items-center justify-center font-bold text-lg text-brand-700">
              🌸
            </div>
            <h2 className="text-xl font-bold font-display text-white">
              Flora<span className="text-brand-300">Crochet</span>
            </h2>
          </div>
          <p className="text-sm text-stone-400 leading-relaxed font-sans">
            Handcrafting cute, cozy, and whimsical crochet wonders that bring warmth and joy into your daily routine. Ethically made with love, high-quality yarn, and attention to stitch detail.
          </p>
          <div className="flex items-center gap-3 mt-2 text-stone-400">
            <a href="https://www.instagram.com/crochet_n_creation/" className="p-2 bg-stone-800 hover:bg-brand-500 hover:text-white rounded-full transition-all" title="Instagram">
              <Instagram size={16} />
            </a>
            <a href="#" className="p-2 bg-stone-800 hover:bg-brand-500 hover:text-white rounded-full transition-all" title="Facebook">
              <Facebook size={16} />
            </a>
            <a href="#" className="p-2 bg-stone-800 hover:bg-brand-500 hover:text-white rounded-full transition-all" title="Youtube">
              <Youtube size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="text-white font-bold font-display text-base tracking-wide mb-4">Shop Collections</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => setView('shop', null, 'amigurumi')} className="hover:text-brand-300 transition-colors">
                Amigurumi & Plush Toys
              </button>
            </li>
            <li>
              <button onClick={() => setView('shop', null, 'bags-accessories')} className="hover:text-brand-300 transition-colors">
                Cute Handbags & Accessories
              </button>
            </li>
            <li>
              <button onClick={() => setView('shop', null, 'wearables')} className="hover:text-brand-300 transition-colors">
                Cozy Sweaters & Vests
              </button>
            </li>
            <li>
              <button onClick={() => setView('shop', null, 'home-decor')} className="hover:text-brand-300 transition-colors">
                Hand-knitted Mug Rugs & Decor
              </button>
            </li>
            <li>
              <button onClick={() => setView('custom-order')} className="text-brand-300 hover:text-brand-200 transition-colors flex items-center gap-1 font-semibold">
                ✨ Custom Design System
              </button>
            </li>
          </ul>
        </div>

        {/* Studio Assistance Column */}
        <div>
          <h3 className="text-white font-bold font-display text-base tracking-wide mb-4">Studio Assistant</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => setView('about')} className="hover:text-brand-300 transition-colors">
                Our Story & Philosophy
              </button>
            </li>
            <li>
              <button onClick={() => setView('faq')} className="hover:text-brand-300 transition-colors">
                FAQs & Crochet Care Guide
              </button>
            </li>
            <li>
              <button onClick={() => setView('contact')} className="hover:text-brand-300 transition-colors">
                Contact Studio Support
              </button>
            </li>
            <li>
              <button onClick={() => setView('account')} className="hover:text-brand-300 transition-colors">
                My Customer Account
              </button>
            </li>
          </ul>
        </div>

        {/* Studio Contact Column */}
        <div className="flex flex-col gap-4 text-sm">
          <h3 className="text-white font-bold font-display text-base tracking-wide">Get in Touch</h3>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-brand-300 shrink-0" />
            <div>
              <p className="font-semibold text-white">Email Address</p>
              <a href="mailto:hello@floracrochet.com" className="text-stone-400 hover:text-brand-300 transition-colors">
                hello@floracrochet.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-brand-300 shrink-0" />
            <div>
              <p className="font-semibold text-white">WhatsApp & Support</p>
              <a href="https://wa.me/923232102080" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-brand-300 transition-colors">
                +92 323 2102080
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-brand-300 shrink-0" />
            <div>
              <p className="font-semibold text-white">Crochet Studio</p>
              <span className="text-stone-400">Sector F-10, Islamabad, Pakistan</span>
            </div>
          </div>
        </div>

      </div>

      {/* Middle Footer: Policies & Legal (Required by SRS) */}
      <div className="border-t border-stone-800 bg-stone-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button onClick={() => handlePolicyClick('privacy')} className="hover:text-stone-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handlePolicyClick('terms')} className="hover:text-stone-300 transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => handlePolicyClick('shipping-policy')} className="hover:text-stone-300 transition-colors">
              Shipping Policy
            </button>
            <button onClick={() => handlePolicyClick('return-policy')} className="hover:text-stone-300 transition-colors">
              Return & Refund Policy
            </button>
          </div>
          <p className="text-stone-600">Secure 256-Bit SSL Encryption Active</p>
        </div>
      </div>

      {/* Lower Copyright section */}
      <div className="border-t border-stone-800 py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} FloraCrochet. All rights reserved.</p>
          <p className="flex items-center gap-1 justify-center">
            Handcrafted with <Heart size={12} className="text-brand-500 fill-brand-500 animate-pulse" /> & high-quality milk cotton yarn.
          </p>
        </div>
      </div>

    </footer>
  );
}
