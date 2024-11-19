import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  HandThumbUpIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { ChangeEventHandler } from "react";
import { InputLabel } from "../style/InputLabel";
import { CheckinRate, CheckinRow } from "@/components/checkin/Checkin";
import { ErrorBlock } from "@/components/error/ErrorBlock";
import { Button } from "@/components/style/Button";

export function CheckinForm({
  formRef,
  working,
  error,
  editingCheckin,
  onInputChange,
  onFormSubmit,
}: {
  formRef: React.RefObject<HTMLFormElement>;
  working: boolean;
  error: Error | null;
  editingCheckin: CheckinRow;
  onInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFormSubmit: (event: React.FormEvent) => void;
}) {
  return (
    <form className="CheckInForm" onSubmit={onFormSubmit} ref={formRef}>
      <fieldset className="flex flex-col gap-4" disabled={working}>
        <ErrorBlock error={error} />
        <div className="flex flex-col">
          Check in with feeling of:
          <span className="flex gap-1">
            <RateRadio
              rate={editingCheckin.rate}
              onChange={onInputChange}
              value="+1"
            >
              <SparklesIcon className="mx-auto h-6" />
              Excellent
            </RateRadio>
            <RateRadio
              rate={editingCheckin.rate}
              onChange={onInputChange}
              value="0"
            >
              <HandThumbUpIcon className="mx-auto h-6" />
              Not really
            </RateRadio>
            <RateRadio
              rate={editingCheckin.rate}
              onChange={onInputChange}
              value="-1"
            >
              <ExclamationCircleIcon className="mx-auto h-6" />
              Horrible
            </RateRadio>
          </span>
        </div>
        <InputLabel>
          Comment{editingCheckin.rate === "0" ? " (optional)" : ""}:
          <textarea
            className="h-32 border bg-white text-black"
            name="comment"
            onChange={onInputChange}
            required={editingCheckin.rate !== "0"}
            value={editingCheckin.comment}
          />
        </InputLabel>
        <Button>Check in</Button>
      </fieldset>
    </form>
  );
}

function RateRadio({
  children,
  rate,
  onChange,
  value,
}: {
  children: React.ReactNode;
  rate: CheckinRate;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: CheckinRate;
}) {
  const selected = rate === value;

  return (
    <label
      className={`RateRadio
        relative mx-auto grid h-16 w-full cursor-pointer place-items-center border  border-gray-400 text-black ${selected ? "bg-white" : "bg-gray-50"}
        ${selected ? "" : "hover:bg-gray-100"}
        focus-within:outline
        active:bg-gray-200
        [fieldset:disabled_&]:cursor-default [fieldset:disabled_&]:bg-gray-300 [fieldset:disabled_&]:text-gray-500
      `}
    >
      <input
        className="absolute opacity-0"
        name="rate"
        onChange={onChange}
        type="radio"
        value={value}
      />
      <div className="text-sm">{children}</div>
      {selected && <CheckCircleIcon className="absolute left-1 top-1 size-6" />}
    </label>
  );
}
