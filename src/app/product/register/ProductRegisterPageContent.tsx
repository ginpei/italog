"use client";

import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { postProductApi } from "@/app/api/product/productApis";
import { ErrorBlock } from "@/components/error/ErrorBlock";
import { toError } from "@/components/error/errorUtil";
import { SpinnerBlock } from "@/components/layout/SpinnerBlock";
import { VStack } from "@/components/layout/VStack";
import { Product } from "@/components/product/Product";
import { ProductForm } from "@/components/product/ProductForm";
import { fetchBarcodeLookup } from "@/components/product/barcodeLookup";
import { H1 } from "@/components/style/Hn";
import { InputLabel } from "@/components/style/InputLabel";
import { SuperButton } from "@/components/style/SuperButton";
import { SuperButtonBlock } from "@/components/style/SuperButtonBlock";
import { TextInput } from "@/components/style/TextInput";

export interface ProductRegisterPageContentProps {
  initial: Partial<Product>;
}

export function ProductRegisterPageContent({
  initial,
}: ProductRegisterPageContentProps): JSX.Element {
  const [productType, setProductType] = useState<"food" | "other" | undefined>(
    undefined,
  );
  const [foodLookedUp, setFoodLookedUp] = useState(false);
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

  useEffect(() => {
    if (!initial.barcode) {
      setFoodLookedUp(true);
      return;
    }

    if (productType !== "food" || foodLookedUp) {
      return;
    }

    setWorking(true);
    fetchBarcodeLookup(initial.barcode!)
      .then((result) => {
        setEditingProduct((v) => ({ ...v, ...result }));
      })
      .catch((error) => setError(error))
      .finally(() => {
        setWorking(false);
        setFoodLookedUp(true);
      });
  }, [foodLookedUp, initial.barcode, productType]);

  if (!productType) {
    return (
      <VStack className="ProductRegisterPageContent">
        <H1>Register new product</H1>
        <fieldset disabled={working} className="flex flex-col gap-4">
          {error && <ErrorBlock error={error} />}
          <InputLabel>
            Barcode:
            <TextInput
              inputMode="numeric"
              name="barcode"
              pattern="(\d|\s)*"
              placeholder="0 00000 00000 0"
              readOnly
              required
              value={editingProduct.barcode}
            />
          </InputLabel>
          <SuperButtonBlock>
            <SuperButton onClick={() => setProductType("food")}>
              <span>
                <MagnifyingGlassIcon className="mx-auto size-8" />
                Search by
                <br />
                Open Food Facts API
              </span>
            </SuperButton>
            <SuperButton onClick={() => setProductType("other")}>
              <span>
                <PencilSquareIcon className="mx-auto size-8" />
                Manual input
              </span>
            </SuperButton>
          </SuperButtonBlock>
        </fieldset>
      </VStack>
    );
  }

  if (productType === "food" && !foodLookedUp) {
    return (
      <VStack className="ProductRegisterPageContent">
        <H1>Register new product</H1>
        <p>Searching Open Food Facts database...</p>
        <SpinnerBlock />
      </VStack>
    );
  }

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
