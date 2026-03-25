import ImageUploadBox from '@/shared/components/image-uploader';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import DateInputField from '@/shared/components/date-input';
import TextArea from '@/shared/components/text-area';
import type { TodoCreateModalProps } from '@/features/cards/components/todo-create-modal/todoCreateModal.types';
import FieldWrapper from '@/features/cards/components/form-field/field-wrapper';
import FieldLabel from '@/features/cards/components/form-field/field-label';
import { useTodoCreateModal } from '@/shared/hooks/useTodoCreateModal';

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
  } = useTodoCreateModal();

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="md:w-146">
      <div className="flex min-h-0 flex-col">
        <Modal.Header
          title="할 일 생성"
          className="typo-lg-bold md:typo-2xl-bold"
        />

        <form onSubmit={handleCreate} className="flex min-h-0 flex-col">
          <Modal.Main className="space-y-6">
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

            <FieldWrapper>
              <FieldLabel required>설명</FieldLabel>
              <TextArea
                placeholder="설명을 입력해 주세요"
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
              <div className="flex min-h-12.5 flex-wrap items-center gap-2 rounded-lg border border-gray-200 px-4 py-2">
                <input
                  type="text"
                  placeholder="입력 후 Enter"
                  value={tagInput}
                  onChange={(event) => setTagInput(event.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="typo-md-regular md:typo-lg-regular min-w-0 flex-1 outline-none placeholder:text-gray-300"
                />
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
              생성
            </Button>
          </Modal.Footer>
        </form>
      </div>
    </Modal>
  );
}

export default TodoCreateModal;
