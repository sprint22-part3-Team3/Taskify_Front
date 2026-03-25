import { useState } from 'react';

export function useTodoCreateModal() {
  const [assigneeName, setAssigneeName] = useState('');
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
    assigneeName,
    title,
    description,
    dueDate,
    tagInput,
    setAssigneeName,
    setTitle,
    setDescription,
    setDueDate,
    setTagInput,
    handleTagKeyDown,
  };
}
