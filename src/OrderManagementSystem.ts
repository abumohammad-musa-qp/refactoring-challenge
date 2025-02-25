import { CustomerType } from "./types/CustomerType";
import { Customer } from "./models/Customer";
import { Order } from "./models/Order";
import { OrderSummary } from "./interfaces/OrderItem";

export class OrderManagementSystem {
  static main(): void {
    const customer = new Customer("John Doe", CustomerType.VIP);
    const order = new Order(customer);

    order.addItem("Laptop", 1000);
    order.addItem("Mouse", 50);
    order.addItem("Keyboard", 80);

    const orderSummary = order.getOrderSummary();
    OrderManagementSystem.printOrderSummary(orderSummary);
    OrderManagementSystem.generateInvoice(orderSummary);
  }

  private static printOrderSummary(summary: OrderSummary): void {
    console.log(`Customer: ${summary.customerName}`);
    console.log(`Items: ${summary.items.join(", ")}`);
    console.log(`Total Price: ${summary.totalPrice}`);
    console.log(`Discounted Price: ${summary.discountedPrice}`);
  }

  private static generateInvoice(summary: OrderSummary): void {
    console.log("\nGenerating Invoice...");
    console.log(`Customer: ${summary.customerName}`);
    console.log(`Total: $${summary.totalPrice}`);
    console.log(`Discounted Total: $${summary.discountedPrice}`);
    console.log(`Items: ${summary.items.join(", ")}`);
    console.log("Thank you for shopping with us!");
  }
}
