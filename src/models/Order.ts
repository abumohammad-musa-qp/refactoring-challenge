import { Customer } from "./Customer";
import { OrderItem, OrderSummary } from "../interfaces/OrderItem";

export class Order {
  private readonly items: OrderItem[] = [];

  constructor(private readonly customer: Customer) {}

  addItem(item: string, price: number): void {
    this.items.push({ name: item, price });
  }

  getOrderSummary(): OrderSummary {
    const totalPrice = this.getTotalPrice();
    const discountedPrice = this.applyDiscount(totalPrice);
    return {
      customerName: this.customer.getName(),
      items: this.items.map((item) => item.name),
      totalPrice,
      discountedPrice,
    };
  }

  private getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  private applyDiscount(totalPriceAmount: number): number {
    const discount = this.customer.getDiscount(totalPriceAmount);
    return totalPriceAmount - discount;
  }
}
