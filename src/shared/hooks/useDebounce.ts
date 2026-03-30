import { useEffect, useState } from 'react';

const DEFAULT_DEBOUNCE_DELAY = 500;

export function useDebounce<ValueType>(
  value: ValueType,
  delay = DEFAULT_DEBOUNCE_DELAY
) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
