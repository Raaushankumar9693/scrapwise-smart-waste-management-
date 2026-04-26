import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSavedItems } from '@/contexts/SavedItemsContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Heart, ShoppingCart, Trash2, MapPin, Star } from 'lucide-react';

export default function SavedItems() {
  const { savedItems, removeFromSaved } = useSavedItems();
  const { addToCart, isInCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (listing: typeof savedItems[0]) => {
    addToCart(listing);
    toast({
      title: 'Added to Cart',
      description: `${listing.title} has been added to your cart.`,
    });
  };

  if (savedItems.length === 0) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Saved Items</h1>
          <Card className="border-border/50">
            <CardContent className="py-16 text-center">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No saved items yet</h3>
              <p className="text-muted-foreground mb-6">
                Save listings you're interested in by clicking the heart icon.
              </p>
              <Button variant="hero" asChild>
                <Link to="/dashboard/browse">Browse Listings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Saved Items</h1>
            <p className="text-muted-foreground mt-1">{savedItems.length} items saved</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedItems.map((listing) => (
            <Card key={listing.id} className="border-border/50 overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 bg-muted overflow-hidden">
                <Link to={`/listing/${listing.id}`}>
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <button
                  onClick={() => removeFromSaved(listing.id)}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
                {listing.status === 'sold' && (
                  <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                    <span className="text-background font-bold text-lg">SOLD</span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {listing.material}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
                    {listing.quality}
                  </span>
                </div>
                <Link to={`/listing/${listing.id}`} className="block">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {listing.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <span>{listing.sellerName}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    {listing.sellerRating}
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {listing.location}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                  <div>
                    <p className="text-xl font-bold text-primary">{listing.priceDisplay}</p>
                    <p className="text-xs text-muted-foreground">{listing.weight}</p>
                  </div>
                  {listing.status !== 'sold' && (
                    <Button
                      size="sm"
                      variant={isInCart(listing.id) ? 'outline' : 'hero'}
                      onClick={() => handleAddToCart(listing)}
                      disabled={isInCart(listing.id)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      {isInCart(listing.id) ? 'In Cart' : 'Add'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
