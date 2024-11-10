import {
  ArrowTopRightOnSquareIcon,
  GlobeAltIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { APIProvider } from "@vis.gl/react-google-maps";
import Link from "next/link";
import { useMemo } from "react";
import { VStack } from "../layout/VStack";
import { EmbeddedMap } from "../timeline/EmbeddedMap";
import { Place } from "./Place";

export interface PlaceDescriptionProps {
  place: Place;
}

export function PlaceDescription({
  place,
}: PlaceDescriptionProps): JSX.Element {
  const siteHostName = useHostNameOf(place.webUrl);

  return (
    <VStack className="PlaceDescription">
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
    </VStack>
  );
}

function PlaceInfoLink({
  children,
  href,
  Icon,
}: {
  children: React.ReactNode;
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
