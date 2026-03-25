import { IcArrowLeft } from '@/shared/assets';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-2 flex cursor-pointer items-center md:mb-7"
    >
      <div className="flex h-4.5 w-4.5 items-center justify-center md:h-5 md:w-5">
        <IcArrowLeft className="text-black-200" />
      </div>
      <div className="text-black-200 typo-md-medium md:typo-lg-medium md--line-height md:lg--line-height ml-2">
        돌아가기
      </div>
    </button>
  );
}

export default BackButton;
