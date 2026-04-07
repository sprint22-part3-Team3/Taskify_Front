import { useCallback, useState } from 'react';

type Args = {
  itemCount: number;
};

const clampIndex = (index: number, itemCount: number) => {
  if (itemCount <= 0) {
    return -1;
  }

  if (index < 0) {
    return 0;
  }

  if (index >= itemCount) {
    return itemCount - 1;
  }

  return index;
};

export const useDropdownNavigation = ({ itemCount }: Args) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const resetHighlight = useCallback(() => {
    setHighlightedIndex(-1);
  }, []);

  const setInitialHighlight = useCallback(
    (index: number) => {
      const nextIndex = clampIndex(index, itemCount);

      if (nextIndex === -1) {
        setHighlightedIndex(-1);
        return;
      }

      setHighlightedIndex(nextIndex);
    },
    [itemCount]
  );

  const moveHighlight = useCallback(
    (delta: number) => {
      if (itemCount === 0) {
        return;
      }

      setHighlightedIndex((currentIndex) => {
        const baseIndex =
          currentIndex >= 0 && currentIndex < itemCount ? currentIndex : 0;
        const nextIndex = baseIndex + delta;

        if (nextIndex >= itemCount) {
          return 0;
        }

        if (nextIndex < 0) {
          return itemCount - 1;
        }

        return nextIndex;
      });
    },
    [itemCount]
  );

  return {
    highlightedIndex,
    moveHighlight,
    resetHighlight,
    setInitialHighlight,
  };
};
