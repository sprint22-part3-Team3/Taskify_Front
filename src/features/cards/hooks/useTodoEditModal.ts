import { useState } from 'react';
import {
  INITIAL_FORM_VALUES,
  MOCK_ASSIGNEE,
} from '@/features/cards/components/todo-edit-modal/todoEditModal.mock';
import type { StatusOption } from '@/features/cards/components/todo-edit-modal/todoEditModal.mock';
import type { AvatarUser } from '@/shared/types/user.types';

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
  const [selectedAssignee, setSelectedAssignee] = useState<AvatarUser | null>(
    MOCK_ASSIGNEE
  );

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
    selectedAssignee,
    setTitle,
    setDescription,
    setDueDate,
    setSelectedAssignee,
    handleSelectStatus,
    toggleDropdown,
  };
}
