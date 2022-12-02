import { useEffect, useState } from "react";

export function useLocalStoreage<T>(key: string, initialvalue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const Jsonvalue = localStorage.getItem(key);
    if (Jsonvalue != null) return JSON.parse(Jsonvalue);
    if (initialvalue === "function") {
      return (initialvalue as () => T)();
    } else {
      return initialvalue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as [typeof value, typeof setValue];
}
