/**
 * 댓글 기능에서 사용하는 에러 및 알림 메시지 상수입니다.
 */
export const COMMENT_MESSAGES = {
  ERROR: {
    SUBMIT: '댓글 작성에 실패했습니다. 다시 시도해주세요.',
    UPDATE: '댓글 수정에 실패했습니다. 다시 시도해주세요.',
    DELETE: '댓글 삭제에 실패했습니다. 다시 시도해주세요.',
    FETCH_MORE: '추가 데이터를 불러오지 못했습니다.',
    NOT_FOUND_OR_FORBIDDEN: '코멘트를 찾을 수 없거나 접근 권한이 없습니다.',
  },
} as const;
