import type { CardListHeaderProps } from '@/features/cards/components/card-list-header/cardListHeader.types';
import { IcSettings } from '@/shared/assets';
import Title from '@/shared/components/title';

function CardListHeader({ title, cardCount }: CardListHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="bg-primary-500 h-2 w-2 rounded-full" />
          <Title
            as="h3"
            size="lg"
            weight="bold"
            color="text-black-200"
            className="md:typo-2lg-bold"
          >
            {title}
          </Title>
        </div>
        <span className="typo-xs-medium flex h-5 w-5 items-center justify-center rounded-sm bg-gray-100 text-gray-400">
          {cardCount}
        </span>
      </div>
      <button
        type="button"
        aria-label="컬럼 설정"
        className="flex h-6 w-6 cursor-pointer items-center justify-center"
      >
        <IcSettings className="hover:text-black-100 h-full w-full text-gray-400" />
      </button>
    </div>
  );
}

export { CardListHeader };
