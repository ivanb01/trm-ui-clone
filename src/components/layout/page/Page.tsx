import { SideMenu } from '@layout';
import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { MainRoutes } from '../../../router/routes/MainRoutes.ts';
import {
  LocalStorage,
  LocalStorageItems
} from '../../../utility/LocalStorage.tsx';

export const Page = () => {
  const { Content } = Layout;
  const navigate = useNavigate();
  useEffect(() => {
    const token = LocalStorage.getItem(LocalStorageItems.AccessToken);
    if (!token) {
      navigate(`../${MainRoutes.LOGIN}`);
    }
  }, [navigate]);
  return (
    <Layout
      className={'overflow-hidden'}
      data-cy="global-container"
      style={{ height: '100vh', maxHeight: '100svh' }}
    >
      <SideMenu />
      <Layout>
        {/*<Space direction={'vertical'} size={'large'}>
          <Crumbs />
        </Space>*/}
        <Content className={'h-full overflow-auto p-1 md:px-4 lg:px-8'}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
