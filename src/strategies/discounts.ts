import { DiscountStrategy } from "../interfaces/DiscountStrategy";

export class RegularDiscount implements DiscountStrategy {
  calculateDiscount(amount: number): number {
    return amount * 0.05;
  }
}

export class PremiumDiscount implements DiscountStrategy {
  calculateDiscount(amount: number): number {
    return amount * 0.1;
  }
}

export class VIPDiscount implements DiscountStrategy {
  calculateDiscount(amount: number): number {
    return amount * 0.2;
  }
}
