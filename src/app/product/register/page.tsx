import { RegisterProductPageContent } from "./RegisterProductPageContent";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getSessionProfile } from "@/components/user/profileSession";

export default async function Page(): Promise<JSX.Element> {
  const [profile] = await Promise.all([getSessionProfile()]);

  if (!profile) {
    return (
      <StraightPageLayout profile={profile}>
        <h1>Please login first</h1>
      </StraightPageLayout>
    );
  }

  return (
    <StraightPageLayout profile={profile}>
      <RegisterProductPageContent />
    </StraightPageLayout>
  );
}
