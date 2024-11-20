"use client";

import { MapPinIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { TimelineSection } from "./TimelineSection";
import { useSpecialFlag } from "@/components/api/dev/devHooks";
import { Checkin } from "@/components/checkin/Checkin";
import { VStack } from "@/components/layout/VStack";
import { Place } from "@/components/place/Place";
import { H1, H2 } from "@/components/style/Hn";
import { SuperButtonLink } from "@/components/style/SuperButton";
import { SuperButtonBlock } from "@/components/style/SuperButtonBlock";
import { Profile } from "@/components/user/Profile";

export interface HomePageContentProps {
  profile: Profile | null;
  checkins: Checkin<Place>[];
}

export function HomePageContent({
  profile,
  checkins,
}: HomePageContentProps): JSX.Element {
  const special = useSpecialFlag();

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
              {special && (
                <SuperButtonLink href="/product/search">
                  <span>
                    <ShoppingBagIcon className="mx-auto size-8" />
                    Product
                  </span>
                </SuperButtonLink>
              )}
            </SuperButtonBlock>
          </VStack>
          <TimelineSection checkins={checkins} />
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
