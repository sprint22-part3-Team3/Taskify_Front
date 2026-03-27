import type { TaskMetaProps } from '@/features/columns/components/task-meta/taskMeta.types';
import { StatusBadge } from '@/shared/components/status-badge';
import { Tag } from '@/shared/components/tag';
import { getTagColor } from '@/shared/utils/getTagColor';
import { DUMMY_COLUMNS } from '@/features/columns/dummyColumns';

// TODO : API 연동 [ 컬럼 ]
function TaskMeta({ columnId, tags }: TaskMetaProps) {
  const column = DUMMY_COLUMNS.data.find((column) => column.id === columnId);

  return (
    <div className="flex items-center gap-2.5 md:gap-5">
      <div className="shrink-0">
        <StatusBadge label={column?.title ?? ''} />
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
