import { Table } from '../../components/shared/table/Table.tsx';
import { useGetLoses } from '../../services/loses/useGetLoses.ts';
import { tableColumns } from './tableColumns.ts';

export const Losses = () => {
  const { data, isLoading } = useGetLoses();

  return (
    <>
      <Table
        columns={tableColumns}
        dataSource={data ?? []}
        loading={isLoading}
        removeAction
      />
    </>
  );
};
