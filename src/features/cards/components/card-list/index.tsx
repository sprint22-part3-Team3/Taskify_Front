import type { CardListProps } from '@/features/cards/components/card-list/cardList.types';
import { Card } from '@/features/cards/components/card-list/card';
import { CardListHeader } from '@/features/cards/components/card-list/card-list-header';
import { CardAdd } from '@/features/cards/components/card-list/card-add';
import { DUMMY_CARDS } from '@/features/cards/dummyCards';

function CardList({ column }: CardListProps) {
  const { id, title } = column;
  // TODO : API 데이터 연동 후, dummyCards.ts 삭제
  const data = DUMMY_CARDS.cards;

  const cards = data.filter((card) => card.columnId === id);
  const cardCount = cards.length;

  return (
    <>
      <CardListHeader title={title} id={id} cardCount={cardCount} />
      <CardAdd />
      <ul className="flex flex-col gap-2.5 md:gap-4">
        {cards.map((cardItem) => (
          <li key={cardItem.id}>
            <Card card={cardItem} />
          </li>
        ))}
      </ul>
    </>
  );
}

export { CardList };
