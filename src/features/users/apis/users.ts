import {
  get,
  IMAGE_UPLOAD_TIMEOUT,
  postFormData,
  put,
} from '@/shared/apis/fetchInstance';
import type {
  UploadProfileImageResponse,
  UpdateUserMeRequest,
  UserMe,
} from '@/features/users/apis/userMe.types';

export const getCurrentUser = () => get<UserMe>('/users/me');

export const updateUserMe = (body: UpdateUserMeRequest) =>
  put<UserMe>('/users/me', body);

export const uploadProfileImage = (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  return postFormData<UploadProfileImageResponse>('/users/me/image', formData, {
    timeout: IMAGE_UPLOAD_TIMEOUT,
  });
};
