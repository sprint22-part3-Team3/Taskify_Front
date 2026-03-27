import { useContext } from 'react';
import { AuthContext } from '@/shared/context/auth/authContext';

function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuthContext는 AuthProvider 안에서만 사용할 수 있습니다.'
    );
  }

  return context;
}

export default useAuthContext;
