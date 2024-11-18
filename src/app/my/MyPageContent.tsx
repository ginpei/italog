"use client";

import { useEffect, useMemo, useState } from "react";
import { GetQrCodeResult } from "../api/qrCode/route";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Button, ButtonLink } from "@/components/style/Button";
import { H1, H2 } from "@/components/style/Hn";
import { Link } from "@/components/style/Link";
import { Profile } from "@/components/user/Profile";

export interface MyPageContentProps {
  friends: Profile[];
  profile: Profile;
}

export function MyPageContent({
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
        <Link href={`/user/${profile.id}`}>View profile</Link> |{" "}
        <Link href={`/my/profile`}>Edit profile</Link>
      </p>
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
        <H2>Share your account</H2>
        {myPageUrl && qrCodeUrl ? (
          <>
            <Link className="mx-auto" href={myPageUrl}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={qrCodeUrl} />
            </Link>
            <p>
              The code is a link to{" "}
              <Link href={myPageUrl ?? "#"}>your user page</Link>.
            </p>
          </>
        ) : (
          <Button disabled={qrCodeWorking} onClick={onShowQrCodeClick}>
            Generate QR code
          </Button>
        )}
      </VStack>
      <VStack>
        <H2>Logout</H2>
        <ButtonLink as="a" href="/api/auth/logout">
          Log out
        </ButtonLink>
      </VStack>
    </VStack>
  );
}
