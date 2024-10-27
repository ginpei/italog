import { getSession } from "@auth0/nextjs-auth0";
import { StraightPageLayout } from "@/components/lib/layout/StraightPageLayout";
import { H1 } from "@/components/lib/style/Hn";
import { RegisterForm } from "@/components/pages/register/RegisterForm";

export default async function RegisterPage(): Promise<JSX.Element> {
  const session = await getSession();

  if (!session) {
    return (
      <StraightPageLayout session={session}>
        <h1>Please login first</h1>
      </StraightPageLayout>
    );
  }

  return (
    <StraightPageLayout session={session}>
      <H1>Register</H1>
      <RegisterForm />
    </StraightPageLayout>
  );
}
