import type { CardProps } from '@/features/cards/components/card-list/card/card.types';
import { TaskModal } from '@/features/cards/components/task-modal';
import { IcCalendar } from '@/shared/assets/icons';
import Avatar from '@/shared/components/avatar';
import { Tag } from '@/shared/components/tag';
import Title from '@/shared/components/title';
import { useModal } from '@/shared/hooks/useModal';
import { getTagColor } from '@/shared/utils/getTagColor';

function Card({ card }: CardProps) {
  const { isOpen, openModal, closeModal } = useModal();

  if (!card) {
    return null;
  }
  const { imageUrl, title, tags, dueDate, assignee } = card;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  };

  return (
    <>
      <article
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={openModal}
        className="cursor-pointer rounded-md border border-gray-200 bg-white px-3 py-3 md:px-5 md:py-5 lg:py-4"
      >
        <div className="md:flex md:items-center md:gap-5 lg:block">
          {imageUrl && (
            <figure className="mb-1.25 shrink-0 overflow-hidden rounded-md md:mb-0 md:w-22.75 lg:mb-3.75 lg:w-full">
              <img src={imageUrl} alt={title} className="w-full" />
            </figure>
          )}
          <section className="flex w-full flex-col gap-1.5 md:gap-2.5">
            <Title
              as="h4"
              size="md"
              weight="medium"
              color="text-black-200"
              className="md:typo-lg-medium"
            >
              {title}
            </Title>
            <div className="flex flex-col gap-1.5 md:flex-row md:gap-4 lg:flex-col lg:gap-2">
              <ul className="flex shrink-0 flex-wrap gap-1.5 md:w-[50%] lg:w-auto">
                {tags.map((tag) => (
                  <li key={tag}>
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
      <TaskModal isOpen={isOpen} closeModal={closeModal} card={card} />
    </>
  );
}

export { Card };
