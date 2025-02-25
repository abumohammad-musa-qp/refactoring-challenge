import { CustomerType } from "../types/CustomerType";
import { DiscountStrategy } from "../interfaces/DiscountStrategy";
import {
  RegularDiscount,
  PremiumDiscount,
  VIPDiscount,
} from "../strategies/discounts";

export class DiscountFactory {
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
