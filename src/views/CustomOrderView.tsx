import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, MessageSquare, Send, CheckCircle, HelpCircle, Calendar, DollarSign, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CustomOrderView() {
  const { addCustomOrder, setView } = useShop();

  // Custom order inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [colorPref, setColorPref] = useState('Sage Green & Cream');
  const [sizePref, setSizePref] = useState('Medium (approx. 8 inches)');
  const [quantity, setQuantity] = useState(1);
  const [budget, setBudget] = useState('Rs. 3000 - Rs. 5000');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [refImage, setRefImage] = useState<string | null>(null);
  const [refImageName, setRefImageName] = useState<string | null>(null);

  // Form Submit states
  const [submittedMode, setSubmittedMode] = useState<'email' | 'whatsapp' | null>(null);

  const handleMockImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRefImageName(file.name);
      // Simulate reading image URL
      const reader = new FileReader();
      reader.onload = () => {
        setRefImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectTemplateImage = (url: string, label: string) => {
    setRefImage(url);
    setRefImageName(`Template: ${label}`);
  };

  const generateWhatsAppMessage = () => {
    const text = `🌸 *FloraCrochet Custom Order* 🌸\n\n` +
      `👤 *Name:* ${name}\n` +
      `✉️ *Email:* ${email}\n` +
      `📞 *Phone:* ${phone}\n` +
      `🧶 *Colors:* ${colorPref}\n` +
      `📏 *Size:* ${sizePref}\n` +
      `📦 *Qty:* ${quantity}\n` +
      `💰 *Budget:* ${budget}\n` +
      `📅 *Date:* ${deliveryDate}\n` +
      `📝 *Notes:* ${notes}\n\n` +
      `Please review my custom request and send me a price quote!`;
    return encodeURIComponent(text);
  };

  const handleSubmit = (mode: 'email' | 'whatsapp', e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    // Save custom order to context
    addCustomOrder({
      customerName: name,
      email,
      phone,
      notes,
      colorPreference: colorPref,
      sizePreference: sizePref,
      quantity,
      budgetRange: budget,
      deliveryDate,
      referenceImage: refImage || undefined
    });

    setSubmittedMode(mode);

    if (mode === 'whatsapp') {
      // Open WhatsApp Link in a new tab
      const waUrl = `https://wa.me/923232102080?text=${generateWhatsAppMessage()}`;
      window.open(waUrl, '_blank');
    }
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setColorPref('Sage Green & Cream');
    setSizePref('Medium (approx. 8 inches)');
    setQuantity(1);
    setBudget('Rs. 3000 - Rs. 5000');
    setDeliveryDate('');
    setRefImage(null);
    setRefImageName(null);
    setSubmittedMode(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="custom-order-wizard-container">
      
      {/* Upper header */}
      <div className="bg-[#f5f0f9] border border-purple-200/50 rounded-[32px] p-6 sm:p-10 text-center space-y-3 mb-10">
        <span className="text-3xl">🎨</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-850 font-display">Custom Crochet Lab</h2>
        <p className="text-sm text-stone-500 max-w-lg mx-auto">
          Unleash your creativity! Describe your dream plushie, accessory, or sweater vest. Our custom order specialist will knit your thoughts into perfection.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!submittedMode ? (
          <motion.form
            key="wizard-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border border-stone-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8"
          >
            {/* Step 1: Customer Contact info */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-stone-800 text-lg border-b border-stone-100 pb-2 flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-[#fce4ec] text-[#bc4747] text-xs flex items-center justify-center font-bold">1</span>
                <span>Contact Information</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Saif Ur Rehman"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:ring-1 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. saif@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:ring-1 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:ring-1 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Custom details and options */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-stone-800 text-lg border-b border-stone-100 pb-2 flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-pastel-yellow text-amber-700 text-xs flex items-center justify-center font-bold">2</span>
                <span>Design Specifications</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Yarn Color Combinations</label>
                  <input
                    type="text"
                    placeholder="e.g. Pastel Pink, Sage Green, Warm Cream"
                    value={colorPref}
                    onChange={(e) => setColorPref(e.target.value)}
                    className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:ring-1 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-sans">Sizing / Dimensions</label>
                  <select
                    value={sizePref}
                    onChange={(e) => setSizePref(e.target.value)}
                    className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:ring-1 focus:ring-purple-400 focus:outline-none"
                  >
                    <option value="Mini (approx. 3-4 inches)">Mini (approx. 3-4 inches) - Perfect for keychains</option>
                    <option value="Medium (approx. 8 inches)">Medium (approx. 8 inches) - Standard plush size</option>
                    <option value="Large (approx. 12+ inches)">Large (approx. 12+ inches) - Perfect hugging size</option>
                    <option value="Custom Size">Custom size (Specify in notes below)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Quantity Needed</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:ring-1 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Estimated Budget Range</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:ring-1 focus:ring-purple-400 focus:outline-none"
                  >
                    <option value="Rs. 1500 - Rs. 3000">Rs. 1500 - Rs. 3000 (Small keychains/coasters)</option>
                    <option value="Rs. 3000 - Rs. 5000">Rs. 3000 - Rs. 5000 (Standard plushies/bags)</option>
                    <option value="Rs. 5000 - Rs. 10000">Rs. 5000 - Rs. 10000 (Chunky cardigans/blankets)</option>
                    <option value="Above Rs. 10000">Above Rs. 10000 (Extremely complex bespoke work)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Target Delivery Date</label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:ring-1 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Reference image upload (SRS Requirement: Reference image upload) */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-stone-800 text-lg border-b border-stone-100 pb-2 flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-pastel-green text-emerald-700 text-xs flex items-center justify-center font-bold">3</span>
                <span>Reference Image Upload & Notes</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                <div className="sm:col-span-8 space-y-4">
                  {/* File selector input */}
                  <div className="border-2 border-dashed border-stone-200 hover:border-purple-300 rounded-3xl p-6 text-center cursor-pointer relative bg-[#fbfbf8] transition-colors group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMockImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <Image size={28} className="text-stone-400 group-hover:text-purple-500 transition-colors" />
                      <div>
                        <p className="text-xs font-bold text-stone-700">Drag & drop or Click to upload</p>
                        <p className="text-[10px] text-stone-400 mt-0.5">JPEG, PNG up to 5MB (Bespoke sketch, crochet pattern or photo)</p>
                      </div>
                    </div>
                  </div>

                  {refImageName && (
                    <div className="bg-purple-50 border border-purple-200 text-purple-800 p-3 rounded-2xl text-xs font-bold flex items-center justify-between">
                      <span>✓ Image Attached: {refImageName}</span>
                      <button type="button" onClick={() => { setRefImage(null); setRefImageName(null); }} className="text-red-500 hover:underline">Remove</button>
                    </div>
                  )}

                  {/* Notes description box */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Design Instructions & Notes</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please details everything! (e.g. 'I want Clover to wear a light yellow hat instead of strawberry, with tiny blushing pink cheeks, sitting on a daisy coaster...')"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:ring-1 focus:ring-purple-400 focus:outline-none font-sans"
                    />
                  </div>
                </div>

                {/* Simulated Preset Template Selector (In case user doesn't have an image on hand) */}
                <div className="sm:col-span-4 bg-pastel-cream rounded-3xl p-4 border border-stone-150 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Or pick a base design:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Berry Bear', url: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=200' },
                      { label: 'Green Frog', url: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?q=80&w=200' },
                      { label: 'Daisy Rug', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=200' },
                      { label: 'Aesthetic Bag', url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=200' }
                    ].map((item) => (
                      <div
                        key={item.label}
                        onClick={() => handleSelectTemplateImage(item.url, item.label)}
                        className="aspect-square rounded-xl overflow-hidden border border-stone-200 hover:border-purple-400 cursor-pointer relative group bg-white"
                      >
                        <img src={item.url} alt={item.label} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white font-bold text-center p-1">
                          Select {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons (Email notification + WhatsApp Integration) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-stone-100">
              {/* WhatsApp direct click (highly interactive!) */}
              <button
                type="button"
                disabled={!name || !email || !phone}
                onClick={(e) => handleSubmit('whatsapp', e)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-full flex-1 transition-all shadow-md shadow-emerald-100 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50"
              >
                <MessageSquare size={18} />
                <span>Submit & Chat on WhatsApp</span>
              </button>

              {/* Standard Email Form Submit */}
              <button
                type="button"
                disabled={!name || !email || !phone}
                onClick={(e) => handleSubmit('email', e)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 px-6 rounded-full flex-1 transition-all shadow-md shadow-purple-100 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50"
              >
                <Send size={18} />
                <span>Submit via Email & Server</span>
              </button>
            </div>
            
            <p className="text-[10px] text-stone-400 text-center font-medium">
              * Required contact fields. Submitting triggers secure registration onto our cloud dashboard.
            </p>
          </motion.form>
        ) : (
          <motion.div
            key="success-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white border border-stone-100 rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-6 max-w-xl mx-auto"
            id="custom-order-success-screen"
          >
            <div className="w-16 h-16 rounded-full bg-pastel-green text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle size={36} />
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-stone-850 text-2xl">Bespoke Request Received!</h3>
              <p className="text-sm text-stone-500">
                Hi <span className="font-bold text-stone-700">{name}</span>, your custom request has been recorded into our cloud database.
              </p>
            </div>

            {submittedMode === 'whatsapp' ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs sm:text-sm leading-relaxed text-left space-y-2 font-medium">
                <p>💬 <span className="font-bold">WhatsApp Integration Link Triggered!</span></p>
                <p>We launched a secure external link with your custom specs pre-compiled. If it did not open automatically, click below to open your chat instantly:</p>
                <a
                  href={`https://wa.me/923232102080?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-emerald-650 text-white py-1.5 px-3.5 rounded-full font-bold hover:bg-emerald-700 text-xs shadow-sm"
                >
                  Click to Chat on WhatsApp
                </a>
              </div>
            ) : (
              <div className="bg-purple-50 border border-purple-200 text-purple-800 p-4 rounded-2xl text-xs sm:text-sm leading-relaxed text-left space-y-2 font-medium">
                <p>📧 <span className="font-bold">Email Notification Simulated!</span></p>
                <p>We simulated sending an email notification to <span className="font-bold">{email}</span> and the store manager.</p>
                <p>A support technician will verify the design details and send your quotation with the care instructions.</p>
              </div>
            )}

            <div className="flex gap-4 pt-4 justify-center">
              <button
                onClick={handleResetForm}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2.5 px-6 rounded-full text-xs transition-colors"
              >
                Create Another Request
              </button>
              <button
                onClick={() => setView('shop')}
                className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-2.5 px-6 rounded-full text-xs transition-all shadow-sm"
              >
                Back to Shop
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
