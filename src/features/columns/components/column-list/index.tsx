import { CardList } from '@/features/cards/components/card-list';
import { ColumnAdd } from '@/features/columns/components/column-list/column-add';
import { useColumnList } from '@/features/columns/hooks/useColumnList';
import { cn } from '@/shared/utils/cn';
import { ErrorFallback } from '@/shared/components/error/error-fallback';
import { useParams } from 'react-router-dom';
import { ColumnListProvider } from '@/features/columns/contexts/columnListProvider';
import { useCallback } from 'react';
import type { ReactNode } from 'react';
import { CARD_EVENTS } from '@/features/cards/utils/cardEvents';
import { updateCard } from '@/features/cards/apis/cards';
import type { UpdateCardRequest } from '@/features/cards/apis/cards.types';
import type { Card } from '@/features/cards/types/card.types';
import type { Column } from '@/features/columns/types/column.types';
import {
  DndContext,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from '@/shared/libs/dnd-kit';

const LIST_CLASS = cn(
  'shrink-0 px-3 pt-8 pb-6 md:px-5 md:py-5',
  'first:pt-4 md:first:pt-5',
  'last:pt-4 last:pb-12.5 md:last:pt-5 md:last:pb-5'
);

const COLUMN_DROPPABLE_PREFIX = 'column-dropzone-';

const getColumnDroppableId = (columnId: number) =>
  `${COLUMN_DROPPABLE_PREFIX}${columnId}`;

const extractColumnIdFromPayload = (data?: unknown): number | null => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  if ('columnId' in data) {
    const columnId = (data as { columnId?: unknown }).columnId;
    if (typeof columnId === 'number') {
      return columnId;
    }
  }

  return null;
};

const parseColumnIdFromOver = (
  over?: { id: UniqueIdentifier; data?: unknown } | null
) => {
  if (!over) {
    return null;
  }

  const dataColumnId = extractColumnIdFromPayload(over.data);
  if (dataColumnId !== null) {
    return dataColumnId;
  }

  if (
    typeof over.id === 'string' &&
    over.id.startsWith(COLUMN_DROPPABLE_PREFIX)
  ) {
    return Number(over.id.replace(COLUMN_DROPPABLE_PREFIX, ''));
  }

  return null;
};

function ColumnList() {
  const { id } = useParams();
  const dashboardId = Number(id);
  const { columns, isLoading, errorMessage, refetch } =
    useColumnList(dashboardId);
  const sensors = useSensors(useSensor(PointerSensor));

  const moveCard = useCallback(async (card: Card, targetColumnId: number) => {
    const payload: UpdateCardRequest = {
      columnId: targetColumnId,
      title: card.title,
      description: card.description,
      dueDate: card.dueDate ?? undefined,
      tags: card.tags,
      imageUrl: card.imageUrl,
      assigneeUserId: card.assignee?.id,
    };

    try {
      await updateCard(card.id, payload);
      const movedCard = { ...card, columnId: targetColumnId };
      window.dispatchEvent(
        new CustomEvent(CARD_EVENTS.LIST_CHANGE, {
          detail: {
            newColumnId: targetColumnId,
            originalColumnId: card.columnId,
            movedCard,
          },
        })
      );
    } catch (error) {
      void error;
      alert('카드 이동에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const movedCard = event.active.data?.current as Card | undefined;
      if (!movedCard) {
        return;
      }

      const targetColumnId = parseColumnIdFromOver(event.over);
      if (!targetColumnId || targetColumnId === movedCard.columnId) {
        return;
      }

      void moveCard(movedCard, targetColumnId);
    },
    [moveCard]
  );

  if (isLoading && columns.length === 0) {
    return <div className="flex" />;
  }

  if (errorMessage) {
    return <ErrorFallback message={errorMessage} onRetry={refetch} />;
  }

  return (
    <ColumnListProvider columns={columns} refetch={refetch}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <ul className="flex flex-col divide-y divide-gray-100 lg:min-h-screen lg:flex-row lg:divide-x lg:divide-y-0">
          {columns.map((column) => (
            <ColumnDropZone
              key={column.id}
              column={column}
              className={cn(LIST_CLASS, 'lg:w-88.5')}
            >
              {(isOver) => <CardList column={column} isDragOver={isOver} />}
            </ColumnDropZone>
          ))}
          <li className={cn(LIST_CLASS, 'lg:w-98.5')}>
            <div className="lg:pt-12.5">
              <ColumnAdd />
            </div>
          </li>
        </ul>
      </DndContext>
    </ColumnListProvider>
  );
}

export { ColumnList };

type ColumnDropZoneProps = {
  column: Column;
  className: string;
  children: (isOver: boolean) => ReactNode;
};

function ColumnDropZone({ column, className, children }: ColumnDropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: getColumnDroppableId(column.id),
    data: { columnId: column.id },
  });

  return (
    <li ref={setNodeRef} className={className}>
      {children(isOver)}
    </li>
  );
}
