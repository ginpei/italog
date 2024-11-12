import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { VStack } from "@/components/layout/VStack";
import { H1 } from "@/components/style/Hn";
import { getSessionProfile } from "@/components/user/profileSession";

export default async function Page(): Promise<JSX.Element> {
  const profile = await getSessionProfile();

  return (
    <StraightPageLayout profile={profile}>
      <VStack>
        <H1>About</H1>
        <p>Under development. Nothing is stable.</p>
      </VStack>
    </StraightPageLayout>
  );
}
