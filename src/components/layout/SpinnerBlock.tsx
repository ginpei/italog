import { SunIcon } from "@heroicons/react/24/outline";

export interface SpinnerBlockProps {
  size?: "size-16";
}

export function SpinnerBlock({
  size = "size-16",
}: SpinnerBlockProps): JSX.Element {
  return (
    <div className="SpinnerBlock">
      <SunIcon className={`mx-auto animate-spin text-gray-200 ${size}`} />
    </div>
  );
}
