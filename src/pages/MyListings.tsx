import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const listings = [
  { id: 1, title: 'Iron Scrap Bundle', material: 'Iron', weight: '100 kg', price: '₹4,500', status: 'active', views: 45, inquiries: 3, createdAt: '2024-01-15' },
  { id: 2, title: 'Electronic Waste', material: 'E-waste', weight: '25 kg', price: '₹3,200', status: 'pending', views: 28, inquiries: 1, createdAt: '2024-01-14' },
  { id: 3, title: 'Paper & Cardboard', material: 'Paper', weight: '80 kg', price: '₹1,600', status: 'active', views: 67, inquiries: 5, createdAt: '2024-01-12' },
  { id: 4, title: 'Plastic Containers', material: 'Plastic', weight: '40 kg', price: '₹800', status: 'sold', views: 92, inquiries: 8, createdAt: '2024-01-10' },
  { id: 5, title: 'Copper Wire Bundle', material: 'Copper', weight: '15 kg', price: '₹6,000', status: 'active', views: 124, inquiries: 12, createdAt: '2024-01-08' },
];

const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'outline'; label: string }> = {
  active: { variant: 'default', label: 'Active' },
  pending: { variant: 'secondary', label: 'Pending Review' },
  sold: { variant: 'outline', label: 'Sold' },
};

export default function MyListings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Listings</h1>
            <p className="text-muted-foreground mt-1">Manage your scrap listings</p>
          </div>
          <Button variant="hero" asChild>
            <Link to="/dashboard/upload">
              <Plus className="w-4 h-4 mr-2" /> New Listing
            </Link>
          </Button>
        </div>

        <Card className="border-border/50">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Item</th>
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Material</th>
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Weight</th>
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Price</th>
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Stats</th>
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing) => (
                    <tr key={listing.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-foreground">{listing.title}</p>
                          <p className="text-sm text-muted-foreground">{listing.createdAt}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                          {listing.material}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">{listing.weight}</td>
                      <td className="py-4 px-6 font-semibold text-primary">{listing.price}</td>
                      <td className="py-4 px-6">
                        <Badge variant={statusConfig[listing.status].variant}>
                          {statusConfig[listing.status].label}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {listing.views}
                          </div>
                          <span>{listing.inquiries} inquiries</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
