import { Content } from "@/components/layout/Content";
import { NavBarFrame } from "@/components/layout/NavBarFrame";
import { VStack } from "@/components/layout/VStack";

export default function Page() {
  return (
    <VStack className="StraightPageLayout">
      <NavBarFrame title="Italog" />
      <div className="min-h-[60vh]">
        <Content>
          <VStack>
            <p>Not found</p>
          </VStack>
        </Content>
      </div>
    </VStack>
  );
}
