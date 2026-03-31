export const CSS = {
  Translate: {
    toString: ({ x, y }: { x: number; y: number }) =>
      `translate3d(${x}px, ${y}px, 0)`,
  },
};
