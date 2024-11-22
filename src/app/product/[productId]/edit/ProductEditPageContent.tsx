"use client";

import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { requestPatchProduct } from "@/app/api/product/[productId]/productItemApis";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Product } from "@/components/product/Product";
import { ProductForm } from "@/components/product/ProductForm";
import { ProductImageBlock } from "@/components/product/ProductImage";
import { H1, H2 } from "@/components/style/Hn";
import { Link } from "@/components/style/Link";

export interface ProductEditPageContentProps {
  product: Product;
}

export function ProductEditPageContent({
  product,
}: ProductEditPageContentProps): JSX.Element {
  const [editingProduct, setEditingProduct] = useState<Product>(product);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const onFormSubmit = async () => {
    setWorking(true);
    setError(null);

    try {
      const result = await requestPatchProduct(editingProduct);
      if (!result.ok) {
        throw new Error("Failed to update product (Server error)");
      }

      const productPageUrl = `/product/${product.boardId}`;
      router.push(productPageUrl);
      router.refresh();
    } catch (error) {
      console.error(error);
      setError(toError(error));
      setWorking(false);
    }
  };

  return (
    <VStack className="ProductCheckinPageContent" gap="gap-8">
      <VStack as="hgroup">
        <H1>Edit product</H1>
        <p>
          <Link href={`/product/${product.boardId}`}>
            <ChevronDoubleLeftIcon className="me-1 inline-block size-4" />
            Back to product page
          </Link>
        </p>
      </VStack>
      <p>Please note that this information will be visible to all users.</p>
      <H2>Product information</H2>
      <ProductForm
        disabled={working}
        error={error}
        onChange={setEditingProduct}
        onSubmit={onFormSubmit}
        product={editingProduct}
        showImage={false}
        submitLabel="Update"
      />
      <H2>Photo</H2>
      <p>TODO</p>
      <ProductImageBlock imageUrl={product.imageUrl} />
    </VStack>
  );
}
