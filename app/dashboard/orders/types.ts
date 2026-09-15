export interface OrderItem {
  foodId: string;
  foodName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  sellerId: string;
}

export interface Order {
  id: string;
  orderId: string;
  buyer: string;
  seller: string;
  item: string;
  total: string;
  payment: string;
  status: string;
  date: string;

  // New detailed fields
  items?: OrderItem[];
  childOrders?: Order[];
  contactPhone?: string;
  deliveryAddress?: {
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  note?: string;
  subTotal?: number;
  deliveryFee?: number;
  tax?: number;
  discount?: number;
}
