import { Tag } from 'antd';

interface TableBooleanProps {
  val: string;
}
export const TableColor = ({ val }: TableBooleanProps) => {
  return (
    <Tag
      style={{
        color: val,
        height: 20,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: 50
      }}
      color={val}
    />
  );
};
