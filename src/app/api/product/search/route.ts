import { NextResponse } from "next/server";
import { ResultOrError } from "@/components/api/apiTypes";
import { toError } from "@/components/error/errorUtil";
import { Product } from "@/components/product/Product";
import { getProductRecordsByBarcode } from "@/components/product/productDb";
import { getSessionProfile } from "@/components/user/profileSession";

export interface ProductSearchPayload {
  barcode: string;
}

export type ProductSearchResult = ResultOrError<{
  ok: true;
  products: Product[];
}>;

export async function GET(
  req: Request,
): Promise<NextResponse<ProductSearchResult>> {
  const url = new URL(req.url);

  try {
    const data: ProductSearchPayload = {
      barcode: url.searchParams.get("barcode") || "",
    };

    const profile = await getSessionProfile();
    if (!profile) {
      return NextResponse.json(
        { error: "Unauthorized", ok: false },
        { status: 401 },
      );
    }

    const products = await getProductRecordsByBarcode(data.barcode);
    return NextResponse.json({
      ok: true,
      products,
    } satisfies ProductSearchResult);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: toError(error).message, ok: false },
      { status: 500 },
    );
  }
}
