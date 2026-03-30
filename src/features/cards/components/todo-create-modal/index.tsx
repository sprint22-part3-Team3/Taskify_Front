import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { useParams } from 'react-router-dom';
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
import { useColumnContext } from '@/features/columns/hooks/useColumnContext';
import { createCard } from '@/features/cards/apis/cards';
import type { CreateCardRequest } from '@/features/cards/apis/cards.types';
import { useTodoCreateModal } from '@/features/cards/hooks/useTodoCreateModal';
import { useAssigneeOptions } from '@/features/cards/hooks/useAssigneeOptions';
import { runAfterModalClose } from '@/shared/utils/modal';

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
    resetForm,
  } = useTodoCreateModal();
  const column = useColumnContext();
  const { id: rawDashboardId } = useParams<{ id: string }>();
  const dashboardId = rawDashboardId ? Number(rawDashboardId) : undefined;
  const { assigneeOptions } = useAssigneeOptions(isOpen);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const isSubmitDisabled = !title.trim() || !description.trim();

  const handleClose = () => {
    setSubmissionError(null);
    onClose();
    runAfterModalClose(resetForm);
  };

  const handleCreate = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled || isSubmitting || !dashboardId) {
      if (!dashboardId) {
        setSubmissionError('대시보드를 찾을 수 없습니다.');
      }
      return;
    }

    const payload: CreateCardRequest = {
      dashboardId,
      columnId: column.id,
      title: title.trim(),
      description: description.trim(),
      assigneeUserId: selectedAssignee?.id,
      dueDate: dueDate || undefined,
      tags: tags.length > 0 ? tags : undefined,
      imageUrl: undefined,
    };

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      await createCard(payload);
      handleClose();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : '할 일 생성에 실패했습니다. 다시 시도해 주세요.';
      setSubmissionError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="md:w-146">
      <div className="flex min-h-0 flex-col">
        <Modal.Header title="할 일 생성" />

        <form onSubmit={handleCreate} className="flex min-h-0 flex-col">
          <Modal.Main className="space-y-6">
            <AssigneeSelect
              label="담당자"
              selectedAssignee={selectedAssignee}
              assigneeOptions={assigneeOptions}
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
            {submissionError && (
              <p className="typo-sm-regular text-error mr-4">
                {submissionError}
              </p>
            )}
            <Button theme="cancel" type="button" onClick={handleClose}>
              취소
            </Button>
            <Button
              theme="primary"
              type="submit"
              disabled={isSubmitDisabled || isSubmitting}
              isLoading={isSubmitting}
            >
              생성
            </Button>
          </Modal.Footer>
        </form>
      </div>
    </Modal>
  );
}

export default TodoCreateModal;
