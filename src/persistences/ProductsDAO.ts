import type { SKU } from "../models/Product"

export type ProductDAO = {
  SKU: SKU
  Name: string
  Price: number
  Inventory: number
}

export const ProductsDAO: ProductDAO[] = [
  {
    SKU: "120P90",
    Name: "Google Home",
    Price: 49.99,
    Inventory: 10
  }, {
    SKU: "43N23P",
    Name: "MacBook Pro",
    Price: 5399.99,
    Inventory: 5
  }, {
    SKU: "A304SD",
    Name: "Alexa Speaker",
    Price: 109.50,
    Inventory: 10
  }, {
    SKU: "234234",
    Name: "Raspberry Pi B",
    Price: 30.00,
    Inventory: 2
  }
]
