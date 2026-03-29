/** 구성원 한 명의 정보 */
export type Member = {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
};

/** GET /members API 응답 전체 */
export type MembersResponse = {
  members: Member[];
  totalCount: number;
};
