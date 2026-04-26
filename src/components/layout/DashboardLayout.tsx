import React, { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { NotificationDropdown } from '@/components/notifications/NotificationDropdown';
import {
  Recycle,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Upload,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  MessageCircle,
  Heart,
  Shield,
  AlertTriangle,
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  roles: string[];
  badge?: number;
}

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const cartCount = getCartCount();

  const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['buyer', 'seller', 'admin'] },
    { label: 'Browse Scrap', path: '/dashboard/browse', icon: ShoppingCart, roles: ['buyer'] },
    { label: 'Cart', path: '/dashboard/cart', icon: ShoppingCart, roles: ['buyer'], badge: cartCount },
    { label: 'Saved Items', path: '/dashboard/saved', icon: Heart, roles: ['buyer'] },
    { label: 'My Listings', path: '/dashboard/listings', icon: Package, roles: ['seller'] },
    { label: 'Upload Scrap', path: '/dashboard/upload', icon: Upload, roles: ['seller'] },
    { label: 'My Orders', path: '/dashboard/orders', icon: Package, roles: ['buyer', 'seller'] },
    { label: 'Messages', path: '/dashboard/messages', icon: MessageCircle, roles: ['buyer', 'seller', 'admin'] },
    { label: 'Users', path: '/dashboard/users', icon: Users, roles: ['admin'] },
    { label: 'Moderation', path: '/dashboard/moderation', icon: Shield, roles: ['admin'] },
    { label: 'Disputes', path: '/dashboard/disputes', icon: AlertTriangle, roles: ['admin'] },
    { label: 'Analytics', path: '/dashboard/analytics', icon: BarChart3, roles: ['admin'] },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings, roles: ['buyer', 'seller', 'admin'] },
  ];

  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-foreground/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-sidebar text-sidebar-foreground
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
                <Recycle className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold text-sidebar-foreground">ScrapWise</span>
            </Link>
          </div>

          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                <span className="text-sm font-medium text-sidebar-accent-foreground">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-sidebar-foreground/60 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {filteredNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium flex-1">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-8">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex-1 lg:ml-0" />

          <div className="flex items-center gap-4">
            <NotificationDropdown />
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
