import { put } from '@/shared/apis/fetchInstance';
import type {
  UserMe,
  UpdateUserMeRequest,
} from '@/features/users/apis/userMe.types';

export const updateUserMe = (body: UpdateUserMeRequest) =>
  put<UserMe>('users/me', body);
