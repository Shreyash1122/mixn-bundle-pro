import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Bundle, CartItem, DashboardMetrics, Product } from '@/types';

interface BundleStore {
  bundles: Bundle[];
  cart: CartItem[];
  products: Product[];
  metrics: DashboardMetrics;
  
  // Bundle actions
  addBundle: (bundle: Omit<Bundle, 'id' | 'createdAt'>) => void;
  updateBundle: (id: string, bundle: Partial<Bundle>) => void;
  deleteBundle: (id: string) => void;
  
  // Cart actions
  addToCart: (bundle: Bundle, quantity?: number) => void;
  removeFromCart: (bundleId: string) => void;
  updateCartQuantity: (bundleId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Metrics
  updateMetrics: () => void;
}

// Mock sample products
const sampleProducts: Product[] = [
  { id: '1', name: 'Moisturizing Cream', price: 29.99, image: '/api/placeholder/100/100', category: 'Skincare' },
  { id: '2', name: 'Face Cleanser', price: 19.99, image: '/api/placeholder/100/100', category: 'Skincare' },
  { id: '3', name: 'Sunscreen SPF 50', price: 24.99, image: '/api/placeholder/100/100', category: 'Skincare' },
  { id: '4', name: 'Wireless Mouse', price: 49.99, image: '/api/placeholder/100/100', category: 'Office' },
  { id: '5', name: 'Keyboard', price: 89.99, image: '/api/placeholder/100/100', category: 'Office' },
  { id: '6', name: 'Monitor Stand', price: 39.99, image: '/api/placeholder/100/100', category: 'Office' },
  { id: '7', name: 'Gaming Headset', price: 79.99, image: '/api/placeholder/100/100', category: 'Gaming' },
  { id: '8', name: 'Gaming Controller', price: 59.99, image: '/api/placeholder/100/100', category: 'Gaming' },
];

// Sample bundles
const sampleBundles: Bundle[] = [
  {
    id: '1',
    name: 'Summer Skincare Bundle',
    products: sampleProducts.slice(0, 3),
    discountType: 'percentage',
    discountValue: 20,
    status: 'active',
    sales: 45,
    revenue: 2280,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Essential Office Pack',
    products: sampleProducts.slice(3, 6),
    discountType: 'fixed',
    discountValue: 15,
    status: 'active',
    sales: 32,
    revenue: 1920,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    name: 'Gaming Starter Kit',
    products: sampleProducts.slice(6, 8),
    discountType: 'percentage',
    discountValue: 25,
    status: 'draft',
    sales: 28,
    revenue: 3360,
    createdAt: new Date('2024-02-10'),
  },
];

export const useBundleStore = create<BundleStore>()(
  persist(
    (set, get) => ({
      bundles: sampleBundles,
      cart: [],
      products: sampleProducts,
      metrics: {
        totalRevenue: 24570,
        revenueChange: 12.5,
        activeBundles: 18,
        newBundles: 3,
        bundleConversion: 8.4,
        conversionChange: 0.7,
        customers: 1249,
        newCustomers: 84,
      },

      addBundle: (bundleData) => {
        const newBundle: Bundle = {
          ...bundleData,
          id: Date.now().toString(),
          createdAt: new Date(),
          sales: 0,
          revenue: 0,
        };
        
        set((state) => ({
          bundles: [newBundle, ...state.bundles],
        }));
        
        get().updateMetrics();
      },

      updateBundle: (id, updateData) => {
        set((state) => ({
          bundles: state.bundles.map((bundle) =>
            bundle.id === id ? { ...bundle, ...updateData } : bundle
          ),
        }));
        
        get().updateMetrics();
      },

      deleteBundle: (id) => {
        set((state) => ({
          bundles: state.bundles.filter((bundle) => bundle.id !== id),
        }));
        
        get().updateMetrics();
      },

      addToCart: (bundle, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.find((item) => item.bundle.id === bundle.id);
          
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.bundle.id === bundle.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          
          return {
            cart: [...state.cart, { bundle, quantity }],
          };
        });
      },

      removeFromCart: (bundleId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.bundle.id !== bundleId),
        }));
      },

      updateCartQuantity: (bundleId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(bundleId);
          return;
        }
        
        set((state) => ({
          cart: state.cart.map((item) =>
            item.bundle.id === bundleId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      updateMetrics: () => {
        const { bundles } = get();
        const activeBundles = bundles.filter((b) => b.status === 'active').length;
        const totalRevenue = bundles.reduce((sum, bundle) => sum + bundle.revenue, 0);
        
        set((state) => ({
          metrics: {
            ...state.metrics,
            activeBundles,
            totalRevenue,
          },
        }));
      },
    }),
    {
      name: 'bundle-store',
    }
  )
);