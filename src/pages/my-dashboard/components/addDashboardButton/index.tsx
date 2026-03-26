import { IcAdd } from '@/shared/assets/icons';
import { Button } from '@/shared/components/button';

type AddDashboardButtonProps = {
  onClick?: () => void;
};

function AddDashboardButton({ onClick }: AddDashboardButtonProps) {
  return (
    <Button
      theme="outlined"
      size="icon"
      onClick={onClick}
      className="typo-md-semibold md:typo-lg-semibold h-14.5 w-full justify-between bg-white px-5 text-left md:h-17"
    >
      <span>새로운 대시보드</span>
      <div className="bg-primary-500/10 flex h-5 w-5 items-center justify-center rounded-sm md:h-5.5 md:w-5.5">
        <IcAdd className="text-primary-500 h-2.25 w-2.25 md:h-2.5 md:w-2.5" />
      </div>
    </Button>
  );
}

export default AddDashboardButton;
