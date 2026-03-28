import { get } from '@/shared/apis/fetchInstance';
import type { UserMe } from '@/features/users/apis/userMe.types';

export const getCurrentUser = () => get<UserMe>('users/me');
