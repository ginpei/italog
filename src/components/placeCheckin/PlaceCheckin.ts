import { CheckinRow } from "../checkin/Checkin";

export interface PlaceCheckin extends CheckinRow {
  latitude: number;
  longitude: number;
  placeName: string;
  userName: string;
}
