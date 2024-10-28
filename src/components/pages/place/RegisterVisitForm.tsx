import { useState } from "react";
import { Button } from "@/components/lib/style/Button";
import { H2 } from "@/components/lib/style/Hn";
import { Visit } from "@/components/lib/visit/Visit";

export interface RegisterVisitFormProps {
  onSubmit: (visit: Visit) => void;
  placeId: string;
}

export function RegisterVisitForm({
  onSubmit,
  placeId,
}: RegisterVisitFormProps): JSX.Element {
  const [visit, setVisit] = useState<Visit>({
    comment: "",
    createdAt: 0,
    id: "",
    placeId,
    starred: false,
    userId: "",
  });

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(visit);
  };

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    if (name === "comment") {
      setVisit((prev) => ({ ...prev, comment: value }));
    }
  };

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (name === "star") {
      setVisit((prev) => ({ ...prev, starred: checked }));
    }
  };

  return (
    <form className="RegisterVisitForm" onSubmit={onFormSubmit}>
      <fieldset className="flex flex-col gap-4">
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
        <Button>Register</Button>
      </fieldset>
    </form>
  );
}
