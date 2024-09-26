import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import { useAtom } from 'jotai';
import { RouterProvider } from 'react-router-dom';

import { router } from './router/router.tsx';
import { themeAtom } from './state/atoms/themeAtom.ts';
import Index from "../packages/nites-fe-platform-app/app/routes/_index.tsx"
const queryClient = new QueryClient();

function App() {
  const [theme] = useAtom(themeAtom);
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          ...theme,
          components: {
            Slider: {
              algorithm: true,
              handleLineWidthHover: 1
            }
          }
        }}
        iconPrefixCls="anticon"
        prefixCls="ant"
      >
        <RouterProvider router={router} />
        <Index />
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
