"use client";

import { useEffect, useMemo, useState } from "react";
import { GetQrCodeResult } from "../api/qrCode/route";
import { ProfileSection } from "./ProfileSection";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { PlaceCheckin } from "@/components/placeCheckin/PlaceCheckin";
import { Button } from "@/components/style/Button";
import { H1, H2 } from "@/components/style/Hn";
import { Link } from "@/components/style/Link";
import { Profile } from "@/components/user/Profile";

export interface MyPageContentProps {
  checkins: PlaceCheckin[];
  friends: Profile[];
  profile: Profile;
}

export function MyPageContent({
  checkins,
  friends,
  profile,
}: MyPageContentProps): JSX.Element {
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const [qrCodeWorking, setQrCodeWorking] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const myPageUrl = useMemo(() => {
    if (!pageUrl) {
      return null;
    }

    const url = new URL(pageUrl);
    url.pathname = `/user/${profile.id}`;
    return url.toString();
  }, [pageUrl, profile.id]);

  useEffect(() => {
    setPageUrl(location.href);
  }, []);

  const onProfileUpdated = () => {
    // Reload the page to update the profile
    window.location.reload();
  };

  const onShowQrCodeClick = async () => {
    if (!myPageUrl) {
      return;
    }

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
        <H2>Recent checkins</H2>
        <ul className="ms-8 list-disc">
          {checkins.map((checkin) => (
            <li
              key={`${checkin.boardId}-${checkin.userId}-${checkin.userDate}`}
            >
              <Link href={`/place/${checkin.boardId}`}>
                {new Date(checkin.createdAt).toLocaleDateString()}:{" "}
                {checkin.placeName}
              </Link>
            </li>
          ))}
          {checkins.length === 0 && <li>No checkins yet</li>}
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
          {myPageUrl && qrCodeUrl ? (
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
