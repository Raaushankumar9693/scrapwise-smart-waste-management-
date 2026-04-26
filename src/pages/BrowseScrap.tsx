import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { listings as allListings } from '@/data/listings';
import { Search, MapPin, Star, MessageCircle } from 'lucide-react';

const activeListings = allListings.filter(l => l.status === 'active');
const materials = ['All', 'Metal', 'Copper', 'Aluminum', 'Iron', 'E-Waste', 'Paper', 'Plastic'];

export default function BrowseScrap() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('All');

  const filteredListings = activeListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMaterial = selectedMaterial === 'All' || listing.material === selectedMaterial;
    return matchesSearch && matchesMaterial;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Browse Scrap</h1>
          <p className="text-muted-foreground mt-1">Find quality scrap materials from verified sellers</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by item or seller..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {materials.map((material) => (
              <Button
                key={material}
                variant={selectedMaterial === material ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedMaterial(material)}
                className="whitespace-nowrap"
              >
                {material}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <Link to={`/listing/${listing.id}`} className="h-48 bg-muted overflow-hidden block">
                <img 
                  src={listing.images[0]} 
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {listing.material}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
                    {listing.quality}
                  </span>
                </div>
                
                <Link to={`/listing/${listing.id}`}>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
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
                
                <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {listing.location}
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                  <div>
                    <p className="text-xl font-bold text-primary">{listing.priceDisplay}</p>
                    <p className="text-xs text-muted-foreground">{listing.weight}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/dashboard/messages?listing=${listing.id}`}>
                        <MessageCircle className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="hero" asChild>
                      <Link to={`/listing/${listing.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No listings found matching your criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
