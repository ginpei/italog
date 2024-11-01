"use client";

import { useState } from "react";
import { VStack } from "@/components/lib/layout/VStack";
import { Button, ButtonLink } from "@/components/lib/style/Button";
import { H1 } from "@/components/lib/style/Hn";
import { Profile } from "@/components/lib/user/Profile";
import {
  createFriendship,
  deleteFriendship,
} from "@/components/lib/user/friendshipApi";

export interface UserPageContentProps {
  currentUser: Profile;
  isFriend: boolean;
  profile: Profile;
}

export function UserPageContent({
  currentUser,
  isFriend,
  profile,
}: UserPageContentProps): JSX.Element {
  const isOwner = currentUser.id === profile.id;

  const [friendshipWorking, setFriendshipWorking] = useState(false);

  const onSayGoodbyeClick = async () => {
    const ok = confirm("Are you sure you want to delete friendship statement?");
    if (!ok) {
      return;
    }

    try {
      setFriendshipWorking(true);
      await deleteFriendship(profile.id);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setFriendshipWorking(false);
    }
  };

  const onBecomeFriendClick = async () => {
    alert(
      "[DEV MODE]  Lucky you! 🎉\n\nYou can become a friend with everyone for now",
    );

    try {
      setFriendshipWorking(true);
      await createFriendship(profile.id);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setFriendshipWorking(false);
    }
  };

  return (
    <VStack gap="gap-8">
      <H1>{profile.displayName}</H1>
      <div className="text-end">
        {isOwner ? (
          <ButtonLink href="/my">My page</ButtonLink>
        ) : isFriend ? (
          <Button disabled={friendshipWorking} onClick={onSayGoodbyeClick}>
            Say goodbye
          </Button>
        ) : (
          <Button disabled={friendshipWorking} onClick={onBecomeFriendClick}>
            Become a friend
          </Button>
        )}
      </div>
    </VStack>
  );
}
