import { PlusCircleOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  FormInstance,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Typography
} from 'antd';
import { Dayjs } from 'dayjs';
import { useAtom } from 'jotai/index';
import { NoUndefinedRangeValueType } from 'rc-picker/lib/PickerInput/RangePicker';
import { useEffect, useRef, useState } from 'react';

import { FilterTypeEnum } from '../../../model/app-model/enums/FilterTypeEnum.ts';
import {
  FilterDefinition,
  FilterItem
} from '../../../model/app-model/interfaces/FilterDefinition.ts';
import { FilterAtom, filterAtom } from '../../../state/atoms/filterAtom.ts';
import { getFilterProp } from '../../../utility/helpers/filter.ts';
import {
  LocalStorage,
  LocalStorageItems
} from '../../../utility/LocalStorage.tsx';
import { EventFilter } from './filters/EventFilter.tsx';
import { SelectionModal } from './SelectionModal.tsx';

const { RangePicker } = DatePicker;
const { Text } = Typography;

interface GlobalFilterProps {
  onClose: () => void;
  open: boolean;
}
export const GlobalFilter = ({ onClose, open }: GlobalFilterProps) => {
  const savedFilters = LocalStorage.getItem(LocalStorageItems.Filters);
  const filtersObject = savedFilters ? JSON.parse(savedFilters) : [];

  const [filterDefinition, setFilterDefinition] = useState<FilterDefinition>(
    []
  );
  const [, setFilterSettings] = useAtom(filterAtom);

  const [filterSelectionModal, setFilterSelectionModal] = useState(false);
  const [filterSaveModal, setFilterSaveModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    const filters = filterDefinition.map((filterItem) => {
      if (getFilterProp(filterItem.type))
        return {
          [getFilterProp(filterItem.type) as keyof FilterAtom]:
            filterItem.values
        };
    });
    const prepared = [...filters.filter(Boolean)];
    const parsedFilters = prepared.reduce((acc, filterItem) => {
      return { ...acc, ...filterItem };
    }, {});
    setFilterSettings((prev) => {
      return {
        ...prev,
        ...parsedFilters
      };
    });
  }, [filterDefinition]);
  const handleApplyDateFilter = (_dates: NoUndefinedRangeValueType<Dayjs>) => {
    setFilterSettings((prev) => {
      return {
        ...prev,
        fromDt: _dates[0]?.toISOString(),
        toDt: _dates[1]?.toISOString()
      };
    });
  };
  const handleSaveFilter = (values: { name: string }) => {
    filtersObject.push({ filter: filterDefinition, name: values.name });
    LocalStorage.setItem(
      LocalStorageItems.Filters,
      JSON.stringify(filtersObject)
    );
    setFilterSaveModal(false);
    setActiveFilter(values.name);
  };
  const handleUpdateFilter = () => {
    const filterToUpdate = filtersObject.find(
      (item: { filter: FilterDefinition; name: string }) =>
        item.name === activeFilter
    );
    filterToUpdate.filter = filterDefinition;
    LocalStorage.setItem(
      LocalStorageItems.Filters,
      JSON.stringify(filtersObject)
    );
  };
  const handleDeleteFilter = () => {
    const remainingFilters = filtersObject.filter(
      (item: { filter: FilterDefinition; name: string }) =>
        item.name !== activeFilter
    );
    LocalStorage.setItem(
      LocalStorageItems.Filters,
      JSON.stringify(remainingFilters)
    );
    setActiveFilter(undefined);
  };
  const removeFilterCriteria = (criteria: FilterTypeEnum) =>
    setFilterDefinition((prev) =>
      prev.filter((item) => item.type !== criteria)
    );
  const handleChangeFilter = (
    filterTypeEnum: FilterTypeEnum,
    value: Array<number>,
    prop?: string
  ) => {
    const filterToEdit = filterDefinition;
    const filterItem = filterToEdit.find(
      (item) => item.type === filterTypeEnum
    );
    if (filterItem) filterItem.values = value;
    setFilterDefinition(filterToEdit);
    prop &&
      setFilterSettings((prev) => {
        return {
          ...prev,
          [prop]: value
        };
      });
  };
  const savedFiltersSelection = filtersObject.map(
    (item: { name: string; filter: FilterDefinition }) => {
      return { label: item.name, value: item.name };
    }
  );
  const handleApplyPredefinedFilter = (name: string) => {
    const selectedFilter = filtersObject.find(
      (item: { name: string; filter: FilterDefinition }) => item.name === name
    );
    setActiveFilter(selectedFilter?.name);
    setFilterDefinition(selectedFilter?.filter ?? []);
  };
  const formRef = useRef<FormInstance>(null);
  const setFilter = (filter: FilterItem) => {
    return (
      <EventFilter
        filterType={filter.type}
        key={filter.type + filter.values.join()}
        removeFilterCriteria={removeFilterCriteria}
        values={filter.values}
        onFilterChange={(filterValue) =>
          handleChangeFilter(
            filter.type,
            filterValue,
            getFilterProp(filter.type)
          )
        }
      />
    );
  };
  const renderFilter = (filter?: FilterDefinition) =>
    filter?.map((filterItem) => setFilter(filterItem));
  return (
    <Drawer
      footer={
        <div className={'flex justify-between'}>
          <Button data-cy="global-filter-close" onClick={onClose}>
            Close
          </Button>
        </div>
      }
      title={
        <div className={'flex justify-between'}>
          <Text>Filter</Text>
          <div>
            <Space>
              <Button
                data-cy={'save-filter'}
                onClick={() => setFilterSaveModal(true)}
              >
                Save
              </Button>
              <Button
                data-cy="update-filter"
                disabled={!activeFilter}
                onClick={handleUpdateFilter}
              >
                Update
              </Button>
              <Popconfirm
                cancelText="No"
                description="Are you sure to delete this filter?"
                okButtonProps={{ 'data-cy': 'confirm-delete-filter' }}
                okText="Yes"
                title="Delete the filter"
                onConfirm={handleDeleteFilter}
              >
                <Button
                  data-cy={'delete-filter'}
                  disabled={!activeFilter}
                  danger
                >
                  Delete
                </Button>
              </Popconfirm>
              <Text>Saved filters: </Text>
              <Select
                options={savedFiltersSelection}
                style={{ minWidth: 200 }}
                value={activeFilter}
                allowClear
                onChange={handleApplyPredefinedFilter}
                onClear={() => {
                  setActiveFilter(undefined);
                  setFilterDefinition([]);
                }}
              />
            </Space>
          </div>
        </div>
      }
      closable={false}
      data-cy="global-filter"
      key={'filter'}
      open={open}
      placement={'top'}
      size={'large'}
    >
      <Space direction={'vertical'} size={'large'}>
        <div className={'grid grid-cols-5 gap-6'}>
          <div>
            <Text className={'block'}>Period:</Text>
            <RangePicker
              className={'w-full'}
              data-cy="period-picker"
              onChange={handleApplyDateFilter}
            />
          </div>
          {renderFilter(filterDefinition)}
        </div>
        <Button
          data-cy="global-filter-criteria"
          icon={<PlusCircleOutlined />}
          onClick={() => setFilterSelectionModal(true)}
        >
          Add filter criteria
        </Button>
      </Space>
      <SelectionModal
        activeFilters={filterDefinition.map((item) => item.type)}
        open={filterSelectionModal}
        onClose={() => setFilterSelectionModal(false)}
        onOk={(item) =>
          setFilterDefinition((prev) => {
            prev.push(item);
            setFilterSettings((prevState) => {
              const prop = getFilterProp(item.type);
              if (prop !== undefined) prevState[prop]?.push(...item.values);
              return { ...prevState };
            });
            setFilterSelectionModal(false);
            return prev;
          })
        }
      />
      <Modal
        okButtonProps={{ 'data-cy': 'confirm-save' }}
        open={filterSaveModal}
        title={'New filter'}
        onCancel={() => setFilterSaveModal(false)}
        onOk={() => {
          formRef.current?.submit();
        }}
      >
        <Form ref={formRef} onFinish={handleSaveFilter}>
          <Form.Item label={'Filter name'} name={'name'}>
            <Input data-cy="filter-name" placeholder={'Enter filter name'} />
          </Form.Item>
        </Form>
      </Modal>
    </Drawer>
  );
};
