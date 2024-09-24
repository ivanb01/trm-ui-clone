import { Typography } from 'antd';
import { FC, useEffect } from 'react';

const { Text, Title } = Typography;
export const Placeholder: FC = () => {
  useEffect(() => {
    throw new Error('intentional error');
  });
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Title className="mb-4" level={1}>
        Hello, Tailwind CSS!
      </Title>
      <Text>This is a simple React component styled with Tailwind CSS.</Text>
    </div>
  );
};
