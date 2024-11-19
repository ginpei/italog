import { Board } from "../board/Board";

export interface Place extends Board {
  address: string;
  boardType: "place";
  latitude: number;
  longitude: number;
  mapId: string;
  mapUrl: string;
  typeDisplayName?: string;
  webUrl?: string;
}
