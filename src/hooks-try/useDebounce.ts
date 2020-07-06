import { useState, useEffect } from 'react';

export default function useDebounce(value: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebounceValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you need to be able to change that dynamically.
    [value]
  );
  return debounceValue;
}
