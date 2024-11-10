import {
  ExclamationCircleIcon,
  HandThumbUpIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { CheckinRow } from "@/components/checkin/Checkin";
import { Button } from "@/components/style/Button";
import { H2 } from "@/components/style/Hn";

export interface CheckInFormProps {
  checkin: CheckinRow;
  disabled: boolean;
  onCheckinChange: (checkin: CheckinRow) => void;
  onCheckinSubmit: (checkin: CheckinRow) => void;
}

export function CheckInForm({
  checkin,
  disabled,
  onCheckinChange,
  onCheckinSubmit,
}: CheckInFormProps): JSX.Element {
  const [impression, setImpression] = useState<ImpressionType>("0"); // TODO

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCheckinSubmit(checkin);
  };

  return (
    <form className="CheckInForm" onSubmit={onFormSubmit}>
      <fieldset className="flex flex-col gap-4" disabled={disabled}>
        <H2>Tell something</H2>
        <div className="flex flex-col">
          Check in with feeling of:
          <span className="flex gap-1">
            <ImpressionRadio
              impression={impression}
              onChange={setImpression}
              value="+1"
            >
              <SparklesIcon className="mx-auto h-6" />
              Excellent
            </ImpressionRadio>
            <ImpressionRadio
              impression={impression}
              onChange={setImpression}
              value="0"
            >
              <HandThumbUpIcon className="mx-auto h-6" />
              Not really
            </ImpressionRadio>
            <ImpressionRadio
              impression={impression}
              onChange={setImpression}
              value="-1"
            >
              <ExclamationCircleIcon className="mx-auto h-6" />
              Horrible
            </ImpressionRadio>
          </span>
        </div>
        <label className="flex flex-col">
          Comment{impression === "0" ? " (optional)" : ""}:
          <textarea className="border"></textarea>
        </label>
        <Button>Check in</Button>
      </fieldset>
    </form>
  );
}

type ImpressionType = "+1" | "0" | "-1";

function ImpressionRadio({
  children,
  impression,
  onChange,
  value,
}: {
  children: React.ReactNode;
  impression: ImpressionType;
  onChange: (value: ImpressionType) => void;
  value: ImpressionType;
}) {
  const selected = impression === value;

  const onRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as ImpressionType);
  };

  return (
    <label
      className={`ImpressionRadio
        relative mx-auto grid h-16 w-full cursor-pointer place-items-center border border-gray-400 ${selected ? "bg-white" : "bg-gray-50"}
        ${selected ? "" : "hover:bg-gray-100"}
        focus-within:outline
        active:bg-gray-200
        [fieldset:disabled_&]:cursor-default [fieldset:disabled_&]:bg-gray-300 [fieldset:disabled_&]:text-gray-500
      `}
    >
      <input
        className="absolute opacity-0"
        name="impression"
        onChange={onRadioChange}
        type="radio"
        value={value}
      />
      <div className="text-sm">{children}</div>
      {selected && <CheckCircleIcon className="absolute left-1 top-1 size-6" />}
    </label>
  );
}
