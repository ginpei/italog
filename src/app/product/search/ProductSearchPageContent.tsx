"use client";

import { CameraIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { detectBarcode } from "./quaggaFunctions";
import { ErrorBlock } from "@/components/error/ErrorBlock";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Button, ButtonLabel } from "@/components/style/Button";
import { H1, H2 } from "@/components/style/Hn";
import { TextInput } from "@/components/style/TextInput";

export interface ProductSearchPageContentProps {
  recentCheckins: never[];
}

export function ProductSearchPageContent({}: ProductSearchPageContentProps): JSX.Element {
  const [progressMessage, setProgressMessage] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [barcode, setBarcode] = useState("");

  const special = new URL(location.href).searchParams.get("special") === "1";

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
    try {
      const [file] = event.target.files || [];
      event.target.value = "";
      if (!file) {
        alert("No file selected");
        return;
      }

      const detectedBarcode = await detectBarcode(file, "ean", (result) => {
        setProgressMessage(JSON.stringify(result));
      });
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
      setError(toError(error));
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
              <p className="border">{progressMessage || "..."}</p>
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
              <div>
                <ButtonLabel>
                  <input
                    accept="image/*"
                    capture
                    className="hidden"
                    onChange={onBarcodeFileChange}
                    type="file"
                  />
                  <CameraIcon className="inline-block size-5" /> Capture barcode
                  (beta)
                </ButtonLabel>
              </div>
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
