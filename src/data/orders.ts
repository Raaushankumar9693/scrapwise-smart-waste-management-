export interface OrderItem {
  listingId: string;
  title: string;
  material: string;
  weight: string;
  price: number;
  priceDisplay: string;
  image: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  totalDisplay: string;
  status: 'pending' | 'confirmed' | 'processing' | 'in_transit' | 'delivered' | 'completed' | 'cancelled';
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  pickupAddress: string;
  deliveryAddress: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
  updatedAt: string;
  estimatedDelivery: string;
  trackingUpdates: {
    status: string;
    message: string;
    timestamp: string;
  }[];
  review?: {
    rating: number;
    comment: string;
    createdAt: string;
  };
}

export const orders: Order[] = [
  {
    id: 'ORD-001',
    items: [
      {
        listingId: '2',
        title: 'Copper Wire Bundle',
        material: 'Copper',
        weight: '20 kg',
        price: 8000,
        priceDisplay: '₹8,000',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400',
      },
    ],
    totalAmount: 8000,
    totalDisplay: '₹8,000',
    status: 'delivered',
    buyerId: '1',
    buyerName: 'John Buyer',
    sellerId: '3',
    sellerName: 'ElectroScrap',
    pickupAddress: '123 Seller Street, Delhi',
    deliveryAddress: '456 Buyer Lane, Mumbai',
    paymentMethod: 'UPI',
    paymentStatus: 'paid',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-18',
    estimatedDelivery: '2024-01-18',
    trackingUpdates: [
      { status: 'confirmed', message: 'Order confirmed by seller', timestamp: '2024-01-15 10:30' },
      { status: 'processing', message: 'Preparing for pickup', timestamp: '2024-01-16 09:00' },
      { status: 'in_transit', message: 'Package picked up, in transit', timestamp: '2024-01-17 14:00' },
      { status: 'delivered', message: 'Successfully delivered', timestamp: '2024-01-18 11:30' },
    ],
    review: {
      rating: 5,
      comment: 'Excellent quality copper wire! Fast delivery and great communication.',
      createdAt: '2024-01-19',
    },
  },
  {
    id: 'ORD-002',
    items: [
      {
        listingId: '1',
        title: 'Mixed Metal Scrap',
        material: 'Metal',
        weight: '50 kg',
        price: 2500,
        priceDisplay: '₹2,500',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      },
    ],
    totalAmount: 2500,
    totalDisplay: '₹2,500',
    status: 'in_transit',
    buyerId: '1',
    buyerName: 'John Buyer',
    sellerId: '2',
    sellerName: 'MetalWorks Co.',
    pickupAddress: '789 Metal Road, Mumbai',
    deliveryAddress: '456 Buyer Lane, Mumbai',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'paid',
    createdAt: '2024-01-17',
    updatedAt: '2024-01-18',
    estimatedDelivery: '2024-01-20',
    trackingUpdates: [
      { status: 'confirmed', message: 'Order confirmed by seller', timestamp: '2024-01-17 15:00' },
      { status: 'processing', message: 'Preparing for pickup', timestamp: '2024-01-18 08:00' },
      { status: 'in_transit', message: 'Package in transit to your location', timestamp: '2024-01-18 16:00' },
    ],
  },
  {
    id: 'ORD-003',
    items: [
      {
        listingId: '3',
        title: 'Aluminum Cans',
        material: 'Aluminum',
        weight: '30 kg',
        price: 1800,
        priceDisplay: '₹1,800',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400',
      },
    ],
    totalAmount: 1800,
    totalDisplay: '₹1,800',
    status: 'processing',
    buyerId: '1',
    buyerName: 'John Buyer',
    sellerId: '4',
    sellerName: 'GreenRecycle',
    pickupAddress: '321 Green Ave, Bangalore',
    deliveryAddress: '456 Buyer Lane, Mumbai',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'pending',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
    estimatedDelivery: '2024-01-22',
    trackingUpdates: [
      { status: 'confirmed', message: 'Order confirmed by seller', timestamp: '2024-01-18 09:00' },
      { status: 'processing', message: 'Seller is preparing the order', timestamp: '2024-01-18 14:00' },
    ],
  },
  {
    id: 'ORD-101',
    items: [
      {
        listingId: '4',
        title: 'Iron Pipes',
        material: 'Iron',
        weight: '100 kg',
        price: 4500,
        priceDisplay: '₹4,500',
        image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400',
      },
    ],
    totalAmount: 4500,
    totalDisplay: '₹4,500',
    status: 'pending',
    buyerId: '8',
    buyerName: 'MetalMart Industries',
    sellerId: '2',
    sellerName: 'Jane Seller',
    pickupAddress: '456 Seller Street, Chennai',
    deliveryAddress: '789 Industry Road, Chennai',
    paymentMethod: 'UPI',
    paymentStatus: 'pending',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
    estimatedDelivery: '2024-01-23',
    trackingUpdates: [
      { status: 'pending', message: 'Waiting for seller confirmation', timestamp: '2024-01-18 10:00' },
    ],
  },
  {
    id: 'ORD-102',
    items: [
      {
        listingId: '6',
        title: 'Cardboard Boxes',
        material: 'Paper',
        weight: '200 kg',
        price: 2000,
        priceDisplay: '₹2,000',
        image: 'https://images.unsplash.com/photo-1607473129014-0afb7ed09c3a?w=400',
      },
    ],
    totalAmount: 2000,
    totalDisplay: '₹2,000',
    status: 'completed',
    buyerId: '9',
    buyerName: 'RecycleHub',
    sellerId: '2',
    sellerName: 'Jane Seller',
    pickupAddress: '456 Seller Street, Hyderabad',
    deliveryAddress: '123 Recycle Blvd, Hyderabad',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'paid',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
    estimatedDelivery: '2024-01-14',
    trackingUpdates: [
      { status: 'confirmed', message: 'Order confirmed', timestamp: '2024-01-10 11:00' },
      { status: 'processing', message: 'Preparing order', timestamp: '2024-01-11 09:00' },
      { status: 'in_transit', message: 'In transit', timestamp: '2024-01-12 10:00' },
      { status: 'delivered', message: 'Delivered', timestamp: '2024-01-14 15:00' },
      { status: 'completed', message: 'Order completed', timestamp: '2024-01-15 10:00' },
    ],
    review: {
      rating: 4,
      comment: 'Good quality cardboard, quick delivery.',
      createdAt: '2024-01-15',
    },
  },
];

export const getOrderById = (id: string): Order | undefined => {
  return orders.find(o => o.id === id);
};

export const getOrdersByBuyer = (buyerId: string): Order[] => {
  return orders.filter(o => o.buyerId === buyerId);
};

export const getOrdersBySeller = (sellerId: string): Order[] => {
  return orders.filter(o => o.sellerId === sellerId);
};
