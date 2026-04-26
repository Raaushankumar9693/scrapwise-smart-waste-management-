import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { SavedItemsProvider } from "@/contexts/SavedItemsContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import BrowseScrap from "./pages/BrowseScrap";
import UploadScrap from "./pages/UploadScrap";
import MyListings from "./pages/MyListings";
import Orders from "./pages/Orders";
import AdminUsers from "./pages/AdminUsers";
import AdminAnalytics from "./pages/AdminAnalytics";
import Settings from "./pages/Settings";
import ListingDetail from "./pages/ListingDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderDetail from "./pages/OrderDetail";
import SellerProfile from "./pages/SellerProfile";
import SavedItems from "./pages/SavedItems";
import Messages from "./pages/Messages";
import AdminListings from "./pages/AdminListings";
import AdminDisputes from "./pages/AdminDisputes";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <SavedItemsProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter basename="/scrapwise-smart-waste-management-/">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/listing/:id" element={<ListingDetail />} />
                  <Route path="/seller/:id" element={<SellerProfile />} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/dashboard/browse" element={<ProtectedRoute><BrowseScrap /></ProtectedRoute>} />
                  <Route path="/dashboard/upload" element={<ProtectedRoute><UploadScrap /></ProtectedRoute>} />
                  <Route path="/dashboard/listings" element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
                  <Route path="/dashboard/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                  <Route path="/dashboard/order/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
                  <Route path="/dashboard/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                  <Route path="/dashboard/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                  <Route path="/dashboard/saved" element={<ProtectedRoute><SavedItems /></ProtectedRoute>} />
                  <Route path="/dashboard/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
                  <Route path="/dashboard/messages/:conversationId" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
                  <Route path="/dashboard/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
                  <Route path="/dashboard/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
                  <Route path="/dashboard/moderation" element={<ProtectedRoute><AdminListings /></ProtectedRoute>} />
                  <Route path="/dashboard/disputes" element={<ProtectedRoute><AdminDisputes /></ProtectedRoute>} />
                  <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </SavedItemsProvider>
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
