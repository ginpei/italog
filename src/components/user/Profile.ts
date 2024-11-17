import { isUUID } from "../db/transaction";

export interface Profile {
  displayName: string;
  id: string;
  imageUrl?: string;
}

export function getUserIdFromPicturePath(path: string): string {
  const rxPicturePath = /^user\/([^/]+)\/profile\.\w+$/;
  const id = path.match(rxPicturePath)?.[1];
  if (!id || !isUUID(id)) {
    return "";
  }

  return id;
}
