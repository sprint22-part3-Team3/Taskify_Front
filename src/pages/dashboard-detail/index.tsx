import { ColumnList } from '@/features/columns/components/column-list';

function DashboardDetailPage() {
  return (
    // TODO : 전체 레이아웃과 중복되는 스타일 수정
    <main className="flex min-h-screen min-w-max flex-col bg-gray-50">
      <ColumnList />
    </main>
  );
}

export default DashboardDetailPage;
