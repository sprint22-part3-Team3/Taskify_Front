import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from '@/features/auth/components/auth-layout';
import DashboardDetailPage from '@/pages/dashboard-detail';
import DashboardEditPage from '@/pages/dashboard-edit';
import LoginPage from '@/pages/login';
import MainPage from '@/pages/main';
import MyDashboardPage from '@/pages/my-dashboard';
import MyPage from '@/pages/my';
import SignupPage from '@/pages/signup';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route path="/mydashboard" element={<MyDashboardPage />} />
        <Route path="/dashboard/:id" element={<DashboardDetailPage />} />
        <Route path="/dashboard/:id/edit" element={<DashboardEditPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
