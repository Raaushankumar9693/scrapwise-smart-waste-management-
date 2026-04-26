export interface SellerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'buyer' | 'seller' | 'admin';
  address: string;
  city: string;
  rating: number;
  totalReviews: number;
  totalSales: number;
  totalListings: number;
  memberSince: string;
  isVerified: boolean;
  bio: string;
  responseTime: string;
}

export const sellers: SellerProfile[] = [
  {
    id: '2',
    name: 'MetalWorks Co.',
    email: 'metalworks@example.com',
    phone: '+91 9876543210',
    role: 'seller',
    address: '123 Industrial Area',
    city: 'Mumbai',
    rating: 4.8,
    totalReviews: 156,
    totalSales: 245000,
    totalListings: 12,
    memberSince: '2022-06-15',
    isVerified: true,
    bio: 'Leading metal scrap dealer in Mumbai with over 10 years of experience. We specialize in iron, steel, and aluminum scrap. Quality assured and fair pricing guaranteed.',
    responseTime: 'Usually responds within 2 hours',
  },
  {
    id: '3',
    name: 'ElectroScrap',
    email: 'electroscrap@example.com',
    phone: '+91 9876543211',
    role: 'seller',
    address: '456 Tech Park',
    city: 'Delhi',
    rating: 4.9,
    totalReviews: 234,
    totalSales: 567000,
    totalListings: 8,
    memberSince: '2021-03-20',
    isVerified: true,
    bio: 'Certified e-waste and copper scrap specialists. We ensure environmentally responsible recycling practices. Premium quality materials at competitive prices.',
    responseTime: 'Usually responds within 1 hour',
  },
  {
    id: '4',
    name: 'GreenRecycle',
    email: 'greenrecycle@example.com',
    phone: '+91 9876543212',
    role: 'seller',
    address: '789 Eco Street',
    city: 'Bangalore',
    rating: 4.7,
    totalReviews: 89,
    totalSales: 145000,
    totalListings: 15,
    memberSince: '2023-01-10',
    isVerified: true,
    bio: 'Your trusted partner for all recycling needs. Specializing in aluminum, glass, and plastic scrap. Committed to sustainable practices.',
    responseTime: 'Usually responds within 3 hours',
  },
  {
    id: '5',
    name: 'SteelHub',
    email: 'steelhub@example.com',
    phone: '+91 9876543213',
    role: 'seller',
    address: '321 Steel Complex',
    city: 'Chennai',
    rating: 4.6,
    totalReviews: 67,
    totalSales: 189000,
    totalListings: 6,
    memberSince: '2022-11-05',
    isVerified: false,
    bio: 'Specialized in iron and steel scrap. Direct from construction and demolition sites. Bulk orders welcome.',
    responseTime: 'Usually responds within 4 hours',
  },
  {
    id: '6',
    name: 'TechRecycle',
    email: 'techrecycle@example.com',
    phone: '+91 9876543214',
    role: 'seller',
    address: '567 IT Hub',
    city: 'Pune',
    rating: 4.8,
    totalReviews: 123,
    totalSales: 312000,
    totalListings: 10,
    memberSince: '2021-08-15',
    isVerified: true,
    bio: 'E-waste recycling experts. We handle all types of electronic scrap including computers, servers, and networking equipment. Certified data destruction services available.',
    responseTime: 'Usually responds within 2 hours',
  },
  {
    id: '7',
    name: 'PaperMart',
    email: 'papermart@example.com',
    phone: '+91 9876543215',
    role: 'seller',
    address: '890 Paper Mill Road',
    city: 'Hyderabad',
    rating: 4.5,
    totalReviews: 45,
    totalSales: 78000,
    totalListings: 5,
    memberSince: '2023-04-20',
    isVerified: false,
    bio: 'Paper and cardboard recycling specialists. Bulk quantities available from warehouses and factories. Eco-friendly packaging solutions.',
    responseTime: 'Usually responds within 6 hours',
  },
];

export const getSellerById = (id: string): SellerProfile | undefined => {
  return sellers.find(s => s.id === id);
};
