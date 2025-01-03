import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export interface ProfilePictureProps {
  imageUrl: string | undefined;
  size?: "size-12" | "size-24" | "size-full";
}

export function ProfilePicture({
  imageUrl,
  size = "size-12",
}: ProfilePictureProps): JSX.Element {
  if (!imageUrl) {
    return (
      <UserIcon
        className={`ProfilePicture ${size} text-gray-300 dark:text-gray-700`}
      />
    );
  }

  return (
    <Image
      alt=""
      className={`ProfilePicture ${size}`}
      height={48}
      src={imageUrl}
      width={48}
    />
  );
}
