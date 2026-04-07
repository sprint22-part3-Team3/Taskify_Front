import { useCallback } from 'react';
import type { KeyboardEvent } from 'react';

type Args = {
  isOpen: boolean;
  onOpen: () => void;
  canOpen?: boolean;
};

const ARROW_KEYS = ['ArrowDown', 'ArrowUp'];

export const useDropdownArrowKeyOpen = ({
  isOpen,
  onOpen,
  canOpen = true,
}: Args) => {
  return useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (isOpen || !canOpen) {
        return false;
      }

      if (ARROW_KEYS.includes(event.key)) {
        event.preventDefault();
        onOpen();
        return true;
      }

      return false;
    },
    [canOpen, isOpen, onOpen]
  );
};
