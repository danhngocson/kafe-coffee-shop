export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  origin: string;
  altitude?: string;
  process: string;
  roastLevel: 'Light' | 'Medium' | 'Dark';
  tastingNotes: string[];
  description: string;
  image: string;
  weightOptions: number[]; // e.g. [250, 500, 1000] in grams
  grindOptions: string[]; // e.g. ['Nguyên hạt', 'Pha Phin', 'Pha Espresso', 'Pha Pour Over (V60)', 'Pha Cold Brew']
  inStock: boolean;
  featured?: boolean;
  bestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: number;
  selectedGrind: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  weight: number;
  grind: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  note?: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: 'cod' | 'vietqr' | 'momo' | 'vnpay';
  paymentStatus: 'pending' | 'paid';
  status: 'pending' | 'roasting' | 'shipping' | 'delivered' | 'cancelled';
  trackingCode: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  publishDate: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Booking {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  workshopType: string;
  branch: string;
  note?: string;
  status: 'confirmed' | 'pending' | 'completed';
  createdAt: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  district: string;
  city: string;
  phone: string;
  hours: string;
  image: string;
  features: string[];
}
