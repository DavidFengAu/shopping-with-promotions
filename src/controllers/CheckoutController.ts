import { RequestBodyValidator } from "../main/middlewares/RequestBodyValidator"
import type CheckoutService from "../services/CheckoutService"
import Controller from "./Controller"
import { CheckoutRequest, CheckoutRequestValidate } from "./requests/CheckoutRequest"

class CheckoutController extends Controller {
  prefix = "checkout"

  constructor(
    private readonly checkoutService: CheckoutService
  ) {
    super()
  }

  protected assembleRoutes(): void {
    this.router.post("/",
      RequestBodyValidator(CheckoutRequestValidate),
      async (req, res) => {
        const result = this.checkoutService.checkout(req.body as CheckoutRequest)
        res.send(result)
      })
  }
}

export default CheckoutController