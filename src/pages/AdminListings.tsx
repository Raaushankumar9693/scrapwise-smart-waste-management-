import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { listings } from '@/data/listings';
import { CheckCircle, XCircle, Eye, Flag, Search, MoreVertical } from 'lucide-react';
import { useState } from 'react';

const pendingListings = listings.filter(l => l.status === 'pending');
const activeListings = listings.filter(l => l.status === 'active');

export default function AdminListings() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Listing Moderation</h1>
          <p className="text-muted-foreground mt-1">Review and manage platform listings</p>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending" className="relative">
              Pending Review
              {pendingListings.length > 0 && (
                <span className="ml-2 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                  {pendingListings.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="active">Active Listings</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingListings.length === 0 ? (
              <Card className="border-border/50">
                <CardContent className="py-12 text-center">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No listings pending review.</p>
                </CardContent>
              </Card>
            ) : (
              pendingListings.map((listing) => (
                <Card key={listing.id} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted shrink-0">
                        <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{listing.material}</Badge>
                              <Badge variant="outline">{listing.quality}</Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground">{listing.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {listing.sellerName} • {listing.location}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{listing.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{listing.priceDisplay}</p>
                            <p className="text-sm text-muted-foreground">{listing.weight}</p>
                            <p className="text-xs text-muted-foreground mt-2">AI Valuation: ₹{listing.aiValuation.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="hero" size="sm">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button variant="destructive" size="sm">
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Flag className="w-4 h-4 mr-2" />
                            Flag
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="active">
            <Card className="border-border/50">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground">Listing</th>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground">Seller</th>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground">Price</th>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground">Views</th>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground">Created</th>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeListings.map((listing) => (
                        <tr key={listing.id} className="border-b border-border/50 hover:bg-muted/30">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                                <img src={listing.images[0]} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{listing.title}</p>
                                <p className="text-xs text-muted-foreground">{listing.material}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-muted-foreground">{listing.sellerName}</td>
                          <td className="py-4 px-6 font-semibold text-primary">{listing.priceDisplay}</td>
                          <td className="py-4 px-6 text-muted-foreground">{listing.views}</td>
                          <td className="py-4 px-6 text-muted-foreground">{listing.createdAt}</td>
                          <td className="py-4 px-6">
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flagged">
            <Card className="border-border/50">
              <CardContent className="py-12 text-center">
                <Flag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No flagged listings</h3>
                <p className="text-muted-foreground">Listings flagged for review will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
