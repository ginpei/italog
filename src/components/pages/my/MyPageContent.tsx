"use client";

import { useState } from "react";
import { ProfileForm } from "./ProfileForm";
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
  const [editingProfile, setEditingProfile] = useState(profile);

  const onProfileChange = (profile: Profile) => {
    setEditingProfile(profile);
  };

  const onProfileSubmit = (profile: Profile) => {
    // TODO
    console.log("# profile", profile);
    alert("TODO Profile");
  };

  return (
    <div className="flex flex-col gap-8">
      <H1>My page</H1>
      <div className="flex flex-col gap-4">
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
      </div>
      <ProfileForm
        disabled={false}
        onChange={onProfileChange}
        onSubmit={onProfileSubmit}
        profile={editingProfile}
      />
      <div className="flex flex-col gap-4">
        <H2>Logout</H2>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          className="border border-gray-400 bg-gray-50 p-2 text-center hover:bg-gray-100 active:bg-gray-200"
          href="/api/auth/logout"
        >
          Log out
        </a>
      </div>
    </div>
  );
}
