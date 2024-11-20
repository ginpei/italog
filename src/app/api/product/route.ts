import { NextResponse } from "next/server";
import { ResultOrError } from "@/components/api/apiTypes";
import { toError } from "@/components/error/errorUtil";
import { Product } from "@/components/product/Product";
import { createProductRecordSet } from "@/components/product/productDb";
import { getSessionProfile } from "@/components/user/profileSession";

export interface PostProductPayload {
  product: Omit<Product, "boardId" | "boardType">;
}

export type PostProductResult = ResultOrError<{
  ok: true;
  productBoardId: string;
}>;

export async function POST(
  req: Request,
): Promise<NextResponse<PostProductResult>> {
  const body = await req.json();

  try {
    const profile = await getSessionProfile();
    if (!profile) {
      return NextResponse.json(
        { error: "Unauthorized", ok: false },
        { status: 401 },
      );
    }

    const product: Product = {
      ...body.product,
      boardType: "product",
    };

    const resultProduct = await createProductRecordSet(profile, product);

    return NextResponse.json({
      ok: true,
      productBoardId: resultProduct.boardId,
    } satisfies PostProductResult);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: toError(error).message, ok: false },
      { status: 500 },
    );
  }
}
