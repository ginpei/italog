"use client";

import { GlobeAltIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { APIProvider } from "@vis.gl/react-google-maps";
import Link from "next/link";
import { ReactNode, useMemo, useState } from "react";
import { RegisterCheckinForm } from "./RegisterCheckinForm";
import { Checkin, CheckinRow } from "@/components/checkin/Checkin";
import { VStack } from "@/components/layout/VStack";
import { Place } from "@/components/place/Place";
import { requestRegisterVisit } from "@/components/placeCheckin/checkInPlace";
import { H2 } from "@/components/style/Hn";
import { BoardCheckinItem } from "@/components/timeline/BoardCheckinItem";
import { CheckinList } from "@/components/timeline/CheckinList";
import { EmbeddedMap } from "@/components/timeline/EmbeddedMap";

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
  const siteHostName = useHostNameOf(place.webUrl);

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
      <hgroup>
        <h1 className="text-2xl font-bold">
          {place.displayName || "(No name)"}
        </h1>
        <p>{place.typeDisplayName}</p>
      </hgroup>
      <div className="h-[30vh] py-1">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <EmbeddedMap places={[place]} />
        </APIProvider>
      </div>
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
      <H2>Checkins</H2>
      <CheckinList>
        {liveCheckins.map((checkin) => (
          <BoardCheckinItem key={checkin.id} checkin={checkin} />
        ))}
      </CheckinList>
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
