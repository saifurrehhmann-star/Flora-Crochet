import React, { useState, useMemo, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import RatingStars from '../components/RatingStars';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag, Truck, ShieldAlert, Sparkles, MessageCircle, ArrowLeft, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductDetailsView() {
  const {
    selectedProductId,
    products,
    addCartItem,
    wishlist,
    toggleWishlist,
    recentlyViewed,
    addProductReview,
    setView
  } = useShop();

  const product = useMemo(() => {
    return products.find((p) => p.id === selectedProductId) || products[0];
  }, [products, selectedProductId]);

  // Product Selection States
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>(() => {
    const defaults: { [key: string]: string } = {};
    product.variants.forEach((v) => {
      if (v.options.length > 0) {
        defaults[v.name] = v.options[0];
      }
    });
    return defaults;
  });
  const [quantity, setQuantity] = useState(1);

  // Image Zoom States (SRS Requirement)
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: 'none' });
  const containerRef = useRef<HTMLDivElement>(null);

  // Review Form States
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Sync state if product changes
  useMemo(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    const defaults: { [key: string]: string } = {};
    product.variants.forEach((v) => {
      if (v.options.length > 0) {
        defaults[v.name] = v.options[0];
      }
    });
    setSelectedVariants(defaults);
    setReviewSuccess(false);
  }, [product]);

  const isWishlisted = wishlist.includes(product.id);
  const activePrice = product.discountPrice || product.price;
  const isOutOfStock = product.stock === 0;

  // Handle image zoom mouse move (SRS Requirement: Image zoom)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${product.images[activeImageIndex]})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%' // double zoom scale
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  // Select variants handler
  const handleVariantChange = (variantName: string, option: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: option
    }));
  };

  // Add to cart handler
  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addCartItem(product, quantity, selectedVariants);
  };

  // Submit Review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName.trim() && reviewComment.trim()) {
      addProductReview(product.id, {
        userName: reviewName,
        rating: reviewRating,
        comment: reviewComment
      });
      setReviewName('');
      setReviewComment('');
      setReviewRating(5);
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 5000);
    }
  };

  // Filter 3 related products
  const relatedProducts = useMemo(() => {
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 3);
  }, [products, product]);

  // Filter recently viewed (excluding current)
  const recentlyViewedProducts = useMemo(() => {
    return products.filter((p) => recentlyViewed.includes(p.id) && p.id !== product.id).slice(0, 4);
  }, [products, recentlyViewed, product]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative space-y-16" id={`product-details-${product.id}`}>
      
      {/* Breadcrumb / Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setView('shop')}
          className="flex items-center gap-1.5 text-stone-500 hover:text-brand-600 text-sm font-semibold transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Crochet Emporium</span>
        </button>
        <span className="text-xs text-stone-400 font-bold uppercase tracking-widest">
          SKU: {product.sku}
        </span>
      </div>

      {/* Main product presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Image Stages (thumbnails + main) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4">
          {/* Thumbnails list (Left on desktop, bottom on mobile) */}
          <div className="sm:col-span-2 order-2 sm:order-1 flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-x-visible">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`relative aspect-square rounded-2xl overflow-hidden border-2 bg-stone-50 shrink-0 w-16 sm:w-auto ${
                  activeImageIndex === i ? 'border-[#bc4747] scale-102 shadow-sm' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${i}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Display Image stage with Zoom overlay */}
          <div className="sm:col-span-10 order-1 sm:order-2">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-square bg-[#fdfbf8] rounded-3xl overflow-hidden border border-stone-100 cursor-crosshair select-none"
              id="zoom-main-image-container"
            >
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />

              {/* Zoom overlay absolute layer (SRS requirement: image zoom) */}
              <div
                className="absolute inset-0 pointer-events-none hidden rounded-3xl shadow-inner bg-no-repeat bg-white border border-stone-200"
                style={zoomStyle}
              />

              {/* Instruction banner */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-stone-900/45 text-white text-[10px] uppercase tracking-wider py-1 px-2.5 rounded-full backdrop-blur-[2px] font-semibold">
                🔍 Hover Image to Zoom
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Descriptions & Actions */}
        <div className="lg:col-span-5 space-y-6" id="product-meta-panel">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-brand-600 font-extrabold bg-[#ffeef2] py-1 px-2.5 rounded-full">
              {product.category.replace('-', ' ')}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-800 leading-tight font-display">
              {product.name}
            </h1>

            {/* Ratings Summary */}
            <div className="flex items-center gap-2">
              <RatingStars rating={product.rating} size={15} />
              <span className="text-sm font-bold text-stone-700">{product.rating}</span>
              <span className="text-stone-300">|</span>
              <a href="#reviews-anchor" className="text-sm text-stone-500 hover:text-brand-600 underline font-medium">
                {product.reviewsCount} Customer Reviews
              </a>
            </div>
          </div>

          {/* Price display */}
          <div className="p-4 bg-pastel-pink/40 border border-stone-100 rounded-3xl flex items-baseline gap-3">
            {product.discountPrice ? (
              <>
                <span className="text-3xl font-extrabold text-[#bc4747]">Rs. {product.discountPrice.toFixed(0)}</span>
                <span className="text-base text-stone-400 line-through">Rs. {product.price.toFixed(0)}</span>
                <span className="text-xs bg-[#bc4747] text-white py-0.5 px-2 rounded-full uppercase tracking-wider font-extrabold ml-auto">
                  Save Rs. {(product.price - product.discountPrice).toFixed(0)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-extrabold text-stone-850">Rs. {product.price.toFixed(0)}</span>
            )}
          </div>

          {/* Product description copy */}
          <p className="text-sm text-stone-600 leading-relaxed font-sans">{product.description}</p>

          {/* Dynamic Variant Selectors */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            {product.variants.map((v) => (
              <div key={v.name} className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1">
                  <span>Choose {v.name}:</span>
                  <span className="text-stone-700 font-extrabold">{selectedVariants[v.name]}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {v.options.map((opt) => {
                    const isSelected = selectedVariants[v.name] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleVariantChange(v.name, opt)}
                        className={`text-xs sm:text-sm py-2 px-4 rounded-full border transition-all ${
                          isSelected
                            ? 'bg-[#bc4747] text-white border-brand-500 font-semibold shadow-sm'
                            : 'bg-[#fbfbf8] text-stone-700 border-stone-200 hover:border-brand-200'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Stock, Quantity, and Cart triggers */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
              <span className="text-stone-400">Availability:</span>
              {isOutOfStock ? (
                <span className="text-[#bc4747] bg-[#fbebeb] py-0.5 px-2 rounded-full">Sold Out (Crafting Soon)</span>
              ) : product.stock <= 5 ? (
                <span className="text-amber-600 bg-amber-50 py-0.5 px-2 rounded-full">Only {product.stock} items left!</span>
              ) : (
                <span className="text-emerald-700 bg-emerald-50 py-0.5 px-2 rounded-full">In Stock ({product.stock} items)</span>
              )}
            </div>

            {!isOutOfStock && (
              <div className="flex items-center gap-4">
                {/* Quantity adjuster */}
                <div className="flex items-center bg-[#fbfbf8] border border-stone-200 rounded-full px-2 py-1">
                  <button
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((q) => q - 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-stone-500 hover:text-stone-800 disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-stone-800 text-sm">{quantity}</span>
                  <button
                    disabled={quantity >= product.stock}
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-stone-500 hover:text-stone-800 disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-8 rounded-full flex-1 transition-all shadow-md shadow-brand-100 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <ShoppingBag size={18} />
                  <span>Add to Bag</span>
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-full border transition-all ${
                    isWishlisted
                      ? 'bg-[#ffeef2] text-[#bc4747] border-[#f1b7b7]'
                      : 'bg-white border-stone-200 text-stone-400 hover:text-brand-500'
                  }`}
                  title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
            )}
          </div>

          {/* Quick trust metrics */}
          <div className="bg-[#fcfbf8] rounded-2xl p-4 border border-stone-150 space-y-2.5 text-xs text-stone-500">
            <p className="flex items-center gap-2 leading-relaxed">
              <Truck size={14} className="text-[#bc4747] shrink-0" />
              <span>Free standard shipping for order subtotal above <span className="font-bold text-stone-700">Rs. 50</span>.</span>
            </p>
            <p className="flex items-center gap-2 leading-relaxed">
              <Sparkles size={14} className="text-amber-500 shrink-0" />
              <span>Every creation is individual, unique, and handcrafted by a single designer.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart Strip (SRS Requirement) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-stone-200 py-3.5 px-4 shadow-lg lg:hidden" id="sticky-add-to-cart-bar">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-stone-800 truncate">{product.name}</h4>
            <span className="text-xs font-extrabold text-[#bc4747]">Rs. {activePrice.toFixed(0)}</span>
          </div>
          {!isOutOfStock ? (
            <button
              onClick={handleAddToCart}
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 px-5 rounded-full text-xs transition-colors flex items-center gap-1"
            >
              <ShoppingBag size={14} />
              <span>Add to Bag</span>
            </button>
          ) : (
            <span className="text-[10px] bg-stone-100 text-stone-500 py-1 px-3 rounded-full font-bold uppercase tracking-wider">Out of Stock</span>
          )}
        </div>
      </div>

      {/* Related Creations Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-stone-100" id="related-creations-section">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-800 font-display">Related Stitches</h2>
            <p className="text-sm text-stone-500">Other adorable designs you might love cuddling.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Customer Reviews Anchor Block */}
      <section className="pt-8 border-t border-stone-100 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" id="reviews-anchor">
        {/* Existing Reviews list */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-800 font-display flex items-center gap-2">
              <MessageCircle className="text-stone-400 shrink-0" />
              <span>Customer Reviews ({product.reviewsCount})</span>
            </h2>
            <p className="text-sm text-stone-500 mt-1">Real reviews and thoughts from cuddle enthusiasts.</p>
          </div>

          {product.reviews.length > 0 ? (
            <div className="divide-y divide-stone-100 space-y-5">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="pt-5 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-pastel-yellow border border-stone-200 flex items-center justify-center font-bold text-stone-700 text-xs">
                        {rev.userName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-800 text-xs sm:text-sm">{rev.userName}</h4>
                        <span className="text-[10px] text-stone-400 font-semibold">{rev.date}</span>
                      </div>
                    </div>
                    <RatingStars rating={rev.rating} size={12} />
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans pl-10">{rev.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#fbfbf8] rounded-3xl p-8 text-center border border-stone-100">
              <p className="text-stone-500 font-medium">This hand-stitched creation doesn’t have any reviews yet. Be the first to tell us your thoughts!</p>
            </div>
          )}
        </div>

        {/* Add Review Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-100 shadow-sm space-y-5">
          <div>
            <h3 className="font-bold font-display text-stone-800 text-lg">Leave a Review</h3>
            <p className="text-xs text-stone-400 mt-0.5">Share your stitching experiences with our community.</p>
          </div>

          {reviewSuccess && (
            <div className="bg-pastel-green text-emerald-800 p-3 rounded-2xl text-xs font-semibold">
              Thank you! Your review has been submitted successfully and the average product score recalculated.
            </div>
          )}

          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Amina"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Rating Stars</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((stars) => (
                  <button
                    key={stars}
                    type="button"
                    onClick={() => setReviewRating(stars)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      size={20}
                      className={stars <= reviewRating ? 'text-amber-400 fill-amber-400' : 'text-stone-200'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Review Comments</label>
              <textarea
                rows={4}
                required
                placeholder="What did you love about Clover? How are the stitches?"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full bg-[#fbfbf8] border border-stone-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-400 font-sans"
              />
            </div>

            <button
              type="submit"
              className="bg-stone-800 hover:bg-stone-900 text-white font-bold py-2.5 px-6 rounded-full text-xs transition-colors w-full"
            >
              Submit Review
            </button>
          </form>
        </div>
      </section>

      {/* Recently Viewed Shelf */}
      {recentlyViewedProducts.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-stone-100" id="recently-viewed-shelf">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-800 font-display">Recently Viewed</h2>
            <p className="text-sm text-stone-500">Your cozy browsing trails so far.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentlyViewedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => setView('product-details', p.id)}
                className="bg-white rounded-2xl border border-stone-100 p-3 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col gap-2.5"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-stone-50">
                  <img src={p.images[0]} alt={p.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-800 text-xs truncate">{p.name}</h4>
                  <span className="text-xs font-bold text-stone-500">Rs. {(p.discountPrice || p.price).toFixed(0)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
