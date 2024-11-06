"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProductApi } from "@/app/api/product/productApis";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Product } from "@/components/product/Product";
import { Button } from "@/components/style/Button";
import { H1 } from "@/components/style/Hn";
import { TextInput } from "@/components/style/TextInput";

export function RegisterProductPageContent(): JSX.Element {
  const router = useRouter();
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [product, setProduct] = useState<Product>({
    barcode: "",
    boardId: "",
    boardType: "product",
    displayName: "",
  });

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setWorking(true);

    try {
      const createdProduct = await createProductApi(product);
      router.push(`/product/${createdProduct.boardId}`);
    } catch (error) {
      console.error(error);
      setError(toError(error));
      setWorking(false);
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "barcode" || name === "displayName") {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  return (
    <VStack className="RegisterProductPageContent">
      <H1>Register product</H1>
      <form onSubmit={onFormSubmit}>
        <fieldset className="flex flex-col gap-4" disabled={working}>
          {error && <p className="text-rose-800">⚠️ {error.message}</p>}
          <label className="flex flex-col">
            Name:
            <TextInput
              name="displayName"
              onChange={onInputChange}
              value={product.displayName}
            />
          </label>
          <label className="flex flex-col">
            Barcode:
            <TextInput
              name="barcode"
              onChange={onInputChange}
              value={product.barcode}
            />
          </label>
          <Button>Submit</Button>
        </fieldset>
      </form>
    </VStack>
  );
}
