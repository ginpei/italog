import { Board } from "../board/Board";

export interface Place extends Board {
  mapId: string;
  address: string;
  latitude: number;
  longitude: number;
  mapUrl: string;
  typeDisplayName?: string;
  webUrl?: string;
}
