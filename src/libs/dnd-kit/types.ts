export type UniqueIdentifier = string | number;

type DragData = {
  current: unknown;
};

export type DragState = {
  activeId: UniqueIdentifier | null;
  activeData: DragData | null;
  overId: UniqueIdentifier | null;
  overData: unknown;
  transform: { x: number; y: number } | null;
};

export type DroppableEntry = {
  node: HTMLElement;
  data?: unknown;
};

export type DragStartEvent = {
  active: {
    id: UniqueIdentifier;
    data: DragData;
  };
};

export type DragEndEvent = {
  active: {
    id: UniqueIdentifier;
    data: DragData;
  };
  over: {
    id: UniqueIdentifier;
    data?: unknown;
  } | null;
};

export type DndContextValue = {
  activeId: UniqueIdentifier | null;
  overId: UniqueIdentifier | null;
  transform: { x: number; y: number } | null;
  registerDroppable: (
    id: UniqueIdentifier,
    node: HTMLElement,
    data?: unknown
  ) => void;
  unregisterDroppable: (id: UniqueIdentifier) => void;
  startDragging: (params: StartDragParams) => void;
};

export type StartDragParams = {
  id: UniqueIdentifier;
  data: DragData;
  node: HTMLElement | null;
  initialEvent: PointerEvent;
};

import type { ReactNode } from 'react';

export type DndContextProps = {
  children: ReactNode;
  sensors?: SensorDescriptor[];
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
};

export type SensorDescriptor = {
  sensor: unknown;
  options?: Record<string, unknown>;
};
