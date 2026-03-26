import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-gray-50 px-3 py-20">
      <main className="flex w-full max-w-140 flex-col items-center">
        <Outlet />
      </main>
    </div>
  );
}
