import { NextResponse } from "next/server";
import { ResultOrError } from "@/components/api/apiTypes";
import { toError } from "@/components/error/errorUtil";
import { Product } from "@/components/product/Product";
import { updateProductRecordSet } from "@/components/product/productDb";
import { getSessionProfile } from "@/components/user/profileSession";

export interface PatchProductPayload {
  product: Omit<Product, "boardType">;
}

export type PatchProductResult = ResultOrError<{
  ok: true;
}>;

export async function PATCH(
  req: Request,
): Promise<NextResponse<PatchProductResult>> {
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

    await updateProductRecordSet(profile, product);

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: toError(error).message, ok: false },
      { status: 500 },
    );
  }
}
