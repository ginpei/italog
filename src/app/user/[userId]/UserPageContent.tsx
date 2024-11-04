"use client";

import { FriendshipSection } from "./FriendshipSection";
import { VStack } from "@/components/layout/VStack";
import { PlaceCheckin } from "@/components/placeCheckin/PlaceCheckin";
import { H1, H2 } from "@/components/style/Hn";
import { Link } from "@/components/style/Link";
import { Profile } from "@/components/user/Profile";

export interface UserPageContentProps {
  currentUser: Profile;
  isFriend: boolean;
  profile: Profile;
  checkins: PlaceCheckin[];
}

export function UserPageContent({
  currentUser,
  isFriend,
  profile,
  checkins,
}: UserPageContentProps): JSX.Element {
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
            <ul className="ms-8 list-disc">
              {checkins.map((checkin) => (
                <li
                  key={`${checkin.boardId}-${checkin.userId}-${checkin.userDate}`}
                >
                  <Link href={`/place/${checkin.boardId}`}>
                    {new Date(checkin.createdAt).toLocaleDateString()}:{" "}
                    {checkin.placeName}
                  </Link>
                </li>
              ))}
              {checkins.length === 0 && <li>No checkins yet</li>}
            </ul>
          </VStack>
        </>
      )}
    </VStack>
  );
}
