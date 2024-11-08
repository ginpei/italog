import { Checkin } from "../checkin/Checkin";

export interface PlaceCheckin extends Checkin {
  latitude: number;
  longitude: number;
  placeName: string;
  userName: string;
}
