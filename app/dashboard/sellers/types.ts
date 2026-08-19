export interface Seller {
  id: number;
  kitchenName: string;
  ownerName: string;
  status: string;
  rating: number | null;
  orders: number;
  foods: number;
}
