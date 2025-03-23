import { BasicException } from './basic-exception';

export class InvalidException400 extends BasicException {
  constructor(readonly errorCode: string, readonly message: string) {
    super(message, errorCode, 400);
    this.name = this.constructor.name;
  }
}
