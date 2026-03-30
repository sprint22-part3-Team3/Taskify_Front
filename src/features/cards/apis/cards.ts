import type {
  GetCardsParams,
  GetCardsResponse,
} from '@/features/cards/apis/cards.types';
import { del, get } from '@/shared/apis/fetchInstance';

/**
 * GET 카드 목록 조회
 */
export const getCards = async ({ columnId, size = 10 }: GetCardsParams) => {
  const params = new URLSearchParams({
    size: size.toString(),
    columnId: columnId.toString(),
  });
  const res = await get<GetCardsResponse>(`cards?${params.toString()}`);

  return res;
};

/**
 * DELETE 카드 삭제
 */
export const delCard = async (id: number) => {
  await del(`cards/${id}`);
};
