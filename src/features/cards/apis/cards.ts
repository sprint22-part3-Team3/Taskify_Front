import type {
  GetCardsParams,
  GetCardsResponse,
} from '@/features/cards/apis/cards.types';
import { get } from '@/shared/apis/fetchInstance';

/**
 * GET 카드 목록 조회
 */
export const getCards = async ({ columnId, size = 10 }: GetCardsParams) => {
  const res = await get<GetCardsResponse>(
    `cards?size=${size}&columnId=${columnId}`
  );

  return res;
};
