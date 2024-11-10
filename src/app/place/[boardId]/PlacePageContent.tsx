"use client";

import { CheckCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Checkin } from "@/components/checkin/Checkin";
import { requestCreatePlaceCheckin } from "@/components/checkin/checkinApis";
import { ErrorBlock } from "@/components/error/ErrorBlock";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Place } from "@/components/place/Place";
import { PlaceDescription } from "@/components/place/PlaceDescription";
import { H2 } from "@/components/style/Hn";
import { CheckinItem } from "@/components/timeline/CheckinItem";
import { CheckinList } from "@/components/timeline/CheckinList";

export interface PlacePageContentProps {
  checkedIn: boolean; // TODO remove
  checkins: Checkin[];
  place: Place;
  userId: string;
}

export function PlacePageContent({
  checkins,
  place,
  userId,
}: PlacePageContentProps): JSX.Element {
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const onCheckInClick = async () => {
    setWorking(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await requestCreatePlaceCheckin(place.boardId, {
        comment: "",
        rate: "0",
      });
      router.refresh();
      setSuccessMessage("Checked in!");
    } catch (error) {
      console.error(error);
      setError(toError(error));
    } finally {
      setWorking(false);
    }
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
      {successMessage && (
        <div className="mx-auto text-green-500">{successMessage}</div>
      )}
      <ErrorBlock error={error} />
      <div className="mx-auto flex gap-1">
        <button
          className="
            mx-auto grid size-32 place-items-center border border-gray-400 bg-gray-50 text-sm
            hover:bg-gray-100
            active:bg-gray-200
            disabled:bg-gray-300 disabled:text-gray-500
          "
          disabled={working}
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
          <CheckinItem
            key={checkin.id}
            checkin={checkin}
            own={checkin.userId === userId}
          />
        ))}
      </CheckinList>
    </VStack>
  );
}
