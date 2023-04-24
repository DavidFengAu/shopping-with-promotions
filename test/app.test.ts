import { expect } from "chai"
import supertest from "supertest"

import app from '../src/app'

describe('GET / endpoint', () => {
  it('GET / endpoint successfully returns welcome message', () => {
    return supertest(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).to.equal(200)
        expect(response.text).to.equal('Welcome to Shopping with Promotions server.')
      })
  })
})