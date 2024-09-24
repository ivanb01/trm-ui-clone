import { Select, SelectProps } from 'antd';
import { FC } from 'react';

import { formats } from './formats';

export const DateTimeFormatPicker: FC<SelectProps> = (props) => {
  const options = formats.map((format) => {
    return { label: format, value: format };
  });
  return (
    <Select
      {...props}
      filterSort={(
        optionA: { label: string; value: string },
        optionB: { label: string; value: string }
      ) =>
        (optionA?.label ?? '')
          .toLowerCase()
          .localeCompare((optionB?.label ?? '').toLowerCase())
      }
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      optionFilterProp="children"
      options={options}
      placeholder="Search to Select"
      style={{ maxWidth: 300 }}
      allowClear
      showSearch
    />
  );
};
