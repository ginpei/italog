"use client";

import { CameraIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { detectBarcode } from "./quaggaFunctions";
import { getProductSearchByBarcode } from "@/app/api/product/search/productSearchApi";
import { ErrorBlock } from "@/components/error/ErrorBlock";
import { SpinnerBlock } from "@/components/layout/SpinnerBlock";
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
  const [barcode, setBarcode] = useState("");
  const [products, setProducts] = useState<Product[] | null>(null);
  const router = useRouter();

  /**
   * @returns `true` if the product is found and navigated to the product page
   */
  const search = useCallback(
    async (barcode: string) => {
      const result = await getProductSearchByBarcode(barcode);
      if (!result.ok) {
        throw new Error(result.error);
      }

      setProducts(result.products);
      if (result.products.length === 1) {
        router.push(`/product/${result.products[0]!.boardId}`);
        return true;
      }
      return false;
    },
    [router],
  );

  const onBarcodeFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setWorking(true);
    setError(null);

    try {
      const [file] = event.target.files || [];
      event.target.value = "";
      if (!file) {
        setWorking(false);
        return;
      }

      const detectedBarcode = await detectBarcode(file, "ean");
      if (!detectedBarcode) {
        window.alert("No barcode detected");
        setWorking(false);
        return;
      }

      const ok = window.confirm(
        `Do you want to use this barcode?\n${detectedBarcode}`,
      );
      if (!ok) {
        setWorking(false);
        return;
      }

      setBarcode(detectedBarcode);
      const found = await search(detectedBarcode);
      if (!found) {
        setWorking(false);
      }
    } catch (error) {
      setWorking(false);
      console.error(error);
      setError(new Error("Failed to detect barcode"));
    }
  };

  const onBarcodeFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setWorking(true);
    setError(null);
    setProducts(null);

    try {
      const found = await search(barcode);
      if (!found) {
        setWorking(false);
      }
    } catch (error) {
      setWorking(false);
      console.error(error);
      setError(new Error("Failed to search product (server error)"));
    }
  };

  const onBarcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "barcode") {
      setBarcode(value);
    }
  };

  return (
    <VStack className="ProductSearchPageContent" gap="gap-8">
      <H1>Search product</H1>
      <VStack gap="gap-8">
        <VStack>
          <div className="mx-auto flex gap-4">
            <FileButton
              accept="image/*"
              capture
              className={`${superButtonShapeClassNames} ${buttonThemeClassNames}`}
              disabled={working}
              onChange={onBarcodeFileChange}
            >
              <span>
                <CameraIcon className="mx-auto size-8" />
                Capture barcode
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
        {working && <SpinnerBlock />}
        {!working && products && (
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
    </VStack>
  );
}
