"use client";

import { CameraIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { detectBarcode } from "./quaggaFunctions";
import { getProductSearchByBarcode } from "@/app/api/product/search/productSearchApi";
import { useSpecialFlag } from "@/components/api/dev/devHooks";
import { ErrorBlock } from "@/components/error/ErrorBlock";
import { VStack } from "@/components/layout/VStack";
import { Product } from "@/components/product/Product";
import { Button, FileButton } from "@/components/style/Button";
import { H1, H2 } from "@/components/style/Hn";
import { Link } from "@/components/style/Link";
import { superButtonShapeClassNames } from "@/components/style/SuperButton";
import { TextInput } from "@/components/style/TextInput";
import { buttonThemeClassNames } from "@/components/style/controlClassNames";

export interface ProductSearchPageContentProps {
  recentCheckins: never[];
}

export function ProductSearchPageContent({}: ProductSearchPageContentProps): JSX.Element {
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [detectingBarcode, setDetectingBarcode] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [products, setProducts] = useState<Product[] | null>(null);
  const special = useSpecialFlag();

  const onBarcodeFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setWorking(true);
    setError(null);
    setProducts(null);

    try {
      const result = await getProductSearchByBarcode(barcode);
      if (!result.ok) {
        throw new Error(result.error);
      }
      setProducts(result.products);
    } catch (error) {
      console.error(error);
      setError(new Error("Failed to search product (server error)"));
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
        <VStack gap="gap-8">
          <H2>By barcode</H2>
          <VStack>
            <div className="mx-auto flex gap-4">
              <FileButton
                accept="image/*"
                capture
                className={`${superButtonShapeClassNames} ${buttonThemeClassNames}`}
                disabled={detectingBarcode || working}
                onChange={onBarcodeFileChange}
              >
                <span>
                  <CameraIcon className="mx-auto size-8" />
                  Capture
                </span>
              </FileButton>
            </div>
            <form onSubmit={onBarcodeFormSubmit}>
              <VStack>
                <ErrorBlock error={error} />
                <fieldset disabled={working} className="flex items-end gap-1">
                  <label className="flex w-full flex-col">
                    Barcode:
                    <TextInput
                      className="w-full"
                      inputMode="numeric"
                      onChange={onBarcodeChange}
                      name="barcode"
                      pattern="(\d|\s)*"
                      placeholder="0 00000 00000 0"
                      value={barcode}
                    />
                  </label>
                  <Button className="inline-grid w-16 place-items-center">
                    <MagnifyingGlassIcon className="size-5" />
                  </Button>
                </fieldset>
              </VStack>
            </form>
          </VStack>
          {products && (
            <VStack>
              <H2>Search result</H2>
              <ul className="ms-8 list-disc">
                {products.map((product) => (
                  <li key={product.barcode}>
                    <Link href={`/product/${product.boardId}`}>
                      {product.displayName}
                    </Link>
                  </li>
                ))}
                {products.length === 0 && <li>No products found</li>}
              </ul>
              <p>
                <Link href={`/product/register?barcode=${barcode}`}>
                  Register new product...
                </Link>
              </p>
            </VStack>
          )}
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
