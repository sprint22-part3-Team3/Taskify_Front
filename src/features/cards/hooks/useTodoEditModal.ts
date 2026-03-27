import { useState } from 'react';
import {
  INITIAL_FORM_VALUES,
  MOCK_ASSIGNEE,
} from '@/features/cards/components/todo-edit-modal/todoEditModal.mock';
import type { StatusOption } from '@/features/cards/components/todo-edit-modal/todoEditModal.mock';
import type { Card } from '@/features/cards/types/card.types';
import type { AvatarUser } from '@/shared/types/user.types';

export function useTodoEditModal(card: Card) {
  const [status, setStatus] = useState<StatusOption>(
    INITIAL_FORM_VALUES.status
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [title, setTitle] = useState(card.title || INITIAL_FORM_VALUES.title);
  const [description, setDescription] = useState(
    card.description || INITIAL_FORM_VALUES.description
  );
  const [dueDate, setDueDate] = useState(
    card.dueDate ?? INITIAL_FORM_VALUES.dueDate
  );
  const [selectedAssignee, setSelectedAssignee] = useState<AvatarUser | null>(
    card.assignee ?? MOCK_ASSIGNEE
  );

  const handleSelectStatus = (statusOption: StatusOption) => {
    setStatus(statusOption);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const resetForm = (nextCard: Card) => {
    setStatus(INITIAL_FORM_VALUES.status);
    setIsDropdownOpen(false);
    setTitle(nextCard.title || INITIAL_FORM_VALUES.title);
    setDescription(nextCard.description || INITIAL_FORM_VALUES.description);
    setDueDate(nextCard.dueDate ?? INITIAL_FORM_VALUES.dueDate);
    setSelectedAssignee(nextCard.assignee ?? MOCK_ASSIGNEE);
  };

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
    resetForm,
  };
}
