import { Select, Typography } from 'antd';
import { FC } from 'react';

import { TransformerStationDTO } from '../../../model/interface/usagePoint/TransformerStationDTO.ts';

const { Text } = Typography;

interface TransformerProps {
  onChange: (transformer?: string) => void;
  transformer: string | undefined;
  transformers: TransformerStationDTO[] | undefined;
}
export const TransformerFilter: FC<TransformerProps> = ({
  onChange,
  transformer,
  transformers
}) => {
  const options = transformers?.map((trans) => {
    return {
      label: trans.name,
      value: trans.id
    };
  });
  const removeURLSearchParam = (param: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(param);

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, '', newUrl);
  };
  return (
    <Select
      dropdownStyle={{
        width: 400
      }}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '')
          .toLowerCase()
          .localeCompare((optionB?.label ?? '').toLowerCase())
      }
      optionFilterProp="label"
      options={options}
      placeholder={<Text>Transformer station</Text>}
      size={'middle'}
      style={{ width: 250 }}
      value={transformer}
      allowClear
      showSearch
      onChange={onChange}
      onClear={() => removeURLSearchParam('transformerStation')}
    />
  );
};
