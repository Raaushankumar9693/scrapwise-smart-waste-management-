export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  listingId?: string;
  listingTitle?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: [
      { id: '1', name: 'John Buyer' },
      { id: '2', name: 'MetalWorks Co.' },
    ],
    listingId: '1',
    listingTitle: 'Mixed Metal Scrap',
    lastMessage: 'Yes, the scrap is still available. When can you pick it up?',
    lastMessageTime: '2024-01-18 14:30',
    unreadCount: 2,
    messages: [
      { id: 'm1', senderId: '1', senderName: 'John Buyer', content: 'Hi, I am interested in the mixed metal scrap. Is it still available?', timestamp: '2024-01-18 14:00', isRead: true },
      { id: 'm2', senderId: '2', senderName: 'MetalWorks Co.', content: 'Yes, the scrap is still available. When can you pick it up?', timestamp: '2024-01-18 14:30', isRead: false },
    ],
  },
  {
    id: 'conv-2',
    participants: [
      { id: '1', name: 'John Buyer' },
      { id: '3', name: 'ElectroScrap' },
    ],
    listingId: '2',
    listingTitle: 'Copper Wire Bundle',
    lastMessage: 'Thank you for your purchase! I will prepare it for shipping.',
    lastMessageTime: '2024-01-17 11:00',
    unreadCount: 0,
    messages: [
      { id: 'm3', senderId: '1', senderName: 'John Buyer', content: 'I would like to purchase the copper wire bundle.', timestamp: '2024-01-17 10:00', isRead: true },
      { id: 'm4', senderId: '3', senderName: 'ElectroScrap', content: 'Great! Please proceed with the order. I will confirm once I receive it.', timestamp: '2024-01-17 10:30', isRead: true },
      { id: 'm5', senderId: '1', senderName: 'John Buyer', content: 'Order placed! Order ID: ORD-001', timestamp: '2024-01-17 10:45', isRead: true },
      { id: 'm6', senderId: '3', senderName: 'ElectroScrap', content: 'Thank you for your purchase! I will prepare it for shipping.', timestamp: '2024-01-17 11:00', isRead: true },
    ],
  },
  {
    id: 'conv-3',
    participants: [
      { id: '1', name: 'John Buyer' },
      { id: '4', name: 'GreenRecycle' },
    ],
    listingId: '3',
    listingTitle: 'Aluminum Cans',
    lastMessage: 'Can you offer a discount for bulk purchase?',
    lastMessageTime: '2024-01-18 09:15',
    unreadCount: 1,
    messages: [
      { id: 'm7', senderId: '1', senderName: 'John Buyer', content: 'Hello, I am interested in the aluminum cans. What is the minimum order quantity?', timestamp: '2024-01-18 09:00', isRead: true },
      { id: 'm8', senderId: '4', senderName: 'GreenRecycle', content: 'Hi! We accept orders from 20 kg onwards.', timestamp: '2024-01-18 09:10', isRead: true },
      { id: 'm9', senderId: '1', senderName: 'John Buyer', content: 'Can you offer a discount for bulk purchase?', timestamp: '2024-01-18 09:15', isRead: false },
    ],
  },
  {
    id: 'conv-4',
    participants: [
      { id: '2', name: 'Jane Seller' },
      { id: '8', name: 'MetalMart Industries' },
    ],
    listingId: '4',
    listingTitle: 'Iron Pipes',
    lastMessage: 'We would like to place an order for the iron pipes.',
    lastMessageTime: '2024-01-18 10:00',
    unreadCount: 1,
    messages: [
      { id: 'm10', senderId: '8', senderName: 'MetalMart Industries', content: 'We would like to place an order for the iron pipes.', timestamp: '2024-01-18 10:00', isRead: false },
    ],
  },
];

export const getConversationById = (id: string): Conversation | undefined => {
  return conversations.find(c => c.id === id);
};

export const getConversationsForUser = (userId: string): Conversation[] => {
  return conversations.filter(c => c.participants.some(p => p.id === userId));
};

export const getTotalUnreadCount = (userId: string): number => {
  return getConversationsForUser(userId).reduce((total, conv) => total + conv.unreadCount, 0);
};
