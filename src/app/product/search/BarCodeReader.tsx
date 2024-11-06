// @ts-expect-error - Quagga is not typed
import Quagga from "quagga";
import { createRef, useCallback, useEffect, useState } from "react";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Button } from "@/components/style/Button";

export interface BarCodeReaderProps {
  onRead: (barcode: string) => void;
}

interface QuaggaProceededResult {
  box?: QuaggaBox;
  boxes?: QuaggaBox[];
  codeResult?: {
    code: string;
  };
}

type QuaggaBox = [
  [number, number],
  [number, number],
  [number, number],
  [number, number],
];

/**
 * @see https://serratus.github.io/quaggaJS/examples/live_w_locator.html
 * @see https://github.com/serratus/quaggaJS/blob/master/example/live_w_locator.js
 */
export function BarCodeReader({ onRead }: BarCodeReaderProps): JSX.Element {
  const [error, setError] = useState<Error | null>(null);
  const [quaggaState, setQuaggaState] = useState<
    "ready" | "starting" | "shooting" | "stopped"
  >("ready");
  const refContainer = createRef<HTMLDivElement>();

  const onStartClick = useCallback(() => {
    if (!refContainer.current) {
      setError(new Error("Page is not ready"));
      return;
    }

    setError(null);

    setQuaggaState("starting");
    const config = {
      inputStream: {
        type: "LiveStream",
        target: refContainer.current,
        constraints: {
          width: {
            min: 640,
          },
          height: {
            min: 480,
          },
          aspectRatio: {
            min: 1,
            max: 100,
          },
          facingMode: "environment",
        },
      },
      locator: {
        patchSize: "medium",
        halfSample: true,
      },
      numOfWorkers: 2,
      frequency: 10,
      decoder: {
        readers: [
          {
            format: "ean_reader",
            config: {},
          },
        ],
      },
      locate: true,
    };

    Quagga.init(config, function (err: unknown) {
      if (err) {
        console.error(err);
        setError(toError(err));
        return;
      }

      Quagga.start();
      setQuaggaState("shooting");
    });
  }, [refContainer]);

  useEffect(() => {
    const onProceeded = (result?: QuaggaProceededResult) => {
      if (!result) {
        return;
      }

      const ctx = Quagga.canvas.ctx.overlay;
      const canvas = Quagga.canvas.dom.overlay;

      if (result.boxes) {
        ctx.clearRect(0, 0, parseInt(canvas.width), parseInt(canvas.height));

        const codeBoxes = result.boxes.filter((v) => v !== result.box);
        for (const box of codeBoxes) {
          Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, ctx, {
            color: "green",
            lineWidth: 2,
          });
        }
      }

      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, ctx, {
          color: "#00F",
          lineWidth: 2,
        });
      }

      if (result.codeResult?.code) {
        Quagga.stop();
        setQuaggaState("stopped");
        onRead(result.codeResult.code);
      }
    };

    Quagga.onProcessed(onProceeded);
    return () => Quagga.offProcessed(onProceeded);
  }, [onRead]);

  const onStopClick = useCallback(() => {
    Quagga.stop();
    setQuaggaState("stopped");
  }, []);

  return (
    <VStack className="BarCodeReader">
      {error && <p className="text-rose-800">⚠️ {error.message}</p>}
      <div className="flex items-center gap-4">
        <Button
          disabled={quaggaState !== "ready" && quaggaState !== "stopped"}
          onClick={onStartClick}
        >
          Start
        </Button>{" "}
        <Button disabled={quaggaState !== "shooting"} onClick={onStopClick}>
          Stop
        </Button>
        <span>{quaggaState}</span>
      </div>
      <div
        className="
          relative aspect-[1.333] w-full border
          [&>.drawingBuffer]:absolute [&>.drawingBuffer]:top-0 [&>.drawingBuffer]:w-full
          [&>br]:hidden
        "
        ref={refContainer}
      ></div>
    </VStack>
  );
}
