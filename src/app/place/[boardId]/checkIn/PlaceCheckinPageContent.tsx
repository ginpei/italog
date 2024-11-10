"use client";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  HandThumbUpIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { Checkin, CheckinRow } from "@/components/checkin/Checkin";
import { ErrorBlock } from "@/components/error/ErrorBlock";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Place } from "@/components/place/Place";
import { PlaceDescription } from "@/components/place/PlaceDescription";
import { requestRegisterVisit } from "@/components/placeCheckin/checkInPlace";
import { Button } from "@/components/style/Button";
import { H2 } from "@/components/style/Hn";

export interface PlaceCheckinPageContentProps {
  place: Place;
}

export function PlaceCheckinPageContent({
  place,
}: PlaceCheckinPageContentProps): JSX.Element {
  const [impression, setImpression] = useState<ImpressionType>("0"); // TODO
  const [editingCheckin, setEditingCheckin] = useState<CheckinRow>({
    boardId: place.boardId,
    comment: "",
    createdAt: 0,
    id: "",
    rate: "0",
    userDate: "",
    userId: "",
  });
  const [formWorking, setFormWorking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onRegisterCheckinChange = async (checkin: CheckinRow) => {
    setEditingCheckin(checkin);
  };

  const onRegisterCheckinSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormWorking(true);
    setError(null);

    try {
      throw new Error(`Not implemented`);
      const checkin: Checkin = {
        ...checkinRow,
        rate: impression,
        profile: {
          id: "checkinRow.userId", // TODO
          displayName: "checkinRow.userDate", // TODO
        },
        board: {
          boardId: place.boardId,
          displayName: place.displayName,
          boardType: place.boardType,
        },
      };

      setFormWorking(true);
      const timezoneOffset = new Date().getTimezoneOffset();
      await requestRegisterVisit({
        timezoneOffset,
        checkin: checkin,
        checkedIn: false,
      });
    } catch (error) {
      console.error(error);
      setError(toError(error));
    } finally {
      setFormWorking(false);
    }
  };

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <VStack className="PlaceCheckinPageContent" gap="gap-8">
      <PlaceDescription place={place} />
      <form
        className="CheckInForm"
        onSubmit={onRegisterCheckinSubmit}
        ref={formRef}
      >
        <fieldset className="flex flex-col gap-4" disabled={formWorking}>
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
            <textarea
              className="h-32 border"
              required={impression !== "0"}
            ></textarea>
          </label>
          <Button>Check in</Button>
        </fieldset>
      </form>
    </VStack>
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
