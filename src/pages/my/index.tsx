import { useNavigate } from 'react-router-dom';
import useAuthContext from '@/features/auth/hooks/useAuthContext';
import BackButton from '@/shared/components/back-button';
import { Button } from '@/shared/components/button';
import ProfileForm from '@/pages/my/components/profile-form';
import PasswordEditForm from '@/pages/my/components/password-edit-form';

function MyPage() {
  const navigate = useNavigate();
  const { clearAuth } = useAuthContext();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <div className="p-3 pt-4 pl-3 md:pt-4 md:pr-5 md:pl-4 lg:pt-5 lg:pl-5">
      <BackButton />
      <ProfileForm />
      <PasswordEditForm />
      <Button
        type="button"
        theme="outlined"
        className="mt-6 w-full md:max-w-80"
        onClick={handleLogout}
      >
        로그아웃
      </Button>
    </div>
  );
}

export default MyPage;
