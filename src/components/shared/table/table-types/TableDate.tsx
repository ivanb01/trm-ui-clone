import dayjs from 'dayjs';
import { useAtom } from 'jotai';

import { dataFormatAtom } from '../../../../state/atoms/dataFormatAtom.ts';

interface TableDateProps {
  val: null | string;
}
export const TableDate = ({ val }: TableDateProps) => {
  const [format] = useAtom(dataFormatAtom);
  return (
    <div className={'w-fit'}>
      <div>{val ? dayjs(val).format(format.date) : 'N.S.'}</div>
    </div>
  );
};
