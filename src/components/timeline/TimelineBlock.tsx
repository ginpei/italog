import { useEffect, useRef, useState } from "react";
import { BoardType } from "../board/Board";
import { Checkin } from "../checkin/Checkin";
import { ErrorBlock } from "../error/ErrorBlock";
import { VStack } from "../layout/VStack";
import { Place } from "../place/Place";
import { Product } from "../product/Product";
import { CheckinList } from "./CheckinList";
import { TimelineItem } from "./TimelineItem";
import { TimelinePreviewBlock } from "./TimelinePreviewBlock";

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

  const primaryBoardType: BoardType | "" = places.some(
    (v) => v.boardId === primaryBoardId,
  )
    ? "place"
    : products.some((v) => v.boardId === primaryBoardId)
      ? "product"
      : "";

  useEffect(() => {
    if (primaryBoardId !== "") {
      return;
    }

    const firstCheckin = checkins[0];
    if (!firstCheckin) {
      return;
    }

    setPrimaryBoardId(firstCheckin.board.boardId);
  }, [checkins, primaryBoardId]);

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
