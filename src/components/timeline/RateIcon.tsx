import { ExclamationCircleIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { CheckinRate } from "../checkin/Checkin";

export interface RateIconProps {
  rate: CheckinRate;
}

export function RateIcon({ rate }: RateIconProps): JSX.Element | null {
  return rate === "+1" ? (
    <SparklesIcon className="inline-block size-4 text-yellow-400" />
  ) : rate === "-1" ? (
    <ExclamationCircleIcon className="inline-block size-4 text-red-500" />
  ) : null;
}
