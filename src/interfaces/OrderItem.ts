export interface OrderItem {
  name: string;
  price: number;
}

export interface OrderSummary {
  customerName: string;
  items: string[];
  totalPrice: number;
  discountedPrice: number;
}
