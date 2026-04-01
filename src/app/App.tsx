import Router from '@/app/routes/Router';
import { AuthProvider } from '@/shared/context/auth/authProvider';
import { ToastProvider } from '@/shared/context/toast/toastProvider';
import { UserProvider } from '@/shared/context/user/userProvider';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ToastProvider>
          <Router />
        </ToastProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
