import { SunIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";
import { deleteProfilePicture } from "@/app/api/profile/picture/profilePictureApi";
import { uploadProfilePicture } from "@/app/api/profile/picture/upload/profilePictureUploadApi";
import { AuthProfile } from "@/components/auth/AuthProfile";
import { ErrorBlock } from "@/components/error/ErrorBlock";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Button, FileButton } from "@/components/style/Button";
import { H2 } from "@/components/style/Hn";
import { Link } from "@/components/style/Link";
import { Profile } from "@/components/user/Profile";
import { ProfilePicture } from "@/components/user/ProfilePicture";

export interface PictureSectionProps {
  authProfile: AuthProfile;
  profile: Profile;
}

export function PictureSection({
  authProfile,
  profile,
}: PictureSectionProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    profile.imageUrl,
  );
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setWorking(true);
    setError(null);

    try {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file) {
        return;
      }

      const res = await uploadProfilePicture(authProfile.userId, file);

      setImageUrl("reloading");
      const image = new Image();
      image.onload = () => setImageUrl(res.url);
      image.src = res.url;
    } catch (error) {
      console.error(error);
      setError(toError(error));
    } finally {
      setWorking(false);
    }
  };

  const onResetClick = async () => {
    const ok = window.confirm(
      "Are you sure you want to reset your picture to the one from your Auth provider?",
    );
    if (!ok) {
      return;
    }
    setWorking(true);
    setError(null);

    try {
      await deleteProfilePicture();
      setImageUrl(undefined);
    } catch (error) {
      console.error(error);
      setError(toError(error));
    } finally {
      setWorking(false);
    }
  };

  return (
    <VStack as="section" className="PictureSection">
      <H2>Picture</H2>
      <ErrorBlock error={error} />
      {!imageUrl ? (
        <div className="mx-auto">
          <ProfilePicture imageUrl={imageUrl} size="size-24" />
        </div>
      ) : imageUrl === "reloading" ? (
        <p className="mx-auto grid size-24 animate-spin items-center justify-center">
          <SunIcon className="size-8 text-gray-300" />
        </p>
      ) : (
        <Link as="a" className="mx-auto block" href={imageUrl} target="_blank">
          <ProfilePicture imageUrl={imageUrl} size="size-24" />
        </Link>
      )}
      <FileButton accept="image/*" disabled={working} onChange={onFileChange}>
        Upload
      </FileButton>
      <Button disabled={working || !imageUrl} onClick={onResetClick}>
        Remove
      </Button>
    </VStack>
  );
}
