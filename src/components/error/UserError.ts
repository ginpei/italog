/**
 * Error that users can see safely.
 */
export class UserError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "UserError";
    this.cause = cause;
  }
}
