"use client";

import { useMemo, useState } from "react";
import { GetQrCodeResult } from "../api/qrCode/route";
import { ProfileSection } from "./ProfileSection";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Button } from "@/components/style/Button";
import { H1, H2 } from "@/components/style/Hn";
import { Link } from "@/components/style/Link";
import { Profile } from "@/components/user/Profile";
import { VisitPlace } from "@/components/visit/VisitPlace";

export interface MyPageContentProps {
  friends: Profile[];
  profile: Profile;
  visits: VisitPlace[];
}

export function MyPageContent({
  friends,
  profile,
  visits,
}: MyPageContentProps): JSX.Element {
  const [qrCodeWorking, setQrCodeWorking] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const myPageUrl = useMemo(() => {
    const url = new URL(location.href);
    url.pathname = `/user/${profile.id}`;
    return url.toString();
  }, [profile.id]);

  const onProfileUpdated = () => {
    // Reload the page to update the profile
    window.location.reload();
  };

  const onShowQrCodeClick = async () => {
    setQrCodeWorking(true);
    try {
      const res = await fetch(
        `/api/qrCode?url=${encodeURIComponent(myPageUrl)}`,
      );
      const data: GetQrCodeResult = await res.json();
      setQrCodeUrl(data.qrCode);
    } catch (error) {
      console.error(error);
      window.alert(`Failed to show QR code: ${toError(error).message}`);
    } finally {
      setQrCodeWorking(false);
    }
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
        <H2>Friends</H2>
        <ul className="ms-8 list-disc">
          {friends.map((friend) => (
            <li key={friend.id}>
              <Link href={`/user/${friend.id}`}>{friend.displayName}</Link>
            </li>
          ))}
          {friends.length === 0 && <li>No friends yet</li>}
        </ul>
      </VStack>
      <VStack>
        <H2>QR code</H2>
        <div className="grid justify-center">
          {qrCodeUrl ? (
            <Link href={myPageUrl}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={qrCodeUrl} />
            </Link>
          ) : (
            <Button disabled={qrCodeWorking} onClick={onShowQrCodeClick}>
              Show
            </Button>
          )}
        </div>
      </VStack>
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
