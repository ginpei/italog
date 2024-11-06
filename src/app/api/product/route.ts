import { ResultOrError } from "@/components/api/apiTypes";
import { Product } from "@/components/product/Product";
import { getProductRecordByBarcode } from "@/components/product/productDb";

export interface SearchProductPayload {
  barcode?: string;
  keyword?: string;
}

export type SearchProductResult = ResultOrError<{
  ok: true;
  product: Product | null;
}>;

export async function GET(req: Request) {
  const sUrl = req.url;

  try {
    const url = new URL(sUrl);
    const barcode = url.searchParams.get("barcode");
    const keyword = url.searchParams.get("keyword");

    if (!barcode && !keyword) {
      console.error("At least either barcode or keyword is required");
      return Response.json(
        {
          ok: false,
          error: "At least either barcode or keyword is required",
        },
        {
          status: 400,
        },
      );
    }

    if (barcode) {
      const product = await getProductRecordByBarcode(barcode);
      if (!product) {
        return Response.json(
          {
            ok: false,
            error: `Product with barcode ${barcode} not found`,
          },
          {
            status: 404,
          },
        );
      }

      return Response.json({ ok: true, product });
    }
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        ok: false,
        error: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
