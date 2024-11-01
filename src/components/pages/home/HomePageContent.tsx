"use client";

import { VStack } from "@/components/lib/layout/VStack";
import { Link } from "@/components/lib/style/Link";
import { Profile } from "@/components/lib/user/Profile";

export interface HomePageContentProps {
  profile: Profile | null;
}

export function HomePageContent({
  profile,
}: HomePageContentProps): JSX.Element {
  return (
    <VStack className="HomePageContent">
      <h1 className="text-5xl font-bold">Italog</h1>
      <div>
        <p>User name: {profile ? profile.displayName : "no login"}</p>
      </div>
      <p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/auth/login">Login</a>
        {" | "}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/auth/logout">Logout</a>
      </p>
      <p>
        <Link href="/find">Find places</Link>
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ad
        perferendis cumque fugit, eos doloremque architecto ullam placeat iste
        aut esse reiciendis molestias praesentium impedit repellat suscipit,
        nemo minus porro.
      </p>
    </VStack>
  );
}
