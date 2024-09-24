import { Image } from 'antd';

interface TableImageProps {
  val: string;
}
export const TableImage = ({ val }: TableImageProps) => {
  return val ? <Image height={50} src={val} /> : null;
};
