import { APIProvider } from "@vis.gl/react-google-maps";
import { useRef, useState } from "react";
import { BoardType } from "../board/Board";
import { Checkin } from "../checkin/Checkin";
import { ErrorBlock } from "../error/ErrorBlock";
import { VStack } from "../layout/VStack";
import { Place } from "../place/Place";
import { Product } from "../product/Product";
import { ProductImageBlock } from "../product/ProductImage";
import { CheckinList } from "./CheckinList";
import { EmbeddedMap } from "./EmbeddedMap";
import { TimelineItem } from "./TimelineItem";

export interface TimelineBlockProps {
  checkins: Checkin[];
  error: Error | null;
  loading: boolean;
  places: Place[];
  products: Product[];
}

export function TimelineBlock({
  checkins,
  error,
  loading,
  places,
  products,
}: TimelineBlockProps): JSX.Element {
  const [primaryBoardId, setPrimaryBoardId] = useState<string>(
    checkins[0]?.board.boardId ?? "",
  );
  const placeRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const primaryBoardType: BoardType = places.some(
    (v) => v.boardId === primaryBoardId,
  )
    ? "place"
    : "product";

  const onMapMarkerClick = (placeId: string) => {
    setPrimaryBoardId(placeId);
    const el = placeRefs.current.get(placeId);
    if (el) {
      // TODO what if 2+ checkins?
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const onItemShowClick = (checkin: Checkin) => {
    setPrimaryBoardId(checkin.board.boardId);
  };

  return (
    <div className="TimelineBlock">
      <ErrorBlock error={error} />
      {loading ? (
        <div>{/* TODO */}Loading...</div>
      ) : (
        <VStack>
          <TimelinePreviewBlock
            boardType={primaryBoardType}
            loading={loading}
            onMapMarkerClick={onMapMarkerClick}
            places={places}
            primaryPlaceId={primaryBoardId}
            products={products}
          />
          <CheckinList>
            {checkins.map((checkin) => (
              <div
                key={checkin.id}
                ref={(el) => {
                  if (el) placeRefs.current.set(checkin.boardId, el);
                  else placeRefs.current.delete(checkin.boardId);
                }}
              >
                <TimelineItem
                  checkin={checkin}
                  onShowClick={onItemShowClick}
                  selected={checkin.board.boardId === primaryBoardId}
                />
              </div>
            ))}
          </CheckinList>
        </VStack>
      )}
    </div>
  );
}

interface TimelinePreviewBlockProps {
  boardType: BoardType;
  loading: boolean;
  onMapMarkerClick: (id: string) => void;
  places: Place[];
  primaryPlaceId: string;
  products: Product[];
}

function TimelinePreviewBlock({
  boardType,
  loading,
  onMapMarkerClick,
  places,
  primaryPlaceId,
  products,
}: TimelinePreviewBlockProps): JSX.Element {
  const product = products.find((p) => p.boardId === primaryPlaceId);

  return (
    <div className="TimelinePreviewBlock sticky top-0 h-[30vh] bg-white py-1 dark:bg-black">
      {loading ? (
        <div className="size-full animate-pulse" />
      ) : boardType === "place" ? (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <EmbeddedMap
            onPlaceClick={onMapMarkerClick}
            places={places}
            primaryPlaceId={primaryPlaceId}
          />
        </APIProvider>
      ) : (
        <div className="relative h-full">
          <ProductImageBlock imageUrl={product!.imageUrl} />
          <div className="absolute bottom-0 w-full bg-gray-500/80 p-2 text-white">
            {product!.displayName}
          </div>
        </div>
      )}
    </div>
  );
}
