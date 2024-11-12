import React from "react";

export function PlaceItemSkeleton(): JSX.Element {
  return (
    <div className="flex animate-pulse flex-col gap-2 border border-gray-300 p-2">
      <div className="h-6 w-1/2 rounded bg-gray-300 dark:bg-gray-800"></div>
      <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-800"></div>
      <div className="h-4 rounded bg-gray-300 dark:bg-gray-800"></div>
    </div>
  );
}
