// @ts-expect-error - Quagga is not typed
import Quagga from "quagga";

export interface QuaggaResult {
  codeResult: {
    code: string;
  };
}

export async function detectBarcode(
  file: File,
  type: "ean",
): Promise<string | null> {
  return new Promise((resolve) => {
    const config = {
      inputStream: {
        size: 800,
      },
      locator: {
        patchSize: "medium",
        halfSample: true,
      },
      numOfWorkers: 1,
      decoder: {
        readers: [
          {
            format: `${type}_reader`,
            config: {},
          },
        ],
      },
      locate: true,
      src: URL.createObjectURL(file),
    };

    alert("Detecting barcode...");
    Quagga.decodeSingle(config, (result: QuaggaResult | undefined) => {
      alert("Barcode detected");
      const detectedBarcode = result?.codeResult.code || null;
      resolve(detectedBarcode);
    });
  });
}
