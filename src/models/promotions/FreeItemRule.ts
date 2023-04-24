import * as _ from 'lodash'

import Product, { SKU } from "../Product"
import PromotionRule from "./PromotionRule"

class FreeItemRule extends PromotionRule {
  constructor(
    readonly name: string,
    readonly buySKU: SKU,
    readonly freeSKU: SKU
  ) {
    super(name)
  }

  execute(products: Product[]): Product[] {
    const buyQty = products.filter(({ sku }) => sku === this.buySKU).length
    const { discounted, unmatched } = products.reduce(({ discounted, unmatched }, p: Product) => {
      return p.sku === this.freeSKU && discounted.length < buyQty
        ? { discounted: _.concat(this.applyDeal(p, 0), discounted), unmatched }
        : { discounted, unmatched: _.concat(p, unmatched) }
    }, { discounted: new Array<Product>(), unmatched: new Array<Product>() })
    return _.concat(discounted, unmatched)
  }
}

export default FreeItemRule