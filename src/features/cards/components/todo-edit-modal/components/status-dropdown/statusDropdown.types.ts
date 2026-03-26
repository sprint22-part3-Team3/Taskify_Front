import type { StatusOption } from '@/features/cards/components/todo-edit-modal/todoEditModal.mock';

export type StatusDropdownProps = {
  status: StatusOption;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (status: StatusOption) => void;
};
