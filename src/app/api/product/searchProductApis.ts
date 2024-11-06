import { SearchProductPayload, SearchProductResult } from "./route";
import { UserError } from "@/components/error/UserError";
import { Product } from "@/components/product/Product";

export async function fetchSearchProductApi(
  params: SearchProductPayload,
): Promise<Product[] | null> {
  const endpoint = "/api/product";

  const oParams = new URLSearchParams({
    barcode: params.barcode ?? "",
    keyword: params.keyword ?? "",
  });

  const res = await fetch(`${endpoint}?${oParams.toString()}`);
  const result: SearchProductResult = await res.json();
  if (!result || !result.ok) {
    throw new UserError(result?.error ?? `Failed to fetch ${endpoint}`);
  }

  const products = result.products;
  return products;
}
