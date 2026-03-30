import { useParams } from 'react-router-dom';

export const useDashboardId = () => {
  const { id } = useParams();
  return parseInt(id ?? '', 10);
};
