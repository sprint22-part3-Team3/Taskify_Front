import { useState } from 'react';
import { INITIAL_FORM_VALUES } from '@/features/cards/components/todo-edit-modal/todoEditModal.constants';
import type { StatusOption } from '@/features/cards/components/todo-edit-modal/todoEditModal.constants';

export function useTodoEditModal() {
  const [status, setStatus] = useState<StatusOption>(
    INITIAL_FORM_VALUES.status
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [title, setTitle] = useState(INITIAL_FORM_VALUES.title);
  const [description, setDescription] = useState(
    INITIAL_FORM_VALUES.description
  );
  const [dueDate, setDueDate] = useState('2025-05-24 09:00');

  const handleSelectStatus = (statusOption: StatusOption) => {
    setStatus(statusOption);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return {
    status,
    isDropdownOpen,
    title,
    description,
    dueDate,
    setTitle,
    setDescription,
    setDueDate,
    handleSelectStatus,
    toggleDropdown,
  };
}
