import * as _ from 'lodash'

import Product, { SKU } from "../Product"
import PromotionRule from "./PromotionRule"

class DiscountRule extends PromotionRule {
  constructor(
    readonly name: string,
    readonly sku: SKU,
    readonly discountedPrice: number,
    readonly minQty: number
  ) {
    super(name)
  }

  execute(products: Product[]): Product[] {
    const [matched, unmatched] = _.partition(products, ['sku', this.sku])
    const discounted = matched.length >= this.minQty
      ? matched.map(p => this.applyDeal(p, this.discountedPrice))
      : matched
    return _.concat(discounted, unmatched)
  }
}

export default DiscountRule