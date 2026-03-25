import { IcArrowLeft } from '@/shared/assets';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <button
      type="button"
      onClick={handleGoBack}
      className="mb-2 flex cursor-pointer items-center"
    >
      <IcArrowLeft className="text-black-200" aria-hidden="true" />
      <span className="text-black-200 typo-md-medium md:typo-lg-medium ml-4">
        돌아가기
      </span>
    </button>
  );
}

export default BackButton;
