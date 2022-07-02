import { useEffect, useState } from 'react';

const PREFIX = 'vk-messenger-';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === 'function') {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
