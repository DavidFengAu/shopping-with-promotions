import type { ValidateFunction } from 'ajv'
import type { NextFunction, Request, Response } from 'express'

export const RequestBodyValidator = (validate: ValidateFunction) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const isValid = validate(req.body)
    if (!isValid) {
      res.status(400).send({ error: validate.errors })
    } else {
      next()
    }
  }