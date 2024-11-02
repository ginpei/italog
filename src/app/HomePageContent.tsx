"use client";

import Link from "next/link";
import { TimelineSection } from "./TimelineSection";
import { VStack } from "@/components/layout/VStack";
import { H1 } from "@/components/style/Hn";
import { Profile } from "@/components/user/Profile";
import { VisitPlace } from "@/components/visit/VisitPlace";

export interface HomePageContentProps {
  profile: Profile | null;
  visits: VisitPlace[];
}

export function HomePageContent({
  profile,
  visits,
}: HomePageContentProps): JSX.Element {
  return (
    <VStack className="HomePageContent">
      <H1>Italog</H1>
      {profile ? (
        <>
          <p className="mx-auto my-16">
            <Link
              className="border border-gray-400 bg-gray-50 p-8 hover:bg-gray-100 active:bg-gray-200"
              href="/search/places"
            >
              Find
            </Link>
          </p>
          <TimelineSection visits={visits} />
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
