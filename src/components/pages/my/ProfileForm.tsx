import { Button } from "@/components/lib/style/Button";
import { H2 } from "@/components/lib/style/Hn";
import { TextInput } from "@/components/lib/style/TextInput";
import { Profile } from "@/components/lib/user/Profile";

export interface ProfileFormProps {
  disabled: boolean;
  onChange: (profile: Profile) => void;
  onSubmit: (profile: Profile) => void;
  profile: Profile;
}

export function ProfileForm({
  disabled,
  onChange,
  onSubmit,
  profile,
}: ProfileFormProps): JSX.Element {
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(profile);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "displayName") {
      onChange({ ...profile, displayName: value });
    }
  };

  return (
    <form className="ProfileForm" onSubmit={onFormSubmit}>
      <fieldset className="flex flex-col gap-4" disabled={disabled}>
        <H2>Profile</H2>
        <label className="flex flex-col">
          Display name:
          <TextInput
            className="w-full"
            name="displayName"
            onChange={onInputChange}
            value={profile.displayName}
          />
        </label>
        <Button>Update</Button>
      </fieldset>
    </form>
  );
}
