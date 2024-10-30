import { Button } from "@/components/lib/style/Button";
import { H2 } from "@/components/lib/style/Hn";
import { Visit } from "@/components/lib/visit/Visit";

export interface RegisterVisitFormProps {
  disabled: boolean;
  onChange: (visit: Visit) => void;
  onSubmit: (visit: Visit) => void;
  visit: Visit;
  visited: boolean;
}

export function RegisterVisitForm({
  disabled,
  onChange,
  onSubmit,
  visit,
  visited,
}: RegisterVisitFormProps): JSX.Element {
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(visit);
  };

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    if (name === "comment") {
      onChange({ ...visit, comment: value });
    }
  };

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (name === "star") {
      onChange({ ...visit, starred: checked });
    }
  };

  return (
    <form className="RegisterVisitForm" onSubmit={onFormSubmit}>
      <fieldset className="flex flex-col gap-4" disabled={disabled}>
        <H2>Register visit</H2>
        <label>
          <input
            checked={visit.starred}
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
            value={visit.comment}
          />
        </label>
        <Button>{visited ? "Update" : "Register"}</Button>
      </fieldset>
    </form>
  );
}
