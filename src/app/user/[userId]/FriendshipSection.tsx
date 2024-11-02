import { useState } from "react";
import { Button, ButtonLink } from "@/components/style/Button";
import { Profile } from "@/components/user/Profile";
import {
  createFriendship,
  deleteFriendship,
} from "@/components/user/friendshipApi";

export interface FriendshipSectionProps {
  currentUser: Profile;
  isFriend: boolean;
  profile: Profile;
}

export function FriendshipSection({
  currentUser,
  isFriend,
  profile,
}: FriendshipSectionProps): JSX.Element {
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
    <section className="FriendshipSection text-end">
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
    </section>
  );
}
