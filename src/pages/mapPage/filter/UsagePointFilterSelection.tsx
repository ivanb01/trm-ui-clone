import { Badge, Checkbox, Select, Typography } from 'antd';
import { FC, ReactElement } from 'react';

import { UsagePointDTO } from '../../../model/interface/usagePoint/UsagePointDTO';
import { useGetUpFilter } from '../../../services/filter/useGetUpFilter.ts';
import { UsagePointFilterInterface } from './UsagePointFilter.tsx';

const { Text } = Typography;
const { Option } = Select;

interface Props {
  filterProp: string;
  onChange: (prop: string, val: string[]) => void;
  placeholder: string;
  prop: string;
  usagePoints?: UsagePointDTO[];
  values: UsagePointFilterInterface;
}

export const UsagePointFilterSelection: FC<Props> = ({
  filterProp,
  onChange,
  placeholder,
  prop,
  values
}) => {
  const { data: filterData, isSuccess } = useGetUpFilter();

  const options = isSuccess
    ? filterData[prop]?.map((kind) => {
        return { label: kind, value: kind };
      })
    : [];

  const renderTag = (value: any, placeholder: ReactElement) => (
    <div className="flex w-full items-center justify-start gap-4">
      {placeholder}
      <Badge
        styles={{
          indicator: {
            borderRadius: 4
          }
        }}
        color="blue"
        count={value.length}
      />
    </div>
  );

  const dropdownRender = () => (
    <div>
      {options?.map((option) => (
        <div
          key={option.value}
          style={{ alignItems: 'center', display: 'flex', padding: '5px 12px' }}
        >
          <Checkbox
            checked={values[
              filterProp as keyof UsagePointFilterInterface
            ]?.includes(option.value)}
            onChange={(e) => {
              const newValue = e.target.checked
                ? [
                    ...(values[filterProp as keyof UsagePointFilterInterface] ||
                      []),
                    option.value
                  ]
                : (
                    values[filterProp as keyof UsagePointFilterInterface] || []
                  ).filter((val) => val !== option.value);
              onChange(filterProp, newValue);
            }}
          >
            {option.label}
          </Checkbox>
        </div>
      ))}
    </div>
  );

  return (
    <Select
      maxTagPlaceholder={(omittedValues) =>
        renderTag(omittedValues, <Text>{placeholder}</Text>)
      }
      dropdownRender={() => dropdownRender()}
      dropdownStyle={{ width: 400 }}
      maxTagCount={0}
      mode="multiple"
      placeholder={<Text>{placeholder}</Text>}
      showSearch={false}
      size="middle"
      style={{ width: 200 }}
      value={values[filterProp as keyof UsagePointFilterInterface]}
      variant={'borderless'}
      onChange={(e) => onChange(filterProp, e)}
    >
      {options?.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};
