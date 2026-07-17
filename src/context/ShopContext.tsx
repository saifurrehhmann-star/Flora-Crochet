import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, CartItem, User, Order, CustomOrder, Coupon, Address, Review, Banner } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_COUPONS, INITIAL_BANNERS } from '../data/initialData';

interface ShopContextType {
  currentView: string;
  setView: (view: string, productId?: string | null, categoryId?: string | null) => void;
  selectedProductId: string | null;
  selectedCategoryId: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Data lists
  products: Product[];
  categories: Category[];
  banners: Banner[];
  coupons: Coupon[];
  
  // Cart, Wishlist, Recently Viewed
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  addCartItem: (product: Product, quantity: number, selectedVariant: { [key: string]: string }) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeCartItem: (cartItemId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  addToRecentlyViewed: (productId: string) => void;
  
  // Coupon State
  activeCoupon: Coupon | null;
  couponError: string | null;
  applyCouponCode: (code: string) => boolean;
  removeCoupon: () => void;
  
  // Custom Order System
  customOrders: CustomOrder[];
  addCustomOrder: (order: Omit<CustomOrder, 'id' | 'status' | 'date'>) => void;
  
  // Authentication & Users
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, phone: string, isAdmin: boolean) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  updateUserAddresses: (addresses: Address[]) => void;
  updateUserProfile: (name: string, phone: string) => void;
  
  // Checkout & Orders
  orders: Order[];
  placeOrder: (details: {
    customerName: string;
    email: string;
    phone: string;
    shippingAddress: Address;
    paymentMethod: string;
  }) => Order;
  
  // Reviews
  addProductReview: (productId: string, review: Omit<Review, 'id' | 'date' | 'avatar'>) => void;
  
