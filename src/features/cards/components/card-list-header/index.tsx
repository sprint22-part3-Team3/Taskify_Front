import type { CardListHeaderProps } from '@/features/cards/card.types';
import { IcSettings } from '@/shared/assets';

function CardListHeader({ title, cardTotalCount }: CardListHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="bg-primary-500 h-2 w-2 rounded-full" />
          <h2 className="typo-lg-bold md:typo-2lg-bold text-black-200">
            {title}
          </h2>
        </div>
        <span className="typo-xs-medium flex h-5 w-5 items-center justify-center rounded-sm bg-gray-100 text-gray-400">
          {cardTotalCount}
        </span>
      </div>
      <button
        type="button"
        aria-label="컬럼 설정"
        className="flex h-6 w-6 cursor-pointer items-center justify-center"
      >
        <IcSettings className="h-full w-full" />
      </button>
    </div>
  );
}

export { CardListHeader };
