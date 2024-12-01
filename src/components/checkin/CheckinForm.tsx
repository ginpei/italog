import {
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  HandThumbUpIcon,
  SparklesIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { ChangeEventHandler } from "react";
import { InputLabel } from "../style/InputLabel";
import { LongTextInput } from "../style/LongTextInput";
import { CheckinRate, EditingCheckinRow } from "@/components/checkin/Checkin";
import { ErrorBlock } from "@/components/error/ErrorBlock";
import { Button, FileButton } from "@/components/style/Button";

export interface CheckinFormProps {
  editingCheckin: EditingCheckinRow;
  error: Error | null;
  formRef: React.RefObject<HTMLFormElement>;
  onChange: (checkin: EditingCheckinRow) => void;
  onSubmit: (checkin: EditingCheckinRow) => void;
  working: boolean;
}

export function CheckinForm({
  editingCheckin,
  error,
  formRef,
  onChange,
  onSubmit,
  working,
}: CheckinFormProps): JSX.Element {
  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    if (name === "rate") {
      onChange({ ...editingCheckin, rate: value as CheckinRate });
    } else if (name === "comment") {
      onChange({ ...editingCheckin, comment: value });
    } else {
      throw new Error("unexpected input name: " + name);
    }
  };

  const onImageRemoveClick = (index: number) => {
    onChange({
      ...editingCheckin,
      imageUrls: editingCheckin.imageUrls.filter((_, i) => i !== index),
    });
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || [];
    event.target.files = null;

    onChange({
      ...editingCheckin,
      imageUrls: [...editingCheckin.imageUrls, ...files],
    });
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(editingCheckin);
  };

  return (
    <form className="CheckInForm" onSubmit={onFormSubmit} ref={formRef}>
      <fieldset className="flex flex-col gap-4" disabled={working}>
        <ErrorBlock error={error} />
        <InputLabel as="div">
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
              onChange={onInputChange}
              rate={editingCheckin.rate}
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
        </InputLabel>
        <InputLabel>
          Comment{editingCheckin.rate === "0" ? " (optional)" : ""}:
          <LongTextInput
            name="comment"
            onChange={onInputChange}
            required={editingCheckin.rate !== "0"}
            value={editingCheckin.comment}
          />
        </InputLabel>
        <InputLabel as="div">
          Images:
          <div className="flex flex-col items-center gap-4">
            {editingCheckin.imageUrls.map((image, index) => (
              <ImageItem
                image={image}
                index={index}
                key={`${index}-${typeof image === "string" ? image : URL.createObjectURL(image)}`}
                onRemoveClick={onImageRemoveClick}
              />
            ))}
            <div className="flex w-64 items-center justify-center">
              <FileButton accept="image/*" multiple onChange={onFileChange}>
                <span className="flex items-center gap-2">
                  <ArrowUpTrayIcon className="size-6" />
                  Add images
                </span>
              </FileButton>
            </div>
          </div>
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

function ImageItem({
  image,
  index,
  onRemoveClick,
}: {
  image: string | File;
  index: number;
  onRemoveClick: (index: number) => void;
}): JSX.Element {
  const src = typeof image === "string" ? image : URL.createObjectURL(image);

  return (
    <div className="relative flex size-64 items-center justify-center border">
      <Image alt="" className="size-64" src={src} width={256} height={256} />
      <Button
        className="absolute right-1 top-1"
        onClick={() => onRemoveClick(index)}
        type="button"
      >
        <TrashIcon className="size-4" />
      </Button>
    </div>
  );
}
