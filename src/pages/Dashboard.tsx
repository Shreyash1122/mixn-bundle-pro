import { useBundleStore } from '@/stores/bundleStore';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { BundleCard } from '@/components/dashboard/BundleCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DollarSign, 
  Package, 
  TrendingUp, 
  Users, 
  Plus,
  Calendar,
  BarChart3,
  Archive
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { bundles, metrics } = useBundleStore();
  const recentBundles = bundles.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your bundle performance overview.</p>
        </div>
        <Link to="/create-bundle">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Bundle
          </Button>
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`$${metrics.totalRevenue.toLocaleString()}`}
          change={metrics.revenueChange}
          icon={DollarSign}
          iconColor="text-success"
        />
        <MetricCard
          title="Active Bundles"
          value={metrics.activeBundles}
          change={metrics.newBundles}
          icon={Package}
          iconColor="text-info"
        />
        <MetricCard
          title="Bundle Conversion"
          value={`${metrics.bundleConversion}%`}
          change={metrics.conversionChange}
          icon={TrendingUp}
          iconColor="text-warning"
        />
        <MetricCard
          title="Customers"
          value={metrics.customers.toLocaleString()}
          change={metrics.newCustomers}
          icon={Users}
          iconColor="text-primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bundles */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Bundles</CardTitle>
              <Link to="/bundles">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentBundles.map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/create-bundle">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Bundle
                </Button>
              </Link>
              <Link to="/analytics">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Campaign
                </Button>
              </Link>
              <Link to="/analytics">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
              <Link to="/settings">
                <Button variant="outline" className="w-full justify-start">
                  <Archive className="w-4 h-4 mr-2" />
                  Manage Inventory
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}