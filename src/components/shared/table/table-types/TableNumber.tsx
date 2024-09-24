import { NumberFormat } from '../../../layout/number/NumberFormat.tsx';

interface TableDateProps {
  unit?: string;
  val: number;
}
export const TableNumber = ({ unit, val }: TableDateProps) => {
  return (
    <div className={'w-full'}>
      <NumberFormat value={val} /> {unit}
    </div>
  );
};
