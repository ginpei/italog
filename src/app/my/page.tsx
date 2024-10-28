import { StraightPageLayout } from "@/components/lib/layout/StraightPageLayout";
import { getSessionProfile } from "@/components/lib/user/profileSession";

export default async function Home() {
  const profile = await getSessionProfile();

  return (
    <StraightPageLayout profile={profile}>
      <h1 className="text-5xl font-bold">My page</h1>
      <p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="border p-2" href="/api/auth/logout">
          Logout
        </a>
      </p>
    </StraightPageLayout>
  );
}
