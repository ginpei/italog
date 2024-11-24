"use client";

import { MapPinIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useTimeline } from "./api/timeline/timelineApis";
import { VStack } from "@/components/layout/VStack";
import { H1, H2 } from "@/components/style/Hn";
import { SuperButtonLink } from "@/components/style/SuperButton";
import { SuperButtonBlock } from "@/components/style/SuperButtonBlock";
import { TimelineBlock } from "@/components/timeline/TimelineBlock";
import { Profile } from "@/components/user/Profile";

export interface HomePageContentProps {
  profile: Profile | null;
}

export function HomePageContent({
  profile,
}: HomePageContentProps): JSX.Element {
  const [loading, error, timeline] = useTimeline();

  return (
    <VStack className="HomePageContent" gap="gap-8">
      <H1>Italog</H1>
      {profile ? (
        <>
          <VStack>
            <H2>Search</H2>
            <SuperButtonBlock>
              <SuperButtonLink href="/place/search">
                <span>
                  <MapPinIcon className="mx-auto size-8" />
                  Place
                </span>
              </SuperButtonLink>
              <SuperButtonLink href="/product/search">
                <span>
                  <ShoppingBagIcon className="mx-auto size-8" />
                  Product
                </span>
              </SuperButtonLink>
            </SuperButtonBlock>
          </VStack>
          <TimelineBlock
            checkins={timeline.checkins}
            error={error}
            loading={loading}
            places={timeline.places}
            products={timeline.products}
          />
        </>
      ) : (
        <p className="mx-auto my-16">
          <SuperButtonLink as="a" href="/api/auth/login">
            Login
          </SuperButtonLink>
        </p>
      )}
    </VStack>
  );
}
