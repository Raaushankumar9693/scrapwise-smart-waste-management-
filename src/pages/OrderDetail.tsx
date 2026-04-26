import { useParams, Link, useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getOrderById } from '@/data/orders';
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  PartyPopper,
} from 'lucide-react';

const statusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  pending: { icon: Clock, color: 'bg-accent/10 text-accent', label: 'Pending Confirmation' },
  confirmed: { icon: CheckCircle, color: 'bg-primary/10 text-primary', label: 'Confirmed' },
  processing: { icon: Package, color: 'bg-accent/10 text-accent', label: 'Processing' },
  in_transit: { icon: Truck, color: 'bg-primary/10 text-primary', label: 'In Transit' },
  delivered: { icon: CheckCircle, color: 'bg-primary/10 text-primary', label: 'Delivered' },
  completed: { icon: CheckCircle, color: 'bg-primary/10 text-primary', label: 'Completed' },
  cancelled: { icon: Clock, color: 'bg-destructive/10 text-destructive', label: 'Cancelled' },
};

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isNewOrder = searchParams.get('new') === 'true';

  const order = id ? getOrderById(id) : undefined;

  if (!order) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          {isNewOrder ? (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <PartyPopper className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Order Placed Successfully!</h2>
                <p className="text-muted-foreground mb-2">Your order ID: <span className="font-mono font-bold text-primary">{id}</span></p>
                <p className="text-muted-foreground mb-6">You will receive updates on your order status via notifications.</p>
                <div className="flex gap-4 justify-center">
                  <Button variant="hero" asChild>
                    <Link to="/dashboard/orders">View All Orders</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/dashboard/browse">Continue Shopping</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-foreground mb-2">Order Not Found</h2>
              <p className="text-muted-foreground mb-4">The order you're looking for doesn't exist.</p>
              <Button variant="hero" asChild>
                <Link to="/dashboard/orders">View Orders</Link>
              </Button>
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }

  const StatusIcon = statusConfig[order.status]?.icon || Clock;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" asChild className="mb-2">
          <Link to="/dashboard/orders">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
          </Link>
        </Button>

        {/* Order Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{order.id}</h1>
            <p className="text-muted-foreground">Placed on {order.createdAt}</p>
          </div>
          <Badge className={`${statusConfig[order.status].color} text-sm px-4 py-2`}>
            <StatusIcon className="w-4 h-4 mr-2" />
            {statusConfig[order.status].label}
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Order Timeline */}
          <Card className="md:col-span-2 border-border/50">
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.trackingUpdates.map((update, index) => {
                  const isLast = index === order.trackingUpdates.length - 1;
                  const UpdateIcon = statusConfig[update.status]?.icon || CheckCircle;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isLast ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                        }`}>
                          <UpdateIcon className="w-5 h-5" />
                        </div>
                        {index < order.trackingUpdates.length - 1 && (
                          <div className="w-0.5 h-full bg-border my-2 min-h-[40px]" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className={`font-medium ${isLast ? 'text-primary' : 'text-foreground'}`}>
                          {update.message}
                        </p>
                        <p className="text-sm text-muted-foreground">{update.timestamp}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {order.status === 'delivered' && (
                <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border/50">
                  <p className="text-sm text-muted-foreground mb-2">Estimated Delivery</p>
                  <p className="font-semibold text-foreground">{order.estimatedDelivery}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Details Sidebar */}
          <div className="space-y-4">
            {/* Seller Info */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Seller</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-foreground">{order.sellerName}</p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-1" /> Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-1" /> Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Method</span>
                  <span className="text-foreground">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                    {order.paymentStatus}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order Items */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.listingId} className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <Link to={`/listing/${item.listingId}`} className="font-medium text-foreground hover:text-primary transition-colors">
                      {item.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.material} • {item.weight}</p>
                    <p className="text-lg font-bold text-primary mt-1">{item.priceDisplay}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border mt-6 pt-6">
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">{order.totalDisplay}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Section */}
        {order.status === 'completed' && order.review && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                Your Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= order.review!.rating ? 'fill-accent text-accent' : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <p className="text-foreground">{order.review.comment}</p>
              <p className="text-sm text-muted-foreground mt-2">Reviewed on {order.review.createdAt}</p>
            </CardContent>
          </Card>
        )}

        {order.status === 'delivered' && !order.review && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Rate your experience</h3>
                  <p className="text-sm text-muted-foreground">Help others by sharing your feedback</p>
                </div>
                <Button variant="hero">
                  <Star className="w-4 h-4 mr-2" />
                  Write Review
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
