import { BasicException } from './basic-exception';

export class InternalServerException extends BasicException {
  constructor(readonly message: string) {
    super(message, InternalServerException.exceptionCode, 500);
    this.name = this.constructor.name;
  }
  public static exceptionCode = 'ERR_INTERNAL_SERVER_ERROR';
}
