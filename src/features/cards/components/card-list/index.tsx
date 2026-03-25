import type { CardListProps } from '@/features/cards/card.types';
import { Card } from '@/features/cards/components/card';
import { CardListHeader } from '@/features/cards/components/card-list-header';
import { CardAdd } from '@/features/cards/components/card-add';
import { DUMMY_CARDS } from '@/features/cards/dummyCards';

function CardList({ column }: CardListProps) {
  const { id, title } = column;
  // TODO : API 데이터 연동 후, dummyCards.ts 삭제
  const data = DUMMY_CARDS.cards;

  const filteredCards = data.filter((card) => card.columnId === id);
  const cardTotalCount = filteredCards.length;

  return (
    <>
      <CardListHeader title={title} cardTotalCount={cardTotalCount} />
      <CardAdd />
      <ul className="flex flex-col gap-2.5 md:gap-4">
        {filteredCards.map((cardItem) => (
          <li key={cardItem.id}>
            <Card card={cardItem} />
          </li>
        ))}
      </ul>
    </>
  );
}

export { CardList };
