"use client";

import { MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { TimelineSection } from "./TimelineSection";
import { VStack } from "@/components/layout/VStack";
import { PlaceCheckin } from "@/components/placeCheckin/PlaceCheckin";
import { H1, H2 } from "@/components/style/Hn";
import { Profile } from "@/components/user/Profile";

export interface HomePageContentProps {
  profile: Profile | null;
  checkins: PlaceCheckin[];
}

export function HomePageContent({
  profile,
  checkins,
}: HomePageContentProps): JSX.Element {
  return (
    <VStack className="HomePageContent" gap="gap-8">
      <H1>Italog</H1>
      {profile ? (
        <>
          <VStack>
            <H2>Search</H2>
            <p className="mx-auto flex gap-4">
              <Link
                className="grid size-36 items-center justify-center border border-gray-400 bg-gray-50 hover:bg-gray-100 active:bg-gray-200"
                href="/place/search"
              >
                <span>
                  <MapPinIcon className="mx-auto size-8" />
                  Place
                </span>
              </Link>
              {/* <Link
                className="grid size-36 items-center justify-center border border-gray-400 bg-gray-50 hover:bg-gray-100 active:bg-gray-200"
                href="/product/search"
              >
                <span>
                  <ShoppingBagIcon className="mx-auto size-8" />
                  Product
                </span>
              </Link> */}
            </p>
          </VStack>
          <TimelineSection checkins={checkins} />
        </>
      ) : (
        <p className="mx-auto my-16">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            className="border border-gray-400 bg-gray-50 p-8 hover:bg-gray-100 active:bg-gray-200"
            href="/api/auth/login"
          >
            Login
          </a>
        </p>
      )}
    </VStack>
  );
}
