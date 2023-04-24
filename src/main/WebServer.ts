import compression from 'compression'
import cors from 'cors'
import type { Application } from "express"
import express, { Router } from "express"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

import CheckoutController from "../controllers/CheckoutController"
import { ProductsDAO } from "../persistences/ProductsDAO"
import CheckoutService from "../services/CheckoutService"
import { clientErrorHandler, errorHandler, logErrors } from "./middlewares/ErrorHandlers"

class WebServer {
  constructor(
    private readonly app: Application
  ) {
  }

  start(): void {
    // Middleware that enable CORS
    this.app.use(cors())

    // Middleware that parses string into json
    this.app.use(express.json())

    // Middleware that greatly decreases the size of the response body
    this.app.use(compression())

    // Middleware that secures the Express app by setting various HTTP headers
    this.app.use(helmet())
    this.app.use(helmet.frameguard({ action: 'deny' }))

    // Middleware that provides access log
    this.app.use(morgan('combined'))

    // Serve Welcome Message
    this.app.get('/', (_req, res) => {
      res.send('Welcome to Shopping with Promotions server.')
    })

    // Serve API docs
    const swaggerDocument = YAML.load(path.resolve(__dirname,'./apiDocs/openapi.yaml'))
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    // Apply routes
    this.app.use("/", this.buildRoutes())

    // Middlewares that log and handle errors
    this.app.use(logErrors)
    this.app.use(clientErrorHandler)
    this.app.use(errorHandler)
  }

  private buildRoutes(): Router {
    const router = Router()

    const checkoutService = new CheckoutService(ProductsDAO)
    const checkoutController = new CheckoutController(checkoutService)
    checkoutController.applyRoutes(router)

    return router
  }
}

export default WebServer