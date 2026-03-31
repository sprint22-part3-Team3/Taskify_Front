import { useContext } from 'react';
import { UserContext } from '@/shared/context/user/userContext';

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      'useUserContext는 UserProvider 안에서만 사용할 수 있습니다.'
    );
  }

  return context;
};

export default useUserContext;
