import type { TaskMetaProps } from '@/features/cards/components/task-modal/task-meta/taskMeta.types';
import { StatusBadge } from '@/shared/components/status-badge';
import { Tag } from '@/shared/components/tag';
import { getTagColor } from '@/shared/utils/getTagColor';

function TaskMeta({ tags }: TaskMetaProps) {
  const columnTitle = 'dummy';

  return (
    <div className="flex items-center gap-2.5 md:gap-5">
      <div className="shrink-0">
        <StatusBadge label={columnTitle} />
      </div>
      <div className="flex shrink-0 items-center self-stretch py-1 md:py-1.5">
        <span className="h-full w-px bg-gray-200" />
      </div>
      <ul className="flex flex-wrap gap-2 md:gap-1.5">
        {tags.map((tag) => (
          <li key={tag}>
            <Tag color={getTagColor(tag)}>{tag}</Tag>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { TaskMeta };
