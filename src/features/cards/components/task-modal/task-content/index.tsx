import type { TaskContentProps } from '@/features/cards/components/task-modal/task-content/taskContent.types';

function TaskContent({ description, title, imageUrl }: TaskContentProps) {
  return (
    <div className="pb-2 lg:pb-0">
      <p className="typo-md-regular text-black">{description}</p>
      {imageUrl && (
        <article className="mt-8 overflow-hidden rounded-md md:mt-4">
          <img src={imageUrl} alt={title} className="w-full max-w-110" />
        </article>
      )}
    </div>
  );
}

export { TaskContent };
