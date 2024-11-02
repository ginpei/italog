"use client";

import { ProfileSection } from "./ProfileSection";
import { VStack } from "@/components/lib/layout/VStack";
import { H1, H2 } from "@/components/lib/style/Hn";
import { Link } from "@/components/lib/style/Link";
import { Profile } from "@/components/lib/user/Profile";
import { VisitPlace } from "@/components/lib/visit/VisitPlace";

export interface MyPageContentProps {
  profile: Profile;
  visits: VisitPlace[];
}

export function MyPageContent({
  profile,
  visits,
}: MyPageContentProps): JSX.Element {
  const onProfileUpdated = () => {
    // Reload the page to update the profile
    window.location.reload();
  };

  return (
    <VStack gap="gap-8">
      <H1>My page</H1>
      <p>
        <Link href={`/user/${profile.id}`}>Public profile</Link>
      </p>
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
      <ProfileSection profile={profile} onUpdated={onProfileUpdated} />
      <VStack>
        <H2>Logout</H2>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          className="border border-gray-400 bg-gray-50 p-2 text-center hover:bg-gray-100 active:bg-gray-200"
          href="/api/auth/logout"
        >
          Log out
        </a>
      </VStack>
    </VStack>
  );
}
