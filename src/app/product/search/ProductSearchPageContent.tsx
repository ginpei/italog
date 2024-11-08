"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { BarCodeReader } from "./BarCodeReader";
import { VStack } from "@/components/layout/VStack";
import { Button } from "@/components/style/Button";
import { H1, H2 } from "@/components/style/Hn";
import { TextInput } from "@/components/style/TextInput";

export interface ProductSearchPageContentProps {
  recentCheckins: never[];
}

export function ProductSearchPageContent({}: ProductSearchPageContentProps): JSX.Element {
  const [barcode, setBarcode] = useState("");

  const onBarcodeFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Barcode form submitted");
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
      <VStack>
        <p>
          <span className="rounded bg-purple-800 px-2 py-1 text-white">
            Preview
          </span>
        </p>
        <H1>Search product</H1>
      </VStack>
      <p className="text-gray-500">
        You will be able to check in products to share your impression as well
        as places.
      </p>
      <VStack className="hidden">
        <H2>By barcode</H2>
        <p className="text-sm text-gray-500">
          Hint: you might want to use speech recognition on your device to enter
          the barcode by reading it out loud.
        </p>
        <form onSubmit={onBarcodeFormSubmit}>
          <fieldset className="flex items-stretch gap-2" disabled>
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
