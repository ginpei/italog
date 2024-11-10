"use client";

import { useRef, useState } from "react";
import { FriendshipSection } from "./FriendshipSection";
import { Checkin } from "@/components/checkin/Checkin";
import { VStack } from "@/components/layout/VStack";
import { H1, H2 } from "@/components/style/Hn";
import { CheckinList } from "@/components/timeline/CheckinList";
import { TimelineItem } from "@/components/timeline/TimelineItem";
import { Profile } from "@/components/user/Profile";

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
      <H1>{profile.displayName}</H1>
      <FriendshipSection
        currentUser={currentUser}
        isFriend={isFriend}
        profile={profile}
      />
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
