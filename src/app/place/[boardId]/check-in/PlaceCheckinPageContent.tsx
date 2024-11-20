"use client";

import { NewCheckinSection } from "@/components/checkin/NewCheckinSection";
import { VStack } from "@/components/layout/VStack";
import { Place } from "@/components/place/Place";
import { PlaceDescription } from "@/components/place/PlaceDescription";

export interface PlaceCheckinPageContentProps {
  place: Place;
}

export function PlaceCheckinPageContent({
  place,
}: PlaceCheckinPageContentProps): JSX.Element {
  return (
    <VStack className="PlaceCheckinPageContent" gap="gap-8">
      <PlaceDescription place={place} />
      <NewCheckinSection
        boardId={place.boardId}
        nextUrl={`/place/${place.boardId}`}
      />
    </VStack>
  );
}
