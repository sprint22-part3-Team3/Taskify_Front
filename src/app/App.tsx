import Router from '@/app/routes/Router';
import { AuthProvider } from '@/shared/context/auth/authProvider';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
