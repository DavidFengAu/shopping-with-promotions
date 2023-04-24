import Product from "../Product"

abstract class PromotionRule {
  protected constructor(
    readonly name: string
  ) {
  }

  abstract execute(products: Product[]): Product[]

  protected applyDeal(product: Product, discountedPrice: number): Product {
    return product.applyPromotion({
      name: this.name,
      price: discountedPrice
    })
  }
}

export default PromotionRule