import { useState } from 'react';
import type { AvatarUser } from '@/shared/types/user.types';

export function useTodoCreateModal() {
  const [selectedAssignee, setSelectedAssignee] = useState<AvatarUser | null>(
    null
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tagInput, setTagInput] = useState('');

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // TODO: 태그 추가 로직
      setTagInput('');
    }
  };

  return {
    selectedAssignee,
    title,
    description,
    dueDate,
    tagInput,
    setSelectedAssignee,
    setTitle,
    setDescription,
    setDueDate,
    setTagInput,
    handleTagKeyDown,
  };
}
