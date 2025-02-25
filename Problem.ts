// The OrderManagementSystem handles customer orders, calculates prices, and applies discounts. However, the codebase is poorly designed, making it hard to maintain and extend.

class Customer {
  name: string;
  type: string; // "Regular", "Premium", "VIP"
  discount: number;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
    this.setDiscount();
  }

  setDiscount(): void {
    if (this.type === "Regular") {
      this.discount = 0.05;
    } else if (this.type === "Premium") {
      this.discount = 0.1;
    } else if (this.type === "VIP") {
      this.discount = 0.2;
    } else {
      this.discount = 0;
    }
  }
}

// Please do not refactor the order class

class Order {
  customer: Customer;
  items: string[];
  prices: number[];
  totalPrice: number;
  discountedPrice: number;

  constructor(customer: Customer) {
    this.customer = customer;
    this.items = [];
    this.prices = [];
    this.totalPrice = 0;
    this.discountedPrice = 0;
  }

  addItem(item: string, price: number): void {
    this.items.push(item);
    this.prices.push(price);
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalPrice = this.prices.reduce((sum, price) => sum + price, 0);
    this.applyDiscount();
  }

  applyDiscount(): void {
    this.discountedPrice =
      this.totalPrice - this.totalPrice * this.customer.discount;
  }

  printOrder(): void {
    console.log(`Customer: ${this.customer.name}`);
    console.log(`Items: ${this.items.join(", ")}`);
    console.log(`Total Price: ${this.totalPrice}`);
    console.log(`Discounted Price: ${this.discountedPrice}`);
  }
}

// Order Management System - Handles orders
class OrderManagementSystem {
  static main(): void {
    const customer = new Customer("John Doe", "VIP");
    const order = new Order(customer);

    order.addItem("Laptop", 1000);
    order.addItem("Mouse", 50);
    order.addItem("Keyboard", 80);

    order.printOrder();

    OrderManagementSystem.generateInvoice(order);
  }

  static generateInvoice(order: Order): void {
    console.log("Generating Invoice...");
    console.log(`Customer: ${order.customer.name}`);
    console.log(`Total: $${order.totalPrice}`);
    console.log(`Discounted Total: $${order.discountedPrice}`);
    console.log(`Items: ${order.items.join(", ")}`);
    console.log("Thank you for shopping with us!");
  }
}

// Run the order management system
OrderManagementSystem.main();
