export type Column = {
  id: number;
  title: string;
  color: string;
  cardCount: number;
};

type DashboardLayoutProps = {
  children?: React.ReactNode;
  columns: Column[];
  onAddColumnClick?: () => void;
};

/**
 * 대시보드 본문 영역의 컬럼 레이아웃 컴포넌트입니다.
 *
 * 컬럼들이 데스크탑에서는 가로로, 모바일/태블릿에서는 세로로 배치됩니다.
 * 각 컬럼에는 헤더(제목, 카드 수, 설정 버튼)와 카드 추가 버튼이 포함되며,
 * 맨 끝에 새로운 컬럼 추가 버튼이 표시됩니다.
 *
 * @example
 * ```tsx
 * <DashboardLayout
 *   columns={[
 *     { id: 1, title: 'To Do', color: '#a855f7', cardCount: 3 },
 *     { id: 2, title: 'On Progress', color: '#3b82f6', cardCount: 2 },
 *   ]}
 *   onAddColumnClick={() => console.log('컬럼 추가')}
 * >
 *   <CardComponent />
 * </DashboardLayout>
 * ```
 */
export default function DashboardLayout({
  children,
  columns,
  onAddColumnClick,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* 본문: 컬럼 레이아웃 */}
      <main className="flex min-w-0 flex-1 flex-col gap-5 overflow-y-auto bg-gray-50 p-5 lg:flex-row lg:overflow-x-auto lg:overflow-y-hidden">
        {columns.map((column) => (
          <section
            key={column.id}
            className="flex w-full min-w-0 flex-col lg:w-[314px] lg:shrink-0"
          >
            {/* 컬럼 헤더 */}
            <div className="flex items-center justify-between pb-4">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: column.color }}
                />
                <span className="text-lg font-bold text-gray-800">
                  {column.title}
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded bg-gray-200 text-xs text-gray-500">
                  {column.cardCount}
                </span>
              </div>
              <button className="cursor-pointer text-gray-400">⚙</button>
            </div>

            {/* 카드 추가 버튼 */}
            <button className="text-primary-500 mb-4 flex w-full items-center justify-center rounded-md border border-gray-200 bg-white py-2 hover:bg-gray-50">
              +
            </button>

            {/* 카드 영역 */}
            <div className="flex flex-col gap-3">{children}</div>
          </section>
        ))}

        {/* 새로운 컬럼 추가하기 */}
        <button
          onClick={onAddColumnClick}
          className="flex h-[70px] w-full shrink-0 items-center justify-center gap-2 rounded-md border border-gray-200 bg-white text-lg text-gray-600 hover:bg-gray-50 lg:w-[314px]"
        >
          새로운 컬럼 추가하기
          <span className="text-primary-500">+</span>
        </button>
      </main>
    </div>
  );
}
