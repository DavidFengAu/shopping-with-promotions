import { Router } from 'express'

abstract class Controller {
  router = Router()
  abstract readonly prefix: string

  applyRoutes(rootRouter: Router): void {
    this.assembleRoutes()
    rootRouter.use(`/${this.prefix}`, this.router)
  }

  protected abstract assembleRoutes(): void
}

export default Controller
