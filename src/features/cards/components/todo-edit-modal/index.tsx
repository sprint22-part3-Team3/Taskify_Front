import { useState, useRef, useEffect } from 'react';
import { IcArrowBottom, IcCheck } from '@/shared/assets/icons';
import ImageUploadBox from '@/shared/components/image-uploader';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import { StatusBadge } from '@/shared/components/status-badge';
import { Tag } from '@/shared/components/tag';
import TextArea from '@/shared/components/text-area';
import UserProfile from '@/shared/components/user-profile';
import DateInputField from '@/shared/components/date-input';
import {
  STATUS_OPTIONS,
  MOCK_ASSIGNEE,
  INITIAL_FORM_VALUES,
} from '@/features/cards/components/todo-edit-modal/todoEditModal.constants';
import type { StatusOption } from '@/features/cards/components/todo-edit-modal/todoEditModal.constants';
import type { TodoEditModalProps } from '@/features/cards/components/todo-edit-modal/todoEditModal.types';

function FieldLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <span className="typo-md-regular md:typo-lg-regular text-black-200">
      {children}
      {required && (
        <>
          &nbsp;<span className="text-primary-500">*</span>
        </>
      )}
    </span>
  );
}

function FieldWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full flex-col gap-2">{children}</div>;
}

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
  };

  const handleStatusSelect = (selectedStatus: StatusOption) => {
    setStatus(selectedStatus);
    setIsDropdownOpen(false);
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
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="typo-lg-regular focus:border-primary-500 text-black-200 flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 outline-0"
                  >
                    <StatusBadge label={status} />
                    <IcArrowBottom
                      className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                      {STATUS_OPTIONS.map((statusOption) => (
                        <li key={statusOption}>
                          <button
                            type="button"
                            onClick={() => handleStatusSelect(statusOption)}
                            className="typo-lg-regular text-black-200 flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-50"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                              {status === statusOption && (
                                <IcCheck className="text-primary-500 h-4 w-4" />
                              )}
                            </span>
                            <StatusBadge label={statusOption} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
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
              onChange={(event) => setTitle(event.target.value)}
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
