"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { Checkin, CheckinRate } from "@/components/checkin/Checkin";
import { CheckinForm } from "@/components/checkin/CheckinForm";
import {
  requestUpdatePlaceCheckin,
  requestDeletePlaceCheckin,
} from "@/components/checkin/checkinApis";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { DangerButton } from "@/components/style/Button";
import { H1 } from "@/components/style/Hn";
import { Link } from "@/components/style/Link";

export interface CheckinEditPageContentProps {
  checkin: Checkin;
}

export function CheckinEditPageContent({
  checkin,
}: CheckinEditPageContentProps): JSX.Element {
  const titlePrefix =
    checkin.board.boardType === "place" ? `Checkin at` : `Checkin of`;

  const [working, setWorking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [editingCheckin, setEditingCheckin] = useState(checkin);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const viewPageUrl = useMemo(() => {
    if (checkin.board.boardType === "place") {
      return `/place/${checkin.boardId}`;
    } else if (checkin.board.boardType === "product") {
      return `/product/${checkin.boardId}`;
    } else {
      throw new Error("unexpected board type: " + checkin.board.boardType);
    }
  }, [checkin.board.boardType, checkin.boardId]);

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
      await requestUpdatePlaceCheckin(checkin.id, {
        comment: editingCheckin.comment,
        rate: editingCheckin.rate,
      });
      router.push(viewPageUrl);
      router.refresh();
    } catch (error) {
      console.error(error);
      setError(toError(error));
      setWorking(false);
    }
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this checkin?");
    if (!ok) {
      return;
    }

    setWorking(true);
    setError(null);

    try {
      await requestDeletePlaceCheckin(checkin.id);
      router.push(viewPageUrl);
      router.refresh();
    } catch (error) {
      console.error(error);
      setError(toError(error));
      setWorking(false);
    }
  };

  return (
    <VStack className="CheckinEditPageContent">
      <H1>
        {titlePrefix}{" "}
        <Link href={viewPageUrl}>{checkin.board.displayName}</Link>
      </H1>
      <CheckinForm
        formRef={formRef}
        working={working}
        error={error}
        editingCheckin={editingCheckin}
        onInputChange={onInputChange}
        onFormSubmit={onFormSubmit}
      />
      <p>Or...</p>
      <DangerButton disabled={working} onClick={onDeleteClick}>
        Delete this checkin
      </DangerButton>
    </VStack>
  );
}
