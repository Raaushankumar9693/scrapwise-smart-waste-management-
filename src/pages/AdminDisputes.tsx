import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, MessageCircle, User, Package, CheckCircle, XCircle, Clock } from 'lucide-react';

const disputes = [
  {
    id: 'D-001',
    title: 'Item not as described',
    description: 'Buyer claims the quality grade was misrepresented',
    buyer: 'John Buyer',
    seller: 'MetalWorks Co.',
    order: 'ORD-045',
    item: 'Copper Wire Bundle',
    amount: '₹8,000',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-17',
  },
  {
    id: 'D-002',
    title: 'Delayed delivery',
    description: 'Order not delivered within promised timeframe',
    buyer: 'RecycleHub',
    seller: 'PaperMart',
    order: 'ORD-078',
    item: 'Cardboard Boxes',
    amount: '₹2,000',
    status: 'investigating',
    priority: 'medium',
    createdAt: '2024-01-16',
  },
  {
    id: 'D-003',
    title: 'Payment not received',
    description: 'Seller claims payment was not received for COD order',
    buyer: 'MetalMart Industries',
    seller: 'SteelHub',
    order: 'ORD-092',
    item: 'Iron Pipes',
    amount: '₹4,500',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-01-14',
    resolution: 'Refund issued to buyer',
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  open: { label: 'Open', color: 'bg-destructive/10 text-destructive' },
  investigating: { label: 'Investigating', color: 'bg-accent/10 text-accent' },
  resolved: { label: 'Resolved', color: 'bg-primary/10 text-primary' },
};

const priorityConfig: Record<string, { label: string; color: string }> = {
  high: { label: 'High', color: 'bg-destructive text-destructive-foreground' },
  medium: { label: 'Medium', color: 'bg-accent text-accent-foreground' },
  low: { label: 'Low', color: 'bg-muted text-muted-foreground' },
};

export default function AdminDisputes() {
  const openDisputes = disputes.filter(d => d.status !== 'resolved');
  const resolvedDisputes = disputes.filter(d => d.status === 'resolved');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dispute Management</h1>
            <p className="text-muted-foreground mt-1">Handle buyer-seller disputes and resolutions</p>
          </div>
          <div className="flex items-center gap-4">
            <Card className="border-destructive/20 bg-destructive/5 px-4 py-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <span className="text-sm font-medium text-destructive">{openDisputes.length} Active</span>
              </div>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Disputes</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {openDisputes.length === 0 ? (
              <Card className="border-border/50">
                <CardContent className="py-12 text-center">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No active disputes</h3>
                  <p className="text-muted-foreground">All disputes have been resolved.</p>
                </CardContent>
              </Card>
            ) : (
              openDisputes.map((dispute) => (
                <Card key={dispute.id} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-sm text-muted-foreground">{dispute.id}</span>
                          <Badge className={statusConfig[dispute.status].color}>
                            {statusConfig[dispute.status].label}
                          </Badge>
                          <Badge className={priorityConfig[dispute.priority].color}>
                            {priorityConfig[dispute.priority].label} Priority
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{dispute.title}</h3>
                        <p className="text-muted-foreground mt-1">{dispute.description}</p>

                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div className="p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <User className="w-4 h-4" />
                              Buyer
                            </div>
                            <p className="font-medium text-foreground">{dispute.buyer}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <User className="w-4 h-4" />
                              Seller
                            </div>
                            <p className="font-medium text-foreground">{dispute.seller}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {dispute.item}
                          </span>
                          <span>•</span>
                          <span className="font-semibold text-primary">{dispute.amount}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {dispute.createdAt}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 md:w-48">
                        <Button variant="hero" className="w-full">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          View Thread
                        </Button>
                        <Button variant="outline" className="w-full">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Resolve
                        </Button>
                        <Button variant="destructive" className="w-full">
                          <XCircle className="w-4 h-4 mr-2" />
                          Escalate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            {resolvedDisputes.map((dispute) => (
              <Card key={dispute.id} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-sm text-muted-foreground">{dispute.id}</span>
                        <Badge className={statusConfig[dispute.status].color}>
                          {statusConfig[dispute.status].label}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{dispute.title}</h3>
                      <p className="text-muted-foreground mt-1">{dispute.description}</p>
                      <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="text-sm font-medium text-primary">Resolution: {dispute.resolution}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{dispute.amount}</p>
                      <p className="text-sm text-muted-foreground">{dispute.createdAt}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
