import { useEffect, useState } from 'react';
import type { SubmitEvent } from 'react';
import { useParams } from 'react-router-dom';
import ImageUploadBox from '@/shared/components/image-uploader';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import Label from '@/shared/components/input/label';
import { Modal } from '@/shared/components/modal';
import TagInput from '@/features/cards/components/tag-input';
import TextArea from '@/shared/components/text-area';
import DateInputField from '@/shared/components/date-input';
import AssigneeSelect from '@/features/cards/components/assignee-select';
import type { TodoEditModalProps } from '@/features/cards/components/todo-edit-modal/todoEditModal.types';
import FieldWrapper from '@/features/cards/components/form-field/field-wrapper';
import StatusDropdown from '@/features/cards/components/todo-edit-modal/components/status-dropdown/statusDropdown';
import { useTodoEditModal } from '@/features/cards/hooks/useTodoEditModal';
import { useAssigneeOptions } from '@/features/cards/hooks/useAssigneeOptions';
import { useColumnList } from '@/features/columns/hooks/useColumnList';
import { useTodoEditForm } from '@/features/cards/hooks/useTodoEditForm';
import { createRequiredValidator } from '@/shared/utils/validators/validateRequired';

/**
 * 할 일 수정 모달을 렌더링합니다.
 *
 * @example
 * ```tsx
 * <TodoEditModal isOpen={isOpen} onClose={handleClose} />
 * ```
 */
const titleValidator = createRequiredValidator('제목을 입력해 주세요.');
const descriptionValidator = createRequiredValidator('설명을 입력해 주세요.');

function TodoEditModalContent({
  isOpen,
  onClose,
  card,
  dashboardId,
}: TodoEditModalProps & { dashboardId: number }) {
  const {
    selectedColumnId,
    isDropdownOpen,
    title,
    description,
    dueDate,
    selectedAssignee,
    tags,
    maxTagCount,
    setTitle,
    setDescription,
    setDueDate,
    setSelectedAssignee,
    setTags,
    handleSelectStatus,
    toggleDropdown,
    resetForm,
  } = useTodoEditModal(card);

  const { assigneeOptions } = useAssigneeOptions(isOpen);
  const {
    columns,
    isLoading: isColumnsLoading,
    errorMessage: columnsError,
  } = useColumnList(dashboardId);
  const {
    isSubmitting,
    submissionError,
    handleUpdateCard,
    imageUrl,
    isUploadingImage,
    imageUploadError,
    handleImageSelect,
    resetImageState,
  } = useTodoEditForm({ card });

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const validateTitle = () => {
    const result = titleValidator(title);
    setTitleError(result.message);
    return result.isValid;
  };

  const validateDescription = () => {
    const result = descriptionValidator(description);
    setDescriptionError(result.message);
    return result.isValid;
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    resetForm(card);
    resetImageState();
  }, [card, isOpen, resetForm, resetImageState]);

  const normalizedTitle = title.trim();
  const normalizedDescription = description.trim();
  const initialTitle = card.title?.trim() ?? '';
  const initialDescription = card.description?.trim() ?? '';
  const initialDueDate = card.dueDate ?? '';
  const initialAssigneeId = card.assignee?.id ?? null;
  const initialTags = card.tags ?? [];

  const tagsChanged =
    initialTags.length !== tags.length ||
    initialTags.some((tag, index) => tag !== tags[index]);
  const hasChanges =
    selectedColumnId !== card.columnId ||
    normalizedTitle !== initialTitle ||
    normalizedDescription !== initialDescription ||
    dueDate !== initialDueDate ||
    (selectedAssignee?.id ?? null) !== initialAssigneeId ||
    tagsChanged ||
    imageUrl !== card.imageUrl;

  const isSubmitDisabled =
    !normalizedTitle || !normalizedDescription || !hasChanges;
  const hasFormErrors = Boolean(
    titleError || descriptionError || imageUploadError
  );
  const shouldDisableEditButton =
    isSubmitDisabled || isSubmitting || isUploadingImage || hasFormErrors;

  const handleEdit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (shouldDisableEditButton || !validateTitle() || !validateDescription()) {
      return;
    }

    const payload = {
      columnId: selectedColumnId,
      assigneeUserId: selectedAssignee?.id ?? undefined,
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || undefined,
      tags: tags.length > 0 ? tags : undefined,
      imageUrl: imageUrl === null ? null : imageUrl,
    };

    const isUpdated = await handleUpdateCard(payload, card.columnId);
    if (isUpdated) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="md:w-146">
      <div className="flex min-h-0 flex-col">
        <Modal.Header title="할 일 수정" />
        <form onSubmit={handleEdit} className="flex min-h-0 flex-col">
          <Modal.Main className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FieldWrapper>
                <Label className="typo-md-regular md:typo-2lg-regular">
                  상태
                </Label>
                <StatusDropdown
                  columns={columns}
                  selectedColumnId={selectedColumnId}
                  isOpen={isDropdownOpen}
                  onToggle={toggleDropdown}
                  onSelect={handleSelectStatus}
                  isLoading={isColumnsLoading}
                />
                {columnsError && (
                  <p className="typo-xs-regular text-error mt-1">
                    {columnsError}
                  </p>
                )}
              </FieldWrapper>
              <AssigneeSelect
                label="담당자"
                selectedAssignee={selectedAssignee}
                assigneeOptions={assigneeOptions}
                onSelect={setSelectedAssignee}
              />
            </div>

            <Input
              label="제목"
              required
              labelClassName="typo-md-regular md:typo-2lg-regular"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (titleError) setTitleError('');
              }}
              onBlur={validateTitle}
              errorMessage={titleError}
              className="typo-md-regular md:typo-lg-regular"
            />
            <FieldWrapper>
              <Label required className="typo-md-regular md:typo-2lg-regular">
                설명
              </Label>
              <TextArea
                value={description}
                onChange={(value) => {
                  setDescription(value);
                  if (descriptionError) setDescriptionError('');
                }}
                onBlur={validateDescription}
                error={descriptionError}
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
              <ImageUploadBox
                variant="modal"
                imageUrl={imageUrl ?? undefined}
                onFileSelect={(file) =>
                  handleImageSelect(file, selectedColumnId)
                }
              />
              {imageUploadError && (
                <p className="typo-md-regular text-error mt-1">
                  {imageUploadError}
                </p>
              )}
              {isUploadingImage && (
                <p className="typo-md-regular mt-1 text-gray-500">
                  이미지 업로드 중입니다...
                </p>
              )}
            </FieldWrapper>
          </Modal.Main>
          <Modal.Footer className="shrink-0">
            {submissionError && (
              <p className="typo-md-regular text-error mr-4">
                {submissionError}
              </p>
            )}
            <Button theme="cancel" type="button" onClick={onClose}>
              취소
            </Button>
            <Button
              theme="primary"
              type="submit"
              disabled={shouldDisableEditButton}
              isLoading={isSubmitting}
            >
              수정
            </Button>
          </Modal.Footer>
        </form>
      </div>
    </Modal>
  );
}

function TodoEditModal(props: TodoEditModalProps) {
  const { id: rawDashboardId } = useParams<{ id: string }>();
  const parsedDashboardId = rawDashboardId ? parseInt(rawDashboardId, 10) : NaN;

  if (Number.isNaN(parsedDashboardId)) {
    return null;
  }

  return <TodoEditModalContent {...props} dashboardId={parsedDashboardId} />;
}

export default TodoEditModal;
