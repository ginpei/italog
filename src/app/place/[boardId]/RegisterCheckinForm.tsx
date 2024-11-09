import { CheckinRow } from "@/components/checkin/Checkin";
import { Button } from "@/components/style/Button";
import { H2 } from "@/components/style/Hn";

export interface RegisterCheckinFormProps {
  checkedIn: boolean;
  checkin: CheckinRow;
  disabled: boolean;
  onChange: (checkin: CheckinRow) => void;
  onSubmit: (checkin: CheckinRow) => void;
}

export function RegisterCheckinForm({
  checkedIn,
  checkin,
  disabled,
  onChange,
  onSubmit,
}: RegisterCheckinFormProps): JSX.Element {
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(checkin);
  };

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    if (name === "comment") {
      onChange({ ...checkin, comment: value });
    }
  };

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (name === "star") {
      onChange({ ...checkin, starred: checked });
    }
  };

  return (
    <form className="RegisterCheckinForm" onSubmit={onFormSubmit}>
      <fieldset className="flex flex-col gap-4" disabled={disabled}>
        <H2>Register checkin</H2>
        <label>
          <input
            checked={checkin.starred}
            name="star"
            onChange={onCheckboxChange}
            type="checkbox"
          />{" "}
          Star to recommend to the others
        </label>
        <label className="flex flex-col gap-0">
          Comment:
          <textarea
            className="border border-gray-400"
            name="comment"
            onChange={onInputChange}
            value={checkin.comment}
          />
        </label>
        <Button>{checkedIn ? "Update" : "Register"}</Button>
      </fieldset>
    </form>
  );
}
