import type { AddItemButtonProps } from '@/shared/components/add-item-button/addItemButton.types';
import { IcAdd } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

function AddItemButton({ onClick, className, children }: AddItemButtonProps) {
  return (
    <button
      className={cn(
        'flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white',
        className
      )}
      onClick={onClick}
    >
      {children && (
        <p className="typo-lg-bold md:typo-2lg-bold text-black-200 mr-3">
          {children}
        </p>
      )}
      <span className="bg-primary-500/8 inline-block rounded-sm px-1.5 py-1.5">
        <IcAdd />
      </span>
    </button>
  );
}

export { AddItemButton };
