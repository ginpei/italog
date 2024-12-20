import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Board } from "../board/Board";
import { toError } from "../error/errorUtil";
import { VStack } from "../layout/VStack";
import { H2 } from "../style/Hn";
import { EditingCheckinRow } from "./Checkin";
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
  const [editingCheckin, setEditingCheckin] = useState<EditingCheckinRow>({
    boardId: board.boardId,
    comment: "",
    id: "",
    imageUrls: [],
    rate: "0",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const onFormSubmit = async () => {
    setWorking(true);
    setError(null);

    try {
      await requestPostCheckin(editingCheckin);
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
        onChange={setEditingCheckin}
        onSubmit={onFormSubmit}
      />
    </VStack>
  );
}
