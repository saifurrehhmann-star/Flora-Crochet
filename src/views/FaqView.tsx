import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export default function FaqView() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const faqs: FaqItem[] = [
    {
      category: 'general',
      question: 'What materials do you use for your amigurumis?',
      answer: 'We use high-quality 5-ply milk cotton yarn. This yarn is hypoallergenic, buttery soft, and holds its stitch structure perfectly. We stuff all items with anti-allergenic resilient hollow fiberfill.'
    },
    {
      category: 'general',
      question: 'Are your toys safe for newborn babies?',
      answer: 'Yes! We stitch our baby plushies with organic cotton yarns and secure plastic safety eyes with double-locking backing washers. However, we always recommend supervising small babies with any toy.'
    },
    {
      category: 'custom',
      question: 'How long does a custom order request take to craft?',
      answer: 'Bespoke custom orders typically take 5 to 10 working days to design and hand-stitch, depending on size and detail complexity. Once you place a custom order, we send row-by-row photos on WhatsApp so you can verify color shades!'
    },
    {
      category: 'custom',
      question: 'Can I request custom sizes or colors for an existing item?',
      answer: 'Absolutely! You can use our Custom Order Form to request a modification of any existing bouquet, cardigan, or doll, or send us reference pictures of entirely new designs.'
    },
    {
      category: 'shipping',
      question: 'Do you deliver across Pakistan? What are the charges?',
      answer: 'Yes! We deliver across Pakistan (including Islamabad, Lahore, Karachi, Rawalpindi, Peshawar, etc.). Standard shipping takes 3-5 days. Shipping is flat Rs. 150, or completely FREE on orders over Rs. 1500!'
    },
    {
      category: 'shipping',
      question: 'How do I wash and care for my handmade crochet items?',
      answer: 'To wash: Place the item in a laundry bag, machine wash cold on a delicate cycle with a mild detergent, and air-dry flat. Do not tumble dry, wring, or bleach to preserve fiber volume.'
    }
  ];

  const filteredFaqs = selectedCat === 'all' ? faqs : faqs.filter(f => f.category === selectedCat);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10" id="faq-view-container">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs text-brand-600 font-extrabold uppercase tracking-widest bg-pastel-pink py-1 px-3 rounded-full">Help Center</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-850 font-display">Frequently Asked Questions</h2>
        <p className="text-sm text-stone-500 max-w-md mx-auto">
          Quick guide answers regarding materials, custom order processes, and delivery cycles.
        </p>
      </div>

      {/* Category selector */}
      <div className="flex gap-2 justify-center flex-wrap select-none">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'general', label: 'Care & Materials' },
          { id: 'custom', label: 'Custom Orders' },
          { id: 'shipping', label: 'Shipping & Delivery' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setSelectedCat(cat.id); setOpenIndex(null); }}
            className={`text-xs py-2 px-5 rounded-full border transition-all font-semibold ${
              selectedCat === cat.id
                ? 'bg-[#bc4747] border-[#bc4747] text-white shadow-sm'
                : 'bg-white border-stone-200 text-stone-500 hover:border-stone-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Expandable panels Accordion */}
      <div className="space-y-3 font-sans">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white border border-stone-150 rounded-2xl overflow-hidden transition-all shadow-sm"
              id={`faq-item-${index}`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 focus:outline-none"
              >
                <span className="font-display font-bold text-stone-800 text-sm sm:text-base">{faq.question}</span>
                {isOpen ? (
                  <ChevronUp size={16} className="text-stone-400 shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-stone-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-500 leading-relaxed border-t border-stone-50 animate-slideDown font-sans">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help CTA */}
      <div className="bg-[#fbfbf8] border border-stone-150 p-6 rounded-3xl text-center space-y-3">
        <HelpCircle className="w-8 h-8 text-brand-500 mx-auto" />
        <div className="space-y-1">
          <p className="font-bold text-stone-800 text-sm">Still have questions?</p>
          <p className="text-xs text-stone-500 font-sans">Contact our designer team directly on our live chat system.</p>
        </div>
        <a
          href="https://wa.me/923232102080"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex bg-emerald-650 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-full text-xs transition-colors"
        >
          Chat on WhatsApp Support
        </a>
      </div>

    </div>
  );
}
