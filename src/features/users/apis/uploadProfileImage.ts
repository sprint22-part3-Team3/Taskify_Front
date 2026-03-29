import { post } from '@/shared/apis/fetchInstance';

import type { UploadProfileImageResponse } from '@/features/users/apis/userMe.types';

export const uploadProfileImage = (file: File) => {
  const teamId = import.meta.env.VITE_TEAM_ID;
  const formData = new FormData();
  formData.append('image', file);

  return post<UploadProfileImageResponse>(`${teamId}/users/me/image`, formData);
};
