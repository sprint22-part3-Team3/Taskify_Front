import { postFormData } from '@/shared/apis/fetchInstance';

type UploadProfileImageResponse = {
  profileImageUrl: string;
};

export const uploadProfileImage = (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  return postFormData<UploadProfileImageResponse>('users/me/image', formData);
};
