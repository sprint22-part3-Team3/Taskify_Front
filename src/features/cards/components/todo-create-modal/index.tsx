import { useState } from 'react';
import ImageUploadBox from '@/shared/components/image-uploader';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import DateInputField from '@/shared/components/date-input';
import TextArea from '@/shared/components/text-area';
import type { TodoCreateModalProps } from '@/features/cards/components/todo-create-modal/todoCreateModal.types';

function TodoCreateModal({ isOpen, onClose }: TodoCreateModalProps) {
  const [assigneeName, setAssigneeName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

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
              <DateInputField
                name="dueDate"
                value={dueDate}
                onChange={setDueDate}
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="typo-md-regular md:typo-lg-regular text-black-200">
                태그
              </span>
              <div className="flex min-h-12.5 flex-wrap items-center gap-2 rounded-lg border border-gray-200 px-4 py-2">
                <input
                  type="text"
                  placeholder="입력 후 Enter"
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
