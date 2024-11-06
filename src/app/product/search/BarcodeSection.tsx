import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BarCodeReader } from "./BarCodeReader";
import { fetchSearchProductApi } from "@/app/api/product/productApis";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Button } from "@/components/style/Button";
import { H2 } from "@/components/style/Hn";
import { TextInput } from "@/components/style/TextInput";

// export interface BarcodeSectionProps {}

export function BarcodeSection(): JSX.Element {
  const [barcode, setBarcode] = useState("");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const onBarcodeFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError(null);
    setWorking(true);

    try {
      const [product] = await fetchSearchProductApi({ barcode });
      if (!product) {
        throw new Error(`Product with barcode ${barcode} not found`);
      }

      router.push(`/product/${product.boardId}`);
    } catch (error) {
      console.error(error);
      setError(toError(error));
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
    <VStack className="BarcodeSection">
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
  );
}
