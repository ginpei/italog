"use client";

import { CheckCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Checkin } from "@/components/checkin/Checkin";
import { ErrorBlock } from "@/components/error/ErrorBlock";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Product } from "@/components/product/Product";
import { ProductImageBlock } from "@/components/product/ProductImage";
import { H1, H2 } from "@/components/style/Hn";
import { SuperButton, SuperButtonLink } from "@/components/style/SuperButton";
import { SuperButtonBlock } from "@/components/style/SuperButtonBlock";
import { CheckinItem } from "@/components/timeline/CheckinItem";
import { CheckinList } from "@/components/timeline/CheckinList";

export interface ProductPageContentProps {
  checkins: Checkin<Product>[];
  product: Product;
  userId: string;
}

export function ProductPageContent({
  checkins,
  product,
  userId,
}: ProductPageContentProps): JSX.Element {
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const onCheckInClick = async () => {
    setWorking(true);
    setError(null);

    try {
      // TODO
      alert("TODO");
    } catch (error) {
      console.error(error);
      setError(toError(error));
    } finally {
      setWorking(false);
    }
  };

  return (
    <VStack className="ProductPageContent" gap="gap-8">
      <VStack>
        <H1>{product.displayName}</H1>
        <ProductImageBlock imageUrl={product.imageUrl} />
        <div>Brands: {product.brands.split("\n").join(", ") || "(N/A)"}</div>
        <div>
          Categories: {product.categories.split("\n").join(", ") || "(N/A)"}
        </div>
        <div>
          Barcode: <code>{product.barcode}</code>
        </div>
      </VStack>
      <VStack>
        <ErrorBlock error={error} />
        <SuperButtonBlock>
          <SuperButton disabled={working} onClick={onCheckInClick}>
            <div className="text-center">
              <CheckCircleIcon className="mx-auto size-8" />
              Check in
            </div>
          </SuperButton>
          <SuperButtonLink href={`/product/${product.boardId}/checkIn`}>
            <div className="text-center">
              <PencilSquareIcon className="mx-auto size-8" />
              Tell something
            </div>
          </SuperButtonLink>
        </SuperButtonBlock>
      </VStack>
      <VStack>
        <H2>Checkins</H2>
        <CheckinList>
          {checkins.map((checkin) => (
            <CheckinItem
              key={checkin.id}
              checkin={checkin}
              own={checkin.userId === userId}
            />
          ))}
          {checkins.length === 0 && <p>(No checkins)</p>}
        </CheckinList>
      </VStack>
    </VStack>
  );
}
