import { DateTimeFormatPicker } from '@layout';
import { Divider, InputNumber, Typography } from 'antd';
import { FC } from 'react';

import { NumberFormatPicker } from '../../../components/layout/numberFormatPicker/NumberFormatPicker.tsx';
import { FormatConfig } from '../../../state/atoms/dataFormatAtom.ts';

const { Text, Title } = Typography;

interface DataFormatProps {
  editFormat: (e: number | string, prop: keyof FormatConfig) => void;
  format: FormatConfig;
}
export const DataFormat: FC<DataFormatProps> = ({ editFormat, format }) => {
  const colspan2 = 'md:col-span-2';
  return (
    <div
      className={
        'grid h-fit grid-flow-row-dense grid-cols-1 md:grid-cols-2 md:gap-6'
      }
    >
      <Title className={colspan2} level={3}>
        Data format
      </Title>
      <Text>Date format:</Text>
      <div className={'h-8'}>
        <DateTimeFormatPicker
          className={'w-full'}
          data-cy="date-format"
          value={format.date}
          onChange={(e) => e && editFormat(e, 'date')}
        />
      </div>
      <Divider className={colspan2} />
      <Text>Number format:</Text>
      <div className={'h-8'}>
        <NumberFormatPicker
          className={'w-full'}
          data-cy="number-format"
          value={format.locale}
          onChange={(value) => editFormat(value, 'locale')}
        />
      </div>
      <Divider className={colspan2} />
      <Text>Max decimals:</Text>
      <div className={'h-8'}>
        <InputNumber
          className={'w-full'}
          data-cy="max-decimals"
          max={9}
          min={0}
          style={{ maxWidth: 300 }}
          value={format.maxDecimals}
          onChange={(value) =>
            Number(value) > -1 && editFormat(Number(value), 'maxDecimals')
          }
        />
      </div>
      <Divider className={colspan2} />
    </div>
  );
};
