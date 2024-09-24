import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

interface TableBooleanProps {
  val: boolean;
}
export const TableBoolean = ({ val }: TableBooleanProps) => {
  return (
    <div className={'w-full text-center'}>
      {val ? (
        <CheckOutlined className={'text-green-800'} />
      ) : (
        <CloseOutlined className={'text-red-700'} />
      )}
    </div>
  );
};
