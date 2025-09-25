export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Bundle {
  id: string;
  name: string;
  products: Product[];
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  status: 'active' | 'draft';
  sales: number;
  revenue: number;
  createdAt: Date;
}

export interface CartItem {
  bundle: Bundle;
  quantity: number;
}

export interface DashboardMetrics {
  totalRevenue: number;
  revenueChange: number;
  activeBundles: number;
  newBundles: number;
  bundleConversion: number;
  conversionChange: number;
  customers: number;
  newCustomers: number;
}