  // Admin Operations
  addProduct: (product: Omit<Product, 'id' | 'reviews' | 'rating' | 'reviewsCount'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addCategory: (category: Omit<Category, 'id' | 'count'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (categoryId: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateCustomOrderStatus: (customOrderId: string, status: CustomOrder['status']) => void;
  updateBanner: (banner: Banner) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  resetStoreToEmpty: () => void;
  restoreDefaultStore: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  // Navigation states
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Core product & shop data
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('crochet_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('crochet_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem('crochet_banners');
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('crochet_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  // User list for simulation
  const [usersList, setUsersList] = useState<User[]>(() => {
    const saved = localStorage.getItem('crochet_users_list');
    if (saved) return JSON.parse(saved);
    const defaults: User[] = [
      {
        id: 'u1',
        name: 'Saif Ur Rehman',
        email: 'user@crochet.com',
        role: 'user',
        phone: '+92 300 1234567',
        savedAddresses: [
          {
            id: 'a1',
            type: 'Home',
            street: '123 Cotton Blossom Lane, Sector F-10',
            city: 'Islamabad',
            state: 'Punjab',
            zipCode: '44000',
            country: 'Pakistan',
            isDefault: true
          }
        ]
      },
      {
        id: 'u_admin',
        name: 'Crochet Studio Admin',
        email: 'admin@crochet.com',
        role: 'admin',
        phone: '+92 300 9876543',
        savedAddresses: []
      }
    ];
    localStorage.setItem('crochet_users_list', JSON.stringify(defaults));
    return defaults;
  });

  // Current logged in user
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('crochet_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('crochet_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('crochet_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('crochet_recently_viewed');
    return saved ? JSON.parse(saved) : [];
  });

  // Custom Orders
  const [customOrders, setCustomOrders] = useState<CustomOrder[]>(() => {
    const saved = localStorage.getItem('crochet_custom_orders');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'CO-8391',
        customerName: 'Ayesha Khan',
        email: 'ayesha.k@gmail.com',
        phone: '+92 321 5556789',
        notes: 'I would love a customized baby blanket with a pastel pink background and tiny white daisy blossoms. Please use soft cashmere-blend or milk cotton yarn as it is for a newborn girl.',
        colorPreference: 'Blush Pink & Milk White',
        sizePreference: '30 x 40 inches (Baby size)',
        quantity: 1,
        budgetRange: '$40 - $60',
        deliveryDate: '2026-08-10',
        referenceImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300',
        status: 'In Progress',
        date: '2026-07-15'
      }
    ];
  });

  // Standard Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('crochet_orders');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'ORD-2983',
        userId: 'u1',
        customerName: 'Saif Ur Rehman',
        email: 'user@crochet.com',
        phone: '+92 300 1234567',
        items: [
          {
            productId: 'p1',
            name: 'Clover the Chubby Frog Plushie',
            price: 19.99,
            quantity: 1,
            selectedVariant: { 'Yarn Color': 'Sage Green', 'Hat Style': 'Strawberry Hat' },
            image: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?q=80&w=300'
          },
          {
            productId: 'p4',
            name: 'Sunbeam Blossom Mug Rug Set (4pcs)',
            price: 18.00,
            quantity: 1,
            selectedVariant: { 'Color Theme': 'Mixed Pastel' },
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300'
          }
        ],
        subtotal: 37.99,
        shippingFee: 5.00,
        discount: 3.80,
        couponCodeUsed: 'CROCHETLOVE',
        total: 39.19,
        status: 'Delivered',
        date: '2026-07-10',
        paymentMethod: 'Cash on Delivery',
        shippingAddress: {
          id: 'a1',
          type: 'Home',
          street: '123 Cotton Blossom Lane, Sector F-10',
          city: 'Islamabad',
          state: 'Punjab',
          zipCode: '44000',
          country: 'Pakistan'
        }
      }
    ];
  });

  // Coupons
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('crochet_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('crochet_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('crochet_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('crochet_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('crochet_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('crochet_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('crochet_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('crochet_custom_orders', JSON.stringify(customOrders));
  }, [customOrders]);

  useEffect(() => {
    localStorage.setItem('crochet_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('crochet_users_list', JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('crochet_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('crochet_current_user');
    }
  }, [user]);

  // View Navigation
  const setView = (view: string, productId?: string | null, categoryId?: string | null) => {
    setCurrentView(view);
    if (productId !== undefined) {
      setSelectedProductId(productId);
      if (productId) {
        addToRecentlyViewed(productId);
      }
    }
    if (categoryId !== undefined) {
      setSelectedCategoryId(categoryId);
    }
    // Scroll to top on view change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addCartItem = (product: Product, quantity: number, selectedVariant: { [key: string]: string }) => {
    setCart((prevCart) => {
      // Generate standard variant string as key
      const variantKey = Object.entries(selectedVariant)
        .map(([k, v]) => `${k}:${v}`)
        .sort()
        .join('|');
      const cartItemId = `${product.id}-${variantKey}`;

      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIndex >= 0) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { id: cartItemId, product, quantity, selectedVariant }];
      }
    });
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === cartItemId ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  const removeCartItem = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Recently Viewed
  const addToRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 5); // limit to 5
    });
  };

  // Coupons
  const applyCouponCode = (code: string): boolean => {
    setCouponError(null);
    const upperCode = code.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code.toUpperCase() === upperCode);
    
    if (!coupon) {
      setCouponError('Invalid coupon code!');
      return false;
    }

    const subtotal = cart.reduce((acc, item) => {
      const price = item.product.discountPrice || item.product.price;
      return acc + price * item.quantity;
    }, 0);

    if (subtotal < coupon.minSpend) {
      setCouponError(`Minimum spend of Rs. ${coupon.minSpend} required for this coupon!`);
      return false;
    }

    setActiveCoupon(coupon);
    return true;
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    setCouponError(null);
  };

  // Custom Orders
  const addCustomOrder = (order: Omit<CustomOrder, 'id' | 'status' | 'date'>) => {
    const newOrder: CustomOrder = {
      ...order,
      id: `CO-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    setCustomOrders((prev) => [newOrder, ...prev]);
  };

  // Auth Simulate
  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    const foundUser = usersList.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!foundUser) {
      return { success: false, message: 'No account registered with this email address.' };
    }
    
    // Simulate secure login password match (any password works for demo, but checks admin)
    if (foundUser.role === 'admin' && password !== 'admin123') {
      return { success: false, message: 'Invalid password. Hint: Use admin123 for Admin login.' };
    }

    setUser(foundUser);
    return { success: true, message: 'Successfully logged in!' };
  };

  const register = async (name: string, email: string, phone: string, isAdmin: boolean): Promise<{ success: boolean; message: string }> => {
    const emailExists = usersList.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return { success: false, message: 'An account with this email already exists!' };
    }

    const newUser: User = {
      id: `u-${Math.floor(100 + Math.random() * 900)}`,
      name,
      email,
      phone,
      role: isAdmin ? 'admin' : 'user',
      savedAddresses: []
    };

    setUsersList((prev) => [...prev, newUser]);
    setUser(newUser);
    return { success: true, message: 'Account created successfully!' };
  };

  const logout = () => {
    setUser(null);
    setActiveCoupon(null);
    setView('home');
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    const emailExists = usersList.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return { success: true, message: 'Password reset link and OTP has been simulated & sent to your email.' };
    }
    return { success: false, message: 'Email address not found!' };
  };

  const updateUserAddresses = (addresses: Address[]) => {
    if (!user) return;
    const updatedUser = { ...user, savedAddresses: addresses };
    setUser(updatedUser);

    setUsersList((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, savedAddresses: addresses } : u))
    );
  };

  const updateUserProfile = (name: string, phone: string) => {
    if (!user) return;
    const updatedUser = { ...user, name, phone };
    setUser(updatedUser);

    setUsersList((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, name, phone } : u))
    );
  };

  // Orders Checkout
  const placeOrder = (details: {
    customerName: string;
    email: string;
    phone: string;
    shippingAddress: Address;
    paymentMethod: string;
  }): Order => {
    const subtotal = cart.reduce((acc, item) => {
      const price = item.product.discountPrice || item.product.price;
      return acc + price * item.quantity;
    }, 0);

    let discount = 0;
    if (activeCoupon) {
      if (activeCoupon.discountType === 'percentage') {
        discount = Number((subtotal * (activeCoupon.value / 100)).toFixed(2));
      } else {
        discount = activeCoupon.value;
      }
    }

    const shippingFee = subtotal >= 50 ? 0 : 5.00;
    const total = Number((subtotal - discount + shippingFee).toFixed(2));

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: user ? user.id : 'guest',
      customerName: details.customerName,
      email: details.email,
      phone: details.phone,
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.discountPrice || item.product.price,
        quantity: item.quantity,
        selectedVariant: item.selectedVariant,
        image: item.product.images[0]
      })),
      subtotal,
      shippingFee,
      discount,
      couponCodeUsed: activeCoupon ? activeCoupon.code : undefined,
      total,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      shippingAddress: details.shippingAddress,
      paymentMethod: details.paymentMethod
    };

    setOrders((prev) => [newOrder, ...prev]);
    
    // Deduct stock
    setProducts((prevProd) =>
      prevProd.map((p) => {
        const itemInCart = cart.find((c) => c.product.id === p.id);
        if (itemInCart) {
          return { ...p, stock: Math.max(0, p.stock - itemInCart.quantity) };
        }
        return p;
      })
    );

    clearCart();
    return newOrder;
  };

  // Reviews
  const addProductReview = (productId: string, review: Omit<Review, 'id' | 'date' | 'avatar'>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newReview: Review = {
            ...review,
            id: `rev-${Math.floor(Math.random() * 10000)}`,
            date: new Date().toISOString().split('T')[0],
            avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${review.userName}`
          };
          const updatedReviews = [newReview, ...p.reviews];
          const newRating = Number(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            reviewsCount: updatedReviews.length,
            rating: newRating
          };
        }
        return p;
      })
    );
  };

  // ADMIN OPERATIONS
  const addProduct = (newProd: Omit<Product, 'id' | 'reviews' | 'rating' | 'reviewsCount'>) => {
    const productToAdd: Product = {
      ...newProd,
      id: `p-${Math.floor(100 + Math.random() * 900)}`,
      rating: 5.0,
      reviewsCount: 0,
      reviews: []
    };
    setProducts((prev) => [productToAdd, ...prev]);

    // Increment count in category
    setCategories((prevCat) =>
      prevCat.map((c) => (c.id === productToAdd.category ? { ...c, count: c.count + 1 } : c))
    );
  };

  const updateProduct = (updatedProd: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProd.id ? updatedProd : p)));
  };

  const deleteProduct = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));

    // Decrement count in category
    if (prod) {
      setCategories((prevCat) =>
        prevCat.map((c) => (c.id === prod.category ? { ...c, count: Math.max(0, c.count - 1) } : c))
      );
    }
  };

  const addCategory = (newCat: Omit<Category, 'id' | 'count'>) => {
    const id = newCat.name.toLowerCase().replace(/\s+/g, '-');
    setCategories((prev) => [...prev, { ...newCat, id, count: 0 }]);
  };

  const updateCategory = (updatedCat: Category) => {
    setCategories((prev) => prev.map((c) => (c.id === updatedCat.id ? updatedCat : c)));
  };

  const deleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  const updateCustomOrderStatus = (customOrderId: string, status: CustomOrder['status']) => {
    setCustomOrders((prev) => prev.map((co) => (co.id === customOrderId ? { ...co, status } : co)));
  };

  const updateBanner = (updatedBanner: Banner) => {
    setBanners((prev) => prev.map((b) => (b.id === updatedBanner.id ? updatedBanner : b)));
  };

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prev) => [...prev, newCoupon]);
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
  };

  const resetStoreToEmpty = () => {
    setProducts([]);
    setCategories([]);
    setCoupons([]);
    setOrders([]);
    setCustomOrders([]);
    setActiveCoupon(null);
  };

  const restoreDefaultStore = () => {
    localStorage.removeItem('crochet_products');
    localStorage.removeItem('crochet_categories');
    localStorage.removeItem('crochet_coupons');
    localStorage.removeItem('crochet_banners');
    localStorage.removeItem('crochet_orders');
    localStorage.removeItem('crochet_custom_orders');
    
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setCoupons(INITIAL_COUPONS);
    setBanners(INITIAL_BANNERS);
    
    // Default custom orders and orders
    const defaultCustomOrders = [
      {
        id: 'CO-8391',
        customerName: 'Ayesha Khan',
        email: 'ayesha.k@gmail.com',
        phone: '+92 321 5556789',
        notes: 'I would love a customized baby blanket with a pastel pink background and tiny white daisy blossoms. Please use soft cashmere-blend or milk cotton yarn as it is for a newborn girl.',
        colorPreference: 'Blush Pink & Milk White',
        sizePreference: '30 x 40 inches (Baby size)',
        quantity: 1,
        budgetRange: '$40 - $60',
        deliveryDate: '2026-08-10',
        referenceImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300',
        status: 'In Progress' as const,
        date: '2026-07-15'
      }
    ];
    setCustomOrders(defaultCustomOrders);

    const defaultOrders = [
      {
        id: 'ORD-2983',
        userId: 'u1',
        customerName: 'Saif Ur Rehman',
        email: 'user@crochet.com',
        phone: '+92 300 1234567',
        items: [
          {
            productId: 'p1',
            name: 'Clover the Chubby Frog Plushie',
            price: 19.99,
            quantity: 1,
            selectedVariant: { 'Yarn Color': 'Sage Green', 'Hat Style': 'Strawberry Hat' },
            image: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?q=80&w=300'
          },
          {
            productId: 'p4',
            name: 'Sunbeam Blossom Mug Rug Set (4pcs)',
            price: 18.00,
            quantity: 1,
            selectedVariant: { 'Color Theme': 'Mixed Pastel' },
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300'
          }
        ],
        subtotal: 37.99,
        shippingFee: 5.00,
        discount: 3.80,
        couponCodeUsed: 'CROCHETLOVE',
        total: 39.19,
        status: 'Delivered' as const,
        date: '2026-07-10',
        paymentMethod: 'Cash on Delivery',
        shippingAddress: {
          id: 'a1',
          type: 'Home' as const,
          street: '123 Cotton Blossom Lane, Sector F-10',
          city: 'Islamabad',
          state: 'Punjab',
          zipCode: '44000',
          country: 'Pakistan'
        }
      }
    ];
    setOrders(defaultOrders);
    setActiveCoupon(null);
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setView,
        selectedProductId,
        selectedCategoryId,
        searchQuery,
        setSearchQuery,
        products,
        categories,
        banners,
        coupons,
        cart,
        wishlist,
        recentlyViewed,
        addCartItem,
        updateCartQuantity,
        removeCartItem,
        clearCart,
        toggleWishlist,
        addToRecentlyViewed,
        activeCoupon,
        couponError,
        applyCouponCode,
        removeCoupon,
        customOrders,
        addCustomOrder,
        user,
        login,
        register,
        logout,
        forgotPassword,
        updateUserAddresses,
        updateUserProfile,
        orders,
        placeOrder,
        addProductReview,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        updateOrderStatus,
        updateCustomOrderStatus,
        updateBanner,
        addCoupon,
        deleteCoupon,
        resetStoreToEmpty,
        restoreDefaultStore
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
