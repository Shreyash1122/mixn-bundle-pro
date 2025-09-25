import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings as SettingsIcon, 
  User, 
  Store, 
  Bell, 
  Palette, 
  Shield, 
  Zap,
  Save,
  Check,
  X
} from 'lucide-react';

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Profile
    storeName: 'My Bundle Store',
    storeEmail: 'admin@bundlestore.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Commerce Street, City, State 12345',
    
    // Bundle Defaults
    defaultDiscountType: 'percentage',
    defaultDiscountValue: 20,
    autoPublish: false,
    requireApproval: true,
    
    // Notifications
    emailNotifications: true,
    bundleAlerts: true,
    salesNotifications: true,
    weeklyReports: true,
    
    // Display
    currency: 'USD',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    
    // Advanced
    enableAnalytics: true,
    enableWishlist: false,
    enableReviews: true,
  });

  const handleSave = (section: string) => {
    toast({
      title: "Settings saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  const integrations = [
    { name: 'Shopify', status: 'connected', color: 'success' },
    { name: 'Google Analytics', status: 'connected', color: 'success' },
    { name: 'Mailchimp', status: 'disconnected', color: 'secondary' },
    { name: 'Stripe', status: 'connected', color: 'success' },
    { name: 'Facebook Pixel', status: 'disconnected', color: 'secondary' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <SettingsIcon className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your store configuration and preferences.</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="bundles" className="flex items-center space-x-2">
            <Store className="w-4 h-4" />
            <span className="hidden sm:inline">Bundles</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="display" className="flex items-center space-x-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Display</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Advanced</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={settings.storeName}
                    onChange={(e) => setSettings({...settings, storeName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="storeEmail">Email Address</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => setSettings({...settings, storeEmail: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="storePhone">Phone Number</Label>
                  <Input
                    id="storePhone"
                    value={settings.storePhone}
                    onChange={(e) => setSettings({...settings, storePhone: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="storeAddress">Store Address</Label>
                <Textarea
                  id="storeAddress"
                  value={settings.storeAddress}
                  onChange={(e) => setSettings({...settings, storeAddress: e.target.value})}
                  rows={3}
                />
              </div>
              <Button onClick={() => handleSave('General')} className="w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bundle Settings */}
        <TabsContent value="bundles">
          <Card>
            <CardHeader>
              <CardTitle>Bundle Defaults</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Default Discount Type</Label>
                  <Select 
                    value={settings.defaultDiscountType} 
                    onValueChange={(value) => setSettings({...settings, defaultDiscountType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="defaultDiscount">
                    Default Discount Value {settings.defaultDiscountType === 'percentage' ? '(%)' : '($)'}
                  </Label>
                  <Input
                    id="defaultDiscount"
                    type="number"
                    value={settings.defaultDiscountValue}
                    onChange={(e) => setSettings({...settings, defaultDiscountValue: Number(e.target.value)})}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-publish bundles</Label>
                    <p className="text-sm text-muted-foreground">Automatically make new bundles active</p>
                  </div>
                  <Switch
                    checked={settings.autoPublish}
                    onCheckedChange={(checked) => setSettings({...settings, autoPublish: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require approval</Label>
                    <p className="text-sm text-muted-foreground">Require admin approval before publishing</p>
                  </div>
                  <Switch
                    checked={settings.requireApproval}
                    onCheckedChange={(checked) => setSettings({...settings, requireApproval: checked})}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('Bundle')} className="w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email notifications', desc: 'Receive email updates about your store' },
                { key: 'bundleAlerts', label: 'Bundle alerts', desc: 'Get notified about bundle performance' },
                { key: 'salesNotifications', label: 'Sales notifications', desc: 'Instant notifications for new sales' },
                { key: 'weeklyReports', label: 'Weekly reports', desc: 'Receive weekly performance summaries' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <Label>{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={settings[item.key as keyof typeof settings] as boolean}
                    onCheckedChange={(checked) => setSettings({...settings, [item.key]: checked})}
                  />
                </div>
              ))}
              
              <Button onClick={() => handleSave('Notification')} className="w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Display Settings */}
        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Currency</Label>
                  <Select value={settings.currency} onValueChange={(value) => setSettings({...settings, currency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Date Format</Label>
                  <Select value={settings.dateFormat} onValueChange={(value) => setSettings({...settings, dateFormat: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={() => handleSave('Display')} className="w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {integrations.map((integration) => (
                <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{integration.name}</h3>
                      <Badge 
                        variant={integration.status === 'connected' ? 'default' : 'secondary'}
                        className={integration.status === 'connected' ? 'bg-success text-success-foreground' : ''}
                      >
                        {integration.status === 'connected' ? (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            Connected
                          </>
                        ) : (
                          <>
                            <X className="w-3 h-3 mr-1" />
                            Disconnected
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    variant={integration.status === 'connected' ? 'outline' : 'default'}
                    size="sm"
                  >
                    {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'enableAnalytics', label: 'Advanced Analytics', desc: 'Enable detailed analytics and reporting' },
                { key: 'enableWishlist', label: 'Wishlist Feature', desc: 'Allow customers to save bundles for later' },
                { key: 'enableReviews', label: 'Bundle Reviews', desc: 'Enable customer reviews for bundles' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <Label>{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={settings[item.key as keyof typeof settings] as boolean}
                    onCheckedChange={(checked) => setSettings({...settings, [item.key]: checked})}
                  />
                </div>
              ))}
              
              <Button onClick={() => handleSave('Advanced')} className="w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}