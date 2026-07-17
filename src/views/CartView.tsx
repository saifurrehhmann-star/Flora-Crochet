import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, Tag, ArrowRight, ShieldCheck, Truck, ShoppingCart } from 'lucide-react';

export default function CartView() {
  const {
    cart,
    updateCartQuantity,
    removeCartItem,
    activeCoupon,
    couponError,
    applyCouponCode,
    removeCoupon,
    setView
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

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

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const success = applyCouponCode(couponInput);
      if (success) {
        setCouponInput('');
      }
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6" id="empty-cart-container">
        <div className="w-20 h-20 bg-pastel-pink rounded-full flex items-center justify-center mx-auto text-3xl">
          🧶
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-850 font-display">Your Cart is Empty</h2>
          <p className="text-sm text-stone-500 max-w-sm mx-auto">
            You don’t have any hand-stitched snuggly treasures in your bag yet. Let’s start finding some!
          </p>
        </div>
        <button
          onClick={() => setView('shop')}
          className="bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-md shadow-brand-100 flex items-center justify-center gap-2 mx-auto text-sm"
        >
          <ShoppingCart size={16} />
          <span>Browse Creations</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="cart-view-container">
      
      <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-800 font-display mb-8 flex items-center gap-2">
        <span>Shopping Bag</span>
        <span className="text-xs bg-brand-500 text-white px-2.5 py-1 rounded-full font-bold">
          {cart.reduce((sum, i) => sum + i.quantity, 0)} Items
        </span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Area: Cart items list */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden divide-y divide-stone-50">
            {cart.map((item) => {
              const activeItemPrice = item.product.discountPrice || item.product.price;
              const hasOldPrice = !!item.product.discountPrice;
              
              return (
                <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between" id={`cart-item-${item.id}`}>
                  
                  {/* Item Image and Title */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#fdfbf8] border border-stone-100 shrink-0 select-none">
                      <img src={item.product.images[0]} alt={item.product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h3
                        onClick={() => setView('product-details', item.product.id)}
                        className="font-display font-bold text-stone-800 text-sm sm:text-base hover:text-[#bc4747] cursor-pointer truncate"
                      >
                        {item.product.name}
                      </h3>
                      {/* Variants listed */}
                      {Object.entries(item.selectedVariant).length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {Object.entries(item.selectedVariant).map(([k, v]) => (
                            <span key={k} className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full font-medium">
                              {k}: <span className="font-bold text-stone-700">{v}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Pricing details */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                    
                    {/* Adjusters */}
                    <div className="flex items-center bg-[#fbfbf8] border border-stone-200 rounded-full px-1.5 py-0.5 scale-90">
                      <button
                        disabled={item.quantity <= 1}
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-stone-400 hover:text-stone-800 disabled:opacity-40"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold text-stone-800 text-xs">{item.quantity}</span>
                      <button
                        disabled={item.quantity >= item.product.stock}
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-stone-400 hover:text-stone-800 disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>

                    {/* Unit & Sub pricing */}
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-stone-800">
                        Rs. {(activeItemPrice * item.quantity).toFixed(0)}
                      </div>
                      <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wide">
                        Rs. {activeItemPrice.toFixed(0)} each
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeCartItem(item.id)}
                      className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove Item"
                      id={`remove-cart-${item.id}`}
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>

          {/* Continue button & Trust indicators */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setView('shop')}
              className="text-brand-600 hover:text-brand-700 text-sm font-bold flex items-center gap-1.5"
            >
              <span>← Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Right Area: Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Summary card */}
          <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-sm space-y-6">
            <h3 className="font-bold font-display text-stone-800 text-base border-b border-stone-50 pb-3">Order Summary</h3>

            {/* Price lines */}
            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between text-stone-500 font-medium">
                <span>Subtotal</span>
                <span className="font-extrabold text-stone-800">Rs. {subtotal.toFixed(0)}</span>
              </div>

              {activeCoupon && (
                <div className="flex justify-between text-emerald-700 font-medium bg-emerald-50/50 p-2.5 rounded-xl">
                  <div className="flex items-center gap-1">
                    <Tag size={14} className="shrink-0" />
                    <span>Coupon ({activeCoupon.code})</span>
                  </div>
                  <span className="font-extrabold">-Rs. {discount.toFixed(0)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-500 font-medium">
                <span>Shipping Fees</span>
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-extrabold uppercase tracking-wide text-xs">FREE</span>
                ) : (
                  <span className="font-extrabold text-stone-855">Rs. {shippingFee.toFixed(0)}</span>
                )}
              </div>

              {/* Free shipping banner */}
              {shippingFee > 0 && (
                <p className="text-[10px] text-amber-600 font-semibold bg-amber-50 p-2 rounded-xl flex items-center gap-1.5">
                  <Truck size={12} />
                  <span>Add <span className="font-bold">Rs. {(50 - subtotal).toFixed(0)}</span> more to qualify for Free Shipping!</span>
                </p>
              )}

              <div className="border-t border-stone-100 pt-4 flex justify-between items-baseline">
                <span className="font-bold text-stone-800 text-base">Grand Total</span>
                <span className="text-2xl font-extrabold text-brand-600">Rs. {grandTotal.toFixed(0)}</span>
              </div>
            </div>

            {/* Coupons Input Form */}
            <div className="pt-4 border-t border-stone-50 space-y-3">
              {activeCoupon ? (
                <div className="flex items-center justify-between bg-[#fbfbf8] border border-stone-150 p-3 rounded-2xl">
                  <div>
                    <p className="text-xs font-bold text-stone-700">Code: {activeCoupon.code}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">{activeCoupon.description}</p>
                  </div>
                  <button onClick={removeCoupon} className="text-xs text-red-500 hover:underline font-bold">Remove</button>
                </div>
              ) : (
                <form onSubmit={handleCouponSubmit} className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Apply Promo Coupon</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. CROCHETLOVE"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="bg-[#fbfbf8] border border-stone-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-400 flex-1 text-stone-700 uppercase"
                    />
                    <button
                      type="submit"
                      disabled={!couponInput.trim()}
                      className="bg-stone-850 hover:bg-stone-950 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors disabled:opacity-40"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[10px] text-red-500 font-semibold mt-1">{couponError}</p>
                  )}
                  {/* Tips list */}
                  <p className="text-[9px] text-stone-400 mt-1">Hint: Try applying <strong>CROCHETLOVE</strong> (10% off) or <strong>WELCOME15</strong>.</p>
                </form>
              )}
            </div>

            {/* Checkout proceed button */}
            <button
              onClick={() => setView('checkout')}
              className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 px-6 rounded-full transition-all shadow-md shadow-brand-100 flex items-center justify-center gap-1.5 text-sm sm:text-base"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Secure trust guarantee info */}
          <div className="bg-stone-100/50 rounded-2xl p-4 border border-stone-150 space-y-2.5 text-[11px] text-stone-500 text-center">
            <p className="flex items-center gap-1.5 justify-center font-bold text-stone-700">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>FloraCrochet Secure Checkout Guarantee</span>
            </p>
            <p className="leading-relaxed font-sans">
              Orders are packaged carefully to prevent crush damage to stuffing fiber. Comes inside eco-friendly custom pastel tissue sheets!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
