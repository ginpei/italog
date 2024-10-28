import { StraightPageLayout } from "@/components/lib/layout/StraightPageLayout";
import { getSessionProfile } from "@/components/lib/user/profileSession";
import { FindPageContent } from "@/components/pages/register/FindPageContent";

export default async function RegisterPage(): Promise<JSX.Element> {
  const profile = await getSessionProfile();

  if (!profile) {
    return (
      <StraightPageLayout profile={profile}>
        <h1>Please login first</h1>
      </StraightPageLayout>
    );
  }

  return (
    <StraightPageLayout profile={profile}>
      <FindPageContent />
    </StraightPageLayout>
  );
}
