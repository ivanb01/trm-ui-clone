import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table as AntTable, TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Column from 'antd/es/table/Column';
import { DataIndex } from 'rc-table/lib/interface';
import { ReactElement, ReactNode } from 'react';

import { TableDataTypes } from '../../../model/app-model/enums/TableDataTypes';
import { ColumnType } from '../../../model/app-model/types/DataTypeColumn';
import { TableBoolean } from './table-types/TableBoolean';
import { TableColor } from './table-types/TableColor';
import { TableDate } from './table-types/TableDate';
import { TableHTML } from './table-types/TableHTML';
import { TableImage } from './table-types/TableImage';
import { TableNumber } from './table-types/TableNumber.tsx';
import { TableTag } from './table-types/TableTag';

interface CustomTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  rowActions?: {
    disableDelete?: (e: T) => boolean;
    onDelete?: (e: T) => void;
    onView?: (e: T) => void;
  };
  columns: ColumnsType<T>;
  extra?: (e: T) => Array<ReactNode>;
  loadingDelete?: { recordId: number | string; status: boolean };
  removeAction?: boolean;
}

export function Table<T extends object>({
  columns,
  extra,
  loadingDelete,
  removeAction = false,
  rowActions,
  ...props
}: Readonly<CustomTableProps<T>>) {
  const renderField = (
    val: boolean | number | string,
    type?: TableDataTypes,
    data?: ColumnType<T>
  ) => {
    const componentMap: { [key in TableDataTypes]: ReactElement } = {
      [TableDataTypes.BOOLEAN]: <TableBoolean val={val as boolean} />,
      [TableDataTypes.COLOR]: <TableColor val={val as string} />,
      [TableDataTypes.DATE]: <TableDate val={val as string} />,
      [TableDataTypes.HTML]: <TableHTML val={val as string} />,
      [TableDataTypes.IMAGE]: <TableImage val={val as string} />,
      [TableDataTypes.NUMBER]: (
        <TableNumber unit={data?.unit} val={val as number} />
      ),
      [TableDataTypes.TAG]: <TableTag val={val as string} />,
      [TableDataTypes.TEXT]: <span>{val}</span>
    };
    return componentMap[type ?? TableDataTypes.TEXT] || val;
  };
  const cols = removeAction
    ? columns
    : [
        ...(columns ?? []),
        {
          dataIndex: '',
          fixed: 'right',
          key: 'action',
          render: (_: never, record: T & { id: number | string }) => (
            <div className={'flex gap-1'}>
              {rowActions?.onDelete &&
                rowActions?.disableDelete &&
                rowActions?.disableDelete(record) && (
                  <Popconfirm
                    cancelText="No"
                    description="Are you sure to delete this?"
                    okText="Yes"
                    title="Delete the task"
                    onConfirm={(e) => {
                      e?.preventDefault();
                      e?.stopPropagation();
                      rowActions.onDelete && rowActions.onDelete(record);
                    }}
                  >
                    <Button
                      loading={
                        loadingDelete?.status &&
                        loadingDelete?.recordId === record.id
                      }
                      icon={<DeleteOutlined />}
                      danger
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    />
                  </Popconfirm>
                )}
              {rowActions?.onView && (
                <Button
                  icon={<EyeOutlined />}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    rowActions.onView && rowActions.onView(record);
                  }}
                />
              )}
              {extra?.(record)}
            </div>
          ),
          title: 'Action',
          width: 100
        } as unknown as ColumnType<T>
      ];

  return (
    <div style={{ overflow: 'auto', width: '100%' }}>
      <AntTable
        data-cy={'ant-table'}
        dataSource={props.dataSource}
        scroll={{ x: 'max-content', y: window.innerHeight - 270 }}
        size={'small'}
        {...props}
        pagination={{
          hideOnSinglePage: true,
          ...props.pagination
        }}
      >
        {cols?.map((data: ColumnType<T>) => {
          return (
            <Column
              render={(value) => renderField(value, data.type, data)}
              {...data}
              dataIndex={data.dataIndex?.toString().split('.') as DataIndex}
              key={data.key}
            />
          );
        })}
      </AntTable>
    </div>
  );
}
