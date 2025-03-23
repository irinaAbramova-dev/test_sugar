import { BasicException } from './basic-exception';

export class InvalidException404 extends BasicException {
  constructor(readonly errorCode: string, readonly message: string) {
    super(message, errorCode, 404);
    this.name = this.constructor.name;
  }
}
