import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '@/features/auth/hooks/useAuthContext';

function PublicRoute() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/mydashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
