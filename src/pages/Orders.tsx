import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Package, Truck, CheckCircle, Clock, MessageCircle } from 'lucide-react';

const buyerOrders = [
  { id: 'ORD-001', item: 'Copper Wire Bundle', seller: 'ElectroScrap', amount: '₹8,000', status: 'delivered', date: '2024-01-18' },
  { id: 'ORD-002', item: 'Mixed Metal Scrap', seller: 'MetalWorks Co.', amount: '₹2,500', status: 'in_transit', date: '2024-01-17' },
  { id: 'ORD-003', item: 'Aluminum Cans', seller: 'GreenRecycle', amount: '₹1,800', status: 'processing', date: '2024-01-16' },
];

const sellerOrders = [
  { id: 'ORD-101', item: 'Iron Scrap Bundle', buyer: 'MetalMart Industries', amount: '₹4,500', status: 'pending_pickup', date: '2024-01-18' },
  { id: 'ORD-102', item: 'Paper & Cardboard', buyer: 'RecycleHub', amount: '₹1,600', status: 'completed', date: '2024-01-15' },
  { id: 'ORD-103', item: 'Copper Wire Bundle', buyer: 'ElectroBuyers', amount: '₹6,000', status: 'in_transit', date: '2024-01-14' },
];

const statusConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  processing: { icon: Clock, label: 'Processing', color: 'bg-accent/10 text-accent' },
  pending_pickup: { icon: Package, label: 'Pending Pickup', color: 'bg-accent/10 text-accent' },
  in_transit: { icon: Truck, label: 'In Transit', color: 'bg-primary/10 text-primary' },
  delivered: { icon: CheckCircle, label: 'Delivered', color: 'bg-primary/10 text-primary' },
  completed: { icon: CheckCircle, label: 'Completed', color: 'bg-primary/10 text-primary' },
};

export default function Orders() {
  const { user } = useAuth();
  const orders = user?.role === 'seller' ? sellerOrders : buyerOrders;
  const isSellerView = user?.role === 'seller';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
          <p className="text-muted-foreground mt-1">
            {isSellerView ? 'Track your sales and manage deliveries' : 'Track your purchases and deliveries'}
          </p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon;
            return (
              <Card key={order.id} className="border-border/50 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-muted-foreground">{order.id}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${statusConfig[order.status].color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig[order.status].label}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{order.item}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isSellerView ? `Buyer: ${order.buyer}` : `Seller: ${order.seller}`}
                      </p>
                    </div>
                    
                    <div className="flex flex-col md:items-end gap-2">
                      <p className="text-xl font-bold text-primary">{order.amount}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Chat
                      </Button>
                      <Button variant="default" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {orders.length === 0 && (
          <Card className="border-border/50">
            <CardContent className="py-12 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No orders yet</h3>
              <p className="text-muted-foreground">
                {isSellerView 
                  ? 'When buyers purchase your listings, orders will appear here.'
                  : 'Start browsing scrap to make your first purchase.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
