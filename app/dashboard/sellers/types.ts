export interface SellerUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isSeller: boolean;
  status: string;
  profilePicture: string | null;
}

export interface Seller {
  id: string;
  userId: string;
  businessName: string;
  ownerName: string;
  phone: string;
  cuisineTypes: string[];
  description: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  averageRating: number;
  reviewCount: number;
  status: string;
  createdAt: string;
  user: SellerUser;
  totalFoods: number;
  totalOrders: number;
}
