import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MoreVertical, Shield, ShieldOff, Mail } from 'lucide-react';

const users = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', role: 'seller', status: 'active', joined: '2024-01-15', transactions: 45, revenue: '₹2,45,000' },
  { id: 2, name: 'Priya Patel', email: 'priya@example.com', role: 'buyer', status: 'active', joined: '2024-01-12', transactions: 23, revenue: '₹1,12,000' },
  { id: 3, name: 'Amit Kumar', email: 'amit@example.com', role: 'seller', status: 'suspended', joined: '2024-01-10', transactions: 8, revenue: '₹45,000' },
  { id: 4, name: 'Sneha Reddy', email: 'sneha@example.com', role: 'buyer', status: 'active', joined: '2024-01-08', transactions: 56, revenue: '₹3,20,000' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', role: 'seller', status: 'active', joined: '2024-01-05', transactions: 89, revenue: '₹5,67,000' },
];

const roleColors: Record<string, string> = {
  seller: 'bg-primary/10 text-primary',
  buyer: 'bg-accent/10 text-accent',
  admin: 'bg-destructive/10 text-destructive',
};

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage platform users and permissions</p>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        <Card className="border-border/50">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">User</th>
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Role</th>
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Transactions</th>
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Revenue</th>
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Joined</th>
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${roleColors[user.role]}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">{user.transactions}</td>
                      <td className="py-4 px-6 font-semibold text-primary">{user.revenue}</td>
                      <td className="py-4 px-6 text-muted-foreground">{user.joined}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            {user.status === 'active' ? (
                              <ShieldOff className="w-4 h-4 text-destructive" />
                            ) : (
                              <Shield className="w-4 h-4 text-primary" />
                            )}
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
