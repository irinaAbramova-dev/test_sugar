import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { InternalServerException } from './internal-server.exception';
const DEFAULT_ERROR_MESSAGE = 'Unhandled error occurred.';

@Catch()
export class AllExceptionsFilter<T = any> implements ExceptionFilter<T> {
  catch(exception: any, host: ArgumentsHost) {
    Logger.error(exception, AllExceptionsFilter.name);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const normalized = this.normalizeErrorForHttp(exception);

    const status = normalized.status || exception.status;
    this.processMessageCode(status, normalized);

    const message = {
      status: status,
      code: normalized.code,
      message: normalized.message,
    };

    return response.status(status).json(message);
  }

  private normalizeErrorForHttp(object: any): InternalServerException {
    if (object.status) {
      return object.response || object;
    }

    return new InternalServerException(DEFAULT_ERROR_MESSAGE);
  }

  private processMessageCode(status, normalized) {
    if (
      status === 400 &&
      normalized.error?.toLowerCase() == 'bad request' &&
      !normalized.code
    ) {
      normalized.code = 'ERR_INVALID_VALIDATION';
    }
  }
}
