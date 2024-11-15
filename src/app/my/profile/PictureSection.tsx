import { ChangeEvent, useState } from "react";
import { AuthProfile } from "@/components/auth/AuthProfile";
import { ErrorBlock } from "@/components/error/ErrorBlock";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Button, FileButton } from "@/components/style/Button";
import { H2 } from "@/components/style/Hn";
import { Link } from "@/components/style/Link";

export interface PictureSectionProps {
  authProfile: AuthProfile;
}

export function PictureSection({
  authProfile,
}: PictureSectionProps): JSX.Element {
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

      // TODO
      await new Promise((f) => setTimeout(f, 1000));
      alert("Upload picture");
    } catch (error) {
      console.error(error);
      setError(toError(error));
    } finally {
      setWorking(false);
    }
  };

  const onResetClick = () => {
    const ok = window.confirm(
      "Are you sure you want to reset your picture to the one from your Auth provider?",
    );
    if (!ok) {
      return;
    }

    // TODO
    alert("Reset picture to Auth provider");
  };

  return (
    <VStack className="PictureSection">
      <H2>Picture</H2>
      <ErrorBlock error={error} />
      <Link
        as="a"
        className="mx-auto block"
        href={authProfile.picture!}
        target="_blank"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="[Your profile picture]"
          className={`size-32 ${working ? "opacity-50" : ""}`}
          style={{ filter: working ? "grayscale(1)" : undefined }}
          src={authProfile.picture!}
        />
      </Link>
      <FileButton accept="image/*" disabled={working} onChange={onFileChange}>
        Upload
      </FileButton>
      <Button disabled={working} onClick={onResetClick}>
        Reset
      </Button>
    </VStack>
  );
}
