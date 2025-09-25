import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Eye,
  MoreHorizontal
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  joinDate: string;
  totalSpent: number;
  totalOrders: number;
  status: 'active' | 'inactive';
  avatar?: string;
  lastOrder: string;
  bundlesPurchased: string[];
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    joinDate: '2024-01-15',
    totalSpent: 1250.00,
    totalOrders: 8,
    status: 'active',
    lastOrder: '2024-03-10',
    bundlesPurchased: ['Summer Skincare Bundle', 'Office Essentials Pack']
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 987-6543',
    location: 'San Francisco, CA',
    joinDate: '2024-02-03',
    totalSpent: 890.50,
    totalOrders: 5,
    status: 'active',
    lastOrder: '2024-03-08',
    bundlesPurchased: ['Gaming Starter Kit', 'Summer Skincare Bundle']
  },
  {
    id: '3',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    location: 'Austin, TX',
    joinDate: '2023-11-20',
    totalSpent: 2100.75,
    totalOrders: 12,
    status: 'active',
    lastOrder: '2024-03-05',
    bundlesPurchased: ['Office Essentials Pack', 'Gaming Starter Kit', 'Summer Skincare Bundle']
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Chicago, IL',
    joinDate: '2024-01-28',
    totalSpent: 450.25,
    totalOrders: 3,
    status: 'inactive',
    lastOrder: '2024-02-15',
    bundlesPurchased: ['Office Essentials Pack']
  },
  {
    id: '5',
    name: 'Lisa Garcia',
    email: 'lisa.garcia@email.com',
    location: 'Miami, FL',
    joinDate: '2024-02-14',
    totalSpent: 680.00,
    totalOrders: 4,
    status: 'active',
    lastOrder: '2024-03-12',
    bundlesPurchased: ['Summer Skincare Bundle', 'Gaming Starter Kit']
  }
];

export default function Customers() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const averageOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 0);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Users className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships and track their journey.</p>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-primary" />
              <div>
                <div className="text-2xl font-bold">{totalCustomers}</div>
                <div className="text-sm text-muted-foreground">Total Customers</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <div>
                <div className="text-2xl font-bold">{activeCustomers}</div>
                <div className="text-sm text-muted-foreground">Active Customers</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-success" />
              <div>
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-info" />
              <div>
                <div className="text-2xl font-bold">${averageOrderValue.toFixed(0)}</div>
                <div className="text-sm text-muted-foreground">Avg Order Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Customer Directory</span>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'inactive') => setStatusFilter(value)}>
                    <SelectTrigger className="w-32">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCustomers.map((customer) => (
                  <div 
                    key={customer.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={customer.avatar} />
                        <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{customer.name}</h3>
                          <Badge 
                            variant={customer.status === 'active' ? 'default' : 'secondary'}
                            className={customer.status === 'active' ? 'bg-success text-success-foreground' : ''}
                          >
                            {customer.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{customer.location}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <ShoppingBag className="w-3 h-3" />
                            <span>{customer.totalOrders} orders</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${customer.totalSpent.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total spent</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Details */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedCustomer ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-2">
                      <AvatarImage src={selectedCustomer.avatar} />
                      <AvatarFallback>{getInitials(selectedCustomer.name)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">{selectedCustomer.name}</h3>
                    <Badge 
                      variant={selectedCustomer.status === 'active' ? 'default' : 'secondary'}
                      className={selectedCustomer.status === 'active' ? 'bg-success text-success-foreground' : ''}
                    >
                      {selectedCustomer.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedCustomer.email}</span>
                    </div>
                    {selectedCustomer.phone && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedCustomer.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedCustomer.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Joined {formatDate(selectedCustomer.joinDate)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">${selectedCustomer.totalSpent.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Total Spent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{selectedCustomer.totalOrders}</div>
                      <div className="text-xs text-muted-foreground">Total Orders</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Recent Bundles</h4>
                    <div className="space-y-2">
                      {selectedCustomer.bundlesPurchased.slice(0, 3).map((bundle, index) => (
                        <div key={index} className="text-sm p-2 bg-muted rounded">
                          {bundle}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Select a customer to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}