import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import type {
  DndContextProps,
  DndContextValue,
  DragState,
  DroppableEntry,
  StartDragParams,
  UniqueIdentifier,
} from './types';

const DEFAULT_STATE: DragState = {
  activeId: null,
  activeData: null,
  overId: null,
  overData: null,
  transform: null,
};

const DndInternalContext = createContext<DndContextValue | null>(null);

export function DndContext({
  children,
  onDragStart,
  onDragEnd,
}: DndContextProps) {
  const [state, setState] = useState<DragState>(DEFAULT_STATE);
  const droppablesRef = useRef(new Map<UniqueIdentifier, DroppableEntry>());
  const listenersRef = useRef<{
    move?: (event: PointerEvent) => void;
    up?: (event: PointerEvent) => void;
  }>({});
  const draggingRef = useRef(false);

  const cleanup = useCallback(() => {
    if (listenersRef.current.move) {
      window.removeEventListener('pointermove', listenersRef.current.move);
    }
    if (listenersRef.current.up) {
      window.removeEventListener('pointerup', listenersRef.current.up);
      window.removeEventListener('pointercancel', listenersRef.current.up);
    }
    listenersRef.current.move = undefined;
    listenersRef.current.up = undefined;
    draggingRef.current = false;
    setState(DEFAULT_STATE);
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const findDroppable = useCallback((clientX: number, clientY: number) => {
    for (const [id, entry] of droppablesRef.current.entries()) {
      if (!entry.node.isConnected) {
        continue;
      }
      const rect = entry.node.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        return { id, data: entry.data };
      }
    }
    return null;
  }, []);

  const startDragging = useCallback(
    ({ id, data, node, initialEvent }: StartDragParams) => {
      if (!node || draggingRef.current) {
        return;
      }

      const startX = initialEvent.clientX;
      const startY = initialEvent.clientY;
      draggingRef.current = true;

      const moveHandler = (moveEvent: PointerEvent) => {
        const over = findDroppable(moveEvent.clientX, moveEvent.clientY);
        setState((previous) => {
          if (previous.activeId !== id) {
            return previous;
          }
          return {
            ...previous,
            transform: {
              x: moveEvent.clientX - startX,
              y: moveEvent.clientY - startY,
            },
            overId: over?.id ?? null,
            overData: over?.data ?? null,
          };
        });
      };

      const endHandler = (endEvent: PointerEvent) => {
        const over = findDroppable(endEvent.clientX, endEvent.clientY);
        const event = {
          active: { id, data },
          over: over
            ? {
                id: over.id,
                data: over.data,
              }
            : null,
        };
        cleanup();
        onDragEnd?.(event);
      };

      listenersRef.current.move = moveHandler;
      listenersRef.current.up = endHandler;

      window.addEventListener('pointermove', moveHandler);
      window.addEventListener('pointerup', endHandler);
      window.addEventListener('pointercancel', endHandler);

      setState({
        activeId: id,
        activeData: data,
        overId: null,
        overData: null,
        transform: { x: 0, y: 0 },
      });

      onDragStart?.({ active: { id, data } });
    },
    [cleanup, findDroppable, onDragEnd, onDragStart]
  );

  const registerDroppable = useCallback(
    (id: UniqueIdentifier, node: HTMLElement, data?: unknown) => {
      droppablesRef.current.set(id, { node, data });
    },
    []
  );

  const unregisterDroppable = useCallback((id: UniqueIdentifier) => {
    droppablesRef.current.delete(id);
  }, []);

  const value: DndContextValue = {
    activeId: state.activeId,
    overId: state.overId,
    transform: state.transform,
    registerDroppable,
    unregisterDroppable,
    startDragging,
  };

  return (
    <DndInternalContext.Provider value={value}>
      {children}
    </DndInternalContext.Provider>
  );
}

export { DndInternalContext };
