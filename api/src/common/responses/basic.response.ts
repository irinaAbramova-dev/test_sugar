export class BasicResponse<T> {
  readonly data: T;

  constructor(data: T) {
    this.data = data
  }
}
