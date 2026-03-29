import type { CardListProps } from '@/features/cards/components/card-list/cardList.types';
import { Card } from '@/features/cards/components/card-list/card';
import { CardListHeader } from '@/features/cards/components/card-list/card-list-header';
import { CardAdd } from '@/features/cards/components/card-list/card-add';
import { useCardList } from '@/features/cards/hooks/useCardList';
import { ColumnProvider } from '@/features/columns/contexts/columnProvider';
import { CardRefetchProvider } from '@/features/cards/contexts/cardRefetchProvider';

function CardList({ column }: CardListProps) {
  const { id, title } = column;
  const { cards, cardCount, isLoading, errorMessage, refetch } =
    useCardList(id);

  // TODO : 로딩 화면 처리
  if (isLoading && cards.length === 0)
    return (
      <div className="flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  // TODO : 에러 화면 처리
  if (errorMessage)
    return (
      <div className="flex items-center justify-center">
        <p>⚠️ {errorMessage}</p>
      </div>
    );

  return (
    <ColumnProvider column={column}>
      <CardRefetchProvider refetch={refetch}>
        <CardListHeader title={title} cardCount={cardCount} />
        <CardAdd />
        <ul className="flex flex-col gap-2.5 md:gap-4">
          {cards.map((cardItem) => (
            <li key={cardItem.id}>
              <Card card={cardItem} />
            </li>
          ))}
        </ul>
      </CardRefetchProvider>
    </ColumnProvider>
  );
}

export { CardList };
