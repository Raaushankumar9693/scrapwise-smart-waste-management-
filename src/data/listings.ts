export interface Listing {
  id: string;
  title: string;
  description: string;
  material: string;
  weight: string;
  price: number;
  priceDisplay: string;
  quality: string;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  sellerPhone: string;
  location: string;
  status: 'active' | 'pending' | 'sold' | 'rejected';
  views: number;
  inquiries: number;
  images: string[];
  aiValuation: number;
  createdAt: string;
}

export const listings: Listing[] = [
  {
    id: '1',
    title: 'Mixed Metal Scrap',
    description: 'High-quality mixed metal scrap including iron, steel, and aluminum. Clean and sorted, ready for recycling. Minimal contamination, ideal for industrial use.',
    material: 'Metal',
    weight: '50 kg',
    price: 2500,
    priceDisplay: '₹2,500',
    quality: 'Grade A',
    sellerId: '2',
    sellerName: 'MetalWorks Co.',
    sellerRating: 4.8,
    sellerPhone: '+91 9876543210',
    location: 'Mumbai',
    status: 'active',
    views: 145,
    inquiries: 8,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
    ],
    aiValuation: 2400,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Copper Wire Bundle',
    description: 'Premium copper wire scrap from electrical installations. Stripped and clean, high copper content. Perfect for copper recycling and smelting.',
    material: 'Copper',
    weight: '20 kg',
    price: 8000,
    priceDisplay: '₹8,000',
    quality: 'Grade A',
    sellerId: '3',
    sellerName: 'ElectroScrap',
    sellerRating: 4.9,
    sellerPhone: '+91 9876543211',
    location: 'Delhi',
    status: 'active',
    views: 234,
    inquiries: 15,
    images: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    ],
    aiValuation: 7800,
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    title: 'Aluminum Cans',
    description: 'Crushed aluminum beverage cans, cleaned and compacted. Excellent for aluminum recycling. Bulk quantity available.',
    material: 'Aluminum',
    weight: '30 kg',
    price: 1800,
    priceDisplay: '₹1,800',
    quality: 'Grade B',
    sellerId: '4',
    sellerName: 'GreenRecycle',
    sellerRating: 4.7,
    sellerPhone: '+91 9876543212',
    location: 'Bangalore',
    status: 'active',
    views: 89,
    inquiries: 5,
    images: [
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
    ],
    aiValuation: 1750,
    createdAt: '2024-01-13',
  },
  {
    id: '4',
    title: 'Iron Pipes',
    description: 'Used iron pipes from construction site. Various sizes available. Good condition, suitable for reuse or recycling.',
    material: 'Iron',
    weight: '100 kg',
    price: 4500,
    priceDisplay: '₹4,500',
    quality: 'Grade A',
    sellerId: '5',
    sellerName: 'SteelHub',
    sellerRating: 4.6,
    sellerPhone: '+91 9876543213',
    location: 'Chennai',
    status: 'active',
    views: 167,
    inquiries: 12,
    images: [
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800',
    ],
    aiValuation: 4400,
    createdAt: '2024-01-12',
  },
  {
    id: '5',
    title: 'E-Waste Bundle',
    description: 'Electronic waste including old computers, monitors, and peripherals. Contains valuable components for e-waste recycling.',
    material: 'E-Waste',
    weight: '15 kg',
    price: 5200,
    priceDisplay: '₹5,200',
    quality: 'Mixed',
    sellerId: '6',
    sellerName: 'TechRecycle',
    sellerRating: 4.8,
    sellerPhone: '+91 9876543214',
    location: 'Pune',
    status: 'active',
    views: 201,
    inquiries: 18,
    images: [
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800',
    ],
    aiValuation: 5000,
    createdAt: '2024-01-11',
  },
  {
    id: '6',
    title: 'Cardboard Boxes',
    description: 'Large quantity of cardboard boxes from warehouse. Flattened and bundled. Clean and dry, ready for paper recycling.',
    material: 'Paper',
    weight: '200 kg',
    price: 2000,
    priceDisplay: '₹2,000',
    quality: 'Grade B',
    sellerId: '7',
    sellerName: 'PaperMart',
    sellerRating: 4.5,
    sellerPhone: '+91 9876543215',
    location: 'Hyderabad',
    status: 'active',
    views: 78,
    inquiries: 4,
    images: [
      'https://images.unsplash.com/photo-1607473129014-0afb7ed09c3a?w=800',
    ],
    aiValuation: 1900,
    createdAt: '2024-01-10',
  },
  {
    id: '7',
    title: 'Plastic Containers',
    description: 'HDPE plastic containers and drums. Food-grade quality, can be reused or recycled. Various sizes available.',
    material: 'Plastic',
    weight: '40 kg',
    price: 800,
    priceDisplay: '₹800',
    quality: 'Grade A',
    sellerId: '2',
    sellerName: 'MetalWorks Co.',
    sellerRating: 4.8,
    sellerPhone: '+91 9876543210',
    location: 'Mumbai',
    status: 'sold',
    views: 312,
    inquiries: 22,
    images: [
      'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800',
    ],
    aiValuation: 750,
    createdAt: '2024-01-08',
  },
  {
    id: '8',
    title: 'Glass Bottles',
    description: 'Sorted glass bottles including clear, green, and brown glass. Clean and label-free. Bulk quantity for glass recycling.',
    material: 'Glass',
    weight: '60 kg',
    price: 600,
    priceDisplay: '₹600',
    quality: 'Grade B',
    sellerId: '4',
    sellerName: 'GreenRecycle',
    sellerRating: 4.7,
    sellerPhone: '+91 9876543212',
    location: 'Bangalore',
    status: 'pending',
    views: 45,
    inquiries: 2,
    images: [
      'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800',
    ],
    aiValuation: 580,
    createdAt: '2024-01-18',
  },
];

export const getListingById = (id: string): Listing | undefined => {
  return listings.find(l => l.id === id);
};

export const getListingsBySeller = (sellerId: string): Listing[] => {
  return listings.filter(l => l.sellerId === sellerId);
};

export const getSimilarListings = (listing: Listing, limit = 3): Listing[] => {
  return listings
    .filter(l => l.id !== listing.id && l.material === listing.material && l.status === 'active')
    .slice(0, limit);
};
