"use client";

import { GlobeAltIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ReactNode, useMemo, useState } from "react";
import { RegisterCheckinForm } from "./RegisterCheckinForm";
import { Checkin } from "@/components/checkin/Checkin";
import { VStack } from "@/components/layout/VStack";
import { Place } from "@/components/place/Place";
import { H2 } from "@/components/style/Hn";
import { requestRegisterVisit } from "@/components/placeCheckin/registerVisitRequest";

export interface PlacePageContentProps {
  checkedIn: boolean;
  place: Place;
  userCheckins: Checkin[];
}

export function PlacePageContent({
  place,
  userCheckins,
  checkedIn,
}: PlacePageContentProps): JSX.Element {
  const todaysCheckin = findTodaysCheckin(userCheckins);
  const [editingCheckin, setEditingCheckin] = useState<Checkin>(
    todaysCheckin || {
      boardId: place.boardId,
      comment: "",
      createdAt: 0,
      id: "",
      starred: false,
      userDate: "",
      userId: "",
    },
  );
  const [liveUserCheckins, setLiveUserCheckins] = useState(userCheckins);
  const [formWorking, setFormWorking] = useState(false);
  const siteHostName = useHostNameOf(place.webUrl);

  const onRegisterCheckinChange = async (checkin: Checkin) => {
    setEditingCheckin(checkin);
  };

  const onRegisterCheckinSubmit = async (checkin: Checkin) => {
    try {
      setFormWorking(true);
      const timezoneOffset = new Date().getTimezoneOffset();
      await requestRegisterVisit({
        timezoneOffset,
        checkin: checkin,
        checkedIn: checkedIn,
      });
      setLiveUserCheckins((prevCheckins) => {
        const newCheckins = prevCheckins.filter(
          (v) =>
            v.userDate !== checkin.userDate || v.boardId !== checkin.boardId,
        );
        return [...newCheckins, checkin];
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
      <h1 className="text-2xl font-bold">{place.displayName || "(No name)"}</h1>
      <div className="flex flex-col">
        <PlaceInfoLink href={place.mapUrl} Icon={MapPinIcon}>
          {place.address}
        </PlaceInfoLink>
        {place.webUrl && (
          <PlaceInfoLink href={place.webUrl} Icon={GlobeAltIcon}>
            {siteHostName}{" "}
          </PlaceInfoLink>
        )}
      </div>
      <hr />
      <RegisterCheckinForm
        disabled={formWorking}
        onChange={onRegisterCheckinChange}
        onSubmit={onRegisterCheckinSubmit}
        checkin={editingCheckin}
        checkedIn={checkedIn}
      />
      <hr />
      <H2>Your checkins</H2>
      <ul className="ms-4 list-disc">
        {liveUserCheckins.map((checkin) => (
          <li key={`${checkin.boardId}-${checkin.userId}-${checkin.userDate}`}>
            {new Date(checkin.createdAt).toLocaleDateString()}{" "}
            {checkin.starred && "⭐ "}
            {checkin.comment}
          </li>
        ))}
        {liveUserCheckins.length < 1 && <li>No checkins yet</li>}
      </ul>
    </VStack>
  );
}

function PlaceInfoLink({
  children,
  href,
  Icon,
}: {
  children: ReactNode;
  href: string;
  Icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
}): JSX.Element {
  return (
    <Link
      className="flex items-center gap-2 py-2 hover:bg-gray-50 active:bg-gray-100"
      href={href}
      target="_blank"
    >
      <Icon className="size-8 shrink-0 text-blue-700" />
      <span>
        {children}
        <ArrowTopRightOnSquareIcon className="inline size-4" />
      </span>
    </Link>
  );
}

function useHostNameOf(url: string | undefined): string | undefined {
  return useMemo(() => {
    if (!url) {
      return undefined;
    }

    const urlObj = new URL(url);
    return urlObj.hostname;
  }, [url]);
}

function findTodaysCheckin(checkins: Checkin[]): Checkin | undefined {
  const today = new Date().toISOString().slice(0, 10);
  return checkins.find((checkin) => checkin.userDate === today);
}
