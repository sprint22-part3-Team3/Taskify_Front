import type {
  CreateCardRequest,
  GetCardsParams,
  GetCardsResponse,
  UpdateCardRequest,
} from '@/features/cards/apis/cards.types';
import type { Card } from '@/features/cards/types/card.types';
import { del, get, post, postFormData, put } from '@/shared/apis/fetchInstance';

/**
 * GET 카드 목록 조회
 */
export const getCards = async ({
  columnId,
  size = 10,
  cursorId,
}: GetCardsParams) => {
  const params = new URLSearchParams({
    size: size.toString(),
    columnId: columnId.toString(),
  });
  if (cursorId !== null && cursorId !== undefined) {
    params.append('cursorId', cursorId.toString());
  }
  const res = await get<GetCardsResponse>(`cards?${params.toString()}`);

  return res;
};

/**
 * POST 카드 생성
 */
export const createCard = async (body: CreateCardRequest) => {
  return post<Card>('cards', body);
};

/**
 * PUT 카드 수정
 */
export const updateCard = async (cardId: number, body: UpdateCardRequest) => {
  return put<Card>(`cards/${cardId}`, body);
};

/**
 * DELETE 카드 삭제
 */
export const delCard = async (id: number) => {
  await del(`cards/${id}`);
};

/**
 * POST 카드 이미지 업로드
 */
export const uploadCardImage = async (
  params: {
    teamId: string;
    columnId: number;
  },
  file: File
) => {
  const formData = new FormData();
  formData.append('image', file);

  return postFormData<{ imageUrl: string }>(
    `/columns/${params.columnId}/card-image`,
    formData
  );
};
