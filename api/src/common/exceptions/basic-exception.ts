export abstract class BasicException extends Error {
  protected constructor(
    public readonly message: string,
    public readonly code: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
