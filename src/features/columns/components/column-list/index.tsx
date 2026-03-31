import { CardList } from '@/features/cards/components/card-list';
import { ColumnAdd } from '@/features/columns/components/column-list/column-add';
import { useColumnList } from '@/features/columns/hooks/useColumnList';
import { cn } from '@/shared/utils/cn';
import { useParams } from 'react-router-dom';
import { ColumnListProvider } from '@/features/columns/contexts/columnListProvider';

const LIST_CLASS = cn(
  'shrink-0 px-3 pt-8 pb-6 md:px-5 md:py-5',
  'first:pt-4 md:first:pt-5',
  'last:pt-4 last:pb-12.5 md:last:pt-5 md:last:pb-5'
);

function ColumnList() {
  const { id } = useParams();
  const dashboardId = Number(id);
  const { columns, isLoading, errorMessage, refetch } =
    useColumnList(dashboardId);

  // TODO: 에러 화면 처리
  if (errorMessage)
    return (
      <div className="flex items-center justify-center">
        <p>⚠️ {errorMessage}</p>
      </div>
    );

  return (
    <ColumnListProvider columns={columns} refetch={refetch}>
      <ul className="flex flex-col divide-y divide-gray-100 lg:min-h-screen lg:flex-row lg:divide-x lg:divide-y-0">
        {columns.map((column) => (
          <li key={column.id} className={cn(LIST_CLASS, 'lg:w-88.5')}>
            <CardList column={column} isColumnLoading={isLoading} />
          </li>
        ))}
        <li className={cn(LIST_CLASS, 'lg:w-98.5')}>
          <div className="lg:pt-12.5">
            <ColumnAdd />
          </div>
        </li>
      </ul>
    </ColumnListProvider>
  );
}

export { ColumnList };
