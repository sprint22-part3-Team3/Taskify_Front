import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { DndInternalContext } from './context';
import type {
  UniqueIdentifier,
  DragEndEvent,
  DragStartEvent,
  SensorDescriptor,
} from './types';

export function useDraggable({
  id,
  data,
}: {
  id: UniqueIdentifier;
  data?: unknown;
}) {
  const context = useContext(DndInternalContext);
  if (!context) {
    throw new Error('useDraggable must be used within a DndContext');
  }

  const nodeRef = useRef<HTMLElement | null>(null);

  const setNodeRef = useCallback((node: HTMLElement | null) => {
    nodeRef.current = node;
  }, []);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (event.button !== 0) {
        return;
      }
      const startX = event.clientX;
      const startY = event.clientY;
      let hasStartedDrag = false;
      const target = event.currentTarget;
      const pointerId = event.pointerId;
      target?.setPointerCapture(pointerId);

      const moveHandler = (moveEvent: PointerEvent) => {
        if (hasStartedDrag) {
          return;
        }
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;
        const distance = Math.hypot(deltaX, deltaY);
        if (distance >= 3) {
          hasStartedDrag = true;
          target?.releasePointerCapture(pointerId);
          window.removeEventListener('pointermove', moveHandler);
          window.removeEventListener('pointerup', upHandler);
          context.startDragging({
            id,
            data: { current: data },
            node: nodeRef.current,
            initialEvent: event.nativeEvent as PointerEvent,
          });
        }
      };

      const upHandler = () => {
        target?.releasePointerCapture(pointerId);
        window.removeEventListener('pointermove', moveHandler);
        window.removeEventListener('pointerup', upHandler);
      };

      window.addEventListener('pointermove', moveHandler);
      window.addEventListener('pointerup', upHandler);
    },
    [context, data, id]
  );

  const isDragging = context.activeId === id;

  return {
    attributes: {
      role: 'button',
      tabIndex: 0,
      'aria-pressed': isDragging,
    },
    listeners: {
      onPointerDown: handlePointerDown,
    },
    setNodeRef,
    transform: context.activeId === id ? context.transform : null,
    isDragging,
  };
}

export function useDroppable({
  id,
  data,
}: {
  id: UniqueIdentifier;
  data?: unknown;
}) {
  const context = useContext(DndInternalContext);
  if (!context) {
    throw new Error('useDroppable must be used within a DndContext');
  }

  const [node, setNode] = useState<HTMLElement | null>(null);

  const setNodeRef = useCallback((nextNode: HTMLElement | null) => {
    setNode(nextNode);
  }, []);

  useEffect(() => {
    if (!node) {
      return;
    }

    context.registerDroppable(id, node, data);
    return () => {
      context.unregisterDroppable(id);
    };
  }, [context, data, id, node]);

  return {
    isOver: context.overId === id,
    setNodeRef,
  };
}

export function PointerSensor(options?: Record<string, unknown>) {
  return { options };
}

export function useSensor(sensor: unknown, options?: Record<string, unknown>) {
  return { sensor, options };
}

export function useSensors(...descriptors: SensorDescriptor[]) {
  return descriptors;
}

export type { DragEndEvent, DragStartEvent, SensorDescriptor };
