"use client";

import { FriendshipSection } from "./FriendshipSection";
import { VStack } from "@/components/lib/layout/VStack";
import { H1 } from "@/components/lib/style/Hn";
import { Profile } from "@/components/lib/user/Profile";

export interface UserPageContentProps {
  currentUser: Profile;
  isFriend: boolean;
  profile: Profile;
}

export function UserPageContent({
  currentUser,
  isFriend,
  profile,
}: UserPageContentProps): JSX.Element {
  return (
    <VStack gap="gap-8">
      <H1>{profile.displayName}</H1>
      <FriendshipSection
        currentUser={currentUser}
        isFriend={isFriend}
        profile={profile}
      />
    </VStack>
  );
}
