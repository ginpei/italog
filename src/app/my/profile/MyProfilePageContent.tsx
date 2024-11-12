"use client";

import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProfileForm } from "./ProfileForm";
import { PostProfilePayload } from "@/app/api/profile/route";
import { VStack } from "@/components/layout/VStack";
import { H1, H2 } from "@/components/style/Hn";
import { Link } from "@/components/style/Link";
import { Profile } from "@/components/user/Profile";

export interface MyProfilePageContentProps {
  profile: Profile;
}

export function MyProfilePageContent({
  profile,
}: MyProfilePageContentProps): JSX.Element {
  const [editingProfile, setEditingProfile] = useState(profile);
  const [working, setWorking] = useState(false);
  const router = useRouter();

  const onProfileChange = (profile: Profile) => {
    setEditingProfile(profile);
  };

  const onProfileSubmit = async (profile: Profile) => {
    try {
      setWorking(true);
      await postProfile(profile);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setWorking(false);
    }
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
      <H2>Edit profile</H2>
      <ProfileForm
        disabled={working}
        onChange={onProfileChange}
        onSubmit={onProfileSubmit}
        profile={editingProfile}
      />
    </VStack>
  );
}

function postProfile(profile: Profile) {
  const endpoint = "/api/profile";

  const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ profile } satisfies PostProfilePayload),
  };

  return fetch(endpoint, init);
}
