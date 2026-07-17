import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, CheckCircle, Tag, Truck, CreditCard, MessageCircle, ArrowLeft } from 'lucide-react';
import { Address } from '../types';

export default function CheckoutView() {
  const {
    cart,
    activeCoupon,
    placeOrder,
    user,
    setView
  } = useShop();

  // Form states
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(user?.phone ? user.phone : '');
  const [street, setStreet] = useState(user?.savedAddresses?.[0]?.street || '');
  const [city, setCity] = useState(user?.savedAddresses?.[0]?.city || '');
  const [state, setState] = useState(user?.savedAddresses?.[0]?.state || 'Punjab');
  const [zipCode, setZipCode] = useState(user?.savedAddresses?.[0]?.zipCode || '44000');
  const [country, setCountry] = useState(user?.savedAddresses?.[0]?.country || 'Pakistan');
  const [addressType, setAddressType] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  // Success state
  const [placedOrderDetails, setPlacedOrderDetails] = useState<any | null>(null);

  // Redirect if empty and order not placed
  React.useEffect(() => {
    if (cart.length === 0 && !placedOrderDetails) {
      setView('shop');
    }
  }, [cart.length, placedOrderDetails, setView]);

  if (cart.length === 0 && !placedOrderDetails) {
    return null;
  }

  // Prep calculation totals
  const subtotal = cart.reduce((acc, item) => {
    const price = item.product.discountPrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const discount = activeCoupon
    ? activeCoupon.discountType === 'percentage'
      ? Number((subtotal * (activeCoupon.value / 100)).toFixed(2))
      : activeCoupon.value
    : 0;

  const shippingFee = subtotal >= 50 ? 0 : 5.00;
  const grandTotal = Number((subtotal - discount + shippingFee).toFixed(2));

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !street || !city) return;

    const shippingAddress: Address = {
      id: `a-${Math.floor(Math.random() * 1000)}`,
      type: addressType,
      street,
      city,
      state,
      zipCode,
      country
    };

    const newOrder = placeOrder({
      customerName: name,
      email,
      phone,
      shippingAddress,
      paymentMethod
    });

    setPlacedOrderDetails(newOrder);

    // Automatically open WhatsApp with the order message in a new tab immediately on submit
    const waMessage = generateWhatsAppCheckoutMessage(newOrder);
    if (waMessage) {
      window.open(`https://wa.me/923232102080?text=${waMessage}`, '_blank');
    }
  };

  const generateWhatsAppCheckoutMessage = (orderToUse = placedOrderDetails) => {
    if (!orderToUse) return '';
    const itemsText = orderToUse.items
      .map((i: any) => `- *${i.name}* (Qty: ${i.quantity}${Object.keys(i.selectedVariant).length > 0 ? `, ${Object.entries(i.selectedVariant).map(([k, v]) => `${k}:${v}`).join(', ')}` : ''})`)
      .join('\n');

    const text = `🧶 *Crochet & Creation - New Order Confirmation* 🧶\n\n` +
      `🆔 *Order ID:* #${orderToUse.id}\n` +
      `👤 *Customer Name:* ${orderToUse.customerName}\n` +
      `📞 *Phone Number:* ${orderToUse.phone}\n` +
      `📍 *Shipping Address:* ${orderToUse.shippingAddress.street}, ${orderToUse.shippingAddress.city}, ${orderToUse.shippingAddress.zipCode}\n\n` +
      `🛒 *Purchased Items:*\n${itemsText}\n\n` +
      `💳 *Payment Method:* ${orderToUse.paymentMethod}\n` +
      `💰 *Grand Total:* Rs. ${orderToUse.total.toFixed(0)}\n\n` +
      `Assalam-o-Alaikum! I have placed an order on your website. Please confirm my order and send shipping details. Shukriya! ❤️`;
    return encodeURIComponent(text);
  };

  if (placedOrderDetails) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6 animate-fadeIn" id="order-completed-success-screen">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm animate-bounce">
          <CheckCircle size={36} />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-850 font-display">Stitched Successfully!</h2>
          <p className="text-sm text-stone-500">
            Hi <span className="font-bold text-stone-750">{placedOrderDetails.customerName}</span>, your order <span className="font-bold text-brand-600">#{placedOrderDetails.id}</span> has been saved on our website database!
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-stone-150 p-5 text-left text-sm space-y-3 shadow-sm">
          <div className="flex justify-between font-bold border-b border-stone-50 pb-2">
            <span>Summary:</span>
            <span>{placedOrderDetails.items.length} Items</span>
          </div>
          <div className="text-xs text-stone-500 space-y-1.5 leading-relaxed font-sans">
            <p>📍 <strong>Shipping Address:</strong> {placedOrderDetails.shippingAddress.street}, {placedOrderDetails.shippingAddress.city}, {placedOrderDetails.shippingAddress.zipCode}</p>
            <p>🚚 <strong>Shipping Status:</strong> Pending (Processing within 24 hours)</p>
            <p>💳 <strong>Payment Method:</strong> {placedOrderDetails.paymentMethod}</p>
          </div>
          <div className="border-t border-stone-50 pt-2 flex justify-between font-extrabold text-stone-800 text-base">
            <span>Total Paid:</span>
            <span className="text-brand-600">Rs. {placedOrderDetails.total.toFixed(0)}</span>
          </div>
        </div>

        {/* UNIVERSAL WHATSAPP NOTIFICATION ENGINE */}
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-5 rounded-3xl text-xs sm:text-sm text-left space-y-3.5 font-sans shadow-sm">
          <div className="flex items-center gap-2 text-emerald-800">
            <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" fill="currentColor" />
            <h4 className="font-bold text-sm">WhatsApp par Order Confirm Ho Raha Hai! 💬</h4>
          </div>
          
          <div className="text-stone-600 space-y-2 text-[11px] sm:text-xs leading-relaxed font-medium">
            <p>
              Aapka order successfully website database mein save ho chuka hai, aur humne WhatsApp par automatic redirect shuru kar diya hai! Agar aapka WhatsApp page auto-open nahi hua, toh neechay diye gaye button par click karke manually direct message send karein takay hum order process shuru kar sakein!
            </p>
            <p className="text-emerald-800/90 font-semibold bg-emerald-100/50 p-2 rounded-xl text-[10px] sm:text-[11px]">
              {placedOrderDetails.paymentMethod === 'WhatsApp Direct Checkout'
                ? '💡 Direct checkout confirm karne ke liye WhatsApp message zaroori hai takay hum bank transfer details share kar sakein.'
                : '💡 Direct message karne se aapka order prioritize ho jata hai aur hum foran stitching shuru kar dete hain!'}
            </p>
          </div>

          <a
            href={`https://wa.me/923232102080?text=${generateWhatsAppCheckoutMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-6 rounded-full text-xs sm:text-sm transition-all duration-300 shadow-md shadow-emerald-200 active:scale-95 group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>WhatsApp Open Karein (If not auto-opened) 📲</span>
          </a>
        </div>

        <div className="flex justify-center gap-3 pt-2 flex-wrap sm:flex-nowrap">
          <button
            onClick={() => setView('shop')}
            className="w-full sm:w-auto bg-stone-800 hover:bg-stone-900 text-white font-bold py-2.5 px-6 rounded-full text-xs transition-colors"
          >
            Keep Exploring
          </button>
          <button
            onClick={() => setView('account')}
            className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-white font-bold py-2.5 px-6 rounded-full text-xs transition-all shadow-sm"
          >
            Track Order History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="checkout-view-container">
      
      <button
        onClick={() => setView('cart')}
        className="flex items-center gap-1.5 text-stone-500 hover:text-brand-600 text-sm font-semibold transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        <span>Return to Shopping Bag</span>
      </button>

      <form onSubmit={handlePlaceOrderSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Area: Billing & Shipping Address inputs */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-sm space-y-6">
          <h3 className="font-display font-extrabold text-stone-800 text-lg border-b border-stone-100 pb-2 flex items-center gap-1.5">
            <span>Shipping & Billing Credentials</span>
          </h3>

          {/* Contact Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">First & Last Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">WhatsApp / Phone Number *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none"
            />
          </div>

          {/* Street Address Row */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Street Address *</label>
            <input
              type="text"
              required
              placeholder="Apartment, suite, house number, and sector..."
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none"
            />
          </div>

          {/* City, State, ZIP */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">City / Town *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">State / Province</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">ZIP / Postal Code *</label>
              <input
                type="text"
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Country, Address Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Country *</label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Address Label</label>
              <div className="flex gap-2">
                {['Home', 'Work', 'Other'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAddressType(type as any)}
                    className={`text-xs py-2 px-4 rounded-xl border flex-1 font-semibold transition-all ${
                      addressType === type
                        ? 'bg-brand-100 border-brand-400 text-brand-700'
                        : 'bg-[#fbfbf8] border-stone-200 text-stone-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Methods (Cash on Delivery, Bank, WhatsApp) */}
          <div className="space-y-3 pt-4 border-t border-stone-50">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Payment Processing</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: 'Cash on Delivery', icon: Truck, desc: 'Pay at door on delivery' },
                { title: 'Bank Transfer', icon: CreditCard, desc: 'Prepay secure transaction' },
                { title: 'WhatsApp Direct Checkout', icon: MessageCircle, desc: 'Pay on chat support' }
              ].map((pm) => {
                const isActive = paymentMethod === pm.title;
                const Icon = pm.icon;
                return (
                  <button
                    key={pm.title}
                    type="button"
                    onClick={() => setPaymentMethod(pm.title)}
                    className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition-all ${
                      isActive
                        ? 'bg-brand-50/55 border-brand-400 text-brand-800 shadow-sm'
                        : 'bg-[#fbfbf8] border-stone-200 text-stone-600 hover:border-brand-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-brand-500' : 'text-stone-400'}`} />
                    <div>
                      <p className="text-xs font-bold">{pm.title}</p>
                      <p className="text-[10px] text-stone-400 mt-0.5 leading-relaxed font-sans">{pm.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Area: Items checklist & calculations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-sm space-y-5">
            <h3 className="font-bold font-display text-stone-800 text-base border-b border-stone-50 pb-2">Bag Checklist</h3>

            {/* List items inside */}
            <div className="divide-y divide-stone-50 overflow-y-auto max-h-56 pr-1 space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-50 border border-stone-100 shrink-0 select-none">
                    <img src={item.product.images[0]} alt={item.product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1 text-xs">
                    <h4 className="font-bold text-stone-800 truncate">{item.product.name}</h4>
                    <p className="text-stone-400 font-medium">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-extrabold text-stone-800 shrink-0">
                    Rs. {((item.product.discountPrice || item.product.price) * item.quantity).toFixed(0)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations lines */}
            <div className="space-y-2.5 pt-4 border-t border-stone-100 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span className="font-bold text-stone-700">Rs. {subtotal.toFixed(0)}</span>
              </div>
              {activeCoupon && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon Discount ({activeCoupon.code})</span>
                  <span>-Rs. {discount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-500">
                <span>Shipping Fee</span>
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  <span>Rs. {shippingFee.toFixed(0)}</span>
                )}
              </div>
              <div className="border-t border-stone-50 pt-3 flex justify-between items-baseline font-extrabold text-stone-800 text-base">
                <span>Grand Total</span>
                <span className="text-brand-600 text-lg">Rs. {grandTotal.toFixed(0)}</span>
              </div>
            </div>

            {/* Submit standard order button */}
            <button
              type="submit"
              className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-6 rounded-full transition-all shadow-md shadow-brand-100 flex items-center justify-center gap-2 text-sm uppercase"
            >
              <ShoppingBag size={16} />
              <span>Complete Standard Order</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}
