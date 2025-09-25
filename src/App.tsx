import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Bundles from "./pages/Bundles";
import CreateBundle from "./pages/CreateBundle";
import Cart from "./pages/Cart";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { Store } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bundles" element={<Bundles />} />
            <Route path="/create-bundle" element={<CreateBundle />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/storefront" element={<div className="text-center py-12"><Store className="w-16 h-16 mx-auto text-muted-foreground mb-4" /><h2 className="text-xl font-semibold mb-2">Storefront</h2><p className="text-muted-foreground">Storefront management coming soon...</p></div>} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
