import { Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Table } from '../../components/shared/table/Table.tsx';
import { TransformerStationDTO } from '../../model/interface/usagePoint/TransformerStationDTO.ts';
import { useGetUsagePointsPerTS } from '../../services/usagePoints/useGetUsagePointsPerTS.ts';
import { tableColumns } from './tableColumns.ts';

const { Title } = Typography;
export const TransformerDetailsPage = () => {
  const params = useParams();
  const { data, isLoading } = useGetUsagePointsPerTS(params.id);
  const [transformerData, setTransformerData] =
    useState<TransformerStationDTO>();
  useEffect(() => {
    if (data && data.length > 0) setTransformerData(data[0].transformerStation);
  }, [data]);
  return (
    <div>
      <Space direction="vertical">
        <Title level={3}>
          {transformerData?.usage_point_type}, {transformerData?.nitesId}
        </Title>
        <Title level={5}>Name: {transformerData?.name}</Title>
        <Title level={5}>
          Location: {transformerData?.location.lat}
          {', '}
          {transformerData?.location.lon}
        </Title>
        <Title level={5}>Referent name: {transformerData?.referentName}</Title>
        <Title level={5}>Referent name: {transformerData?.notice}</Title>
      </Space>
      <Table
        columns={tableColumns}
        dataSource={data ?? []}
        loading={isLoading}
        rowKey={(record) => record.id}
        title={() => 'Usage points'}
        removeAction
      />
    </div>
  );
};
