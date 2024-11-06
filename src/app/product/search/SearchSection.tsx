import { useState } from "react";
import { fetchSearchProductApi } from "@/app/api/product/searchProductApis";
import { VStack } from "@/components/layout/VStack";
import { Product } from "@/components/product/Product";
import { Button } from "@/components/style/Button";
import { H2 } from "@/components/style/Hn";
import { TextInput } from "@/components/style/TextInput";

export function SearchSection(): JSX.Element {
  const [working, setWorking] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWorking(true);
    try {
      const result = await fetchSearchProductApi({ keyword: query });
      setProducts(result || []);
    } catch (error) {
      console.error("Failed to search products", error);
    } finally {
      setWorking(false);
    }
  };

  return (
    <VStack className="SearchSection">
      <H2>Search by text</H2>
      <form onSubmit={onSubmit}>
        <fieldset className="flex flex-col gap-4" disabled={working}>
          <label className="flex flex-col">
            Display Name:
            <TextInput
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </label>
          <Button>Search</Button>
        </fieldset>
      </form>
      {!working && products.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {products.map((product) => (
              <li key={product.barcode}>{product.displayName}</li>
            ))}
          </ul>
        </div>
      )}
    </VStack>
  );
}
