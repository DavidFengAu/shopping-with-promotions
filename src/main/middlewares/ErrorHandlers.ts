import type { NextFunction, Request, Response } from 'express'

import logger from "../../utils/Logger"

export const logErrors = (err: Error, req: Request, _res: Response, next: NextFunction): void => {
  const logMessage = { RequestUrl: req.url, RequestBody: req.body, Error: err?.message }
  logger.error({ EventType: 'UnhandledApiError', ...logMessage, Stack: err?.stack })
  next(err)
}

export const clientErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else if (err.name === 'NotFoundError') {
    res.status(404).send({ type: 'ResourceNotFoundException', error: err.message })
  } else {
    next(err)
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(400).send({ error: err.message })
}
