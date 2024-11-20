import { PhotoIcon } from "@heroicons/react/24/outline";

export interface ProductImageBlockProps {
  imageUrl: string | undefined;
}

export function ProductImageBlock({
  imageUrl,
}: ProductImageBlockProps): JSX.Element {
  return imageUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      className="ProductImageBlock mx-auto size-64 object-contain"
      src={imageUrl}
    />
  ) : (
    <span className="ProductImageBlock mx-auto grid size-64 place-items-center border text-center">
      <span>
        <PhotoIcon className="mx-auto size-32 text-gray-500" />
        (No image)
      </span>
    </span>
  );
}
