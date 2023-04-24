import * as _ from 'lodash'

import Product, { SKU } from "../Product"
import PromotionRule from "./PromotionRule"

class EveryNForMRule extends PromotionRule {

  constructor(
    readonly name: string,
    readonly sku: SKU,
    readonly buyQty: number,
    readonly forQty: number
  ) {
    super(name)
  }

  execute(products: Product[]): Product[] {
    const [matched, unmatched] = _.partition(products, ['sku', this.sku])
    const discounted = _.chunk(matched, this.buyQty).flatMap((bundle: Product[]) => {
      return bundle.length === this.buyQty
        ? bundle.map((p, i) => this.applyDeal(p, i === 0 ? 0 : p.price))
        : bundle
    })
    return _.concat(discounted, unmatched)
  }
}

export default EveryNForMRule