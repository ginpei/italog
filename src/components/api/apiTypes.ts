/**
 * @example
 * export type PostProfileResult = ResultOrError<{
 *   ok: true;
 *   profile: Profile;
 * }>;
 */
export type ResultOrError<T extends { ok: true }> =
  | T
  | { error: string; ok: false };
