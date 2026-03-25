import { AddItemButton } from '@/shared/components/add-item-button';

function ColumnAdd() {
  // TODO : 새로운 컬럼 추가하기 버튼 이벤트 핸들러 함수 작성
  const handleAddColumn = () => {};

  return (
    <AddItemButton onClick={handleAddColumn} className="h-16.5 md:h-17.5">
      새로운 컬럼 추가하기
    </AddItemButton>
  );
}

export { ColumnAdd };
