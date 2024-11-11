"use client";

import { useEffect, useMemo } from "react";
import { Content } from "@/components/layout/Content";
import { NavBarFrame } from "@/components/layout/NavBarFrame";
import { VStack } from "@/components/layout/VStack";

export default function Page({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const messaeg = useMemo(() => {
    if (error.message === "Need login") {
      return "You need to log in to view this page";
    }

    return "Something went wrong";
  }, [error]);
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <VStack className="StraightPageLayout">
      <NavBarFrame title="Italog" />
      <div className="min-h-[60vh]">
        <Content>
          <VStack>
            <p>{messaeg}</p>
          </VStack>
        </Content>
      </div>
    </VStack>
  );
}
