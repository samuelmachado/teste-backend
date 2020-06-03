import { Request, Response } from 'express'
import { ExpressErrorMiddlewareInterface, Middleware, HttpError } from 'routing-controllers'

import { Logger, LoggerInterface } from '@/decorators/logger'

@Middleware({ type: 'after' })
export default class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  @Logger() private logger: LoggerInterface

  public error({ httpCode, message, stack, name }: HttpError, _req: Request, res: Response): void {
    res.status(httpCode || 500)
    res.json({
      name,
      message
    })

    this.logger.error({ message, stack })
  }
}
