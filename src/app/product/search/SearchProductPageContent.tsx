"use client";

import { BarcodeSection } from "./BarcodeSection";
import { SearchSection } from "./SearchSection";
import { VStack } from "@/components/layout/VStack";
import { H1 } from "@/components/style/Hn";
import { Link } from "@/components/style/Link";

export interface SearchProductPageContentProps {
  recentCheckins: never[];
}

export function SearchProductPageContent({}: SearchProductPageContentProps): JSX.Element {
  return (
    <VStack className="ProductSearchPageContent" gap="gap-8">
      <H1>Search product</H1>
      <p>
        <Link href="/product/register">Register a product</Link>
      </p>
      <BarcodeSection />
      <SearchSection />
    </VStack>
  );
}
