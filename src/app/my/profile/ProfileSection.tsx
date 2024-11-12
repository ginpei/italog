import { useState } from "react";
import { ProfileForm } from "./ProfileForm";
import { PostProfilePayload } from "@/app/api/profile/route";
import { VStack } from "@/components/layout/VStack";
import { H2 } from "@/components/style/Hn";
import { Profile } from "@/components/user/Profile";

export interface ProfileSectionProps {
  profile: Profile;
  onUpdated: () => void;
}

export function ProfileSection({
  profile,
  onUpdated,
}: ProfileSectionProps): JSX.Element {
  const [editingProfile, setEditingProfile] = useState(profile);
  const [working, setWorking] = useState(false);

  const onProfileChange = (profile: Profile) => {
    setEditingProfile(profile);
  };

  const onProfileSubmit = async (profile: Profile) => {
    try {
      setWorking(true);
      await postProfile(profile);
      onUpdated();
    } catch (error) {
      console.error(error);
      setWorking(false);
    }
  };

  return (
    <VStack as="section" className="ProfileSection">
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
