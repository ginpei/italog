"use client";

import { CheckCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { CheckInForm } from "./CheckInForm";
import { Checkin, CheckinRow } from "@/components/checkin/Checkin";
import { VStack } from "@/components/layout/VStack";
import { Place } from "@/components/place/Place";
import { PlaceDescription } from "@/components/place/PlaceDescription";
import { requestRegisterVisit } from "@/components/placeCheckin/checkInPlace";
import { H2 } from "@/components/style/Hn";
import { BoardCheckinItem } from "@/components/timeline/BoardCheckinItem";
import { CheckinList } from "@/components/timeline/CheckinList";

export interface PlacePageContentProps {
  checkedIn: boolean;
  checkins: Checkin[];
  place: Place;
}

export function PlacePageContent({
  checkedIn,
  checkins,
  place,
}: PlacePageContentProps): JSX.Element {
  const [editingCheckin, setEditingCheckin] = useState<CheckinRow>({
    boardId: place.boardId,
    comment: "",
    createdAt: 0,
    id: "",
    starred: false,
    userDate: "",
    userId: "",
  });
  const [liveCheckins, setUserCheckins] = useState(checkins);
  const [formWorking, setFormWorking] = useState(false);

  const onRegisterCheckinChange = async (checkin: CheckinRow) => {
    setEditingCheckin(checkin);
  };

  const onRegisterCheckinSubmit = async (checkinRow: CheckinRow) => {
    try {
      const checkin: Checkin = {
        ...checkinRow,
        profile: {
          id: "checkinRow.userId", // TODO
          displayName: "checkinRow.userDate", // TODO
        },
        board: {
          boardId: place.boardId,
          displayName: place.displayName,
          boardType: place.boardType,
        },
      };

      setFormWorking(true);
      const timezoneOffset = new Date().getTimezoneOffset();
      await requestRegisterVisit({
        timezoneOffset,
        checkin: checkin,
        checkedIn: checkedIn,
      });
      setUserCheckins((checkins) => {
        const index = checkins.findIndex((v) => v.id === checkin.id);
        const newCheckins =
          index === -1
            ? [...checkins, checkin]
            : checkins.map((v) => (v.id === checkin.id ? checkin : v));
        const sorted = newCheckins.toSorted(
          (a, b) => b.createdAt - a.createdAt,
        );
        return sorted;
      });
    } catch (error) {
      console.error("Failed to register checkin", error);
      alert("Failed to register checkin"); // TODO
    } finally {
      setFormWorking(false);
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
      <div className="mx-auto flex gap-1">
        <button
          className="
            mx-auto grid size-32 place-items-center border border-gray-400 bg-gray-50 text-sm
            hover:bg-gray-100
            active:bg-gray-200
            disabled:bg-gray-300 disabled:text-gray-500
          "
        >
          <div className="text-center">
            <CheckCircleIcon className="mx-auto size-12" />
            Check in
          </div>
        </button>
        <button
          className="
            mx-auto grid size-32 place-items-center border border-gray-400 bg-gray-50 text-sm
            hover:bg-gray-100
            active:bg-gray-200
            disabled:bg-gray-300 disabled:text-gray-500
          "
        >
          <div className="text-center">
            <PencilSquareIcon className="mx-auto size-12" />
            Tell something
          </div>
        </button>
      </div>
      <CheckInForm
        checkin={editingCheckin}
        disabled={formWorking}
        onCheckinChange={onRegisterCheckinChange}
        onCheckinSubmit={onRegisterCheckinSubmit}
      />
      <H2>Checkins</H2>
      <CheckinList>
        {liveCheckins.map((checkin) => (
          <BoardCheckinItem key={checkin.id} checkin={checkin} />
        ))}
      </CheckinList>
    </VStack>
  );
}
