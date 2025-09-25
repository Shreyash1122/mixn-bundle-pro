import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Users, 
  ShoppingCart,
  Download,
  Calendar,
  Target,
  Zap
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 12400, bundles: 45, conversion: 8.2 },
  { month: 'Feb', revenue: 18600, bundles: 67, conversion: 8.8 },
  { month: 'Mar', revenue: 24570, bundles: 89, conversion: 9.1 },
  { month: 'Apr', revenue: 22100, bundles: 78, conversion: 8.9 },
  { month: 'May', revenue: 28900, bundles: 102, conversion: 9.4 },
  { month: 'Jun', revenue: 32400, bundles: 115, conversion: 9.8 },
];

const bundlePerformance = [
  { name: 'Summer Skincare Bundle', sales: 145, revenue: 4350, conversion: 12.5, status: 'trending' },
  { name: 'Essential Office Pack', sales: 123, revenue: 3690, conversion: 10.8, status: 'stable' },
  { name: 'Gaming Starter Kit', sales: 98, revenue: 3920, conversion: 8.9, status: 'growing' },
  { name: 'Fitness Essentials', sales: 87, revenue: 2610, conversion: 7.2, status: 'stable' },
  { name: 'Home Chef Bundle', sales: 76, revenue: 2280, conversion: 6.8, status: 'declining' },
];

const categoryData = [
  { name: 'Beauty & Skincare', value: 35, color: '#22c55e' },
  { name: 'Office & Work', value: 25, color: '#3b82f6' },
  { name: 'Gaming & Tech', value: 20, color: '#f59e0b' },
  { name: 'Fitness & Health', value: 12, color: '#ef4444' },
  { name: 'Home & Kitchen', value: 8, color: '#8b5cf6' },
];

const conversionFunnel = [
  { stage: 'Visitors', count: 12500, percentage: 100 },
  { stage: 'Product Views', count: 8750, percentage: 70 },
  { stage: 'Bundle Interactions', count: 3125, percentage: 25 },
  { stage: 'Add to Cart', count: 1875, percentage: 15 },
  { stage: 'Checkout', count: 1250, percentage: 10 },
  { stage: 'Purchase', count: 1050, percentage: 8.4 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const topMetrics = [
    {
      title: 'Total Revenue',
      value: '$142,580',
      change: '+23.5%',
      icon: DollarSign,
      color: 'text-success',
      trend: 'up'
    },
    {
      title: 'Bundle Sales',
      value: '1,284',
      change: '+18.2%',
      icon: Package,
      color: 'text-primary',
      trend: 'up'
    },
    {
      title: 'Conversion Rate',
      value: '9.2%',
      change: '+2.1%',
      icon: Target,
      color: 'text-info',
      trend: 'up'
    },
    {
      title: 'Avg Bundle Value',
      value: '$78.45',
      change: '+5.8%',
      icon: ShoppingCart,
      color: 'text-warning',
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <BarChart3 className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Track your bundle performance and customer insights.</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topMetrics.map((metric) => (
          <Card key={metric.title} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className={`w-4 h-4 ${metric.color}`} />
                    <span className={`text-sm font-medium ${metric.color}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg bg-muted/50 ${metric.color}`}>
                  <metric.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bundles">Bundle Performance</TabsTrigger>
          <TabsTrigger value="customers">Customer Analytics</TabsTrigger>
          <TabsTrigger value="conversion">Conversion Funnel</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Revenue Trend</span>
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="bundles">Bundles</SelectItem>
                      <SelectItem value="conversion">Conversion</SelectItem>
                    </SelectContent>
                  </Select>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey={selectedMetric} 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Bundle Performance Tab */}
        <TabsContent value="bundles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Bundles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bundlePerformance.map((bundle, index) => (
                  <div key={bundle.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-bold text-muted-foreground">#{index + 1}</div>
                      <div>
                        <h3 className="font-medium">{bundle.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{bundle.sales} sales</span>
                          <span>${bundle.revenue.toLocaleString()} revenue</span>
                          <Badge 
                            variant={bundle.status === 'trending' ? 'default' : 'secondary'}
                            className={bundle.status === 'trending' ? 'bg-success text-success-foreground' : ''}
                          >
                            <Zap className="w-3 h-3 mr-1" />
                            {bundle.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-success">{bundle.conversion}%</div>
                      <div className="text-sm text-muted-foreground">Conversion</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Analytics Tab */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Acquisition</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bundles" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">4.8</div>
                    <div className="text-sm text-muted-foreground">Avg Rating</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">2.3</div>
                    <div className="text-sm text-muted-foreground">Avg Bundles/Customer</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">68%</div>
                    <div className="text-sm text-muted-foreground">Repeat Customers</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">$156</div>
                    <div className="text-sm text-muted-foreground">Avg Customer Value</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Conversion Funnel Tab */}
        <TabsContent value="conversion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionFunnel.map((stage, index) => (
                  <div key={stage.stage} className="relative">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium">{stage.stage}</h3>
                          <p className="text-sm text-muted-foreground">{stage.count.toLocaleString()} users</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{stage.percentage}%</div>
                      </div>
                    </div>
                    
                    <div className="mt-2 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${stage.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}