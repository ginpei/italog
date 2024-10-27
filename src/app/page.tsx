import { getSession } from "@auth0/nextjs-auth0";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;

  return (
    <StraightPageLayout>
      <h1 className="text-5xl font-bold">Italog</h1>
      <div>
        <p>User name: {user ? user.name : "no login"}</p>
      </div>
      <p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/auth/login">Login</a>
        {" | "}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/auth/logout">Logout</a>
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ad
        perferendis cumque fugit, eos doloremque architecto ullam placeat iste
        aut esse reiciendis molestias praesentium impedit repellat suscipit,
        nemo minus porro.
      </p>
    </StraightPageLayout>
  );
}
