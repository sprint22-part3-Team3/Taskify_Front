import type { CardProps } from '@/features/cards/card.types';
import { IcCalendar } from '@/shared/assets/icons';
import Avatar from '@/shared/components/avatar';
import { Tag } from '@/shared/components/tag';
import { getTagColor } from '@/shared/utils/getTagColor';

function Card({ card }: CardProps) {
  if (!card) {
    return null;
  }
  const { imageUrl, title, tags, dueDate, assignee } = card;

  return (
    <article className="cursor-pointer rounded-md border border-gray-200 bg-white px-3 py-3 md:px-5 md:py-5 lg:py-4">
      <div className="md:flex md:items-center md:gap-5 lg:block">
        {imageUrl && (
          <figure className="mb-1.25 shrink-0 overflow-hidden rounded-md md:mb-0 md:w-22.75 lg:mb-3.75 lg:w-full">
            <img src={imageUrl} alt={title} className="w-full" />
          </figure>
        )}
        <section className="flex w-full flex-col gap-1.5 md:gap-2.5">
          <h3 className="typo-md-medium md:typo-lg-medium text-black-200">
            {title}
          </h3>
          <div className="flex flex-col gap-1.5 md:flex-row md:gap-4 lg:flex-col lg:gap-2">
            <ul className="flex shrink-0 gap-1.5">
              {tags.map((tag, index) => (
                <li key={tag + index}>
                  <Tag color={getTagColor(tag)}>{tag}</Tag>
                </li>
              ))}
            </ul>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-1 md:gap-2.25">
                <IcCalendar className="w-2.5 text-gray-400 md:w-3.25" />
                <p className="typo-xs-medium text-gray-400">{dueDate}</p>
              </div>
              <Avatar user={assignee} size="sm">
                {assignee?.profileImageUrl ? (
                  <Avatar.Img />
                ) : (
                  <Avatar.Fallback />
                )}
              </Avatar>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

export { Card };
