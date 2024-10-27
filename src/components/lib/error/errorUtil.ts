export function toError(errorish: unknown): Error {
  if (errorish instanceof Error) {
    return errorish;
  }

  if (
    typeof errorish === "object" &&
    errorish !== null &&
    "message" in errorish
  ) {
    return new Error(String(errorish.message));
  }

  return new Error(String(errorish));
}
