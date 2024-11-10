"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CheckinRate, CheckinRow } from "@/components/checkin/Checkin";
import { CheckinForm } from "@/components/checkin/CheckinForm";
import { requestCreatePlaceCheckin } from "@/components/checkin/checkinApis";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Place } from "@/components/place/Place";
import { PlaceDescription } from "@/components/place/PlaceDescription";
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
      <VStack>
        <hgroup>
          <H2>Tell something</H2>
          <p className="text-gray-500">
            To your friends. The comment and feeling will not be shared to
            public internet.
          </p>
        </hgroup>
        <CheckinForm
          formRef={formRef}
          working={working}
          error={error}
          editingCheckin={editingCheckin}
          onInputChange={onInputChange}
          onFormSubmit={onFormSubmit}
        />
      </VStack>
    </VStack>
  );
}
