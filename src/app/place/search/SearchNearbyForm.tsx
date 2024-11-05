import { FindPlaceParams } from "@/app/api/findNearby/route";
import {
  isPlaceTypeCategory,
  popularPlaceTypes,
} from "@/components/place/placeTypes";
import { Button } from "@/components/style/Button";
import { Select } from "@/components/style/Select";
import { TextInput } from "@/components/style/TextInput";

export interface SearchNearbyFormProps {
  disabled: boolean;
  onChange: (params: FindPlaceParams) => void;
  onSubmit: (params: FindPlaceParams) => void;
  params: FindPlaceParams;
}

export function SearchNearbyForm({
  disabled,
  onChange,
  onSubmit,
  params,
}: SearchNearbyFormProps): JSX.Element {
  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    if (name === "category") {
      if (value !== "" && !isPlaceTypeCategory(value)) {
        throw new Error(`Invalid category: ${value}`);
      }
      onChange({ ...params, category: value });
    } else if (name === "q") {
      onChange({ ...params, textQuery: value });
    } else {
      throw new Error(`Invalid input name: ${name}`);
    }
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(params);
  };

  return (
    <form className="SearchNearbyForm" onSubmit={onFormSubmit}>
      <fieldset className="flex flex-col gap-4" disabled={disabled}>
        <label className="flex flex-col">
          Category:
          <Select
            className="border p-2"
            name="category"
            onChange={onInputChange}
            value={params.category}
          >
            <option value="">🌐 All</option>
            {popularPlaceTypes.map(({ categoryKey, displayName, emoji }) => (
              <option key={categoryKey} value={categoryKey}>
                {emoji} {displayName}
              </option>
            ))}
          </Select>
        </label>
        <label className="flex flex-col">
          Text:
          <TextInput
            name="q"
            onChange={onInputChange}
            placeholder="McDonald's"
            type="search"
            value={params.textQuery}
          />
        </label>
        <Button>Search</Button>
      </fieldset>
    </form>
  );
}
