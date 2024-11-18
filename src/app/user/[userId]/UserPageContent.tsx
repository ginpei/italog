"use client";

import { useRef, useState } from "react";
import { FriendshipSection } from "./FriendshipSection";
import { Checkin } from "@/components/checkin/Checkin";
import { VStack } from "@/components/layout/VStack";
import { H1, H2 } from "@/components/style/Hn";
import { CheckinList } from "@/components/timeline/CheckinList";
import { TimelineItem } from "@/components/timeline/TimelineItem";
import { Profile } from "@/components/user/Profile";
import { ProfilePicture } from "@/components/user/ProfilePicture";

export interface UserPageContentProps {
  currentUser: Profile;
  isFriend: boolean;
  profile: Profile;
  checkins: Checkin[];
}

export function UserPageContent({
  currentUser,
  isFriend,
  profile,
  checkins,
}: UserPageContentProps): JSX.Element {
  const [primaryPlaceId, setPrimaryPlaceId] = useState("");
  const placeRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const onShowCheckinClick = (checkin: Checkin) => {
    setPrimaryPlaceId(checkin.boardId);
  };

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
            <div>TODO: map</div>
            <CheckinList>
              {checkins.map((checkin) => (
                <div
                  key={checkin.id}
                  ref={(el) => {
                    if (el) placeRefs.current.set(checkin.id, el);
                    else placeRefs.current.delete(checkin.id);
                  }}
                >
                  <TimelineItem
                    checkin={checkin}
                    onShowClick={onShowCheckinClick}
                    selected={checkin.boardId === primaryPlaceId}
                  />
                </div>
              ))}
            </CheckinList>
          </VStack>
        </>
      )}
    </VStack>
  );
}
