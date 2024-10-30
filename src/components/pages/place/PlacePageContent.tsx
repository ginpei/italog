"use client";

import { GlobeAltIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ReactNode, useMemo, useState } from "react";
import { RegisterVisitForm } from "./RegisterVisitForm";
import { Place } from "@/components/lib/place/Place";
import { H2 } from "@/components/lib/style/Hn";
import { Visit } from "@/components/lib/visit/Visit";
import { requestRegisterVisit } from "@/components/lib/visit/registerVisitRequest";

export interface PlacePageContentProps {
  place: Place;
  userVisits: Visit[];
  visited: boolean;
}

export function PlacePageContent({
  place,
  userVisits,
  visited,
}: PlacePageContentProps): JSX.Element {
  const todaysVisit = findTodaysVisit(userVisits);
  const [editingVisit, setEditingVisit] = useState<Visit>(
    todaysVisit || {
      comment: "",
      createdAt: 0,
      date: "",
      placeId: place.id,
      starred: false,
      userId: "",
    },
  );
  const [liveUserVisits, setLiveUserVisits] = useState(userVisits);
  const [formWorking, setFormWorking] = useState(false);
  const siteHostName = useHostNameOf(place.webUrl);

  const onRegisterVisitChange = async (visit: Visit) => {
    setEditingVisit(visit);
  };

  const onRegisterVisitSubmit = async (visit: Visit) => {
    try {
      setFormWorking(true);
      const timezoneOffset = new Date().getTimezoneOffset();
      await requestRegisterVisit({ timezoneOffset, visit, visited });
      setLiveUserVisits((prevVisits) => {
        const newVisits = prevVisits.filter(
          (v) => v.date !== visit.date || v.placeId !== visit.placeId,
        );
        return [...newVisits, visit];
      });
    } catch (error) {
      console.error("Failed to register visit", error);
      alert("Failed to register visit"); // TODO
    } finally {
      setFormWorking(false);
    }
  };

  return (
    <>
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
      <RegisterVisitForm
        disabled={formWorking}
        onChange={onRegisterVisitChange}
        onSubmit={onRegisterVisitSubmit}
        visit={editingVisit}
        visited={visited}
      />
      <hr />
      <H2>Your visits</H2>
      <ul className="ms-4 list-disc">
        {liveUserVisits.map((visit) => (
          <li key={`${visit.placeId}-${visit.userId}-${visit.date}`}>
            {new Date(visit.createdAt).toLocaleDateString()}{" "}
            {visit.starred && "⭐ "}
            {visit.comment}
          </li>
        ))}
        {liveUserVisits.length < 1 && <li>No visits yet</li>}
      </ul>
    </>
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

function findTodaysVisit(visits: Visit[]): Visit | undefined {
  const today = new Date().toISOString().slice(0, 10);
  return visits.find((visit) => visit.date === today);
}
