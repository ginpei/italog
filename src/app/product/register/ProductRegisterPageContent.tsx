"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { postProductApi } from "@/app/api/product/productApis";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Product } from "@/components/product/Product";
import { ProductForm } from "@/components/product/ProductForm";
import { H1 } from "@/components/style/Hn";

export interface ProductRegisterPageContentProps {
  initial: Partial<Product>;
}

export function ProductRegisterPageContent({
  initial,
}: ProductRegisterPageContentProps): JSX.Element {
  const [editingProduct, setEditingProduct] = useState<Product>({
    barcode: initial.barcode ?? "",
    boardId: "",
    boardType: "product",
    brands: "",
    categories: "",
    displayName: "",
    imageUrl: "",
  });
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const onFormSubmit = async () => {
    setWorking(true);
    setError(null);

    try {
      const result = await postProductApi(editingProduct);
      if (!result.ok) {
        throw new Error("Failed to register product");
      }

      const productPageUrl = `/product/${result.productBoardId}`;
      router.push(productPageUrl);
    } catch (error) {
      console.error(error);
      setError(toError(error));
      setWorking(false);
    }
  };

  return (
    <VStack className="ProductRegisterPageContent">
      <H1>Register new product</H1>
      <ProductForm
        disabled={working}
        error={error}
        onChange={setEditingProduct}
        onSubmit={onFormSubmit}
        product={editingProduct}
        showImage={true}
        submitLabel="Register"
      />
    </VStack>
  );
}
