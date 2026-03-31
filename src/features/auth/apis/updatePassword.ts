import { put } from '@/shared/apis/fetchInstance';

import type { UpdatePasswordRequest } from '@/features/users/apis/userMe.types';

export const updatePassword = (body: UpdatePasswordRequest) =>
  put<void>('auth/password', body);
