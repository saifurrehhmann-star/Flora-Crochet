export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface Variant {
  name: string; // e.g. "Color", "Size"
  options: string[]; // e.g. ["Pastel Pink", "Mint Green", "Lavender"], ["Small", "Medium", "Large"]
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: string[];
  rating: number;
  reviewsCount: number;
  variants: Variant[];
  stock: number;
  tags: string[]; // "Featured", "Best Seller", "New Arrival", "Sale"
  sku: string;
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  count: number;
}

export interface CustomOrder {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  notes: string;
  colorPreference: string;
  sizePreference: string;
  quantity: number;
  budgetRange: string;
  deliveryDate: string;
  referenceImage?: string;
  status: 'Pending' | 'Approved' | 'In Progress' | 'Completed' | 'Cancelled';
  date: string;
}

export interface CartItem {
  id: string; // Unique ID for cart entry (productId + variant combo string)
  product: Product;
  quantity: number;
  selectedVariant: { [key: string]: string };
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone?: string;
  savedAddresses: Address[];
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  email: string;
  phone: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    selectedVariant: { [key: string]: string };
    image: string;
  }[];
  total: number;
  subtotal: number;
  shippingFee: number;
  discount: number;
  couponCodeUsed?: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  value: number;
  minSpend: number;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'Custom Orders' | 'Shipping' | 'Care';
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  active: boolean;
}
