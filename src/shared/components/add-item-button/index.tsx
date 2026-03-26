import type { AddItemButtonProps } from '@/shared/components/add-item-button/addItemButton.types';
import { IcAdd } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';
import { Button } from '@/shared/components/button';

function AddItemButton({ onClick, className, children }: AddItemButtonProps) {
  return (
    <Button
      type="button"
      theme="icon"
      className={cn('h-10 w-full', className)}
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
    </Button>
  );
}

export { AddItemButton };
