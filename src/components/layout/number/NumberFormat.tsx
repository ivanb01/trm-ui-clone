import { useAtom } from 'jotai';
import { FC } from 'react';

import { dataFormatAtom } from '../../../state/atoms/dataFormatAtom.ts';

interface NumberProps {
  value: number;
}
export const NumberFormat: FC<NumberProps> = ({ value }) => {
  const [format] = useAtom(dataFormatAtom);
  return (
    <span>
      {value?.toLocaleString(format.locale, {
        maximumFractionDigits: format.maxDecimals,
        minimumFractionDigits: 0
      })}
    </span>
  );
};
