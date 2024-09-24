import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Breadcrumb,
  Button,
  Divider,
  Popover,
  Space,
  Typography
} from 'antd';
import { useNavigate } from 'react-router';
import { Link, useLocation } from 'react-router-dom';

import { CustomRoute } from '../../../model/interface/router/CustomRoute.ts';
import { mainAreaRoutes } from '../../../router/router.tsx';
import { MainRoutes } from '../../../router/routes/MainRoutes.ts';
import {
  LocalStorage,
  LocalStorageItems
} from '../../../utility/LocalStorage.tsx';

const { Text } = Typography;

export const Crumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const handleLogout = () => {
    LocalStorage.removeItem(LocalStorageItems.AccessToken);
    navigate(`../${MainRoutes.LOGIN}`);
  };
  const content = (
    <div className={'w-[150px] tabular-nums'}>
      <Divider className={'my-2'} />
      <Button
        className={'cursor-pointer tabular-nums hover:font-bold'}
        data-cy="logout-btn"
        type={'text'}
        onClick={handleLogout}
      >
        Log out <LogoutOutlined />
      </Button>
    </div>
  );
  const findTitleByPath = (
    routes: CustomRoute[],
    path: string
  ): null | string => {
    for (const { children, path: routePath, title } of routes) {
      if (children) {
        const childTitle = findTitleByPath(children, path);
        if (childTitle) {
          return childTitle;
        }
      }
      if (routePath === path && title) {
        return title;
      }
    }
    return null;
  };

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const key = [...pathSnippets];
    key.reverse();
    return {
      key: url,
      title:
        findTitleByPath(mainAreaRoutes, key[key.length - (index + 1)]) ??
        key[key.length - (index + 1)]
    };
  });
  const breadcrumbItems = [
    {
      key: 'home',
      title: (
        <Link to="/">
          <HomeOutlined />
        </Link>
      )
    }
  ].concat(
    extraBreadcrumbItems.map(({ key, title }) => ({
      key,
      title: <span>{title}</span>
    }))
  );

  return (
    <div
      className={
        'flex grid-cols-3 flex-col-reverse gap-3 px-4 lg:grid lg:flex-row lg:items-center lg:justify-between'
      }
    >
      <div>
        <Breadcrumb className={'px-2 lg:px-8'} items={breadcrumbItems} />
      </div>
      {/*<div className={'flex lg:justify-center'}>
        <Button
          data-cy={'global-filter-open'}
          icon={<FilterOutlined />}
          onClick={onOpenFilter}
        >
          Filter
        </Button>
      </div>*/}
      <div className={'flex lg:justify-end lg:px-8'}>
        <Popover content={content}>
          <Space
            className={'cursor-pointer rounded p-2 hover:shadow-md'}
            data-cy="username-popover"
          >
            <Avatar
              gap={2}
              icon={<UserOutlined />}
              size="large"
              style={{ verticalAlign: 'middle' }}
            />
            <Text>Username</Text>
          </Space>
        </Popover>
      </div>
    </div>
  );
};
