import React from 'react';
import { Heart, ArrowRight, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import RatingStars from './RatingStars';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  key?: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { setView, wishlist, toggleWishlist, addCartItem } = useShop();

  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    
    // Select default variants
    const defaultVariants: { [key: string]: string } = {};
    product.variants.forEach((v) => {
      if (v.options.length > 0) {
        defaultVariants[v.name] = v.options[0];
      }
    });

    addCartItem(product, 1, defaultVariants);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={() => setView('product-details', product.id)}
      className="bg-white rounded-3xl border border-stone-100/80 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col h-full"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square overflow-hidden bg-[#fdfaf5] select-none">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.discountPrice && (
            <span className="bg-[#bc4747] text-white text-[10px] font-bold py-1 px-2 rounded-full uppercase tracking-wider">
              {discountPercent}% OFF
            </span>
          )}
          {product.tags.map((tag) => {
            if (tag === 'Sale' && product.discountPrice) return null; // avoid duplication
            let badgeBg = 'bg-stone-800 text-white';
            if (tag === 'Best Seller') badgeBg = 'bg-[#d46363] text-[#ffeef2]';
            if (tag === 'New Arrival') badgeBg = 'bg-amber-500 text-stone-900';
            if (tag === 'Featured') badgeBg = 'bg-[#ece3d3] text-stone-800';

            return (
              <span key={tag} className={`${badgeBg} text-[9px] font-extrabold py-0.5 px-2 rounded-full uppercase tracking-wider`}>
                {tag}
              </span>
            );
          })}
        </div>

        {/* Wishlist Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full shadow-sm hover:scale-110 transition-transform ${
            isWishlisted 
              ? 'bg-[#ffeef2] text-[#bc4747]' 
              : 'bg-white text-stone-400 hover:text-brand-500'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          id={`wishlist-toggle-${product.id}`}
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} className="transition-all" />
        </button>

        {/* Product Image (Zoom Effect on Hover) */}
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Out of stock cover overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-stone-800 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-3 rounded-full shadow-sm">
              Crafting Soon (Sold Out)
            </span>
          </div>
        )}
      </div>

      {/* Details Box */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between" id={`product-info-${product.id}`}>
        <div>
          {/* Category */}
          <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
            {product.category.replace('-', ' ')}
          </span>

          {/* Title */}
          <h3 className="font-display font-bold text-stone-800 text-sm sm:text-base line-clamp-1 group-hover:text-brand-600 transition-colors mt-0.5">
            {product.name}
          </h3>

          {/* Ratings & Count */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <RatingStars rating={product.rating} size={13} />
            <span className="text-xs text-stone-400 font-medium">({product.reviewsCount})</span>
          </div>

          {/* Low stock warning */}
          {isLowStock && (
            <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wide mt-1.5">
              ⚠️ Only {product.stock} available in stock!
            </p>
          )}
        </div>

        {/* Price & Action Button */}
        <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-stone-50">
          <div>
            {product.discountPrice ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-extrabold text-[#bc4747]">
                  Rs. {product.discountPrice.toFixed(0)}
                </span>
                <span className="text-xs text-stone-400 line-through">
                  Rs. {product.price.toFixed(0)}
                </span>
              </div>
            ) : (
              <span className="text-base font-extrabold text-stone-800">
                Rs. {product.price.toFixed(0)}
              </span>
            )}
          </div>

          {/* Add to Cart or View Details trigger */}
          {!isOutOfStock ? (
            <button
              onClick={handleQuickAdd}
              className="bg-brand-100 text-[#bc4747] hover:bg-[#bc4747] hover:text-white p-2.5 rounded-full transition-all duration-300"
              title="Quick Add to Bag with Default Variants"
              id={`quick-add-${product.id}`}
            >
              <ShoppingCart size={15} />
            </button>
          ) : (
            <span className="text-xs text-stone-400 font-medium flex items-center gap-0.5">
              View <ArrowRight size={12} />
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
