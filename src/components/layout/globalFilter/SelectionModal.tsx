import { Modal, Select } from 'antd';
import { useState } from 'react';

import { FilterTypeEnum } from '../../../model/app-model/enums/FilterTypeEnum.ts';
import { FilterItem } from '../../../model/app-model/interfaces/FilterDefinition.ts';
import { EventFilter } from './filters/EventFilter.tsx';

interface SelectionModalProps {
  activeFilters: FilterTypeEnum[];
  onClose: () => void;
  onOk: (e: FilterItem) => void;
  open: boolean;
}
export const SelectionModal = ({
  activeFilters,
  onClose,
  onOk,
  open
}: SelectionModalProps) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterTypeEnum>();
  const [filterItem, setFilterItem] = useState<FilterItem>();
  const handleFilterSelection = (e: FilterTypeEnum) => {
    setSelectedFilter(e);
    setFilterItem({ active: true, type: e, values: [] });
  };

  const setFilter = () => {
    if (selectedFilter) {
      return (
        <EventFilter
          filterType={selectedFilter}
          onFilterChange={(e: Array<number>) =>
            filterItem?.type && setFilterItem({ ...filterItem, values: e })
          }
        />
      );
    }
    return null;
  };
  const options = [
    { label: 'Usage Point Type', value: FilterTypeEnum.UP_TYPE },
    { label: 'Usage Group', value: FilterTypeEnum.UP_USAGE_GROUP },
    { label: 'Pricing Structure', value: FilterTypeEnum.UP_PRICING_STRUCTURE },
    { label: 'Reading Type', value: FilterTypeEnum.UP_RT },
    { label: 'Customer Kind', value: FilterTypeEnum.UP_CUSTOMER_KIND },
    { label: 'Events', value: FilterTypeEnum.UP_EVENTS }
  ];
  return (
    <Modal
      data-cy="selection-modal"
      destroyOnClose={true}
      okButtonProps={{ 'data-cy': 'filter-item-ok' }}
      open={open}
      title={'Select filter'}
      onCancel={onClose}
      onOk={() => {
        filterItem?.type && onOk(filterItem);
        setFilterItem(undefined);
        setSelectedFilter(undefined);
      }}
    >
      <Select
        data-cy="filter-item-criteria"
        options={options.filter((obj) => !activeFilters.includes(obj.value))}
        style={{ width: 300 }}
        value={selectedFilter}
        onChange={handleFilterSelection}
      />
      {setFilter()}
    </Modal>
  );
};
