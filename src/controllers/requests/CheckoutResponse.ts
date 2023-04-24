import type { SKU } from "../../models/Product"

export type OrderDetail = {
  sku: SKU
  name: string
  retailPrice: number
  discountedPrice?: number | null
}

export type CheckoutFilledResponse = {
  filled: true
  orders: OrderDetail[]
  cost: number
}

export type ShortageDetail = {
  sku: SKU
  name: string
  requestQty: number
  inventory: number
}

export type CheckoutUnfilledResponse = {
  filled: false
  shortages: ShortageDetail[]
}