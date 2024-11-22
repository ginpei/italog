import { ErrorBlock } from "../error/ErrorBlock";
import { Button } from "../style/Button";
import { InputLabel } from "../style/InputLabel";
import { LongTextInput } from "../style/LongTextInput";
import { TextInput } from "../style/TextInput";
import { Product } from "./Product";
import { ProductImageBlock } from "./ProductImage";

export interface ProductFormProps {
  disabled: boolean;
  error: Error | null;
  onChange: (product: Product) => void;
  onSubmit: (product: Product) => void;
  product: Product;
  showImage: boolean;
  submitLabel: string;
}

export function ProductForm({
  disabled,
  error,
  onChange,
  onSubmit,
  product,
  showImage,
  submitLabel,
}: ProductFormProps): JSX.Element {
  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(product);
  };

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    if (
      name === "barcode" ||
      name === "displayName" ||
      name === "brands" ||
      name === "categories"
    ) {
      onChange({ ...product, [name]: value });
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <fieldset disabled={disabled} className="flex flex-col gap-4">
        {error && <ErrorBlock error={error} />}
        <InputLabel>
          Barcode:
          <TextInput
            inputMode="numeric"
            name="barcode"
            onChange={onInputChange}
            pattern="(\d|\s)*"
            placeholder="0 00000 00000 0"
            required
            value={product.barcode}
          />
        </InputLabel>
        <InputLabel>
          Display name:
          <TextInput
            name="displayName"
            onChange={onInputChange}
            required
            value={product.displayName}
          />
        </InputLabel>
        <InputLabel>
          Brands (each line) (optional):
          <LongTextInput
            name="brands"
            onChange={onInputChange}
            value={product.brands}
          />
        </InputLabel>
        <InputLabel>
          Categories (each line) (optional):
          <LongTextInput
            name="categories"
            onChange={onInputChange}
            value={product.categories}
          />
        </InputLabel>
        {showImage && (
          <InputLabel>
            Image:
            <ProductImageBlock imageUrl={product.imageUrl} />
          </InputLabel>
        )}
        <Button>{submitLabel}</Button>
      </fieldset>
    </form>
  );
}
