import { useEffect, useState } from "react";
import { GetTimelineResult } from "./route";

export async function requestGetTimeline(
  signal: AbortSignal,
): Promise<GetTimelineResult & { ok: true }> {
  const endpoint = "/api/timeline";
  const response = await fetch(endpoint, { signal });
  const result: GetTimelineResult = await response.json();
  if (!result.ok) {
    throw new Error(result.error);
  }
  return result;
}

export function useTimeline(): [
  loading: boolean,
  error: Error | null,
  result: GetTimelineResult & { ok: true },
] {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<GetTimelineResult & { ok: true }>({
    checkins: [],
    ok: true,
    places: [],
    products: [],
  });

  useEffect(() => {
    const controller = new AbortController();

    requestGetTimeline(controller.signal)
      .then((result) => {
        setResult(result);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }

        setError(error);

        // do not use finally, because it will be called after the component is unmounted
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return [loading, error, result];
}
