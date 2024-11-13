"use client";

import {
  ChevronDoubleLeftIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PictureSection } from "./PictureSection";
import { ProfileForm } from "./ProfileForm";
import { PostProfilePayload } from "@/app/api/profile/route";
import { AuthProfile } from "@/components/auth/AuthProfile";
import { VStack } from "@/components/layout/VStack";
import { H1, H2 } from "@/components/style/Hn";
import { Link } from "@/components/style/Link";
import { TextInput } from "@/components/style/TextInput";
import { Profile } from "@/components/user/Profile";

export interface MyProfilePageContentProps {
  authProfile: AuthProfile;
  profile: Profile;
}

export function MyProfilePageContent({
  authProfile,
  profile,
}: MyProfilePageContentProps): JSX.Element {
  const [editingProfile, setEditingProfile] = useState(profile);
  const [working, setWorking] = useState(false);
  const router = useRouter();

  const providerName = useMemo(() => {
    const prefix = authProfile.authId.split("|")[0]!;

    if (prefix.startsWith("auth0")) {
      return "Auth0";
    }

    if (prefix.startsWith("google-oauth2")) {
      return "Google";
    }

    return prefix;
  }, [authProfile.authId]);

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
      <VStack>
        <H2>Profile</H2>
        <ProfileForm
          disabled={working}
          onChange={onProfileChange}
          onSubmit={onProfileSubmit}
          profile={editingProfile}
        />
      </VStack>
      <PictureSection authProfile={authProfile} />
      <VStack>
        <H2 className="flex items-center gap-1">
          <LockClosedIcon className="size-6" />
          Authentication
        </H2>
        <p>This information is not public to the others</p>
        <label className="flex flex-col">
          Provider:
          <TextInput readOnly value={providerName} />
        </label>
        <label className="flex flex-col">
          Login email:
          <TextInput readOnly value={authProfile.email} />
        </label>
      </VStack>
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
