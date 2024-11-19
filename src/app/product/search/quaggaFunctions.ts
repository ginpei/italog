// @ts-expect-error - Quagga is not typed
import Quagga from "quagga";

export interface QuaggaResult {
  codeResult?: {
    code: string;
  };
}

export async function detectBarcode(
  file: File,
  type: "ean",
): Promise<string | null> {
  return new Promise((resolve, reject) => {
    window.setTimeout(
      () => reject(new Error("Barcode detection timeout")),
      5000,
    );

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

    Quagga.decodeSingle(config, (result: QuaggaResult | undefined) => {
      const detectedBarcode = result?.codeResult?.code || null;
      resolve(detectedBarcode);
    });
  });
}
