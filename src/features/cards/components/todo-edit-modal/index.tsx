import { useState, useRef, useEffect } from 'react';
import { IcArrowBottom, IcCalendar, IcCheck } from '@/shared/assets/icons';
import ImageUploadBox from '@/shared/components/image-uploader';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import InputField from '@/shared/components/input/input-field';
import { Modal } from '@/shared/components/modal';
import { StatusBadge } from '@/shared/components/status-badge';
import { Tag } from '@/shared/components/tag';
import TextArea from '@/shared/components/text-area';
import UserProfile from '@/shared/components/user-profile';
import {
  STATUS_OPTIONS,
  MOCK_ASSIGNEE,
  INITIAL_FORM_VALUES,
} from '@/features/cards/components/todo-edit-modal/todoEditModal.constants';
import type { StatusOption } from '@/features/cards/components/todo-edit-modal/todoEditModal.constants';

type TodoEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function TodoEditModal({ isOpen, onClose }: TodoEditModalProps) {
  const [status, setStatus] = useState<StatusOption>(
    INITIAL_FORM_VALUES.status
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [title, setTitle] = useState(INITIAL_FORM_VALUES.title);
  const [description, setDescription] = useState(
    INITIAL_FORM_VALUES.description
  );
  const [dueDate, setDueDate] = useState(INITIAL_FORM_VALUES.dueDate);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const calendarIconColor = dueDate.trim() ? 'text-black-200' : 'text-gray-300';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
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
              {/* 상태 커스텀 드롭다운 */}
              <div className="flex w-full flex-col gap-2">
                <span className="typo-md-regular md:typo-lg-regular text-black-200">
                  상태
                </span>
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
                      {STATUS_OPTIONS.map((option) => (
                        <li key={option}>
                          <button
                            type="button"
                            onClick={() => {
                              setStatus(option);
                              setIsDropdownOpen(false);
                            }}
                            className="typo-lg-regular text-black-200 flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-50"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                              {status === option && (
                                <IcCheck className="text-primary-500 h-4 w-4" />
                              )}
                            </span>
                            <StatusBadge label={option} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* 담당자 */}
              <div className="flex w-full flex-col gap-2">
                <span className="typo-md-regular md:typo-lg-regular text-black-200">
                  담당자
                </span>
                <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-4">
                  <UserProfile
                    user={MOCK_ASSIGNEE}
                    size="md"
                    nicknameClassName="typo-md-regular md:typo-lg-regular"
                  />
                </div>
              </div>
            </div>

            <Input
              label="제목"
              required
              labelClassName="typo-md-regular md:typo-lg-regular"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="typo-md-regular md:typo-lg-regular"
            />
            <div className="flex w-full flex-col gap-2">
              <span className="typo-md-regular md:typo-lg-regular text-black-200">
                설명&nbsp;<span className="text-primary-500">*</span>
              </span>
              <TextArea
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
                  className={`${calendarIconColor} absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2`}
                />
                <InputField
                  type="text"
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
              <div className="flex min-h-12.5 items-center gap-2 rounded-lg border border-gray-200 px-4 py-2">
                <Tag color="purple">프로젝트</Tag>
                <Tag color="yellow">일반</Tag>
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
              수정
            </Button>
          </Modal.Footer>
        </form>
      </div>
    </Modal>
  );
}

export default TodoEditModal;
