import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";
import { AuthProfile } from "@/components/auth/AuthProfile";
import { VStack } from "@/components/layout/VStack";
import { H2 } from "@/components/style/Hn";
import { TextInput } from "@/components/style/TextInput";

export interface AuthenticationAuthenticationSectionProps {
  authProfile: AuthProfile;
}

export function AuthenticationSection({
  authProfile,
}: AuthenticationAuthenticationSectionProps): JSX.Element {
  const providerName = useMemo(() => {
    const prefix = authProfile.authId.split("|")[0]!;

    if (prefix.startsWith("auth0")) {
      return "Auth0";
    }

    if (prefix.startsWith("google-oauth2")) {
      return "Google";
    }

    return prefix;
  }, [authProfile.authId]);

  return (
    <VStack>
      <H2 className="flex items-center gap-1">
        <LockClosedIcon className="size-6" />
        Authentication
      </H2>
      <p>This information is not public to the others</p>
      <label className="flex flex-col">
        Provider:
        <TextInput readOnly value={providerName} />
      </label>
      <label className="flex flex-col">
        Login email:
        <TextInput readOnly value={authProfile.email} />
      </label>
    </VStack>
  );
}
