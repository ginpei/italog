"use client";

import Link from "next/link";
import { VStack } from "@/components/lib/layout/VStack";
import { H1 } from "@/components/lib/style/Hn";
import { Profile } from "@/components/lib/user/Profile";

export interface HomePageContentProps {
  profile: Profile | null;
}

export function HomePageContent({
  profile,
}: HomePageContentProps): JSX.Element {
  return (
    <VStack className="HomePageContent">
      <H1>Italog</H1>
      {profile ? (
        <p className="mx-auto my-16">
          <Link
            className="border border-gray-400 bg-gray-50 p-8 hover:bg-gray-100 active:bg-gray-200"
            href="/find"
          >
            Find
          </Link>
        </p>
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
