import { ArrowDownOutlined } from '@ant-design/icons';
import { Card, Result, Statistic } from 'antd';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { useAtom } from 'jotai/index';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Table } from '../../components/shared/table/Table.tsx';
import { TimeSeries } from '../../components/shared/timeSeriesGraph/TimeSeries.tsx';
import { GraphFilter } from '../../components/shared/timeSeriesGraphFilter/GraphFilter.tsx';
import { LineGraphData } from '../../model/graphs/LineGraphData';
import { useGetReadings } from '../../services/readings/useGetReadings';
import { SelectedUsagePointsAtom } from '../../state/atoms/selectedUsagePointsAtom.ts';
import {
  getGraphDataByIds,
  saveGraphData,
  saveRawData,
  usePaginatedRawData
} from '../../utility/db/indexedDB.ts';
import {
  sliceLineGraphDataByDate,
  sortByDate,
  transformData
} from '../../utility/helpers/consumption';
import { tableColumns } from './tableColumns.ts';

export const Readings = () => {
  const [upIds] = useAtom(SelectedUsagePointsAtom);

  const { data = [], error, loading, progress } = useGetReadings();
  const [page, setPage] = useState(0);
  const pageSize = 10; // Adjust the page size as needed
  const [ids, setIds] = useState<number[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<{
    from?: string | undefined;
    to?: string | undefined;
  }>({});
  const {
    data: rawData,
    isLoading: isLocalLoading,
    refetch
  } = usePaginatedRawData(
    page,
    pageSize,
    ids.map((id) => id.toString()),
    types
  );
  const [selectedGraphData, setSelectedGraphData] = useState<LineGraphData[]>(
    []
  );
  const [selectedGraphFilterData, setSelectedGraphFilterData] = useState<
    LineGraphData[]
  >([]);
  useEffect(() => {
    if (error || !data?.length) {
      saveRawData([]).catch(console.error);
      return;
    }
    saveRawData(data ?? [])
      .then(() => refetch())
      .catch(console.error);
    const graphData = sortByDate(
      transformData(Array.isArray(data) ? data : []) as LineGraphData[]
    );
    saveGraphData(graphData).catch(console.error);
  }, [data, error, refetch]);

  useEffect(() => {
    selectedDates &&
      setSelectedGraphData(
        sliceLineGraphDataByDate(selectedGraphData, selectedDates)
      );
  }, [selectedDates]);

  const handleSetSelectedData = (
    data: LineGraphData[],
    value: { from?: string; to?: string }
  ) => {
    setSelectedDates(value);
    setSelectedGraphData(sliceLineGraphDataByDate(data, value));
  };

  return upIds.length > 0 ? (
    <>
      {!loading && !error && (
        <ErrorBoundary>
          <div className="relative h-96">
            <TimeSeries data={selectedGraphData} xTicksNumber={5} legend />
          </div>
          <GraphFilter
            data={selectedGraphFilterData}
            onSelectRange={(_e, value) =>
              handleSetSelectedData(selectedGraphFilterData, value)
            }
          />
        </ErrorBoundary>
      )}
      {loading && (
        <div className="relative h-96 w-full text-center text-4xl">
          <Card bordered={false}>
            <Statistic
              precision={2}
              prefix={<ArrowDownOutlined />}
              suffix="MB"
              title="Loading"
              value={Number(progress)}
            />
          </Card>
        </div>
      )}
      {!loading && error && (
        <Result status="error" subTitle={error.toString()} title="Data error" />
      )}
      <Table
        pagination={{
          onChange: (e) => setPage(e),
          pageSize: pageSize,
          showSizeChanger: false,
          total: rawData?.total
        }}
        columns={tableColumns(data ?? [])}
        dataSource={Array.isArray(rawData?.data) ? rawData?.data : []}
        loading={loading || isLocalLoading}
        rowKey={(row) => row.usagePointId + row.readingTypeName + row.time}
        removeAction
        onChange={(_pagination, _filters) => {
          setIds((_filters.usagePointId as number[]) ?? []);
          setTypes((_filters.readingTypeName as string[]) ?? []);
          const ids = _filters.usagePointId?.map(
            (id) => `${id}_${_filters.readingTypeName}`
          );
          ids &&
            getGraphDataByIds(ids)
              .then((filteredData) => {
                setSelectedGraphFilterData(filteredData);
                selectedDates &&
                  setSelectedGraphData(
                    sliceLineGraphDataByDate(filteredData, selectedDates)
                  );
              })
              .catch(console.error);
        }}
      />
    </>
  ) : (
    <Result
      extra={
        <Link key="console" to={'/map'} type="primary">
          Go To Map
        </Link>
      }
      title="You need to select usage points to get data on this page"
    />
  );
};
