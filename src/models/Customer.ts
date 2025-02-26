import { CustomerType } from "../types/CustomerType";
import { DiscountStrategy } from "../interfaces/DiscountStrategy";
import { DiscountFactory } from "../factories/DiscountFactory";

export class Customer {
  private readonly discountStrategy: DiscountStrategy;

  constructor(
    private readonly name: string,
    private readonly type: CustomerType
  ) {
    this.discountStrategy = DiscountFactory.getDiscountStrategy(this.type);
  }

  getName(): string {
    return this.name;
  }

  getDiscount(amount: number): number {
    return this.discountStrategy.calculateDiscount(amount);
  }
}
