import * as _ from 'lodash'

import type { CheckoutRequest,Order } from "../controllers/requests/CheckoutRequest"
import type {
  CheckoutFilledResponse,
  CheckoutUnfilledResponse,
  ShortageDetail
} from "../controllers/requests/CheckoutResponse"
import Product, { SKU } from "../models/Product"
import DiscountRule from "../models/promotions/DiscountRule"
import EveryNForMRule from "../models/promotions/EveryNForMRule"
import FreeItemRule from "../models/promotions/FreeItemRule"
import type PromotionRule from "../models/promotions/PromotionRule"
import type { ProductDAO } from "../persistences/ProductsDAO"

class CheckoutService {
  readonly promotionRules: PromotionRule[] = [
    new FreeItemRule("Buy a MacBook Pro get a free Raspberry Pi B", "43N23P", "234234"),
    new EveryNForMRule("Buy 3 Google Homes for the price of 2", "120P90", 3, 2),
    new DiscountRule("Alexa Speakers 10% discount", "A304SD", 109.50 * 0.9, 4)
  ]

  readonly stocks: { [key: SKU]: Product }

  constructor(readonly productsDTO: ProductDAO[]) {
    this.stocks = _.fromPairs(productsDTO.map(dto => ([dto.SKU, Product.fromDAO(dto)])))
  }

  private checkInventory(orders: Order[]): ShortageDetail[] {
    return orders.filter(({ sku, quantity }) => this.stocks[sku].inventory < quantity)
      .map(({ sku, quantity }) => this.stocks[sku].toShortageDetail(quantity))
  }

  private reserveProducts(orders: Order[]): Product[] {
    return _.flatMap(orders, ({ sku, quantity }) => _.range(quantity).map(() => this.stocks[sku]))
  }

  private applyPromotion(products: Product[]): Product[] {
    return this.promotionRules.reduce((products, promotion) => {
      const [discounted, unDiscounted] = _.partition(products, ({ promotion }) => Boolean(promotion))
      return _.concat(discounted, promotion.execute(unDiscounted))
    }, products)
  }

  checkout(request: CheckoutRequest): CheckoutFilledResponse | CheckoutUnfilledResponse {
    const shortages = this.checkInventory(request.orders)
    if (shortages.length) {
      return { filled: false, shortages }
    } else {
      const products = this.reserveProducts(request.orders)
      const discountedProducts = this.applyPromotion(products)
      const cost = _.sumBy(discountedProducts, product => product.getPrice())
      return { filled: true, orders: discountedProducts.map(p => p.toOrderDetail()), cost }
    }
  }
}

export default CheckoutService