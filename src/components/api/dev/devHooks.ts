import { useEffect, useState } from "react";

export function useSpecialFlag(): boolean {
  const [special, setSpecial] = useState(false);

  useEffect(() => {
    if (typeof location === "undefined") {
      return;
    }

    const url = new URL(location.href);
    setSpecial(url.searchParams.get("special") === "1");
  }, []);

  return special;
}
