export type TabType = 'home' | 'travel' | 'hotels' | 'shop' | 'services';

export type RegionId = 'all' | 'hunza' | 'skardu' | 'gilgit' | 'ghizer' | 'astore' | 'nagar' | 'diamer';

export interface RegionInfo {
  id: RegionId;
  name: string;
  tagline: string;
  weather: string;
  temp: string;
  condition: string;
}

export interface RouteItem {
  id: string;
  title: string;
  from: string;
  to: string;
  routeVia: string;
  image: string;
  pricePerSeat: number;
  departureTime: string;
  duration: string;
  frequency: string;
  seatsLeft?: number;
  rating: number;
  reviewsCount: number;
  tags: string[];
  amenities: string[];
  operator: string;
}

export interface JeepItem {
  id: string;
  title: string;
  region: string;
  routesCovered: string;
  image: string;
  pricePerDay: number;
  driverName: string;
  driverExperience: string;
  driverAvatar?: string;
  rating: number;
  reviewsCount: number;
  badge: string;
  seats: number;
  luggage: string;
  acType: string;
  hasRoofRack: boolean;
  fuelPolicy: string;
  tagline: string;
}

export interface MountainPassStatus {
  id: string;
  title: string;
  subtitle: string;
  elevation: string;
  status: 'Open' | 'Clear' | 'Slow Move' | 'Caution' | 'Closed';
  conditionNote: string;
  type: 'pass' | 'highway' | 'border';
}

export interface StayItem {
  id: string;
  title: string;
  location: string;
  region: RegionId;
  image: string;
  gallery: string[];
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  badge: string;
  badgeType: 'luxury' | 'heritage' | 'budget';
  highDemand?: boolean;
  amenities: string[];
  tagNote: string;
  description: string;
}

export interface ProductItem {
  id: string;
  title: string;
  seller: string;
  category: 'dry-fruits' | 'shawls' | 'gemstones' | 'honey' | 'tech';
  image: string;
  price: number;
  originalPrice?: number;
  unit: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  stockNote: string;
  isOrganic?: boolean;
  isArtisan?: boolean;
}

export interface LocalExpertItem {
  id: string;
  name: string;
  title: string;
  category: 'roadside' | 'guide' | 'electrical' | 'medical' | 'plumbing';
  serviceType: string;
  location: string;
  phone: string;
  rating: number;
  status: string;
  is24x7?: boolean;
  verified: boolean;
  specialty: string;
  icon: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}
