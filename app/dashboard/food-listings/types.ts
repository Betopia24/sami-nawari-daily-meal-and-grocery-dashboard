export interface Food {
  id: string;
  name: string;
  seller: string;
  sellerEmail?: string;
  sellerProfilePicture?: string;
  sellerCuisineTypes?: string[];
  category: string;
  subcategory?: string;
  price: string;
  status: string;
  description?: string;
  images?: string[];
  preparationTime?: string;
  ingredients?: { name: string; quantity: number; unit: string }[];
  pickupAvailable?: boolean;
  deliveryAvailable?: boolean;
  deliveryFee?: number;
  createdAt?: string;
}
