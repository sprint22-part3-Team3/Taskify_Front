import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="min-h-dvh bg-gray-50 px-3 py-40 md:py-20">
      <main className="mx-auto flex w-full max-w-140 flex-col items-center">
        <Outlet />
      </main>
    </div>
  );
}
