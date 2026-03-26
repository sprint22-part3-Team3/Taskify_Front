import BackButton from '@/shared/components/back-button';
import ProfileForm from '@/pages/my/components/profile-form';
import PasswordEditForm from '@/pages/my/components/password-edit-form';

function MyPage() {
  return (
    <div className="p-3 pt-4 pl-3 md:pt-4 md:pr-5 md:pl-4 lg:pt-5 lg:pl-5">
      <BackButton />
      <ProfileForm />
      <PasswordEditForm />
    </div>
  );
}

export default MyPage;
