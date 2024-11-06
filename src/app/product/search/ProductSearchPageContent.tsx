"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { BarCodeReader } from "./BarCodeReader";
import { fetchSearchProductApi } from "@/app/api/product/searchProductApis";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Button } from "@/components/style/Button";
import { H1, H2 } from "@/components/style/Hn";
import { TextInput } from "@/components/style/TextInput";

export interface ProductSearchPageContentProps {
  recentCheckins: never[];
}

export function ProductSearchPageContent({}: ProductSearchPageContentProps): JSX.Element {
  const [barcode, setBarcode] = useState("");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const onBarcodeFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError(null);
    setWorking(true);

    try {
      const product = await fetchSearchProductApi({ barcode });
      console.log("# product", product);
    } catch (error) {
      console.error(error);
      setError(toError(error));
    } finally {
      setWorking(false);
    }
  };

  const onBarcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "barcode") {
      setBarcode(value);
    }
  };

  const onBarCodeRead = (barcode: string) => {
    setBarcode(barcode);
  };

  return (
    <VStack className="ProductSearchPageContent" gap="gap-8">
      <H1>Search product</H1>
      <VStack>
        <H2>By barcode</H2>
        <p className="text-sm text-gray-500">
          Hint: you might want to use speech recognition on your device to enter
          the barcode by reading it out loud.
        </p>
        {error && <p className="text-rose-800">⚠️ {error.message}</p>}
        <form onSubmit={onBarcodeFormSubmit}>
          <fieldset className="flex items-stretch gap-2" disabled={working}>
            <TextInput
              className="w-full"
              inputMode="numeric"
              onChange={onBarcodeChange}
              name="barcode"
              pattern="(\d|\s)*"
              placeholder="0 00000 00000 0"
              value={barcode}
            />
            <Button>
              <MagnifyingGlassIcon className="size-5" />
            </Button>
          </fieldset>
        </form>
        <details className="w-max border [&[open]]:w-auto">
          <summary className="cursor-pointer bg-gray-100 p-2">
            Bar code reader (beta)
          </summary>
          <div className="p-2">
            <BarCodeReader onRead={onBarCodeRead} />
          </div>
        </details>
      </VStack>
    </VStack>
  );
}
