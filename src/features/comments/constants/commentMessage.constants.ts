/**
 * 댓글 기능에서 사용하는 에러 및 알림 메시지 상수입니다.
 */
export const COMMENT_MESSAGES = {
  SUCCESS: {
    CREATE: {
      title: '댓글 등록 완료',
      message: '새로운 댓글이 추가되었습니다.',
    },
    UPDATE: {
      title: '댓글 수정 완료',
      message: '댓글 내용이 성공적으로 수정되었습니다.',
    },
    DELETE: {
      title: '댓글 삭제 완료',
      message: '선택하신 댓글이 삭제되었습니다.',
    },
  },
  ERROR: {
    CREATE: {
      title: '댓글 등록 실패',
      message: '오류가 발생하여 댓글을 등록하지 못했습니다.',
    },
    UPDATE: {
      title: '댓글 수정 실패',
      message: '수정 중 문제가 발생했습니다. 다시 시도해 주세요.',
    },
    DELETE: {
      title: '댓글 삭제 실패',
      message: '댓글 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    },
    FETCH_MORE: {
      title: '데이터 로드 실패',
      message: '추가 데이터를 불러오지 못했습니다.',
    },
    NOT_FOUND_OR_FORBIDDEN: {
      title: '접근 권한 오류',
      message: '댓글을 찾을 수 없거나 접근 권한이 없습니다.',
    },
  },
} as const;
