import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Board } from "../board/Board";
import { toError } from "../error/errorUtil";
import { VStack } from "../layout/VStack";
import { H2 } from "../style/Hn";
import { CheckinRate, CheckinRow } from "./Checkin";
import { CheckinForm } from "./CheckinForm";
import { getBoardViewPageUrl } from "./checkinUrl";
import { requestPostCheckin } from "@/app/api/checkin/checkinApis";

export interface NewCheckinSectionProps {
  board: Pick<Board, "boardType" | "boardId">;
}

export function NewCheckinSection({
  board,
}: NewCheckinSectionProps): JSX.Element {
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [editingCheckin, setEditingCheckin] = useState<CheckinRow>({
    boardId: board.boardId,
    comment: "",
    createdAt: 0,
    id: "",
    imageUrls: [],
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
      await requestPostCheckin({
        checkin: {
          boardId: editingCheckin.boardId,
          comment: editingCheckin.comment,
          imageUrls: editingCheckin.imageUrls,
          rate: editingCheckin.rate,
        },
      });
      router.push(getBoardViewPageUrl(board));
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
    <VStack>
      <hgroup>
        <H2>Tell something</H2>
        <p className="text-gray-500">
          To your friends. The comment and feeling will not be shared to public
          internet.
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
  );
}
