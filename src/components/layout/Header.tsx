import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useBundleStore } from '@/stores/bundleStore';
import { ShoppingCart, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  const cart = useBundleStore(state => state.cart);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-card border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/create-bundle">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Bundle
            </Button>
          </Link>
          
          <Link to="/cart" className="relative">
            <Button variant="outline" size="icon">
              <ShoppingCart className="w-4 h-4" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>
          
          <Button variant="outline" size="sm">
            Preview Store
          </Button>
          
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              MB
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}