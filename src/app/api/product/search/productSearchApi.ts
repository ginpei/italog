import { ProductSearchPayload, ProductSearchResult } from "./route";

export async function getProductSearchByBarcode(
  barcode: string,
): Promise<ProductSearchResult> {
  const endpoint = `/api/product/search`;

  const params: ProductSearchPayload = {
    barcode,
  };

  const url = new URL(location.href);
  url.pathname = endpoint;
  url.search = new URLSearchParams(Object.entries(params)).toString();

  const res = await fetch(url);

  const result = await res.json();
  return result;
}
