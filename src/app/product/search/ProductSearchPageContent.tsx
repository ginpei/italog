"use client";

import { CameraIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { detectBarcode } from "./quaggaFunctions";
import { useSpecialFlag } from "@/components/api/dev/devHooks";
import { ErrorBlock } from "@/components/error/ErrorBlock";
import { VStack } from "@/components/layout/VStack";
import { Button, FileButton } from "@/components/style/Button";
import { H1, H2 } from "@/components/style/Hn";
import { TextInput } from "@/components/style/TextInput";

export interface ProductSearchPageContentProps {
  recentCheckins: never[];
}

export function ProductSearchPageContent({}: ProductSearchPageContentProps): JSX.Element {
  const [error, setError] = useState<Error | null>(null);
  const [detectingBarcode, setDetectingBarcode] = useState(false);
  const [barcode, setBarcode] = useState("");
  const special = useSpecialFlag();

  const onBarcodeFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO
    console.log("Barcode form submitted");
  };

  const onBarcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "barcode") {
      setBarcode(value);
    }
  };

  const onBarcodeFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setError(null);
    setDetectingBarcode(true);

    try {
      const [file] = event.target.files || [];
      event.target.value = "";
      if (!file) {
        return;
      }

      const detectedBarcode = await detectBarcode(file, "ean");
      if (!detectedBarcode) {
        window.alert("No barcode detected");
        return;
      }

      const ok = window.confirm(
        `Do you want to use this barcode?\n${detectedBarcode}`,
      );
      if (!ok) {
        return;
      }

      setBarcode(detectedBarcode);
    } catch (error) {
      console.error(error);
      setError(new Error("Failed to detect barcode"));
    } finally {
      setDetectingBarcode(false);
    }
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

      {special ? (
        <VStack>
          <H2>By barcode</H2>
          <p className="text-sm text-gray-500">
            Hint: you might want to use speech recognition on your device to
            enter the barcode by reading it out loud.
          </p>
          <form onSubmit={onBarcodeFormSubmit}>
            <VStack>
              <ErrorBlock error={error} />
              <fieldset className="flex items-stretch gap-2">
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
              <FileButton
                accept="image/*"
                capture
                disabled={detectingBarcode}
                onChange={onBarcodeFileChange}
              >
                <span className="flex items-center gap-2">
                  <CameraIcon className="inline-block size-5" /> Capture barcode
                  (beta)
                </span>
              </FileButton>
            </VStack>
          </form>
        </VStack>
      ) : (
        <p className="text-gray-500">
          You will be able to check in products to share your impression as well
          as places.
        </p>
      )}
    </VStack>
  );
}
