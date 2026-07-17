import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, Category, Order, CustomOrder, Coupon, Banner } from '../types';
import { BarChart3, Package, Layers, Calendar, Tag, Image, Settings, Plus, Trash2, Edit3, Save, ShieldAlert, CheckCircle, Eye, RotateCcw, RefreshCw } from 'lucide-react';

export default function AdminView() {
  const {
    products,
    categories,
    orders,
    customOrders,
    coupons,
    banners,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    deleteCategory,
    updateOrderStatus,
    updateCustomOrderStatus,
    addCoupon,
    deleteCoupon,
    updateBanner,
    setView,
    resetStoreToEmpty,
    restoreDefaultStore
  } = useShop();

  // Admin sub-tabs: 'reports' | 'products' | 'categories' | 'orders' | 'custom' | 'coupons' | 'settings' | 'practice'
  const [adminTab, setAdminTab] = useState<'reports' | 'products' | 'categories' | 'orders' | 'custom' | 'coupons' | 'settings' | 'practice'>('reports');

  // Status banners
  const [adminSuccess, setAdminSuccess] = useState<string | null>(null);

  // PRODUCT MANAGEMENT STATES
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [pName, setPName] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pCat, setPCat] = useState('amigurumi');
  const [pPrice, setPPrice] = useState(19.99);
  const [pDiscPrice, setPDiscPrice] = useState<number | undefined>(undefined);
  const [pSku, setPSku] = useState('');
  const [pStock, setPStock] = useState(10);
  const [pImages, setPImages] = useState<string[]>(['']);
  const [pTags, setPTags] = useState<string[]>([]);
  const [pVariants, setPVariants] = useState<{ name: string; options: string[] }[]>([
    { name: 'Yarn Color', options: ['Sage Green', 'Warm Cream'] }
  ]);

  // CATEGORY STATES
  const [showCatForm, setShowCatForm] = useState(false);
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catImage, setCatImage] = useState('');

  // COUPON STATES
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [cpCode, setCpCode] = useState('');
  const [cpType, setCpType] = useState<'percentage' | 'flat'>('percentage');
  const [cpValue, setCpValue] = useState(10);
  const [cpMinSpend, setCpMinSpend] = useState(20);
  const [cpDesc, setCpDesc] = useState('');

  // UTILS: Setup form for editing
  const handleEditProductClick = (prod: Product) => {
    setEditingProduct(prod);
    setPName(prod.name);
    setPDesc(prod.description);
    setPCat(prod.category);
    setPPrice(prod.price);
    setPDiscPrice(prod.discountPrice);
    setPSku(prod.sku);
    setPStock(prod.stock);
    setPImages(prod.images);
    setPTags(prod.tags);
    setPVariants(prod.variants);
    setShowProductForm(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleAddNewProductClick = () => {
    setEditingProduct(null);
    setPName('');
    setPDesc('');
    setPCat(categories.length > 0 ? categories[0].id : '');
    setPPrice(19.99);
    setPDiscPrice(undefined);
    setPSku(`AM-NEW-${Math.floor(100 + Math.random() * 900)}`);
    setPStock(10);
    setPImages(['https://images.unsplash.com/photo-1608248597481-496100c8c836?q=80&w=600']);
    setPTags(['New Arrival']);
    setPVariants([{ name: 'Yarn Color', options: ['Sage Green', 'Warm Cream'] }]);
    setShowProductForm(true);
  };

  const handleProductFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName || !pDesc || !pSku) return;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: pName,
        description: pDesc,
        category: pCat,
        price: Number(pPrice),
        discountPrice: pDiscPrice ? Number(pDiscPrice) : undefined,
        sku: pSku,
        stock: Number(pStock),
        images: pImages.filter((url) => url.trim() !== ''),
        tags: pTags,
        variants: pVariants
      });
      setAdminSuccess('Product updated in database successfully!');
    } else {
      addProduct({
        name: pName,
        description: pDesc,
        category: pCat,
        price: Number(pPrice),
        discountPrice: pDiscPrice ? Number(pDiscPrice) : undefined,
        sku: pSku,
        stock: Number(pStock),
        images: pImages.filter((url) => url.trim() !== ''),
        tags: pTags,
        variants: pVariants
      });
      setAdminSuccess('New hand-stitched product added successfully!');
    }

    // reset fields
    setShowProductForm(false);
    setEditingProduct(null);
    setTimeout(() => setAdminSuccess(null), 4000);
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName || !catDesc) return;

    addCategory({
      name: catName,
      description: catDesc,
      image: catImage || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600'
    });

    setCatName('');
    setCatDesc('');
    setCatImage('');
    setShowCatForm(false);
    setAdminSuccess('New category added successfully!');
    setTimeout(() => setAdminSuccess(null), 4000);
  };

  const handleAddCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpCode || !cpDesc) return;

    addCoupon({
      code: cpCode.toUpperCase().trim(),
      discountType: cpType,
      value: Number(cpValue),
      minSpend: Number(cpMinSpend),
      description: cpDesc
    });

    setCpCode('');
    setCpDesc('');
    setCpValue(10);
    setCpMinSpend(20);
    setShowCouponForm(false);
    setAdminSuccess('New promo discount coupon code created!');
    setTimeout(() => setAdminSuccess(null), 4000);
  };

  const handleBannerToggle = (banner: Banner) => {
    updateBanner({ ...banner, active: !banner.active });
    setAdminSuccess(`Banner status updated!`);
    setTimeout(() => setAdminSuccess(null), 3000);
  };

  // CALCULATE REPORTS DATA
  const reportMetrics = () => {
    const totalSales = orders
      .filter((o) => o.status === 'Delivered')
      .reduce((sum, o) => sum + o.total, 0);

    const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
    const pendingCustomCount = customOrders.filter((co) => co.status === 'Pending').length;
    const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 4).length;
    const outOfStockCount = products.filter((p) => p.stock === 0).length;

    return { totalSales, pendingOrdersCount, pendingCustomCount, lowStockCount, outOfStockCount };
  };

  const metrics = reportMetrics();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="admin-view-container">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-stone-800 font-display">Loops & Knots Operations</h2>
          <p className="text-xs text-stone-500 mt-1">Manage stock listings, checkout invoices, custom designs, and active promo discounts.</p>
        </div>
        <button
          onClick={() => setView('shop')}
          className="bg-stone-100 hover:bg-stone-200 text-stone-700 py-2 px-5 rounded-full text-xs font-semibold border"
        >
          View Public Shop Storefront
        </button>
      </div>

      {adminSuccess && (
        <div className="bg-pastel-green border border-emerald-200 text-emerald-800 p-3 rounded-2xl text-xs font-semibold mb-6 flex items-center gap-1.5">
          <CheckCircle size={14} className="text-emerald-600 shrink-0" />
          <span>{adminSuccess}</span>
        </div>
      )}

      {/* Primary Layout GRID: left navigation tabs + right panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation panel */}
        <aside className="lg:col-span-3 bg-white rounded-3xl p-4 lg:p-5 border border-stone-100 shadow-sm flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 scrollbar-none" id="admin-navigation-panel">
          {[
            { id: 'reports', label: 'Reports & Metrics', icon: BarChart3 },
            { id: 'products', label: 'Manage Products', icon: Package },
            { id: 'categories', label: 'Manage Categories', icon: Layers },
            { id: 'orders', label: 'Manage Orders', icon: Calendar },
            { id: 'custom', label: 'Custom Requests', icon: Eye },
            { id: 'coupons', label: 'Promo Coupons', icon: Tag },
            { id: 'settings', label: 'Banner Settings', icon: Settings },
            { id: 'practice', label: 'Practice / Reset', icon: RotateCcw }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setAdminTab(tab.id as any); setAdminSuccess(null); }}
                className={`shrink-0 text-xs sm:text-sm py-2 px-3 lg:py-2.5 lg:px-3.5 rounded-xl text-left flex items-center gap-2 lg:gap-2.5 transition-all font-semibold ${
                  isActive
                    ? 'bg-amber-100 text-amber-800 font-bold'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-amber-600' : 'text-stone-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Dynamic Area Panel */}
        <main className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-sm" id="admin-viewport">
          
          {/* REPORTS TAB */}
          {adminTab === 'reports' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h3 className="font-display font-bold text-stone-800 text-lg border-b border-stone-100 pb-2">Business Overview Reports</h3>
                <p className="text-xs text-stone-400 mt-0.5">Real-time indicators summarizing store performance metrics.</p>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Completed Sales</span>
                  <p className="text-xl sm:text-2xl font-extrabold text-emerald-900">${metrics.totalSales.toFixed(2)}</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Pending Orders</span>
                  <p className="text-xl sm:text-2xl font-extrabold text-blue-900">{metrics.pendingOrdersCount} Invoices</p>
                </div>
                <div className="bg-purple-50 border border-purple-100 p-5 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">Custom Requests</span>
                  <p className="text-xl sm:text-2xl font-extrabold text-purple-900">{metrics.pendingCustomCount} Pending</p>
                </div>
                <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Low Stock/Empty</span>
                  <p className="text-xl sm:text-2xl font-extrabold text-amber-900">{metrics.lowStockCount + metrics.outOfStockCount} Items</p>
                </div>
              </div>

              {/* Visual Simulated Bar Chart */}
              <div className="bg-[#fbfbf8] border border-stone-150 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-baseline border-b border-stone-50 pb-2">
                  <span className="text-xs font-bold text-stone-700 block uppercase tracking-wider">Weekly Stitch Volume (Completed Orders)</span>
                  <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded-full text-stone-400 font-semibold">Updated Live</span>
                </div>
                
                {/* Graphics bars */}
                <div className="h-44 flex gap-4 items-end pt-6 font-mono text-[9px] text-stone-400 select-none">
                  {[
                    { label: 'Mon', height: 'h-1/5', val: 'Rs. 45' },
                    { label: 'Tue', height: 'h-2/5', val: 'Rs. 90' },
                    { label: 'Wed', height: 'h-1/2', val: 'Rs. 110' },
                    { label: 'Thu', height: 'h-3/5', val: 'Rs. 135' },
                    { label: 'Fri', height: 'h-4/5', val: 'Rs. 180' },
                    { label: 'Sat', height: 'h-full', val: 'Rs. 225' },
                    { label: 'Sun', height: 'h-5/6', val: 'Rs. 200' }
                  ].map((bar) => (
                    <div key={bar.label} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-stone-800 text-white font-semibold py-0.5 px-1.5 rounded text-[8px]">{bar.val}</span>
                      <div className={`w-full bg-[#bc4747] hover:bg-[#d46363] rounded-t-lg transition-all shadow-inner ${bar.height}`} />
                      <span className="font-sans font-bold">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PRODUCT LIST & ADD/EDIT DOCK */}
          {adminTab === 'products' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-baseline border-b border-stone-100 pb-2">
                <div>
                  <h3 className="font-display font-bold text-stone-800 text-lg">Inventory Products</h3>
                  <p className="text-xs text-stone-400 mt-0.5">Create, edit, or delete listings in the public storefront.</p>
                </div>
                <button
                  onClick={handleAddNewProductClick}
                  className="bg-[#bc4747] hover:bg-[#bc4747]/90 text-white rounded-full py-1.5 px-4 text-xs font-bold flex items-center gap-1 shrink-0"
                >
                  <Plus size={14} />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Product Add/Edit Form Form */}
              {showProductForm && (
                <form onSubmit={handleProductFormSubmit} className="bg-[#fcfbf8] border border-stone-200 p-5 rounded-3xl space-y-4 animate-fadeIn font-sans">
                  <h4 className="text-xs font-extrabold text-stone-800 block uppercase tracking-wider">
                    {editingProduct ? `Edit ${editingProduct.name}` : 'Craft New Product Listing'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Creation Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Daisy Cardigan"
                        value={pName}
                        onChange={(e) => setPName(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-xl p-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">SKU Code *</label>
                        <input
                          type="text"
                          required
                          value={pSku}
                          onChange={(e) => setPSku(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-2 text-xs focus:outline-none uppercase"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Category *</label>
                        {categories.length > 0 ? (
                          <select
                            value={pCat}
                            onChange={(e) => setPCat(e.target.value)}
                            className="w-full bg-white border border-stone-200 rounded-xl p-2 text-xs focus:outline-none"
                          >
                            {categories.map((c) => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        ) : (
                          <div className="bg-amber-50 text-amber-800 text-[10px] p-2 rounded-xl border border-amber-200 font-bold flex flex-col leading-tight">
                            <span>No categories yet!</span>
                            <span className="font-normal text-[9px] text-amber-700 mt-0.5">Please add a category under "Store Categories" first.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Base Price (Rs.) *</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={pPrice}
                        onChange={(e) => setPPrice(Number(e.target.value))}
                        className="w-full bg-white border border-stone-200 rounded-xl p-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Discount Price (Rs.)</label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Optional"
                        value={pDiscPrice || ''}
                        onChange={(e) => setPDiscPrice(e.target.value ? Number(e.target.value) : undefined)}
                        className="w-full bg-white border border-stone-200 rounded-xl p-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Stock Count *</label>
                      <input
                        type="number"
                        required
                        value={pStock}
                        onChange={(e) => setPStock(Number(e.target.value))}
                        className="w-full bg-white border border-stone-200 rounded-xl p-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Detail Copy *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Write detailed specifications..."
                      value={pDesc}
                      onChange={(e) => setPDesc(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl p-2 text-xs focus:outline-none font-sans"
                    />
                  </div>

                  {/* Image Presets and URL (SRS Requirement: Multiple images) */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Media Image URL *</label>
                    <input
                      type="text"
                      required
                      placeholder="Paste main image URL"
                      value={pImages[0]}
                      onChange={(e) => {
                        const updated = [...pImages];
                        updated[0] = e.target.value;
                        setPImages(updated);
                      }}
                      className="w-full bg-white border border-stone-200 rounded-xl p-2 text-xs focus:outline-none mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Secondary Image URL (Optional)"
                      value={pImages[1] || ''}
                      onChange={(e) => {
                        const updated = [...pImages];
                        updated[1] = e.target.value;
                        setPImages(updated);
                      }}
                      className="w-full bg-white border border-stone-200 rounded-xl p-2 text-xs focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-2.5 justify-end pt-2">
                    <button type="button" onClick={() => { setShowProductForm(false); setEditingProduct(null); }} className="text-xs font-semibold text-stone-500 py-1.5 px-3">Cancel</button>
                    <button type="submit" className="bg-[#bc4747] text-white text-xs font-bold py-1.5 px-4 rounded-lg flex items-center gap-1">
                      <Save size={12} />
                      <span>{editingProduct ? 'Save Product' : 'Add to Stock'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Table of products */}
              <div className="overflow-x-auto border border-stone-150 rounded-2xl">
                <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#fbfbf8] border-b border-stone-150 text-stone-400 font-bold uppercase text-[10px] tracking-wider select-none">
                      <th className="p-4">Stitch Item</th>
                      <th className="p-4">SKU</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50/50">
                        <td className="p-4 flex items-center gap-2.5">
                          <img src={p.images[0]} alt="" referrerPolicy="no-referrer" className="w-9 h-9 rounded-lg object-cover bg-stone-50 border shrink-0" />
                          <div>
                            <p className="font-bold text-stone-800 line-clamp-1">{p.name}</p>
                            <p className="text-[10px] text-stone-400 font-semibold uppercase">{p.category}</p>
                          </div>
                        </td>
                        <td className="p-4 font-mono font-bold text-stone-500 uppercase">{p.sku}</td>
                        <td className="p-4 font-bold text-[#bc4747]">
                          ${(p.discountPrice || p.price).toFixed(2)}
                        </td>
                        <td className="p-4">
                          {p.stock === 0 ? (
                            <span className="text-red-600 bg-red-50 py-0.5 px-2 rounded-full font-bold text-[10px]">Empty</span>
                          ) : p.stock <= 4 ? (
                            <span className="text-amber-600 bg-amber-50 py-0.5 px-2 rounded-full font-bold text-[10px]">Low ({p.stock})</span>
                          ) : (
                            <span className="text-emerald-700 bg-emerald-50 py-0.5 px-2 rounded-full font-bold text-[10px]">In ({p.stock})</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleEditProductClick(p)}
                              className="p-1.5 text-stone-500 hover:text-amber-600 hover:bg-stone-100 rounded-lg"
                              title="Edit"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MANAGE CATEGORIES TAB */}
          {adminTab === 'categories' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-baseline border-b border-stone-100 pb-2">
                <div>
                  <h3 className="font-display font-bold text-stone-800 text-lg">Store Categories</h3>
                  <p className="text-xs text-stone-400 mt-0.5">Define core groupings for products layout.</p>
                </div>
                <button
                  onClick={() => setShowCatForm(!showCatForm)}
                  className="bg-[#bc4747] hover:bg-[#bc4747]/90 text-white rounded-full py-1.5 px-4 text-xs font-bold flex items-center gap-1 shrink-0"
                >
                  <Plus size={14} />
                  <span>Add Category</span>
                </button>
              </div>

              {/* Add category form */}
              {showCatForm && (
                <form onSubmit={handleAddCategorySubmit} className="bg-[#fcfbf8] border border-stone-200 p-4 rounded-2xl space-y-4 animate-fadeIn font-sans">
                  <span className="text-xs font-bold text-stone-800 block uppercase tracking-wider">Create New Grouping</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Name *</label>
                      <input
                        type="text"
                        required
                        value={catName}
                        onChange={(e) => setCatName(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Cover Image URL</label>
                      <input
                        type="text"
                        placeholder="Optional"
                        value={catImage}
                        onChange={(e) => setCatImage(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Brief Description *</label>
                    <input
                      type="text"
                      required
                      value={catDesc}
                      onChange={(e) => setCatDesc(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button type="button" onClick={() => setShowCatForm(false)} className="text-xs font-semibold text-stone-500 py-1.5 px-3">Cancel</button>
                    <button type="submit" className="bg-[#bc4747] text-white text-xs font-bold py-1.5 px-4 rounded-lg">Save Grouping</button>
                  </div>
                </form>
              )}

              {/* Grid lists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                {categories.map((c) => (
                  <div key={c.id} className="border border-stone-150 p-4 rounded-2xl flex gap-3 shadow-sm relative group items-center">
                    <img src={c.image} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-extrabold text-stone-800 text-sm leading-tight">{c.name}</h4>
                      <p className="text-[10px] text-stone-400 font-semibold">{c.count} Active Creations</p>
                      <p className="text-[10px] text-stone-500 mt-1 truncate font-sans">{c.description}</p>
                    </div>
                    <button
                      onClick={() => deleteCategory(c.id)}
                      className="text-stone-300 hover:text-red-500 p-2 rounded-full absolute top-2 right-2 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MANAGE STANDARD ORDERS TAB */}
          {adminTab === 'orders' && (
            <div className="space-y-6 animate-fadeIn font-sans">
              <div>
                <h3 className="font-display font-bold text-stone-800 text-lg border-b border-stone-100 pb-2">Checkout Invoices</h3>
                <p className="text-xs text-stone-400 mt-0.5">Control shipping fulfillment and update client order statuses.</p>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((o) => (
                    <div key={o.id} className="border border-stone-150 rounded-2xl p-4 sm:p-5 space-y-4 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-50 pb-3">
                        <div>
                          <p className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">Invoice Reference</p>
                          <h4 className="font-display font-bold text-sm text-stone-800">{o.id}</h4>
                        </div>
                        <div>
                          <p className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">Client Details</p>
                          <p className="font-semibold text-stone-700">{o.customerName} ({o.phone})</p>
                        </div>
                        {/* Status dropdown selector */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-stone-400 uppercase font-bold">Status:</span>
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                            className="bg-[#fbfbf8] border border-stone-200 rounded-lg p-1.5 font-bold focus:outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {/* Items Row */}
                      <div className="space-y-2">
                        {o.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between font-medium">
                            <span>- {it.name} (Qty: {it.quantity})</span>
                            <span className="font-bold text-stone-700">${(it.price * it.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-stone-50 pt-2 flex justify-between font-bold text-stone-500">
                        <span>Paid via {o.paymentMethod}</span>
                        <span className="text-brand-600 font-extrabold text-sm">Grand Total: ${o.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#fbfbf8] rounded-2xl p-8 text-center border">
                  <p className="text-stone-400 font-medium">No orders recorded in database yet.</p>
                </div>
              )}
            </div>
          )}

          {/* MANAGE CUSTOM ORDERS TAB */}
          {adminTab === 'custom' && (
            <div className="space-y-6 animate-fadeIn font-sans">
              <div>
                <h3 className="font-display font-bold text-stone-800 text-lg border-b border-stone-100 pb-2">Custom Stitch Requests</h3>
                <p className="text-xs text-stone-400 mt-0.5">Evaluate custom color designs, files uploads, and quotes.</p>
              </div>

              {customOrders.length > 0 ? (
                <div className="space-y-6">
                  {customOrders.map((co) => (
                    <div key={co.id} className="border border-stone-150 rounded-2xl p-4 sm:p-5 space-y-4 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-50 pb-3">
                        <div>
                          <p className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">Bespoke ID</p>
                          <h4 className="font-display font-bold text-sm text-stone-800">{co.id}</h4>
                        </div>
                        <div>
                          <p className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">Customer</p>
                          <p className="font-semibold text-stone-700">{co.customerName} ({co.email})</p>
                        </div>
                        {/* Status dropdown */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-stone-400 uppercase font-bold">Status:</span>
                          <select
                            value={co.status}
                            onChange={(e) => updateCustomOrderStatus(co.id, e.target.value as any)}
                            className="bg-[#fbfbf8] border border-stone-200 rounded-lg p-1.5 font-bold focus:outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 leading-relaxed font-sans">
                        <div className="sm:col-span-8 space-y-1.5">
                          <p>🎨 <strong>Colors chosen:</strong> {co.colorPreference}</p>
                          <p>📏 <strong>Dimensions:</strong> {co.sizePreference}</p>
                          <p>📦 <strong>Quantity:</strong> {co.quantity}</p>
                          <p>📅 <strong>Due date:</strong> {co.deliveryDate}</p>
                          <p>📝 <strong>Description notes:</strong> {co.notes}</p>
                        </div>
                        {co.referenceImage && (
                          <div className="sm:col-span-4">
                            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block mb-1">Sketch Reference:</span>
                            <div className="w-24 h-24 rounded-xl overflow-hidden border">
                              <img src={co.referenceImage} alt="" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#fbfbf8] rounded-2xl p-8 text-center border">
                  <p className="text-stone-400 font-medium">No custom requests recorded yet.</p>
                </div>
              )}
            </div>
          )}

          {/* MANAGE DISCOUNT COUPONS TAB */}
          {adminTab === 'coupons' && (
            <div className="space-y-6 animate-fadeIn font-sans text-xs">
              <div className="flex justify-between items-baseline border-b border-stone-100 pb-2">
                <div>
                  <h3 className="font-display font-bold text-stone-800 text-lg">Promo Discount Coupons</h3>
                  <p className="text-xs text-stone-400 mt-0.5">Activate or deactivate checkout coupon codes.</p>
                </div>
                <button
                  onClick={() => setShowCouponForm(!showCouponForm)}
                  className="bg-[#bc4747] hover:bg-[#bc4747]/90 text-white rounded-full py-1.5 px-4 text-xs font-bold flex items-center gap-1 shrink-0"
                >
                  <Plus size={14} />
                  <span>Create Coupon</span>
                </button>
              </div>

              {/* Form to Create Coupon */}
              {showCouponForm && (
                <form onSubmit={handleAddCouponSubmit} className="bg-[#fcfbf8] border border-stone-200 p-4 rounded-2xl space-y-4 animate-fadeIn">
                  <span className="text-xs font-bold text-stone-800 block uppercase tracking-wider">Configure Coupon</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Coupon Code *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. FIFTYOFF"
                        value={cpCode}
                        onChange={(e) => setCpCode(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs focus:outline-none uppercase font-bold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Type *</label>
                        <select
                          value={cpType}
                          onChange={(e) => setCpType(e.target.value as any)}
                          className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs focus:outline-none"
                        >
                          <option value="percentage">Percentage (%)</option>
                          <option value="flat">Flat (Rs.)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Value *</label>
                        <input
                          type="number"
                          required
                          value={cpValue}
                          onChange={(e) => setCpValue(Number(e.target.value))}
                          className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Min Spend Required (Rs.) *</label>
                      <input
                        type="number"
                        required
                        value={cpMinSpend}
                        onChange={(e) => setCpMinSpend(Number(e.target.value))}
                        className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Coupon Description *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 50% discount on orders"
                        value={cpDesc}
                        onChange={(e) => setCpDesc(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button type="button" onClick={() => setShowCouponForm(false)} className="text-xs font-semibold text-stone-500 py-1.5 px-3">Cancel</button>
                    <button type="submit" className="bg-[#bc4747] text-white text-xs font-bold py-1.5 px-4 rounded-lg">Save Coupon</button>
                  </div>
                </form>
              )}

              {/* Coupon checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coupons.map((cp) => (
                  <div key={cp.code} className="border border-stone-150 p-4 rounded-2xl flex justify-between items-center shadow-sm relative">
                    <div>
                      <h4 className="font-bold text-stone-800 text-sm font-mono tracking-wide">{cp.code}</h4>
                      <p className="text-[10px] text-stone-400 mt-0.5">{cp.description}</p>
                      <p className="text-[9px] text-[#bc4747] font-bold uppercase mt-1">Min purchase: ${cp.minSpend}</p>
                    </div>
                    <button
                      onClick={() => deleteCoupon(cp.code)}
                      className="text-stone-300 hover:text-red-500 p-2 rounded-full absolute top-2 right-2 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HOME SETTINGS & BANNERS */}
          {adminTab === 'settings' && (
            <div className="space-y-6 animate-fadeIn font-sans text-xs">
              <div>
                <h3 className="font-display font-bold text-stone-800 text-lg border-b border-stone-100 pb-2">Hero Slider Banners</h3>
                <p className="text-xs text-stone-400 mt-0.5">Choose which advertising sliders are rendered in the homepage carousel.</p>
              </div>

              <div className="space-y-4">
                {banners.map((b) => (
                  <div key={b.id} className="border border-stone-150 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 justify-between items-center shadow-sm">
                    <img src={b.image} alt="" className="w-24 h-12 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-stone-800 text-sm truncate">{b.title}</h4>
                      <p className="text-[10px] text-stone-400 mt-0.5 truncate">{b.subtitle}</p>
                      <span className="text-[10px] text-stone-500">Redirect Link: <strong>{b.link}</strong></span>
                    </div>
                    {/* Toggle button */}
                    <button
                      onClick={() => handleBannerToggle(b)}
                      className={`py-1.5 px-4 rounded-full font-bold transition-colors ${
                        b.active
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-stone-50 text-stone-400 border border-stone-200'
                      }`}
                    >
                      {b.active ? 'Active' : 'Disabled'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRACTICE MODE & RESET STORE */}
          {adminTab === 'practice' && (
            <div className="space-y-6 animate-fadeIn font-sans text-xs">
              <div>
                <h3 className="font-display font-bold text-stone-800 text-lg border-b border-stone-100 pb-2">Practice Mode & Database Reset</h3>
                <p className="text-xs text-stone-400 mt-0.5">Start from scratch to learn how to add products, categories, coupons, and orders yourself.</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3">
                <div className="flex gap-2.5 items-start text-amber-800">
                  <ShieldAlert size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Clear Slate Learning</h4>
                    <p className="text-xs text-amber-700/90 mt-1 leading-relaxed">
                      If you want to practice building your store completely from scratch, you can clear all pre-loaded content. This will empty all products, categories, and coupons so you can practice entering your own titles, descriptions, pricing, and variant options!
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Reset to Empty Card */}
                <div className="border border-red-150 rounded-2xl p-5 bg-white space-y-4 shadow-sm">
                  <div className="space-y-1">
                    <h4 className="font-bold text-stone-800 text-sm flex items-center gap-1.5 text-red-600">
                      <Trash2 size={16} />
                      <span>Option 1: Clear All Data</span>
                    </h4>
                    <p className="text-stone-400 text-[11px] leading-relaxed">
                      This removes all products, categories, active coupons, and history records from the store database so you can start with an absolute 100% empty canvas.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm("Are you absolutely sure you want to delete all products and categories? This cannot be undone unless you restore defaults.")) {
                        resetStoreToEmpty();
                        setAdminSuccess("The store has been cleared successfully! All listings, categories, and coupon codes are deleted. You now have a clean canvas.");
                        setTimeout(() => setAdminSuccess(null), 5000);
                      }
                    }}
                    className="w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl border border-red-200 transition-colors text-center"
                  >
                    Yes, Start with Blank Slate
                  </button>
                </div>

                {/* Restore Sample Data Card */}
                <div className="border border-stone-150 rounded-2xl p-5 bg-white space-y-4 shadow-sm">
                  <div className="space-y-1">
                    <h4 className="font-bold text-stone-800 text-sm flex items-center gap-1.5 text-amber-700">
                      <RotateCcw size={16} className="text-amber-600" />
                      <span>Option 2: Restore Sample Data</span>
                    </h4>
                    <p className="text-stone-400 text-[11px] leading-relaxed">
                      Restore all default cozy crochet plushies, tote bags, categories, and promotional coupons back to the store so you can check reference entries anytime.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      restoreDefaultStore();
                      setAdminSuccess("Default crochet sample data has been successfully restored! All pre-loaded plushies and categories are back.");
                      setTimeout(() => setAdminSuccess(null), 5000);
                    }}
                    className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-xl border border-amber-200 transition-colors text-center"
                  >
                    Restore Cozy Sample Data
                  </button>
                </div>

              </div>

              {/* Learning guide list */}
              <div className="bg-stone-50 border border-stone-100 rounded-2xl p-5 space-y-3">
                <h4 className="font-bold text-stone-700 text-xs uppercase tracking-wider">How to Practice Starting from Scratch:</h4>
                <ol className="list-decimal pl-4 space-y-1.5 text-stone-500 leading-relaxed text-[11px]">
                  <li>Click the <strong className="text-red-600">"Yes, Start with Blank Slate"</strong> button above.</li>
                  <li>Navigate to the <strong className="text-stone-700">Manage Categories</strong> tab in this sidebar first. Create at least one category (e.g. <em>"Plushies"</em> or <em>"Bags"</em>).</li>
                  <li>Navigate to the <strong className="text-stone-700">Manage Products</strong> tab and click <strong className="text-stone-700">"Add Product"</strong>. Type the details, specify stock levels, add your custom image URLs (or use Unsplash pictures!), and assign it to your newly created category!</li>
                  <li>Navigate to the <strong className="text-stone-700">Promo Coupons</strong> tab to set up a discount code like <em>"HELLO50"</em>.</li>
                  <li>Click the top right <strong className="text-[#bc4747] font-bold">"View Public Shop Storefront"</strong> button to browse and purchase your newly hand-crafted inventory!</li>
                </ol>
              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}
