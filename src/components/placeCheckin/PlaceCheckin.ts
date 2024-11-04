import { Checkin } from "../checkin/Checkin";

export interface PlaceCheckin extends Checkin {
  placeName: string;
  userName: string;
}
