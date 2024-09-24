import { CloseCircleOutlined } from '@ant-design/icons';
import { Select, SelectProps, Typography } from 'antd';

import { FilterTypeEnum } from '../../../../model/app-model/enums/FilterTypeEnum.ts';
import { filterName } from '../../../../model/mapping/filterName.tsx';
import { useGetRefList } from '../../../../services/refList/useGetRefList.ts';

const { Text } = Typography;

interface EventFilterProps {
  filterType: FilterTypeEnum;
  onFilterChange: (filterValue: Array<number>) => void;
  removeFilterCriteria?: (criteria: FilterTypeEnum) => void;
  values?: number[];
}

export const EventFilter = ({
  filterType,
  onFilterChange,
  removeFilterCriteria,
  values
}: EventFilterProps) => {
  const { data } = useGetRefList({ name: filterType });
  const handleChange = (value: number[]) => {
    onFilterChange(value);
  };
  const options: SelectProps['options'] = [];

  if (data) {
    for (const [key, value] of Object.entries(data)) {
      options.push({ label: value, value: key });
    }
  }
  const getFilterName = (e: FilterTypeEnum) => {
    return filterName.find((item) => item.value === e)?.label;
  };
  return (
    <div>
      <Text>{getFilterName(filterType)}: </Text>{' '}
      <div className={'flex items-center gap-1'}>
        <Select
          data-cy="filter-item-value"
          data-id={getFilterName(filterType)?.split(' ').join('_')}
          defaultValue={values}
          mode="multiple"
          optionFilterProp={'label'}
          options={options}
          placeholder="Please select"
          popupClassName={'min-w-96'}
          style={{ minWidth: '100%' }}
          allowClear
          onChange={handleChange}
        />
        {removeFilterCriteria && (
          <CloseCircleOutlined
            className={'cursor-pointer text-red-700'}
            onClick={() => removeFilterCriteria?.(filterType)}
          />
        )}
      </div>
    </div>
  );
};
