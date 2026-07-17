import { useState } from 'react';
import { Shield, Truck, RefreshCw, FileText } from 'lucide-react';

export default function PolicyViews() {
  const [activePolicy, setActivePolicy] = useState<'shipping' | 'return' | 'privacy' | 'terms'>('shipping');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="policy-views-container">
      
      {/* Page Title */}
      <div className="border-b border-stone-100 pb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-800 font-display">Store Polices & Legal Guidelines</h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">Transparency regarding your checkout transactions, delivery limits, and refunds eligibility.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Rail */}
        <aside className="lg:col-span-3 bg-white rounded-3xl p-4 border border-stone-100 shadow-sm flex flex-col gap-1">
          {[
            { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
            { id: 'return', label: 'Returns & Refunds', icon: RefreshCw },
            { id: 'privacy', label: 'Privacy Agreement', icon: Shield },
            { id: 'terms', label: 'Terms & Conditions', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activePolicy === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePolicy(tab.id as any)}
                className={`text-xs sm:text-sm py-2 px-3 rounded-xl text-left flex items-center gap-2 transition-all font-semibold ${
                  isActive
                    ? 'bg-pastel-pink text-[#bc4747] font-bold'
                    : 'text-stone-500 hover:bg-stone-50'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-[#bc4747]' : 'text-stone-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Dynamic Display Port */}
        <main className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-sm text-stone-600 text-xs sm:text-sm leading-relaxed font-sans space-y-6">
          
          {activePolicy === 'shipping' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="font-display font-extrabold text-stone-800 text-lg border-b border-stone-50 pb-2">Shipping & Delivery Policy</h3>
              <p>
                All FloraCrochet products are double-knotted and packed in custom protective boxes to prevent fiber compression or fluff flattening during transport.
              </p>
              <h4 className="font-bold text-stone-800 mt-4 uppercase text-[10px] tracking-wider text-brand-600">Pakistan Nationwide Shipping</h4>
              <p>
                We deliver standard items across Pakistan via courier services (TCS, Leopards, M&P). Deliveries to Islamabad, Rawalpindi, Lahore, and Karachi normally arrive within 3 to 5 business days. Remote towns may take up to 7 business days.
              </p>
              <h4 className="font-bold text-stone-800 mt-4 uppercase text-[10px] tracking-wider text-brand-600">Custom Bespoke Timelines</h4>
              <p>
                Custom bespoke items are custom-woven from fresh yarn upon order confirmation. They will require an additional 5-10 working days of production time before shipment can be processed. Estimated dispatch dates are provided on our custom order receipts.
              </p>
              <h4 className="font-bold text-stone-800 mt-4 uppercase text-[10px] tracking-wider text-brand-600">Shipping Fees</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Orders under Rs. 1500: Flat <strong>Rs. 150</strong> shipping fee applies.</li>
                <li>Orders of Rs. 1500 and above: <strong>FREE shipping nationwide!</strong></li>
              </ul>
            </div>
          )}

          {activePolicy === 'return' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="font-display font-extrabold text-stone-800 text-lg border-b border-stone-50 pb-2">Return & Refund Policy</h3>
              <p>
                Due to the custom-made, hand-woven nature of our products, all sales are generally final. However, customer satisfaction is our absolute priority.
              </p>
              <h4 className="font-bold text-stone-800 mt-4 uppercase text-[10px] tracking-wider text-[#bc4747]">Eligible Damaged Returns</h4>
              <p>
                If your amigurumi or bouquet arrives with visible structural damage (e.g. unravelling yarn tails, torn fibers, broken safety eyes) or you received the incorrect item:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Contact us within <strong>48 hours</strong> of receiving the box.</li>
                <li>Provide a short unboxing video or high-quality photos on WhatsApp support.</li>
                <li>Upon verification, we will process a replacement or a full refund back to your payment account.</li>
              </ul>
              <h4 className="font-bold text-stone-800 mt-4 uppercase text-[10px] tracking-wider text-[#bc4747]">Exemptions</h4>
              <p>
                We cannot offer returns, replacements, or refunds for custom bespoke orders once the shade previews are approved and shipped. We also cannot refund items damaged through personal chewing, washing machine abuse, or rough play.
              </p>
            </div>
          )}

          {activePolicy === 'privacy' && (
            <div className="space-y-4 animate-fadeIn font-sans">
              <h3 className="font-display font-extrabold text-stone-800 text-lg border-b border-stone-50 pb-2">Privacy Agreement</h3>
              <p>
                At FloraCrochet, we respect your confidentiality. We do not sell or lease your personal credentials.
              </p>
              <h4 className="font-bold text-stone-800 mt-4 uppercase text-[10px] tracking-wider text-brand-600">Data Collection</h4>
              <p>
                We collect your basic name, WhatsApp number, email, and shipping address solely to print invoice labels and communicate order shipment status.
              </p>
              <h4 className="font-bold text-stone-800 mt-4 uppercase text-[10px] tracking-wider text-brand-600">Security & Storage</h4>
              <p>
                Your account credentials are stored in safe offline-first local registers synced only to your direct browser context. Order logs are cleared automatically upon fulfillment if requested.
              </p>
            </div>
          )}

          {activePolicy === 'terms' && (
            <div className="space-y-4 animate-fadeIn font-sans">
              <h3 className="font-display font-extrabold text-stone-800 text-lg border-b border-stone-50 pb-2">Terms & Conditions</h3>
              <p>
                By browsing and ordering items from our platform, you agree to our standard terms of use.
              </p>
              <h4 className="font-bold text-stone-800 mt-4 uppercase text-[10px] tracking-wider text-brand-600">Handmade Variance Disclaimer</h4>
              <p>
                Our creations are individually stitched by hand. Therefore, minor variations in facial expressions, stitch tension, and exact yarn shade dyes may occur. These are not flaws but a signature of authentic handmade craft!
              </p>
              <h4 className="font-bold text-stone-800 mt-4 uppercase text-[10px] tracking-wider text-brand-600">Intellectual Property</h4>
              <p>
                All original design templates, crochet patterns, photography assets, and texts belong to FloraCrochet. Copying patterns for commercial retail is strictly prohibited.
              </p>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
