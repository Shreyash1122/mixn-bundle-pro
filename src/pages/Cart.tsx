import { useBundleStore } from '@/stores/bundleStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useBundleStore();
  const { toast } = useToast();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => {
    const bundle = item.bundle;
    const totalPrice = bundle.products.reduce((sum, product) => sum + product.price, 0);
    const discountAmount = bundle.discountType === 'percentage' 
      ? (totalPrice * bundle.discountValue) / 100
      : bundle.discountValue;
    const finalPrice = Math.max(0, totalPrice - discountAmount);
    return sum + (finalPrice * item.quantity);
  }, 0);

  const handleQuantityChange = (bundleId: string, newQuantity: number) => {
    updateCartQuantity(bundleId, newQuantity);
  };

  const handleRemoveItem = (bundleId: string, bundleName: string) => {
    removeFromCart(bundleId);
    toast({
      title: "Item removed",
      description: `${bundleName} has been removed from your cart.`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "Redirecting to checkout process...",
    });
    // In a real app, this would redirect to payment processing
  };

  if (cart.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <p className="text muted-foreground">Your cart is currently empty.</p>
        </div>
        
        <Card>
          <CardContent className="p-12 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Start building bundles to add them to your cart.</p>
            <Button asChild>
              <a href="/bundles">Browse Bundles</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
        </div>
        <Button variant="outline" onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const bundle = item.bundle;
            const totalPrice = bundle.products.reduce((sum, product) => sum + product.price, 0);
            const discountAmount = bundle.discountType === 'percentage' 
              ? (totalPrice * bundle.discountValue) / 100
              : bundle.discountValue;
            const finalPrice = Math.max(0, totalPrice - discountAmount);

            return (
              <Card key={bundle.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{bundle.name}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={bundle.status === 'active' ? 'default' : 'secondary'}
                          className={bundle.status === 'active' ? 'bg-success text-success-foreground' : ''}
                        >
                          {bundle.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {bundle.products.length} products
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleRemoveItem(bundle.id, bundle.name)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2 mb-4">
                    {bundle.products.map((product) => (
                      <div key={product.id} className="flex items-center space-x-3 text-sm">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <span className="flex-1">{product.name}</span>
                        <span className="text-muted-foreground">${product.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(bundle.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(bundle.id, Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(bundle.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <div className="line-through text-sm text-muted-foreground">
                        ${(totalPrice * item.quantity).toFixed(2)}
                      </div>
                      <div className="font-semibold text-success">
                        ${(finalPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Items ({totalItems}):</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span className="text-success">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax:</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              
              <Button variant="outline" className="w-full" asChild>
                <a href="/bundles">Continue Shopping</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}