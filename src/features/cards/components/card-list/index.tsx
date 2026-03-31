import type { CardListProps } from '@/features/cards/components/card-list/cardList.types';
import { Card } from '@/features/cards/components/card-list/card';
import { CardListHeader } from '@/features/cards/components/card-list/card-list-header';
import { CardAdd } from '@/features/cards/components/card-list/card-add';
import { useCardList } from '@/features/cards/hooks/useCardList';
import { ColumnProvider } from '@/features/columns/contexts/columnProvider';
import { CardRefetchProvider } from '@/features/cards/contexts/cardRefetchProvider';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { LoadingFallback } from '@/shared/components/loading/loading-fallback';
import { ErrorFallback } from '@/shared/components/error/error-fallback';

function CardList({ column }: CardListProps) {
  const { id, title } = column;
  const {
    cards,
    cardCount,
    cursorId,
    isLoading,
    isAddLoading,
    errorMessage,
    addErrorMessage,
    refetch,
    loadMore,
  } = useCardList(id);

  const { loadMoreRef } = useInfiniteScroll({
    onLoadMore: loadMore,
    hasCursorId: cursorId !== null,
    isFetching: isAddLoading,
  });

  if (isLoading && cards.length === 0) {
    return <LoadingFallback variant="full" />;
  }

  if (errorMessage)
    return (
      <ErrorFallback message={errorMessage} onRetry={refetch} variant="part" />
    );

  return (
    <ColumnProvider column={column}>
      <CardRefetchProvider refetch={refetch}>
        <CardListHeader title={title} id={id} cardCount={cardCount} />
        <CardAdd />
        <ul className="flex flex-col gap-2.5 md:gap-4">
          {cards.map((cardItem) => (
            <li key={cardItem.id}>
              <Card card={cardItem} />
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-col items-center justify-center gap-2">
          {isAddLoading ? (
            <LoadingFallback variant="part" />
          ) : addErrorMessage ? (
            <p className="typo-sm-medium text-error">{addErrorMessage}</p>
          ) : (
            <div ref={loadMoreRef} className="h-4 w-full" />
          )}
        </div>
      </CardRefetchProvider>
    </ColumnProvider>
  );
}

export { CardList };
