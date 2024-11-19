"use client";

import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { ErrorBlock } from "@/components/error/ErrorBlock";
import { SpinnerBlock } from "@/components/layout/SpinnerBlock";
import { VStack } from "@/components/layout/VStack";
import { Product } from "@/components/product/Product";
import { fetchBarcodeLookup } from "@/components/product/barcodeLookup";
import { Button } from "@/components/style/Button";
import { H1 } from "@/components/style/Hn";
import { InputLabel } from "@/components/style/InputLabel";
import { LongTextInput } from "@/components/style/LongTextInput";
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
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({
    barcode: initial.barcode ?? "",
    boardId: "",
    brands: "",
    categories: "",
    displayName: "",
    imageUrl: "",
  });
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    if (name === "barcode") {
      setEditingProduct({ ...editingProduct, [name]: value });
    }
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setWorking(true);
    // setError(null);

    console.log("# editingProduct", editingProduct);
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
              onChange={onInputChange}
              pattern="(\d|\s)*"
              placeholder="0 00000 00000 0"
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
      <form onSubmit={onFormSubmit}>
        <fieldset disabled={working} className="flex flex-col gap-4">
          {error && <ErrorBlock error={error} />}
          <InputLabel>
            Barcode:
            <TextInput
              inputMode="numeric"
              name="barcode"
              onChange={onInputChange}
              pattern="(\d|\s)*"
              placeholder="0 00000 00000 0"
              value={editingProduct.barcode}
            />
          </InputLabel>
          <InputLabel>
            Display name:
            <TextInput
              name="displayName"
              onChange={onInputChange}
              required
              value={editingProduct.displayName}
            />
          </InputLabel>
          <InputLabel>
            Brands (each line) (optional):
            <LongTextInput
              name="brands"
              onChange={onInputChange}
              value={editingProduct.brands}
            />
          </InputLabel>
          <InputLabel>
            Categories (each line) (optional):
            <LongTextInput
              name="categories"
              onChange={onInputChange}
              value={editingProduct.categories}
            />
          </InputLabel>
          <InputLabel>
            Image:
            <br />
            {working ? (
              <span className="mx-auto grid size-64 place-items-center border text-center">
                {/* <span>
                  <PhotoIcon className="mx-auto size-32 text-gray-500" />
                  (No image)
                </span> */}
              </span>
            ) : editingProduct.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt=""
                className="mx-auto size-64 object-contain"
                src={editingProduct.imageUrl}
              />
            ) : (
              <span className="mx-auto grid size-64 place-items-center border text-center">
                <span>
                  <PhotoIcon className="mx-auto size-32 text-gray-500" />
                  (No image)
                </span>
              </span>
            )}
          </InputLabel>
          <Button>Register</Button>
        </fieldset>
      </form>
    </VStack>
  );
}
