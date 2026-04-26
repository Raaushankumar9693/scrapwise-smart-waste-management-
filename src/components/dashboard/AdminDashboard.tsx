import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Package, TrendingUp, AlertTriangle, ArrowUp, ArrowDown, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Total Users', value: '2,847', icon: Users, trend: '+12%', up: true },
  { label: 'Active Listings', value: '1,234', icon: Package, trend: '+8%', up: true },
  { label: 'Total Revenue', value: '₹45.2L', icon: TrendingUp, trend: '+23%', up: true },
  { label: 'Pending Disputes', value: '7', icon: AlertTriangle, trend: '-3', up: false },
];

const recentActivity = [
  { id: 1, action: 'New user registered', user: 'Rahul Sharma', type: 'Seller', time: '2 mins ago' },
  { id: 2, action: 'Listing approved', user: 'Priya Patel', item: 'Copper Wire 50kg', time: '15 mins ago' },
  { id: 3, action: 'Order completed', buyer: 'MetalWorks Ltd', seller: 'GreenScrap', amount: '₹12,500', time: '1 hour ago' },
  { id: 4, action: 'Dispute resolved', case: '#D-2847', resolution: 'Refund issued', time: '2 hours ago' },
  { id: 5, action: 'New listing created', user: 'Amit Kumar', item: 'E-waste Bundle', time: '3 hours ago' },
];

const topSellers = [
  { name: 'MetalWorks Co.', sales: '₹5,42,000', transactions: 156, rating: 4.8 },
  { name: 'GreenRecycle Hub', sales: '₹4,87,500', transactions: 134, rating: 4.7 },
  { name: 'ElectroScrap India', sales: '₹3,95,000', transactions: 98, rating: 4.9 },
  { name: 'Paper Solutions', sales: '₹2,78,000', transactions: 89, rating: 4.6 },
];

export function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Platform overview and management
          </p>
        </div>
        <Button variant="hero" asChild>
          <Link to="/dashboard/analytics">
            <BarChart3 className="w-4 h-4 mr-2" /> View Analytics
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <div className={`flex items-center gap-1 mt-2 text-xs ${stat.up ? 'text-primary' : 'text-destructive'}`}>
                    {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {stat.trend}
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  stat.label === 'Pending Disputes' ? 'bg-destructive/10' : 'bg-primary/10'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.label === 'Pending Disputes' ? 'text-destructive' : 'text-primary'
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.user && `${activity.user}`}
                      {activity.item && ` • ${activity.item}`}
                      {activity.buyer && `${activity.buyer} → ${activity.seller}`}
                      {activity.amount && ` • ${activity.amount}`}
                      {activity.case && `${activity.case} • ${activity.resolution}`}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Sellers */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Top Sellers</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/users">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSellers.map((seller, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{seller.name}</p>
                    <p className="text-xs text-muted-foreground">{seller.transactions} transactions</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{seller.sales}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>⭐</span>
                      <span>{seller.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Health */}
      <Card className="gradient-hero text-primary-foreground border-0 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent/50 blur-3xl" />
        </div>
        <CardContent className="p-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-primary-foreground/80 text-sm">ML Model Accuracy</p>
              <p className="text-3xl font-bold mt-1">94.7%</p>
            </div>
            <div>
              <p className="text-primary-foreground/80 text-sm">Avg Response Time</p>
              <p className="text-3xl font-bold mt-1">1.2s</p>
            </div>
            <div>
              <p className="text-primary-foreground/80 text-sm">Daily Valuations</p>
              <p className="text-3xl font-bold mt-1">847</p>
            </div>
            <div>
              <p className="text-primary-foreground/80 text-sm">User Satisfaction</p>
              <p className="text-3xl font-bold mt-1">4.8/5</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
