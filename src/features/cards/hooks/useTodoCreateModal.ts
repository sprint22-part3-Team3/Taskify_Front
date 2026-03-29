import { useState } from 'react';
import type { AvatarUser } from '@/shared/types/user.types';

const MAX_TAG_COUNT = 5;

export function useTodoCreateModal() {
  const [selectedAssignee, setSelectedAssignee] = useState<AvatarUser | null>(
    null
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const resetForm = () => {
    setSelectedAssignee(null);
    setTitle('');
    setDescription('');
    setDueDate('');
    setTags([]);
  };

  return {
    maxTagCount: MAX_TAG_COUNT,
    selectedAssignee,
    title,
    description,
    dueDate,
    tags,
    setSelectedAssignee,
    setTitle,
    setDescription,
    setDueDate,
    setTags,
    resetForm,
  };
}
