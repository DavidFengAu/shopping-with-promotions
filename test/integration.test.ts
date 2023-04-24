import { expect } from 'chai'
import supertest from 'supertest'

import app from "../src/app"
import type { CheckoutRequest } from "../src/controllers/requests/CheckoutRequest"
import type { CheckoutFilledResponse, CheckoutUnfilledResponse } from "../src/controllers/requests/CheckoutResponse"

describe('Checkout API', () => {
  it('should apply free Raspberry Pi B promotion with the purchase of a MacBook Pro', async () => {
    const request: CheckoutRequest = {
      orders: [
        {
          sku: '43N23P',
          quantity: 1
        }, {
          sku: '234234',
          quantity: 1
        }
      ]
    }
    const response = await supertest(app).post('/checkout').send(request)
    const data = response.body as CheckoutFilledResponse
    expect(data.filled).to.be.true
    expect(data.orders).to.have.lengthOf(2)
    expect(data.cost).to.equal(5399.99)
  })

  it('should apply 3 for 2 promotion for Google Home devices', async () => {
    const request: CheckoutRequest = {
      orders: [
        {
          sku: '120P90',
          quantity: 3
        }
      ]
    }
    const response = await supertest(app).post('/checkout').send(request)
    const data = response.body as CheckoutFilledResponse
    expect(data.filled).to.be.true
    expect(data.orders).to.have.lengthOf(3)
    expect(data.cost).to.equal(99.98)
  })

  it('should apply 10% discount on all Alexa Speakers when buying more than 3', async () => {
    const request: CheckoutRequest = {
      orders: [
        {
          sku: 'A304SD',
          quantity: 4
        }
      ]
    }
    const response = await supertest(app).post('/checkout').send(request)
    const data = response.body as CheckoutFilledResponse
    expect(data.filled).to.be.true
    expect(data.orders).to.have.lengthOf(4)
    expect(data.cost).to.equal(394.20)
  })

  it('should return an unfilled response for an order with insufficient inventory', async () => {
    const request: CheckoutRequest = {
      orders: [
        {
          sku: '43N23P',
          quantity: 10
        }
      ]
    }
    const response = await supertest(app).post('/checkout').send(request)
    const data = response.body as CheckoutUnfilledResponse
    expect(data.filled).to.be.false
    expect(data.shortages).to.have.lengthOf(1)
    expect(data.shortages[0].sku).to.equal('43N23P')
    expect(data.shortages[0].inventory).to.equal(5)
  })
})