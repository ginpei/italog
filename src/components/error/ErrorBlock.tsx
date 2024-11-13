import { useMemo } from "react";
import { toError } from "./errorUtil";

export interface ErrorBlockProps {
  error: unknown;
}

/**
 * Automatically toggles own visibility whether the given `error` is null or not.
 */
export function ErrorBlock({ error }: ErrorBlockProps): JSX.Element | null {
  const message = useMemo(() => toError(error).message, [error]);

  return error !== null ? (
    <p className="text-red-800 dark:text-orange-500">⚠️ {message}</p>
  ) : null;
}
