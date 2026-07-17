import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Heart, Globe } from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && msg.trim()) {
      setSuccess(true);
      setName('');
      setEmail('');
      setMsg('');
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12" id="contact-view-container">
      
      {/* Page Title */}
      <div className="text-center space-y-2 mb-10">
        <span className="text-xs text-[#bc4747] font-extrabold uppercase tracking-widest bg-pastel-pink py-1 px-3 rounded-full">Support Desk</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-850 font-display">Let&rsquo;s Stitch Together</h2>
        <p className="text-sm text-stone-500 max-w-md mx-auto">
          Have a question about fiber care, sizing, or shipment logs? Send us a message or chat with us on WhatsApp instantly!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Direct contact channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-sm space-y-6">
            <h3 className="font-display font-extrabold text-stone-800 text-lg">Direct Channels</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-sm leading-relaxed">
                <div className="p-3 bg-pastel-pink rounded-2xl text-[#bc4747] shrink-0 shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">Email Assistance</h4>
                  <a href="mailto:hello@yarnova.com" className="text-stone-500 hover:text-brand-600 transition-colors">hello@yarnova.com</a>
                  <p className="text-[10px] text-stone-400 mt-0.5">Average response within 12 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm leading-relaxed">
                <div className="p-3 bg-pastel-green rounded-2xl text-emerald-700 shrink-0 shadow-sm">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">WhatsApp Live Chat</h4>
                  <a href="https://wa.me/923232102080" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-brand-600 transition-colors font-bold text-emerald-600 underline">Chat on WhatsApp</a>
                  <p className="text-[10px] text-stone-400 mt-0.5">Instant quotes and real-time thread color reviews</p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm leading-relaxed">
                <div className="p-3 bg-pastel-yellow rounded-2xl text-amber-700 shrink-0 shadow-sm">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">Phone Support</h4>
                  <span className="text-stone-500">+92 323 2102080</span>
                  <p className="text-[10px] text-stone-400 mt-0.5">Mon - Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm leading-relaxed">
                <div className="p-3 bg-pastel-blue rounded-2xl text-blue-600 shrink-0 shadow-sm">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">Studio Location</h4>
                  <span className="text-stone-500">Sector F-10, Islamabad, Punjab, Pakistan</span>
                  <p className="text-[10px] text-stone-400 mt-0.5">In-person pick-ups by appointment only</p>
                </div>
              </div>
            </div>
          </div>

          {/* Optional Google Map Mockup (SRS Requirement) */}
          <div className="bg-[#fcfbf8] border border-stone-150 rounded-3xl p-4 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block flex items-center gap-1.5">
              <Globe size={12} />
              <span>Studio Map Locator representation</span>
            </span>
            <div className="aspect-[16/9] rounded-2xl overflow-hidden relative border border-stone-200 shadow-inner select-none bg-stone-100 flex items-center justify-center">
              {/* Artistic representation of a Google map using colors and simple design */}
              <div className="absolute inset-0 bg-[#e5e9f0] opacity-90 p-4 flex flex-col justify-between text-[10px] font-mono text-stone-400">
                <div className="flex justify-between">
                  <span>Street 42</span>
                  <span>Margalla Road</span>
                </div>
                <div className="self-center flex flex-col items-center gap-1">
                  <span className="text-2xl animate-bounce">📍</span>
                  <span className="bg-stone-800 text-white font-sans py-1 px-2.5 rounded-lg shadow font-extrabold text-[9px]">Yarnova Studio</span>
                </div>
                <div className="flex justify-between">
                  <span>Sector F-10</span>
                  <span>Ibn-e-Sina Rd</span>
                </div>
              </div>
              <span className="absolute bottom-1 right-2 text-[9px] text-stone-400 font-sans">Mock Map Representation</span>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-sm space-y-6">
          <h3 className="font-display font-extrabold text-stone-800 text-lg border-b border-stone-50 pb-2">Direct Message</h3>

          {success && (
            <div className="bg-pastel-green border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs sm:text-sm font-semibold">
              Thank you! Your message has been sent successfully. We will email you back within 12 hours.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. Name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Message Description</label>
              <textarea
                rows={5}
                required
                placeholder="What can we help you with? (e.g. bulk orders, care, restock delays...)"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 focus:outline-none font-sans"
              />
            </div>

            <button
              type="submit"
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md shadow-brand-100 flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <Send size={14} />
              <span>Send Message</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
