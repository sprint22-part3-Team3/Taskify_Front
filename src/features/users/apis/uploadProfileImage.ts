import { postFormData } from '@/shared/apis/fetchInstance';
import type { UploadProfileImageResponse } from '@/features/users/apis/userMe.types';

export const uploadProfileImage = (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  return postFormData<UploadProfileImageResponse>('users/me/image', formData);
};
