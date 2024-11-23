"use client";

import { FriendshipSection } from "./FriendshipSection";
import { Checkin } from "@/components/checkin/Checkin";
import { VStack } from "@/components/layout/VStack";
import { Place } from "@/components/place/Place";
import { Product } from "@/components/product/Product";
import { H1, H2 } from "@/components/style/Hn";
import { TimelineBlock } from "@/components/timeline/TimelineBlock";
import { Profile } from "@/components/user/Profile";
import { ProfilePicture } from "@/components/user/ProfilePicture";

export interface UserPageContentProps {
  checkins: Checkin[];
  currentUser: Profile;
  isFriend: boolean;
  places: Place[];
  products: Product[];
  profile: Profile;
}

export function UserPageContent({
  checkins,
  currentUser,
  isFriend,
  places,
  products,
  profile,
}: UserPageContentProps): JSX.Element {
  return (
    <VStack gap="gap-8">
      <div className="flex flex-row-reverse place-content-between">
        <FriendshipSection
          currentUser={currentUser}
          isFriend={isFriend}
          profile={profile}
        />
        <ProfilePicture imageUrl={profile.imageUrl} size="size-24" />
      </div>
      <H1>{profile.displayName}</H1>
      {(isFriend || currentUser.id === profile.id) && (
        <>
          <hr />
          <VStack>
            <H2>Recent checkins</H2>
            <TimelineBlock
              checkins={checkins}
              error={null}
              loading={false}
              places={places}
              products={products}
            />
          </VStack>
        </>
      )}
    </VStack>
  );
}
