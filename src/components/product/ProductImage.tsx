import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { controlBorderThemeClassNames } from "../style/controlClassNames";

export interface ProductImageBlockProps {
  imageUrl: string | undefined;
}

export function ProductImageBlock({
  imageUrl,
}: ProductImageBlockProps): JSX.Element {
  return imageUrl ? (
    <Image
      alt=""
      className="ProductImageBlock mx-auto size-64 max-h-full object-contain"
      height={400}
      key={imageUrl}
      src={imageUrl}
      width={400}
    />
  ) : (
    <span
      className={`ProductImageBlock
        mx-auto grid size-64 max-h-full place-items-center border text-center
        ${controlBorderThemeClassNames}
      `}
    >
      <span>
        <PhotoIcon className="mx-auto size-32 text-gray-500" />
        (No image)
      </span>
    </span>
  );
}
