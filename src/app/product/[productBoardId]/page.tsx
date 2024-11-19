import { db } from "@vercel/postgres";
import { notFound } from "next/navigation";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { H1 } from "@/components/style/Hn";
import { getSessionProfile } from "@/components/user/profileSession";

export default async function Page({
  params,
}: {
  params: { productBoardId: string };
}) {
  const profile = await getSessionProfile();
  if (!profile) {
    throw new Error("Need login");
  }

  // TODO
  const result = await db.query(
    /*sql*/ `
      SELECT p.*, b.display_name FROM product p
      JOIN board b ON p.board_id = b.board_id
      WHERE p.board_id = $1
    `,
    [params.productBoardId],
  );
  const row = result.rows[0];
  if (!row) {
    notFound();
  }

  return (
    <StraightPageLayout profile={profile}>
      {/* TODO */}
      <H1>{row.display_name}</H1>
      {row.image_url && (
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={row.image_url} />
        </div>
      )}
    </StraightPageLayout>
  );
}
