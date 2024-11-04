export interface Place {
  boardId: string;
  mapId: string;
  address: string;
  displayName: string;
  latitude: number;
  longitude: number;
  mapUrl: string;
  typeDisplayName?: string;
  webUrl?: string;
}
