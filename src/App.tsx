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
import NotFound from "./pages/NotFound";

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
            <Route path="/storefront" element={<div>Storefront coming soon...</div>} />
            <Route path="/analytics" element={<div>Analytics coming soon...</div>} />
            <Route path="/customers" element={<div>Customers coming soon...</div>} />
            <Route path="/settings" element={<div>Settings coming soon...</div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
