"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import {
  requestDeleteCheckin,
  requestPatchCheckin,
} from "@/app/api/checkin/[checkinId]/checkinItemApis";
import { Checkin, EditingCheckinRow } from "@/components/checkin/Checkin";
import { CheckinForm } from "@/components/checkin/CheckinForm";
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
  const [editingCheckin, setEditingCheckin] =
    useState<EditingCheckinRow>(checkin);
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

  const onFormSubmit = async () => {
    setWorking(true);
    setError(null);

    try {
      await requestPatchCheckin(checkin.id, editingCheckin);
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
      await requestDeleteCheckin(checkin.id);
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
        onChange={setEditingCheckin}
        onSubmit={onFormSubmit}
      />
      <p>Or...</p>
      <DangerButton disabled={working} onClick={onDeleteClick}>
        Delete this checkin
      </DangerButton>
    </VStack>
  );
}
