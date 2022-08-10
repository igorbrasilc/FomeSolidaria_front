import { useCallback, useRef } from 'react';

const useDebounce = (delay = 300) => {
  const debouncing = useRef<ReturnType<typeof setTimeout>>();

  const debounce = useCallback((func: () => void) => {
    if (debouncing.current) {
      clearTimeout(debouncing.current);
    }

    debouncing.current = setTimeout(() => func(), delay);
  }, [delay]);

  return { debounce };
};

export default useDebounce;
