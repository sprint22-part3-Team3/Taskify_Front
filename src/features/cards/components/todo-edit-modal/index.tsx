import ImageUploadBox from '@/shared/components/image-uploader';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import { Tag } from '@/shared/components/tag';
import TextArea from '@/shared/components/text-area';
import DateInputField from '@/shared/components/date-input';
import AssigneeSelect from '@/features/cards/components/assignee-select';
import { ASSIGNEE_OPTIONS } from '@/features/cards/components/todo-edit-modal/todoEditModal.mock';
import type { TodoEditModalProps } from '@/features/cards/components/todo-edit-modal/todoEditModal.types';
import FieldWrapper from '@/features/cards/components/form-field/field-wrapper';
import FieldLabel from '@/features/cards/components/form-field/field-label';
import StatusDropdown from '@/features/cards/components/todo-edit-modal/components/status-dropdown/statusDropdown';
import { useTodoEditModal } from '@/features/cards/hooks/useTodoEditModal';

/**
 * 할 일 수정 모달을 렌더링합니다.
 *
 * @example
 * ```tsx
 * <TodoEditModal isOpen={isOpen} onClose={handleClose} />
 * ```
 */
function TodoEditModal({ isOpen, onClose }: TodoEditModalProps) {
  const {
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
  } = useTodoEditModal();
  const isSubmitDisabled = !title.trim() || !description.trim();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="md:w-146">
      <div className="flex min-h-0 flex-col">
        <Modal.Header
          title="할 일 수정"
          className="typo-lg-bold lg:typo-2xl-bold"
        />
        <form
          onSubmit={(event) => {
            const submitEvent = event.nativeEvent as SubmitEvent;
            submitEvent.preventDefault();
            onClose();
          }}
          className="flex min-h-0 flex-col"
        >
          <Modal.Main className="space-y-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <FieldWrapper>
                <FieldLabel>상태</FieldLabel>
                <StatusDropdown
                  status={status}
                  isOpen={isDropdownOpen}
                  onToggle={toggleDropdown}
                  onSelect={handleSelectStatus}
                />
              </FieldWrapper>
              <AssigneeSelect
                label="담당자"
                selectedAssignee={selectedAssignee}
                assigneeOptions={ASSIGNEE_OPTIONS}
                onSelect={setSelectedAssignee}
              />
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
            <Button theme="primary" type="submit" disabled={isSubmitDisabled}>
              수정
            </Button>
          </Modal.Footer>
        </form>
      </div>
    </Modal>
  );
}

export default TodoEditModal;
