import { Product } from "./Product";

/**
 * @see https://www.postman.com/cs-demo/public-rest-apis/request/zgtahxr/barcode-lookup
 */
type OpenFoodFactsApiResult =
  | OpenFoodFactsApiSuccessResult
  | OpenFoodFactsApiErrorResult;

interface OpenFoodFactsApiSuccessResult {
  code: string;
  product: OpenFoodFactsProduct;
  status_verbose: string;
  status: 1;
}

interface OpenFoodFactsApiErrorResult {
  code: string;
  status_verbose: "product not found";
  status: 0;
}

/**
 * @see https://www.postman.com/cs-demo/public-rest-apis/request/zgtahxr/barcode-lookup
 */
interface OpenFoodFactsProduct {
  brands?: string;
  categories?: string;
  code: string;
  id: string;
  lang: "en" | "fr";
  image_url: string;
  product_name: string;
}

/**
 * @see https://www.postman.com/cs-demo/public-rest-apis/request/zgtahxr/barcode-lookup
 */
export async function fetchBarcodeLookup(
  barcode: string,
): Promise<Omit<Product, "boardId">> {
  const rxBarcode = /^[0-9]+$/;
  if (!rxBarcode.test(barcode)) {
    throw new Error("Invalid barcode");
  }

  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

  const res = await fetch(url);
  const result: OpenFoodFactsApiResult = await res.json();
  if (!res.ok || result.status !== 1) {
    throw new Error(result.status_verbose);
  }

  const offProduct = result.product;
  const product: Omit<Product, "boardId"> = {
    barcode: offProduct.code,
    boardType: "product",
    brands:
      offProduct.brands
        ?.split(",")
        .map((v) => v.trim())
        .join("\n") ?? "",
    categories:
      offProduct.categories
        ?.split(",")
        .map((v) => v.trim())
        .join("\n") ?? "",
    displayName: offProduct.product_name,
    imageUrl: offProduct.image_url,
  };

  return product;
}
