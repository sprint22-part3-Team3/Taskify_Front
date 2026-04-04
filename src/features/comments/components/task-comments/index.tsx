import type { TaskCommentsProps } from '@/features/comments/components/task-comments/taskComments.types';
import Title from '@/shared/components/title';
import { TaskCommentItem } from '@/features/comments/components/task-comments/task-comment-item';
import { useCommentList } from '@/features/comments/hooks/useCommentList';
import { TaskCommentInput } from '@/features/comments/components/task-comments/task-comment-input';
import { delComment, postComment } from '@/features/comments/apis/comments';
import { useState } from 'react';
import { useDashboardId } from '@/shared/hooks/useDashboardId';
import { COMMENT_MESSAGES } from '@/features/comments/constants/commentMessage.constants';
import DeleteModal from '@/shared/components/modal/delete-modal';
import { useModal } from '@/shared/hooks/useModal';
import { MODAL_CLOSE_DELAY } from '@/shared/constants/modal.constants';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { LoadingFallback } from '@/shared/components/loading/loading-fallback';
import { ErrorFallback } from '@/shared/components/error/error-fallback';
import { InfiniteScrollIndicator } from '@/shared/components/infinite-scroll-indicator';
import { useToast } from '@/shared/hooks/useToast';

/**
 * 할 일 카드의 댓글 목록을 렌더링하고 새 댓글을 작성하는 영역입니다.
 * 내부적으로 댓글 목록 조회, 생성 API 로직 및 삭제 모달 상태를 제어합니다.
 */
function TaskComments({ id: cardId, columnId }: TaskCommentsProps) {
  const dashboardId = useDashboardId();
  const {
    comments,
    cursorId,
    isLoading,
    isAddLoading,
    errorMessage,
    addErrorMessage,
    refetch,
    loadMore,
  } = useCommentList(cardId);
  const { loadMoreRef } = useInfiniteScroll({
    onLoadMore: loadMore,
    hasCursorId: cursorId !== null,
    isFetching: isAddLoading,
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    isOpen: isDeleteModalOpen,
    openModal: handleOpenDeleteModal,
    closeModal: handleCloseDeleteModal,
  } = useModal();
  const [hasDeleteError, setHasDeleteError] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { showToast } = useToast();

  if (isLoading && comments.length === 0)
    return <LoadingFallback variant="full" />;

  if (errorMessage)
    return (
      <ErrorFallback message={errorMessage} onRetry={refetch} variant="part" />
    );

  const handleSubmitComment = async (content: string) => {
    try {
      setSubmitError(null);
      await postComment({ content, cardId, columnId, dashboardId });
      refetch();
      return true;
    } catch {
      setSubmitError(COMMENT_MESSAGES.ERROR.CREATE.message);
      return false;
    }
  };

  const handleDelete = (commentId: number) => {
    setDeleteTargetId(commentId);
    setHasDeleteError(false);
    handleOpenDeleteModal();
  };

  const handleDeleteCancel = () => {
    handleCloseDeleteModal();
    setDeleteTargetId(null);
    setTimeout(() => {
      setHasDeleteError(false);
    }, MODAL_CLOSE_DELAY);
  };

  const handleDeleteComment = async () => {
    if (deleteTargetId === null) return;
    try {
      setIsDeleting(true);
      await delComment({ id: deleteTargetId });
      refetch();
      handleDeleteCancel();
      showToast(COMMENT_MESSAGES.SUCCESS.DELETE);
    } catch {
      setHasDeleteError(true);
      showToast({ ...COMMENT_MESSAGES.ERROR.DELETE, theme: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section>
      <Title
        as="h3"
        size="md"
        weight="medium"
        className="md:typo-lg-medium mb-1"
      >
        댓글
      </Title>
      <TaskCommentInput onSubmit={handleSubmitComment} error={submitError} />
      {comments.length > 0 && (
        <ul className="mt-4 flex flex-col gap-4 md:mt-6">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-2 md:gap-2.5">
              <TaskCommentItem
                comment={comment}
                refetch={refetch}
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      )}
      <InfiniteScrollIndicator
        isAddLoading={isAddLoading}
        addErrorMessage={addErrorMessage}
        hasMore={cursorId !== null}
        loadMoreRef={loadMoreRef}
        onRetry={loadMore}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteComment}
        className="w-73.75 md:w-130"
        confirmButtonProps={{
          isLoading: isDeleting,
          disabled: isDeleting,
        }}
        message={
          <>
            댓글을 <span className="text-error">삭제</span>하시겠습니까?
            {hasDeleteError && (
              <span className="typo-sm-medium text-error mt-1 block">
                <span className="inline-block">댓글 삭제에 실패했습니다.</span>
                <span className="inline-block">
                  잠시 후 다시 시도해 주세요.
                </span>
              </span>
            )}
          </>
        }
      />
    </section>
  );
}

export { TaskComments };
