import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bundle } from '@/types';
import { useBundleStore } from '@/stores/bundleStore';
import { ShoppingCart, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BundleCardProps {
  bundle: Bundle;
}

export function BundleCard({ bundle }: BundleCardProps) {
  const { addToCart, deleteBundle } = useBundleStore();
  const { toast } = useToast();

  const totalPrice = bundle.products.reduce((sum, product) => sum + product.price, 0);
  const discountAmount = bundle.discountType === 'percentage' 
    ? (totalPrice * bundle.discountValue) / 100
    : bundle.discountValue;
  const finalPrice = Math.max(0, totalPrice - discountAmount);

  const handleAddToCart = () => {
    addToCart(bundle);
    toast({
      title: "Added to cart",
      description: `${bundle.name} has been added to your cart.`,
    });
  };

  const handleDelete = () => {
    deleteBundle(bundle.id);
    toast({
      title: "Bundle deleted",
      description: `${bundle.name} has been deleted.`,
      variant: "destructive",
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
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
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{bundle.products.length} products</span>
            <span className="text-muted-foreground">
              {bundle.discountType === 'percentage' 
                ? `${bundle.discountValue}% discount`
                : `$${bundle.discountValue} off discount`
              }
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{bundle.sales} sales</span>
            <div className="text-right">
              <div className="line-through text-xs text-muted-foreground">
                ${totalPrice.toFixed(2)}
              </div>
              <div className="font-semibold text-success">
                ${finalPrice.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm">
            <span className="text-muted-foreground">Revenue</span>
            <div className="font-semibold">${bundle.revenue.toLocaleString()}</div>
          </div>
          
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}