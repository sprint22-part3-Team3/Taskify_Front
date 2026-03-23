import { cva } from 'class-variance-authority';
import { AVATAR_FALLBACK_TEXT_CLASS_NAMES } from '@/shared/components/avatar/avatar.constants';
import {
  useAvatarSize,
  useAvatarUser,
} from '@/shared/context/avatar/avatarContext';
import { cn } from '@/shared/utils/cn';
import {
  getAvatarUserId,
  getMonogram,
  getProfileColorForId,
} from '@/shared/utils/avatar';
import type { AvatarFallbackProps } from './avatarFallback.types';

const avatarFallbackStyle = cva(
  'flex h-full w-full select-none items-center justify-center text-white',
  {
    variants: {
      color: {
        orange: 'bg-orange',
        blue: 'bg-blue',
        yellow: 'bg-yellow',
        pink: 'bg-pink',
        purple: 'bg-purple',
      },
    },
    defaultVariants: {
      color: 'blue',
    },
  }
);

function AvatarFallback({ className }: AvatarFallbackProps) {
  const avatarUser = useAvatarUser();
  const avatarSize = useAvatarSize();
  const resolvedNickname = avatarUser?.nickname ?? '';
  const resolvedAvatarColor = getProfileColorForId(getAvatarUserId(avatarUser));

  return (
    <div
      className={cn(
        avatarFallbackStyle({ color: resolvedAvatarColor }),
        AVATAR_FALLBACK_TEXT_CLASS_NAMES[avatarSize],
        className
      )}
    >
      {getMonogram(resolvedNickname)}
    </div>
  );
}
export default AvatarFallback;
