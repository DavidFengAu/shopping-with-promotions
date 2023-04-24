import { OrderDetail, ShortageDetail } from "../controllers/requests/CheckoutResponse"
import type { ProductDAO } from "../persistences/ProductsDAO"

export type SKU = string

type Promotion = {
  name: string
  price: number
}

class Product {
  constructor(
    readonly sku: SKU,
    readonly name: string,
    readonly price: number,
    readonly inventory: number,
    readonly promotion?: Promotion
  ) {
  }

  static fromDAO(dao: ProductDAO): Product {
    return new Product(dao.SKU, dao.Name, dao.Price, dao.Inventory)
  }

  applyPromotion(promotion: Promotion): Product {
    return new Product(this.sku, this.name, this.price, this.inventory, promotion)
  }

  getPrice(): number {
    return this.promotion?.price ?? this.price
  }

  toShortageDetail(requestQty: number): ShortageDetail {
    return {
      sku: this.sku,
      name: this.name,
      requestQty,
      inventory: this.inventory
    }
  }

  toOrderDetail(): OrderDetail {
    return {
      sku: this.sku,
      name: this.name,
      retailPrice: this.price,
      discountedPrice: this.getPrice() === this.price ? null : this.promotion?.price
    }
  }
}

export default Product