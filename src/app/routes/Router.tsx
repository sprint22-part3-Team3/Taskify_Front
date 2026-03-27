import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/app/routes/ProtectedRoute';
import PublicRoute from '@/app/routes/PublicRoute';
import AuthLayout from '@/features/auth/components/auth-layout';
import DashboardLayout from '@/features/dashboards/components/layout';
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
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/mydashboard" element={<MyDashboardPage />} />
            <Route path="/dashboard/:id" element={<DashboardDetailPage />} />
            <Route path="/dashboard/:id/edit" element={<DashboardEditPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
