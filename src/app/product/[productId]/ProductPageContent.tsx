"use client";

import { CheckCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { requestPostCheckin } from "@/app/api/checkin/checkinApis";
import { Checkin } from "@/components/checkin/Checkin";
import { ErrorBlock } from "@/components/error/ErrorBlock";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Product } from "@/components/product/Product";
import { ProductDescription } from "@/components/product/ProductDescription";
import { H2 } from "@/components/style/Hn";
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
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();

  const onCheckInClick = async () => {
    setWorking(true);
    setError(null);
    setSuccessMessage("");

    try {
      await requestPostCheckin({
        checkin: {
          boardId: product.boardId,
          comment: "",
          rate: "0",
        },
      });
      router.refresh();
      setSuccessMessage("Checked in!");
    } catch (error) {
      console.error(error);
      setError(toError(error));
    } finally {
      setWorking(false);
    }
  };

  return (
    <VStack className="ProductPageContent" gap="gap-8">
      <ProductDescription product={product} />
      <VStack>
        {successMessage && (
          <div className="mx-auto text-green-500">{successMessage}</div>
        )}
        <ErrorBlock error={error} />
        <SuperButtonBlock>
          <SuperButton disabled={working} onClick={onCheckInClick}>
            <div className="text-center">
              <CheckCircleIcon className="mx-auto size-8" />
              Check in
            </div>
          </SuperButton>
          <SuperButtonLink href={`/product/${product.boardId}/check-in`}>
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
