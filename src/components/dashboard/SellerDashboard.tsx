import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, TrendingUp, Eye, DollarSign, ArrowRight, Upload, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Active Listings', value: '8', icon: Package, trend: '+3 this month' },
  { label: 'Total Earnings', value: '₹1,25,400', icon: DollarSign, trend: '+22% vs last month' },
  { label: 'Profile Views', value: '342', icon: Eye, trend: '+45 this week' },
  { label: 'Pending Orders', value: '5', icon: Clock, trend: '2 ready for pickup' },
];

const myListings = [
  { id: 1, title: 'Iron Scrap Bundle', material: 'Iron', weight: '100 kg', price: '₹4,500', status: 'active', views: 45, inquiries: 3 },
  { id: 2, title: 'Electronic Waste', material: 'E-waste', weight: '25 kg', price: '₹3,200', status: 'pending', views: 28, inquiries: 1 },
  { id: 3, title: 'Paper & Cardboard', material: 'Paper', weight: '80 kg', price: '₹1,600', status: 'active', views: 67, inquiries: 5 },
  { id: 4, title: 'Plastic Containers', material: 'Plastic', weight: '40 kg', price: '₹800', status: 'sold', views: 92, inquiries: 8 },
];

const statusColors: Record<string, string> = {
  active: 'bg-primary/10 text-primary',
  pending: 'bg-accent/10 text-accent',
  sold: 'bg-muted text-muted-foreground',
};

export function SellerDashboard() {
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
            Manage your scrap listings and track sales
          </p>
        </div>
        <Button variant="hero" asChild>
          <Link to="/dashboard/upload">
            <Upload className="w-4 h-4 mr-2" /> Upload New Scrap
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

      {/* AI Valuation CTA */}
      <Card className="gradient-hero text-primary-foreground border-0 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/50 blur-3xl" />
        </div>
        <CardContent className="p-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">AI-Powered Valuation</h3>
              <p className="text-primary-foreground/80">
                Upload a photo of your scrap and get instant price estimates powered by our AI model. 
                Fair, transparent, and accurate.
              </p>
            </div>
            <Button variant="accent" size="lg" asChild>
              <Link to="/dashboard/upload">
                Get Valuation <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* My Listings */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">My Listings</CardTitle>
          <Button variant="ghost" asChild>
            <Link to="/dashboard/listings">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Item</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Material</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Weight</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Views</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myListings.map((listing) => (
                  <tr key={listing.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-foreground">{listing.title}</td>
                    <td className="py-4 px-4 text-muted-foreground">{listing.material}</td>
                    <td className="py-4 px-4 text-muted-foreground">{listing.weight}</td>
                    <td className="py-4 px-4 font-semibold text-primary">{listing.price}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusColors[listing.status]}`}>
                        {listing.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {listing.views}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
