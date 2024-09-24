import { Tag } from 'antd';

interface TableBooleanProps {
  val: string;
}
export const TableTag = ({ val }: TableBooleanProps) => {
  return <Tag color={val ? 'green' : 'white'}>{val?.toUpperCase()}</Tag>;
};
