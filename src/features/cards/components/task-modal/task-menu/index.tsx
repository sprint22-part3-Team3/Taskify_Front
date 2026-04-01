import { cn } from '@/shared/utils/cn';
import type { TaskMenuProps } from '@/features/cards/components/task-modal/task-menu/taskMenu.types';

const DROP_MENU_CLASS = cn(
  'typo-md-regular text-black-200 hover:bg-primary-500/8 hover:text-primary-500 flex h-8 w-full cursor-pointer items-center justify-center rounded-sm'
);

function TaskMenu({ onEdit, onDelete }: TaskMenuProps) {
  return (
    <div className="shadow-dropdown z-dropdown absolute top-10 right-12 w-23.25 overflow-hidden rounded-md border border-gray-200 bg-white px-1.5 py-1.75 md:top-14.5 md:right-20 lg:top-16.25 lg:right-21.25">
      <button type="button" className={DROP_MENU_CLASS} onClick={onEdit}>
        수정하기
      </button>
      <button type="button" className={DROP_MENU_CLASS} onClick={onDelete}>
        삭제하기
      </button>
    </div>
  );
}

export { TaskMenu };
