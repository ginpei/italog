"use client";

import { FriendshipSection } from "./FriendshipSection";
import { VStack } from "@/components/layout/VStack";
import { H1, H2 } from "@/components/style/Hn";
import { Link } from "@/components/style/Link";
import { Profile } from "@/components/user/Profile";
import { VisitPlace } from "@/components/visit/VisitPlace";

export interface UserPageContentProps {
  currentUser: Profile;
  isFriend: boolean;
  profile: Profile;
  visits: VisitPlace[];
}

export function UserPageContent({
  currentUser,
  isFriend,
  profile,
  visits,
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
            <H2>Recent visits</H2>
            <ul className="ms-8 list-disc">
              {visits.map((visit) => (
                <li key={`${visit.placeId}-${visit.userId}-${visit.date}`}>
                  <Link href={`/place/${visit.placeId}`}>
                    {new Date(visit.createdAt).toLocaleDateString()}:{" "}
                    {visit.placeName}
                  </Link>
                </li>
              ))}
              {visits.length === 0 && <li>No visits yet</li>}
            </ul>
          </VStack>
        </>
      )}
    </VStack>
  );
}
