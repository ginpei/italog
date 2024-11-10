"use client";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  HandThumbUpIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { CheckinRate, CheckinRow } from "@/components/checkin/Checkin";
import { requestCreatePlaceCheckin } from "@/components/checkin/checkinApis";
import { ErrorBlock } from "@/components/error/ErrorBlock";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Place } from "@/components/place/Place";
import { PlaceDescription } from "@/components/place/PlaceDescription";
import { Button } from "@/components/style/Button";
import { H2 } from "@/components/style/Hn";

export interface PlaceCheckinPageContentProps {
  place: Place;
}

export function PlaceCheckinPageContent({
  place,
}: PlaceCheckinPageContentProps): JSX.Element {
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [editingCheckin, setEditingCheckin] = useState<CheckinRow>({
    boardId: place.boardId,
    comment: "",
    createdAt: 0,
    id: "",
    rate: "0",
    userDate: "",
    userId: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const onInputChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    if (name === "rate") {
      setEditingCheckin({ ...editingCheckin, rate: value as CheckinRate });
    } else if (name === "comment") {
      setEditingCheckin({ ...editingCheckin, comment: value });
    } else {
      throw new Error("unexpected input name: " + name);
    }
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setWorking(true);
    setError(null);

    try {
      await requestCreatePlaceCheckin(place.boardId, {
        comment: editingCheckin.comment,
        rate: editingCheckin.rate,
      });
      router.push(`/place/${place.boardId}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      setError(toError(error));
      setWorking(false);
    }
  };

  // scroll to show the form immediately you open the page
  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <VStack className="PlaceCheckinPageContent" gap="gap-8">
      <PlaceDescription place={place} />
      <form className="CheckInForm" onSubmit={onFormSubmit} ref={formRef}>
        <fieldset className="flex flex-col gap-4" disabled={working}>
          <hgroup>
            <H2>Tell something</H2>
            <p className="text-gray-500">
              To your friends. The comment and feeling will not be shared to
              public internet.
            </p>
          </hgroup>
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
          <label className="flex flex-col">
            Comment{editingCheckin.rate === "0" ? " (optional)" : ""}:
            <textarea
              className="h-32 border"
              name="comment"
              onChange={onInputChange}
              required={editingCheckin.rate !== "0"}
              value={editingCheckin.comment}
            />
          </label>
          <Button>Check in</Button>
        </fieldset>
      </form>
    </VStack>
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
        relative mx-auto grid h-16 w-full cursor-pointer place-items-center border border-gray-400 ${selected ? "bg-white" : "bg-gray-50"}
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
