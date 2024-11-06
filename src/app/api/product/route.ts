import { ResultOrError } from "@/components/api/apiTypes";
import { Product } from "@/components/product/Product";
import {
  createProductToDatabase,
  getProductRecordByBarcode,
  getProductRecordsByText,
} from "@/components/product/productDb";

export interface SearchProductPayload {
  barcode?: string;
  keyword?: string;
}

export type SearchProductResult = ResultOrError<{
  ok: true;
  products: Product[];
}>;

export type CreateProductResult = ResultOrError<{
  ok: true;
  product: Product;
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
        } satisfies SearchProductResult,
        {
          status: 400,
        },
      );
    }

    if (barcode) {
      const product = await getProductRecordByBarcode(barcode);
      return Response.json({
        ok: true,
        products: product ? [product] : [],
      } satisfies SearchProductResult);
    }

    if (!keyword) {
      console.error("Keyword is required");
      return Response.json(
        {
          ok: false,
          error: "Keyword is required",
        } satisfies SearchProductResult,
        {
          status: 400,
        },
      );
    }

    const products = await getProductRecordsByText(keyword);

    return Response.json({ ok: true, products } satisfies SearchProductResult);
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        ok: false,
        error: "Internal server error",
      } satisfies SearchProductResult,
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { barcode, displayName } = await req.json();

    if (!barcode || !displayName) {
      return Response.json(
        {
          ok: false,
          error: "Barcode and display name are required",
        } satisfies CreateProductResult,
        { status: 400 },
      );
    }

    const existingProduct = await getProductRecordByBarcode(barcode);
    if (existingProduct) {
      return Response.json(
        {
          ok: false,
          error: "Barcode is already in use",
        } satisfies CreateProductResult,
        { status: 400 },
      );
    }

    const newProduct: Product = {
      barcode,
      boardId: "",
      boardType: "product",
      displayName,
    };

    const boardId = await createProductToDatabase(newProduct);

    return Response.json(
      {
        ok: true,
        product: { ...newProduct, boardId },
      } satisfies CreateProductResult,
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        ok: false,
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
