// Customer Type Enum
enum CustomerType {
  REGULAR = "REGULAR",
  PREMIUM = "PREMIUM",
  VIP = "VIP",
}

// Discount Strategy Interface
interface DiscountStrategy {
  calculateDiscount(amount: number): number;
}

// Concrete Discount Strategies
class RegularDiscount implements DiscountStrategy {
  calculateDiscount(amount: number): number {
    return amount * 0.05;
  }
}

class PremiumDiscount implements DiscountStrategy {
  calculateDiscount(amount: number): number {
    return amount * 0.1;
  }
}

class VIPDiscount implements DiscountStrategy {
  calculateDiscount(amount: number): number {
    return amount * 0.2;
  }
}

// Discount Factory
class DiscountFactory {
  static createDiscountStrategy(type: CustomerType): DiscountStrategy {
    switch (type) {
      case CustomerType.REGULAR:
        return new RegularDiscount();
      case CustomerType.PREMIUM:
        return new PremiumDiscount();
      case CustomerType.VIP:
        return new VIPDiscount();
      default:
        throw new Error("Invalid customer type");
    }
  }
}

// Customer class
class Customer {
  private readonly discountStrategy: DiscountStrategy;

  constructor(
    private readonly name: string,
    private readonly type: CustomerType
  ) {
    this.discountStrategy = DiscountFactory.createDiscountStrategy(type);
  }

  getName(): string {
    return this.name;
  }

  getDiscount(amount: number): number {
    return this.discountStrategy.calculateDiscount(amount);
  }
}

// Order Item Interface
interface OrderItem {
  name: string;
  price: number;
}

// Order class with improved structure
class Order {
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

// Order Summary Interface
interface OrderSummary {
  customerName: string;
  items: string[];
  totalPrice: number;
  discountedPrice: number;
}

// Order Management System with improved separation of concerns
class OrderManagementSystem {
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

// Run the order management system
OrderManagementSystem.main();
