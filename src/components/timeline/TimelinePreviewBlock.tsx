import { APIProvider } from "@vis.gl/react-google-maps";
import { BoardType } from "../board/Board";
import { Place } from "../place/Place";
import { Product } from "../product/Product";
import { ProductImageBlock } from "../product/ProductImage";
import { EmbeddedMap } from "./EmbeddedMap";

export interface TimelinePreviewBlockProps {
  boardType: BoardType;
  loading: boolean;
  onMapMarkerClick: (id: string) => void;
  places: Place[];
  primaryPlaceId: string;
  products: Product[];
}

export function TimelinePreviewBlock({
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
