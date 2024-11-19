import { PostProductPayload, PostProductResult } from "./route";

export function postProductApi(
  product: PostProductPayload["product"],
): Promise<PostProductResult> {
  const endpoint = "/api/product";

  const body: PostProductPayload = {
    product,
  };

  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
}
