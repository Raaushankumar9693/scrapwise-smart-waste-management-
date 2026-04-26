import { useParams, Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSellerById } from '@/data/users';
import { getListingsBySeller } from '@/data/listings';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Package,
  TrendingUp,
  MessageCircle,
  Phone,
} from 'lucide-react';

export default function SellerProfile() {
  const { id } = useParams<{ id: string }>();

  const seller = id ? getSellerById(id) : undefined;
  const listings = id ? getListingsBySeller(id).filter(l => l.status === 'active') : [];

  if (!seller) {
    return (
      <DashboardLayout>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-foreground mb-2">Seller Not Found</h2>
          <p className="text-muted-foreground mb-4">The seller profile you're looking for doesn't exist.</p>
          <Button variant="hero" asChild>
            <Link to="/dashboard/browse">Browse Listings</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <Button variant="ghost" asChild className="mb-2">
          <Link to="/dashboard/browse">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Link>
        </Button>

        {/* Seller Header */}
        <Card className="border-border/50 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20" />
          <CardContent className="relative pt-0">
            <div className="flex flex-col md:flex-row gap-6 -mt-16">
              <div className="w-32 h-32 rounded-2xl bg-primary/10 border-4 border-background flex items-center justify-center text-4xl font-bold text-primary shrink-0">
                {seller.name.charAt(0)}
              </div>
              <div className="flex-1 pt-4 md:pt-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold text-foreground">{seller.name}</h1>
                      {seller.isVerified && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          <ShieldCheck className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {seller.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Member since {new Date(seller.memberSince).getFullYear()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="hero">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats & Bio */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-1 text-3xl font-bold text-primary">
                <Star className="w-7 h-7 fill-accent text-accent" />
                {seller.rating}
              </div>
              <p className="text-muted-foreground mt-1">{seller.totalReviews} Reviews</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-3xl font-bold text-primary">
                <TrendingUp className="w-7 h-7" />
                ₹{(seller.totalSales / 1000).toFixed(0)}K
              </div>
              <p className="text-muted-foreground mt-1">Total Sales</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-3xl font-bold text-primary">
                <Package className="w-7 h-7" />
                {seller.totalListings}
              </div>
              <p className="text-muted-foreground mt-1">Active Listings</p>
            </CardContent>
          </Card>
        </div>

        {/* About */}
        <Card className="border-border/50">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">About</h2>
            <p className="text-muted-foreground">{seller.bio}</p>
            <p className="text-sm text-muted-foreground mt-4 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {seller.responseTime}
            </p>
          </CardContent>
        </Card>

        {/* Listings */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Active Listings ({listings.length})</h2>
          {listings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((listing) => (
                <Link
                  key={listing.id}
                  to={`/listing/${listing.id}`}
                  className="group rounded-xl border border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-40 bg-muted overflow-hidden">
                    <img
                      src={listing.images[0]}
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
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-lg font-bold text-primary">{listing.priceDisplay}</p>
                      <p className="text-xs text-muted-foreground">{listing.weight}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="border-border/50">
              <CardContent className="py-12 text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No active listings from this seller.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
