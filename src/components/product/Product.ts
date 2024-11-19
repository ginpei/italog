import { Board } from "../board/Board";

export interface Product extends Board {
  barcode: string;
  brands: string;
  categories: string;
  imageUrl: string;
}
