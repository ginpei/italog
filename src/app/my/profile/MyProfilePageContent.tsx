"use client";

import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { ProfileSection } from "./ProfileSection";
import { VStack } from "@/components/layout/VStack";
import { H1 } from "@/components/style/Hn";
import { Link } from "@/components/style/Link";
import { Profile } from "@/components/user/Profile";

export interface MyProfilePageContentProps {
  profile: Profile;
}

export function MyProfilePageContent({
  profile,
}: MyProfilePageContentProps): JSX.Element {
  const onProfileUpdated = () => {
    // Reload the page to update the profile
    window.location.reload();
  };

  return (
    <VStack gap="gap-8">
      <VStack>
        <H1>My profile</H1>
        <nav>
          <Link href="/my">
            <ChevronDoubleLeftIcon className="me-1 inline-block size-4" />
            Back to my page
          </Link>
        </nav>
      </VStack>
      <ProfileSection profile={profile} onUpdated={onProfileUpdated} />
    </VStack>
  );
}
