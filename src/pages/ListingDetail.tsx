import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useSavedItems } from '@/contexts/SavedItemsContext';
import { useToast } from '@/hooks/use-toast';
import { getListingById, getSimilarListings } from '@/data/listings';
import { getSellerById } from '@/data/users';
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Star,
  ShoppingCart,
  MessageCircle,
  Phone,
  ShieldCheck,
  Clock,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart, isInCart } = useCart();
  const { addToSaved, removeFromSaved, isSaved } = useSavedItems();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const listing = id ? getListingById(id) : undefined;
  const seller = listing ? getSellerById(listing.sellerId) : undefined;
  const similarListings = listing ? getSimilarListings(listing) : [];

  if (!listing) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <h2 className="text-2xl font-bold text-foreground mb-2">Listing Not Found</h2>
          <p className="text-muted-foreground mb-4">The listing you're looking for doesn't exist.</p>
          <Button variant="hero" asChild>
            <Link to="/dashboard/browse">Browse Listings</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const handleAddToCart = () => {
    addToCart(listing);
    toast({
      title: 'Added to Cart',
      description: `${listing.title} has been added to your cart.`,
    });
  };

  const handleToggleSaved = () => {
    if (isSaved(listing.id)) {
      removeFromSaved(listing.id);
      toast({ title: 'Removed from Saved', description: 'Listing removed from your saved items.' });
    } else {
      addToSaved(listing);
      toast({ title: 'Saved!', description: 'Listing added to your saved items.' });
    }
  };

  const priceDifference = listing.price - listing.aiValuation;
  const priceComparison = priceDifference > 0 ? 'above' : priceDifference < 0 ? 'below' : 'at';

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
              <img
                src={listing.images[currentImageIndex]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              {listing.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? listing.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === listing.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleToggleSaved}
                  className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
                    isSaved(listing.id) ? 'bg-destructive text-destructive-foreground' : 'bg-background/80 hover:bg-background'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isSaved(listing.id) ? 'fill-current' : ''}`} />
                </button>
                <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            {listing.images.length > 1 && (
              <div className="flex gap-2">
                {listing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Listing Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{listing.material}</Badge>
                <Badge variant="outline">{listing.quality}</Badge>
                {listing.status === 'sold' && <Badge variant="destructive">Sold</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-foreground">{listing.title}</h1>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{listing.location}</span>
                <span>•</span>
                <span>{listing.weight}</span>
              </div>
            </div>

            {/* Price Section */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Asking Price</p>
                    <p className="text-4xl font-bold text-primary">{listing.priceDisplay}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">AI Valuation</p>
                    <p className="text-xl font-semibold text-foreground">₹{listing.aiValuation.toLocaleString()}</p>
                    <p className={`text-xs flex items-center gap-1 justify-end ${priceDifference > 0 ? 'text-destructive' : 'text-primary'}`}>
                      <TrendingUp className="w-3 h-3" />
                      {Math.abs(priceDifference).toLocaleString()} {priceComparison} AI estimate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {listing.status !== 'sold' && (
                <>
                  <Button
                    variant="hero"
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={isInCart(listing.id)}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {isInCart(listing.id) ? 'In Cart' : 'Add to Cart'}
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to={`/dashboard/messages?listing=${listing.id}`}>
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Inquire
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground">{listing.description}</p>
            </div>

            {/* Seller Info */}
            {seller && (
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-xl">
                      {seller.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Link to={`/seller/${seller.id}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                          {seller.name}
                        </Link>
                        {seller.isVerified && (
                          <ShieldCheck className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          {seller.rating} ({seller.totalReviews} reviews)
                        </span>
                        <span>•</span>
                        <span>{seller.city}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {seller.responseTime}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Similar Listings */}
        {similarListings.length > 0 && (
          <div className="pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Similar Listings</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {similarListings.map((item) => (
                <Link
                  key={item.id}
                  to={`/listing/${item.id}`}
                  className="group rounded-xl border border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-40 bg-muted overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.sellerName}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-lg font-bold text-primary">{item.priceDisplay}</p>
                      <p className="text-xs text-muted-foreground">{item.weight}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
