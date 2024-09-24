import { Table } from '../../components/shared/table/Table.tsx';
import { useGetInsights } from '../../services/insights/useGetInsights.ts';
import { tableColumns } from './tableColumns.tsx';

export const Insights = () => {
  const { data, isLoading } = useGetInsights();

  const expandedRowRender = (record: Insight) => {
    const metrics = (
      <Table
        columns={[
          {
            dataIndex: 'Metric',
            key: 'Metric',
            title: 'Metric',
            width: 400
          },
          {
            dataIndex: 'Value',
            key: 'Value',
            title: 'Value',
            width: 400
          }
        ]}
        dataSource={JSON.parse(record.metrics)}
        pagination={false}
        rowKey={(reason: Metric) => reason.Metric}
        style={{ maxWidth: 900 }}
        removeAction
      />
    );

    const reasons = (
      <Table
        columns={[
          {
            dataIndex: 'Reason',
            key: 'Reason',
            title: 'Reason',
            width: 800
          }
        ]}
        dataSource={JSON.parse(record.reasons)}
        pagination={false}
        rowKey={(reason: Reason) => reason.Reason}
        style={{ maxWidth: 900 }}
        removeAction
      />
    );

    return (
      <div>
        {metrics}
        {reasons}
      </div>
    );
  };
  return (
    <Table
      expandable={{
        expandedRowRender
      }}
      columns={tableColumns}
      dataSource={data}
      loading={isLoading}
      rowKey={(r) => r.id}
      removeAction
    />
  );
};
