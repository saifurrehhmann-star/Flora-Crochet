import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, Search, RotateCcw, ChevronDown, Check } from 'lucide-react';

export default function ShopView() {
  const {
    products,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setView
  } = useShop();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(selectedCategoryId);
  const [priceRange, setPriceRange] = useState<number>(100);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('default');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Sync category filter if changed from header/home
  useMemo(() => {
    setSelectedCategory(selectedCategoryId);
  }, [selectedCategoryId]);

  // Extract all available colors from product variants
  const allColors = useMemo(() => {
    const colors = new Set<string>();
    products.forEach((p) => {
      p.variants.forEach((v) => {
        if (v.name.toLowerCase().includes('color') || v.name.toLowerCase().includes('mix')) {
          v.options.forEach((opt) => colors.add(opt));
        }
      });
    });
    return Array.from(colors);
  }, [products]);

  // Handle resets
  const handleResetFilters = () => {
    setSelectedCategory(null);
    setPriceRange(100);
    setSelectedTag(null);
    setSelectedColor(null);
    setSortBy('default');
    setSearchQuery('');
    setView('shop', null, null);
  };

  // Filter and Sort core logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price
    result = result.filter((p) => {
      const activePrice = p.discountPrice || p.price;
      return activePrice <= priceRange;
    });

    // Tag
    if (selectedTag) {
      result = result.filter((p) => p.tags.includes(selectedTag));
    }

    // Color
    if (selectedColor) {
      result = result.filter((p) =>
        p.variants.some(
          (v) =>
            (v.name.toLowerCase().includes('color') || v.name.toLowerCase().includes('mix')) &&
            v.options.includes(selectedColor)
        )
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => {
        const pA = a.discountPrice || a.price;
        const pB = b.discountPrice || b.price;
        return pA - pB;
      });
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => {
        const pA = a.discountPrice || a.price;
        const pB = b.discountPrice || b.price;
        return pB - pA;
      });
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => {
        const hasA = a.tags.includes('New Arrival') ? 1 : 0;
        const hasB = b.tags.includes('New Arrival') ? 1 : 0;
        return hasB - hasA;
      });
    }

    return result;
  }, [products, searchQuery, selectedCategory, priceRange, selectedTag, selectedColor, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="shop-view-container">
      
      {/* Banner / Title Header */}
      <div className="bg-[#fcf7ee] border border-[#f5ece0] rounded-[32px] p-6 sm:p-10 text-center space-y-2 mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-850 font-display">Crochet Emporium</h2>
        <p className="text-sm text-stone-500 max-w-lg mx-auto">
          Explore our collection of hand-stitched wonders. Clean work, beautiful design, and absolute cuddly perfection.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* SIDEBAR FILTERS (DESKTOP) */}
        <aside className="w-full lg:w-64 bg-white rounded-3xl p-6 border border-stone-100 shadow-sm sticky top-28 hidden lg:block space-y-6" id="desktop-filters">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-bold font-display text-stone-800 flex items-center gap-1.5 text-base">
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-0.5"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>

          {/* Categories Filter */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Categories</h4>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-sm text-left py-1 px-2.5 rounded-lg transition-colors font-medium ${
                  !selectedCategory ? 'bg-pastel-pink text-brand-700 font-bold' : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-sm text-left py-1.5 px-2.5 rounded-lg transition-colors font-medium flex items-center justify-between ${
                    selectedCategory === cat.id ? 'bg-pastel-pink text-brand-700 font-bold' : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded-full font-bold">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2.5 pt-4 border-t border-stone-50">
            <div className="flex justify-between items-baseline">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Max Budget</h4>
              <span className="text-sm font-extrabold text-brand-600">Rs. {priceRange}</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-[#bc4747]"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-bold">
              <span>Rs. 10</span>
              <span>Rs. 100</span>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="space-y-2.5 pt-4 border-t border-stone-50">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Creation Tag</h4>
            <div className="flex flex-wrap gap-1.5">
              {['Featured', 'Best Seller', 'New Arrival', 'Sale'].map((tag) => {
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(isActive ? null : tag)}
                    className={`text-xs py-1 px-3 rounded-full border transition-all ${
                      isActive 
                        ? 'bg-[#bc4747] text-white border-brand-500 font-semibold shadow-sm' 
                        : 'bg-white text-stone-600 border-stone-200 hover:border-brand-300'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colors Filter */}
          <div className="space-y-2.5 pt-4 border-t border-stone-50">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Stitch Colors</h4>
            <div className="flex flex-wrap gap-1.5">
              {allColors.map((color) => {
                const isActive = selectedColor === color;
                return (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(isActive ? null : color)}
                    className={`text-xs py-1 px-2.5 rounded-lg border transition-all flex items-center gap-1.5 font-medium ${
                      isActive 
                        ? 'bg-pastel-pink text-brand-700 border-brand-300 font-semibold' 
                        : 'bg-white text-stone-600 border-stone-200 hover:border-brand-200'
                    }`}
                  >
                    {isActive && <Check size={10} className="text-brand-600 shrink-0" />}
                    <span>{color}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* MAIN PRODUCT VIEWPORT */}
        <main className="flex-1 space-y-6 w-full" id="shop-main-content">
          
          {/* Controls Bar (Search Input, Sort, Mobile Filter toggle) */}
          <div className="bg-white rounded-2xl p-4 border border-stone-100 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search feedback */}
            <div className="text-sm text-stone-500 font-medium w-full sm:w-auto">
              Showing <span className="font-extrabold text-stone-800">{filteredProducts.length}</span> charming creations
              {searchQuery && (
                <span> for &ldquo;<span className="text-[#bc4747] font-semibold">{searchQuery}</span>&rdquo;</span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {/* Mobile filter button */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-1.5 bg-[#fbfbf8] hover:bg-stone-100 border border-stone-200 text-stone-700 font-semibold py-2 px-4 rounded-xl text-xs sm:text-sm"
              >
                <SlidersHorizontal size={14} />
                <span>Filters</span>
              </button>

              {/* Sort By Select */}
              <div className="relative flex items-center gap-1.5 bg-[#fbfbf8] border border-stone-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-700">
                <span className="text-stone-400 font-semibold shrink-0">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-medium focus:outline-none cursor-pointer pr-1"
                >
                  <option value="default">Best Match</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Reviews</option>
                  <option value="newest">New Stitches</option>
                </select>
                <ChevronDown size={14} className="text-stone-400 pointer-events-none shrink-0" />
              </div>
            </div>
          </div>

          {/* MOBILE FILTER ACCORDION */}
          {showMobileFilters && (
            <div className="lg:hidden bg-[#FAF9F5] rounded-3xl p-5 border border-stone-200/80 shadow-md space-y-5 animate-fadeIn">
              <div className="flex justify-between items-center pb-2 border-b border-stone-200/50">
                <h4 className="font-bold text-stone-850 font-display text-sm flex items-center gap-1.5">
                  <SlidersHorizontal size={14} />
                  <span>Shop Filters</span>
                </h4>
                <button 
                  onClick={handleResetFilters} 
                  className="text-xs text-brand-600 font-bold hover:text-brand-700"
                >
                  Reset All
                </button>
              </div>
 
              {/* Categories */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Categories</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`text-xs py-1.5 px-3 rounded-xl font-medium transition-all ${
                      !selectedCategory ? 'bg-brand-500 text-white font-bold' : 'bg-white text-stone-600 border border-stone-200'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-xs py-1.5 px-3 rounded-xl font-medium transition-all ${
                        selectedCategory === cat.id ? 'bg-brand-500 text-white font-bold' : 'bg-white text-stone-600 border border-stone-200'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
 
              {/* Prices */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-stone-400 text-[10px]">Max Budget</span>
                  <span className="font-extrabold text-brand-600">Rs. {priceRange}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#bc4747] h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
 
              {/* Tags */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Creation Tag</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Featured', 'Best Seller', 'New Arrival', 'Sale'].map((tag) => {
                    const isActive = selectedTag === tag;
                    return (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(isActive ? null : tag)}
                        className={`text-xs py-1.5 px-3 rounded-xl border transition-all ${
                          isActive ? 'bg-[#bc4747] text-white border-[#bc4747]' : 'bg-white text-stone-600 border-stone-200'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors Filter */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Stitch Colors</span>
                <div className="flex flex-wrap gap-1.5">
                  {allColors.map((color) => {
                    const isActive = selectedColor === color;
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(isActive ? null : color)}
                        className={`text-xs py-1.5 px-2.5 rounded-xl border transition-all flex items-center gap-1.5 font-medium ${
                          isActive 
                            ? 'bg-brand-500 text-white border-brand-500 font-semibold' 
                            : 'bg-white text-stone-600 border-stone-200'
                        }`}
                      >
                        {isActive && <Check size={10} className="text-white shrink-0" />}
                        <span>{color}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Apply & Close button */}
              <div className="pt-2">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full py-2.5 bg-stone-850 hover:bg-stone-950 text-white text-xs font-bold rounded-xl transition-colors text-center"
                >
                  Apply & Close Filters
                </button>
              </div>
            </div>
          )}

          {/* Product Grid */}
          {products.length === 0 ? (
            <div className="bg-[#FAF9F5] rounded-3xl p-12 text-center border border-stone-200/60 shadow-sm space-y-4 flex-1">
              <span className="text-4xl animate-pulse inline-block">🧶</span>
              <div className="space-y-1 font-sans">
                <h3 className="font-display font-extrabold text-stone-850 text-lg">Your Practice Store is Empty!</h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                  You have cleared the store to practice adding items from scratch. Go to the Admin Portal to add your custom categories, plushies, and custom crochet masterpieces!
                </p>
              </div>
              <button
                onClick={() => setView('admin')}
                className="bg-[#bc4747] hover:bg-[#a33939] text-white font-bold py-2.5 px-6 rounded-full text-xs transition-all shadow-sm"
              >
                Go to Admin Portal
              </button>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-100 shadow-sm space-y-4 flex-1">
              <span className="text-4xl">🧶</span>
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-stone-800 text-lg">No Stitches Found</h3>
                <p className="text-sm text-stone-500 max-w-sm mx-auto">
                  We don’t have any creations matching those filters right now. Let us custom-craft it for you instead!
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="bg-stone-800 hover:bg-stone-900 text-white font-semibold py-2 px-6 rounded-full text-xs transition-colors"
              >
                Clear All Filters
              </button>
              <button
                onClick={() => setView('custom-order')}
                className="bg-brand-500 hover:bg-brand-600 text-white font-semibold py-2 px-6 rounded-full text-xs transition-colors ml-3"
              >
                Order Custom Creation
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
