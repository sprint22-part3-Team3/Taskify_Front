import { useState } from 'react';
import { IcCalendar } from '@/shared/assets/icons';
import ImageUploadBox from '@/shared/components/image-uploader';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import InputField from '@/shared/components/input/input-field';
import { Modal } from '@/shared/components/modal';
import { Tag } from '@/shared/components/tag';
import TextArea from '@/shared/components/text-area';
import type { TodoCreateModalProps } from '@/features/cards/components/todo-create-modal/todoCreateModal.types';

function TodoCreateModal({ isOpen, onClose }: TodoCreateModalProps) {
  const [assigneeName, setAssigneeName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const dueDateCalendarColor = dueDate.trim()
    ? 'text-black-200'
    : 'text-gray-300';

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = tagInput.trim();
      if (trimmed) {
        setTags((prev) => [...prev, trimmed]);
        setTagInput('');
      }
    }
  };

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="h-auto max-h-[90vh] overflow-y-auto md:h-241.5 md:w-146"
    >
      <div className="flex flex-col">
        <Modal.Header
          title="할 일 생성"
          className="typo-lg-bold md:typo-2xl-bold"
        />
        <form onSubmit={handleCreate} className="flex flex-col">
          <Modal.Main className="my-7 space-y-6">
            <Input
              label="담당자"
              labelClassName="typo-md-regular md:typo-lg-regular"
              placeholder="이름을 입력해 주세요"
              value={assigneeName}
              onChange={(event) => setAssigneeName(event.target.value)}
            />
            <Input
              label="제목"
              required
              labelClassName="typo-md-regular md:typo-lg-regular"
              placeholder="제목을 입력해 주세요"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="typo-md-regular md:typo-lg-regular"
            />
            <div className="flex w-full flex-col gap-2">
              <span className="typo-md-regular md:typo-lg-regular text-black-200">
                설명&nbsp;<span className="text-primary-500">*</span>
              </span>
              <TextArea
                placeholder="설명을 입력해 주세요"
                value={description}
                onChange={setDescription}
                className="typo-md-regular md:typo-lg-regular"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="typo-md-regular md:typo-lg-regular text-black-200">
                마감일
              </span>
              <div className="relative">
                <IcCalendar
                  className={`${dueDateCalendarColor} absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2`}
                />
                <InputField
                  type="text"
                  placeholder="날짜를 입력해 주세요"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  className="typo-md-regular md:typo-lg-regular pl-12"
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="typo-md-regular md:typo-lg-regular text-black-200">
                태그
              </span>
              <div className="flex min-h-12.5 flex-wrap items-center gap-2 rounded-lg border border-gray-200 px-4 py-2">
                {tags.map((todoTag) => (
                  <Tag key={todoTag} color="purple">
                    {todoTag}
                  </Tag>
                ))}
                <input
                  type="text"
                  placeholder="입력 후 Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="typo-md-regular md:typo-lg-regular min-w-0 flex-1 outline-none placeholder:text-gray-300"
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="typo-md-regular md:typo-lg-regular text-black-200">
                이미지
              </span>
              <ImageUploadBox variant="modal" />
            </div>
          </Modal.Main>
          <Modal.Footer className="shrink-0">
            <Button theme="cancel" type="button" onClick={onClose}>
              취소
            </Button>
            <Button theme="primary" type="submit">
              생성
            </Button>
          </Modal.Footer>
        </form>
      </div>
    </Modal>
  );
}

export default TodoCreateModal;
