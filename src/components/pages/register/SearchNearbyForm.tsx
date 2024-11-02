import { FindNearbyParams } from "@/app/api/findNearby/route";
import {
  isPlaceTypeCategory,
  popularPlaceTypes,
} from "@/components/lib/place/placeTypes";
import { Button } from "@/components/lib/style/Button";
import { Select } from "@/components/lib/style/Select";

export interface SearchNearbyFormProps {
  disabled: boolean;
  onChange: (params: FindNearbyParams) => void;
  onSubmit: (params: FindNearbyParams) => void;
  params: FindNearbyParams;
}

export function SearchNearbyForm({
  disabled,
  onChange,
  onSubmit,
  params,
}: SearchNearbyFormProps): JSX.Element {
  const onInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === "category") {
      if (!isPlaceTypeCategory(value)) {
        throw new Error(`Invalid category: ${value}`);
      }
      onChange({ ...params, category: value });
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
            {popularPlaceTypes.map(({ categoryKey, displayName, emoji }) => (
              <option key={categoryKey} value={categoryKey}>
                {emoji} {displayName}
              </option>
            ))}
          </Select>
        </label>
        {/* <label className="flex flex-col">
          Text (optional):
          <input
            className="border p-2"
            name="q"
            placeholder="McDonald's"
            type="text"
          />
        </label> */}
        <Button>Search</Button>
      </fieldset>
    </form>
  );
}
