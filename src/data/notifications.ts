export interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'message' | 'listing' | 'system';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export const notifications: Notification[] = [
  {
    id: 'n1',
    userId: '1',
    type: 'order',
    title: 'Order Delivered',
    message: 'Your order ORD-001 has been delivered successfully.',
    link: '/dashboard/order/ORD-001',
    isRead: false,
    createdAt: '2024-01-18 11:30',
  },
  {
    id: 'n2',
    userId: '1',
    type: 'message',
    title: 'New Message',
    message: 'MetalWorks Co. sent you a message about Mixed Metal Scrap.',
    link: '/dashboard/messages/conv-1',
    isRead: false,
    createdAt: '2024-01-18 14:30',
  },
  {
    id: 'n3',
    userId: '1',
    type: 'order',
    title: 'Order In Transit',
    message: 'Your order ORD-002 is now in transit.',
    link: '/dashboard/order/ORD-002',
    isRead: true,
    createdAt: '2024-01-18 16:00',
  },
  {
    id: 'n4',
    userId: '2',
    type: 'order',
    title: 'New Order Received',
    message: 'You have received a new order ORD-101 for Iron Pipes.',
    link: '/dashboard/order/ORD-101',
    isRead: false,
    createdAt: '2024-01-18 10:00',
  },
  {
    id: 'n5',
    userId: '2',
    type: 'listing',
    title: 'Listing Approved',
    message: 'Your listing "Glass Bottles" has been approved.',
    link: '/dashboard/listings',
    isRead: false,
    createdAt: '2024-01-18 12:00',
  },
  {
    id: 'n6',
    userId: '2',
    type: 'message',
    title: 'New Inquiry',
    message: 'MetalMart Industries is interested in your Iron Pipes listing.',
    link: '/dashboard/messages/conv-4',
    isRead: false,
    createdAt: '2024-01-18 10:00',
  },
  {
    id: 'n7',
    userId: '1',
    type: 'system',
    title: 'Welcome to ScrapWise!',
    message: 'Start browsing scrap materials and make your first purchase.',
    link: '/dashboard/browse',
    isRead: true,
    createdAt: '2024-01-10 09:00',
  },
];

export const getNotificationsForUser = (userId: string): Notification[] => {
  return notifications.filter(n => n.userId === userId).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const getUnreadNotificationCount = (userId: string): number => {
  return notifications.filter(n => n.userId === userId && !n.isRead).length;
};
