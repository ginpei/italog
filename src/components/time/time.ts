import { UserError } from "@/components/error/UserError";

/**
 * @param date `Date.now()` on server
 * @param offset `new Date().getTimezoneOffset()` that passed from the client
 * @returns e.g. `2021-09-01`
 */
export function getDateInUserTimeZone(time: number, offset: number): string {
  if (offset < -720 || 840 < offset) {
    throw new UserError("Invalid offset (-720 to 840)");
  }

  const date = new Date(time);
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  const userDate = new Date(utcDate.getTime() + offset * 60000);
  const sDate = userDate.toISOString().slice(0, 10);
  return sDate;
}
