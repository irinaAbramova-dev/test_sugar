import { BasicException } from './basic-exception';

export class InvalidTokenException extends BasicException {
  constructor(readonly message: string) {
    super(message, InvalidTokenException.exceptionCode, 401);
    this.name = this.constructor.name;
  }
  public static exceptionCode = 'ERR_INVALID_TOKEN';
}
