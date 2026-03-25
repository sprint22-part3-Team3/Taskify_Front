import type { StatusOption } from '@/features/cards/components/todo-edit-modal/todoEditModal.constants';

export type StatusDropdownProps = {
  status: StatusOption;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (status: StatusOption) => void;
};
