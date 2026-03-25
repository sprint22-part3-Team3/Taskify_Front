import { CardList } from '@/features/cards/components/card-list';
import { ColumnAdd } from '@/features/columns/components/column-add';
import { cn } from '@/shared/utils/cn';
import { DUMMY_COLUMNS } from '@/features/columns/dummyColumns';

function ColumnList() {
  // TODO : API 데이터 연동 후, dummyColumns.ts 삭제
  const columns = DUMMY_COLUMNS.data;

  const listClass = cn(
    'shrink-0 px-3 pt-8 pb-6 md:px-5 md:py-5',
    'first:pt-4 md:first:pt-5',
    'last:pt-4 last:pb-12.5 md:last:pt-5 md:last:pb-5'
  );

  return (
    <ul className="flex flex-col divide-y divide-gray-100 lg:min-h-screen lg:flex-row lg:divide-x lg:divide-y-0">
      {columns.map((column) => (
        <li key={column.id} className={cn(listClass, 'lg:w-88.5')}>
          <CardList column={column} />
        </li>
      ))}
      <li className={cn(listClass, 'lg:w-98.5')}>
        <div className="lg:pt-12.5">
          <ColumnAdd />
        </div>
      </li>
    </ul>
  );
}

export { ColumnList };
