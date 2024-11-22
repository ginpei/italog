import { PatchProductPayload, PatchProductResult } from "./route";

export async function requestPatchProduct(
  product: PatchProductPayload["product"],
): Promise<PatchProductResult> {
  const endpoint = `/api/product/${product.boardId}`;

  const body: PatchProductPayload = {
    product,
  };

  const res = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result: PatchProductResult = await res.json();
  return result;
}
