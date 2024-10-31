"use client";

import { VStack } from "@/components/lib/layout/VStack";
import { H1 } from "@/components/lib/style/Hn";
import { Profile } from "@/components/lib/user/Profile";

export interface UserPageContentProps {
  profile: Profile;
}

export function UserPageContent({
  profile,
}: UserPageContentProps): JSX.Element {
  return (
    <VStack gap="gap-8">
      <H1>{profile.displayName}</H1>
    </VStack>
  );
}
