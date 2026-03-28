import type { SubmitEvent } from 'react';
import ImageUploadBox from '@/shared/components/image-uploader';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import Label from '@/shared/components/input/label';
import { Modal } from '@/shared/components/modal';
import DateInputField from '@/shared/components/date-input';
import TextArea from '@/shared/components/text-area';
import type { TodoCreateModalProps } from '@/features/cards/components/todo-create-modal/todoCreateModal.types';
import AssigneeSelect from '@/features/cards/components/assignee-select';
import FieldWrapper from '@/features/cards/components/form-field/field-wrapper';
import TagInput from '@/features/cards/components/tag-input';
import { ASSIGNEE_OPTIONS } from '@/features/cards/components/todo-edit-modal/todoEditModal.mock';
import { useTodoCreateModal } from '@/features/cards/hooks/useTodoCreateModal';

/**
 * 할 일 생성 모달을 렌더링합니다.
 *
 * @example
 * ```tsx
 * <TodoCreateModal isOpen={isOpen} onClose={handleClose} />
 * ```
 */
function TodoCreateModal({ isOpen, onClose }: TodoCreateModalProps) {
  const {
    maxTagCount,
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
  } = useTodoCreateModal();
  const isSubmitDisabled = !title.trim() || !description.trim();

  const handleCreate = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="md:w-146">
      <div className="flex min-h-0 flex-col">
        <Modal.Header title="할 일 생성" />

        <form onSubmit={handleCreate} className="flex min-h-0 flex-col">
          <Modal.Main className="space-y-6">
            <AssigneeSelect
              label="담당자"
              selectedAssignee={selectedAssignee}
              assigneeOptions={ASSIGNEE_OPTIONS}
              onSelect={setSelectedAssignee}
            />

            <Input
              label="제목"
              required
              labelClassName="typo-md-regular md:typo-2lg-regular"
              placeholder="제목을 입력해 주세요"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="typo-md-regular md:typo-lg-regular"
            />

            <FieldWrapper>
              <Label required className="typo-md-regular md:typo-2lg-regular">
                설명
              </Label>
              <TextArea
                placeholder="설명을 입력해 주세요"
                value={description}
                onChange={setDescription}
                className="typo-md-regular md:typo-lg-regular"
              />
            </FieldWrapper>

            <FieldWrapper>
              <Label className="typo-md-regular md:typo-2lg-regular">
                마감일
              </Label>
              <DateInputField
                name="dueDate"
                value={dueDate}
                onChange={setDueDate}
                className="typo-md-regular md:typo-lg-regular"
              />
            </FieldWrapper>

            <FieldWrapper>
              <Label className="typo-md-regular md:typo-2lg-regular">
                태그
              </Label>
              <TagInput tags={tags} setTags={setTags} maxTags={maxTagCount} />
            </FieldWrapper>

            <FieldWrapper>
              <Label className="typo-md-regular md:typo-2lg-regular">
                이미지
              </Label>
              <ImageUploadBox variant="modal" />
            </FieldWrapper>
          </Modal.Main>

          <Modal.Footer className="shrink-0">
            <Button theme="cancel" type="button" onClick={onClose}>
              취소
            </Button>
            <Button theme="primary" type="submit" disabled={isSubmitDisabled}>
              생성
            </Button>
          </Modal.Footer>
        </form>
      </div>
    </Modal>
  );
}

export default TodoCreateModal;
