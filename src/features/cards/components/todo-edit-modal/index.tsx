import { useState } from 'react';
import ImageUploadBox from '@/shared/components/image-uploader';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import { Tag } from '@/shared/components/tag';
import TextArea from '@/shared/components/text-area';
import UserProfile from '@/shared/components/user-profile';
import DateInputField from '@/shared/components/date-input';
import { MOCK_ASSIGNEE, INITIAL_FORM_VALUES } from './todoEditModal.constants';
import type { StatusOption } from './todoEditModal.constants';
import type { TodoEditModalProps } from './todoEditModal.types';
import FieldLabel from '@/features/cards/components/todo-edit-modal/components/FieldLabel';
import FieldWrapper from '@/features/cards/components/todo-edit-modal/components/FieldWrapper';
import StatusDropdown from '@/features/cards/components/todo-edit-modal/components/statusDropdown';

function TodoEditModal({ isOpen, onClose }: TodoEditModalProps) {
  const [status, setStatus] = useState<StatusOption>(
    INITIAL_FORM_VALUES.status
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [title, setTitle] = useState(INITIAL_FORM_VALUES.title);
  const [description, setDescription] = useState(
    INITIAL_FORM_VALUES.description
  );
  const [dueDate, setDueDate] = useState('2025-05-24 09:00');

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
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
          title="할 일 수정"
          className="typo-lg-bold lg:typo-2xl-bold"
        />
        <form onSubmit={handleUpdate} className="flex flex-col">
          <Modal.Main className="my-7 space-y-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <FieldWrapper>
                <FieldLabel>상태</FieldLabel>
                <StatusDropdown
                  status={status}
                  isOpen={isDropdownOpen}
                  onToggle={() => setIsDropdownOpen((prev) => !prev)}
                  onSelect={(s) => {
                    setStatus(s);
                    setIsDropdownOpen(false);
                  }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldLabel>담당자</FieldLabel>
                <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-4">
                  <UserProfile
                    user={MOCK_ASSIGNEE}
                    size="md"
                    nicknameClassName="typo-md-regular md:typo-lg-regular"
                  />
                </div>
              </FieldWrapper>
            </div>

            <Input
              label="제목"
              required
              labelClassName="typo-md-regular md:typo-lg-regular"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="typo-md-regular md:typo-lg-regular"
            />
            <FieldWrapper>
              <FieldLabel required>설명</FieldLabel>
              <TextArea
                value={description}
                onChange={setDescription}
                className="typo-md-regular md:typo-lg-regular"
              />
            </FieldWrapper>
            <FieldWrapper>
              <FieldLabel>마감일</FieldLabel>
              <DateInputField
                name="dueDate"
                value={dueDate}
                onChange={setDueDate}
              />
            </FieldWrapper>
            <FieldWrapper>
              <FieldLabel>태그</FieldLabel>
              <div className="flex min-h-12.5 items-center gap-2 rounded-lg border border-gray-200 px-4 py-2">
                <Tag color="purple">프로젝트</Tag>
                <Tag color="yellow">일반</Tag>
              </div>
            </FieldWrapper>
            <FieldWrapper>
              <FieldLabel>이미지</FieldLabel>
              <ImageUploadBox variant="modal" />
            </FieldWrapper>
          </Modal.Main>
          <Modal.Footer className="shrink-0">
            <Button theme="cancel" type="button" onClick={onClose}>
              취소
            </Button>
            <Button theme="primary" type="submit">
              수정
            </Button>
          </Modal.Footer>
        </form>
      </div>
    </Modal>
  );
}

export default TodoEditModal;
