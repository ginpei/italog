import { Board } from "../board/Board";

export interface Product extends Board {
  barcode: string;
  boardType: "product";
  brands: string;
  categories: string;
  imageUrl: string;
}
