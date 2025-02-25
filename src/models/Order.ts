import { Customer } from "./Customer";
import { OrderItem, OrderSummary } from "../interfaces/OrderItem";

export class Order {
  private readonly items: OrderItem[] = [];
  private totalPrice: number = 0;
  private discountedPrice: number = 0;

  constructor(private readonly customer: Customer) {}

  addItem(item: string, price: number): void {
    this.items.push({ name: item, price });
    this.calculateTotal();
  }

  private calculateTotal(): void {
    this.totalPrice = this.items.reduce((sum, item) => sum + item.price, 0);
    this.applyDiscount();
  }

  private applyDiscount(): void {
    const discount = this.customer.getDiscount(this.totalPrice);
    this.discountedPrice = this.totalPrice - discount;
  }

  getOrderSummary(): OrderSummary {
    return {
      customerName: this.customer.getName(),
      items: this.items.map((item) => item.name),
      totalPrice: this.totalPrice,
      discountedPrice: this.discountedPrice,
    };
  }
}
