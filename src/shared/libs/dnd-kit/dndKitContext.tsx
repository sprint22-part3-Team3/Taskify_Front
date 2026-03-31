import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import type {
  DndContextProps,
  DndContextValue,
  DragState,
  DroppableEntry,
  StartDragParams,
  UniqueIdentifier,
} from './dndKit.types';

const DEFAULT_STATE: DragState = {
  activeId: null,
  activeData: null,
  overId: null,
  overData: null,
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
  const activeNodeRef = useRef<HTMLElement | null>(null);
  const droppableRectsRef = useRef(new Map<UniqueIdentifier, DOMRect>());
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
    if (activeNodeRef.current) {
      activeNodeRef.current.style.transform = '';
      activeNodeRef.current = null;
    }
    setState(DEFAULT_STATE);
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const findDroppable = useCallback((clientX: number, clientY: number) => {
    for (const [id, entry] of droppablesRef.current.entries()) {
      const rect = droppableRectsRef.current.get(id);
      if (!rect || !entry.node.isConnected) {
        continue;
      }
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

  const updateDroppableRects = useCallback(() => {
    droppableRectsRef.current.clear();
    for (const [id, entry] of droppablesRef.current.entries()) {
      if (!entry.node.isConnected) {
        continue;
      }
      droppableRectsRef.current.set(id, entry.node.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => updateDroppableRects();
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [updateDroppableRects]);

  const startDragging = useCallback(
    ({ id, data, node, initialEvent }: StartDragParams) => {
      if (!node || draggingRef.current) {
        return;
      }

      const startX = initialEvent.clientX;
      const startY = initialEvent.clientY;
      draggingRef.current = true;

      activeNodeRef.current = node;
      updateDroppableRects();
      const moveHandler = (moveEvent: PointerEvent) => {
        const over = findDroppable(moveEvent.clientX, moveEvent.clientY);
        const translateX = moveEvent.clientX - startX;
        const translateY = moveEvent.clientY - startY;
        if (activeNodeRef.current) {
          activeNodeRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
        }
        setState((previous) => {
          if (previous.activeId !== id) {
            return previous;
          }
          const nextOverId = over?.id ?? null;
          const nextOverData = over?.data ?? null;
          if (
            previous.overId === nextOverId &&
            previous.overData === nextOverData
          ) {
            return previous;
          }
          return {
            ...previous,
            overId: nextOverId,
            overData: nextOverData,
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
      });

      onDragStart?.({ active: { id, data } });
    },
    [cleanup, findDroppable, onDragEnd, onDragStart, updateDroppableRects]
  );

  const registerDroppable = useCallback(
    (id: UniqueIdentifier, node: HTMLElement, data?: unknown) => {
      droppablesRef.current.set(id, { node, data });
      updateDroppableRects();
    },
    [updateDroppableRects]
  );

  const unregisterDroppable = useCallback(
    (id: UniqueIdentifier) => {
      droppablesRef.current.delete(id);
      updateDroppableRects();
    },
    [updateDroppableRects]
  );

  const value: DndContextValue = {
    activeId: state.activeId,
    overId: state.overId,
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
