import { ValidateFunction } from "ajv"

import type { SKU } from "../../models/Product"
import { ProductsDAO } from "../../persistences/ProductsDAO"
import ajv from "../../utils/Ajv"

export type Order = {
  sku: SKU
  quantity: number
}

export type CheckoutRequest = {
  orders: Order[]
}

export const CheckoutRequestValidate: ValidateFunction<CheckoutRequest> = ajv.compile({
  type: 'object',
  properties: {
    orders: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          sku: {
            type: 'string',
            enum: ProductsDAO.map(({ SKU }) => SKU)
          },
          quantity: {
            type: 'number',
            minimum: 1
          }
        },
        required: ['sku', 'quantity'],
        additionalProperties: false
      },
      uniqueItemProperties: ['sku']
    },
  },
  required: ['orders'],
  additionalProperties: false
})