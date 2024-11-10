"use client";

import { CheckCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Checkin } from "@/components/checkin/Checkin";
import { VStack } from "@/components/layout/VStack";
import { Place } from "@/components/place/Place";
import { PlaceDescription } from "@/components/place/PlaceDescription";
import { H2 } from "@/components/style/Hn";
import { BoardCheckinItem } from "@/components/timeline/BoardCheckinItem";
import { CheckinList } from "@/components/timeline/CheckinList";

export interface PlacePageContentProps {
  checkedIn: boolean; // TODO remove
  checkins: Checkin[];
  place: Place;
}

export function PlacePageContent({
  checkins,
  place,
}: PlacePageContentProps): JSX.Element {
  const onCheckInClick = async () => {
    // TODO
    alert("TODO");
  };

  return (
    <VStack>
      <PlaceDescription place={place} />
      {/* <hr />
      <RegisterCheckinForm
        disabled={formWorking}
        onChange={onRegisterCheckinChange}
        onSubmit={onRegisterCheckinSubmit}
        checkin={editingCheckin}
        checkedIn={checkedIn}
      /> */}
      {/* <hr /> */}
      <div className="mx-auto flex gap-1">
        <button
          className="
            mx-auto grid size-32 place-items-center border border-gray-400 bg-gray-50 text-sm
            hover:bg-gray-100
            active:bg-gray-200
            disabled:bg-gray-300 disabled:text-gray-500
          "
          onClick={onCheckInClick}
        >
          <div className="text-center">
            <CheckCircleIcon className="mx-auto size-12" />
            Check in
          </div>
        </button>
        <Link
          className="
            mx-auto grid size-32 place-items-center border border-gray-400 bg-gray-50 text-sm
            hover:bg-gray-100
            active:bg-gray-200
            disabled:bg-gray-300 disabled:text-gray-500
          "
          href={`/place/${place.boardId}/checkIn`}
        >
          <div className="text-center">
            <PencilSquareIcon className="mx-auto size-12" />
            Tell something
          </div>
        </Link>
      </div>
      <H2>Checkins</H2>
      <CheckinList>
        {checkins.map((checkin) => (
          <BoardCheckinItem key={checkin.id} checkin={checkin} />
        ))}
      </CheckinList>
    </VStack>
  );
}
