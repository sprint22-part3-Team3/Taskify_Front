import Router from '@/app/routes/Router';
import { AuthProvider } from '@/shared/context/auth/authProvider';
import { UserProvider } from '@/shared/context/user/userProvider';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router />
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
