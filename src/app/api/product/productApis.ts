import {
  CreateProductResult,
  SearchProductPayload,
  SearchProductResult,
} from "./route";
import { UserError } from "@/components/error/UserError";
import { Product } from "@/components/product/Product";

export async function fetchSearchProductApi(
  params: SearchProductPayload,
): Promise<Product[]> {
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

export async function createProductApi(product: Product): Promise<Product> {
  const endpoint = "/api/product";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const result: CreateProductResult = await res.json();

  if (!result || !result.ok) {
    throw new UserError(result.error ?? "Failed to create product");
  }

  const createdProduct = result.product;
  return createdProduct;
}
