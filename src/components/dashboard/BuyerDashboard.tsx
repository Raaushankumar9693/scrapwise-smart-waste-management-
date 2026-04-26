import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, TrendingUp, Clock, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Active Orders', value: '3', icon: ShoppingCart, trend: '+2 this week' },
  { label: 'Total Purchases', value: '₹45,200', icon: TrendingUp, trend: '+15% vs last month' },
  { label: 'Saved Items', value: '12', icon: Star, trend: '4 new listings' },
  { label: 'Pending Deliveries', value: '2', icon: Clock, trend: 'Expected in 2 days' },
];

const recentListings = [
  { id: 1, title: 'Mixed Metal Scrap', material: 'Metal', weight: '50 kg', price: '₹2,500', quality: 'Grade A', seller: 'MetalWorks Co.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
  { id: 2, title: 'Copper Wire Bundle', material: 'Copper', weight: '20 kg', price: '₹8,000', quality: 'Grade A', seller: 'ElectroScrap', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200' },
  { id: 3, title: 'Aluminum Cans', material: 'Aluminum', weight: '30 kg', price: '₹1,800', quality: 'Grade B', seller: 'GreenRecycle', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=200' },
];

export function BuyerDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Discover quality scrap materials at fair prices
          </p>
        </div>
        <Button variant="hero" asChild>
          <Link to="/dashboard/browse">
            Browse Scrap <ArrowRight className="w-4 h-4 ml-2" />
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
                  <p className="text-xs text-primary mt-2">{stat.trend}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Listings */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Recommended Listings</CardTitle>
          <Button variant="ghost" asChild>
            <Link to="/dashboard/browse">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentListings.map((listing) => (
              <div 
                key={listing.id}
                className="group rounded-xl border border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-40 bg-muted overflow-hidden">
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {listing.material}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
                      {listing.quality}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {listing.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{listing.seller}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <p className="text-lg font-bold text-primary">{listing.price}</p>
                      <p className="text-xs text-muted-foreground">{listing.weight}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
