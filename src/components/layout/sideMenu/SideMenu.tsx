import { Image, Layout, Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router';

import { Logo } from '../../../assets/images';
import { CustomRoute } from '../../../model/interface/router/CustomRoute.ts';
import { mainAreaRoutes } from '../../../router/router.tsx';
import { MainRoutes } from '../../../router/routes/MainRoutes.ts';
import { getMenuActiveKeys } from '../../../utility/router/getMenuActiveKeys.ts';

type MenuItem = Required<MenuProps>['items'][number];

export const SideMenu = () => {
  const { Sider } = Layout;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      children,
      icon,
      key,
      label
    } as MenuItem;
  }
  function createMenuItems(
    routes: Array<CustomRoute>,
    parent?: string
  ): unknown {
    return routes?.map((item: CustomRoute) => {
      let nestedPath;
      if (parent) {
        if (item.index) {
          nestedPath = '';
        } else {
          nestedPath = item.path;
        }
      } else {
        nestedPath = item.path ? item.path : '/';
      }
      const fullPath = parent ? `${parent}/${nestedPath}` : nestedPath;
      return (
        item.menuItem &&
        getItem(
          item.title,
          fullPath,
          item.icon as ReactNode,
          item.collapsable && item.children
            ? (createMenuItems(item.children, fullPath) as ItemType[])
            : undefined
        )
      );
    });
  }
  return (
    <Sider
      breakpoint={'md'}
      collapsed={collapsed}
      theme={'light'}
      collapsible
      onCollapse={(value) => setCollapsed(value)}
    >
      <Image
        alt={'logo'}
        className={'p-6'}
        data-cy="logo"
        preview={false}
        src={Logo}
        onClick={() => navigate(MainRoutes.HOME)}
      />
      <Menu
        defaultOpenKeys={getMenuActiveKeys(location.pathname)}
        defaultSelectedKeys={getMenuActiveKeys(location.pathname)}
        items={createMenuItems(mainAreaRoutes) as ItemType[] | undefined}
        mode={'inline'}
        selectedKeys={getMenuActiveKeys(location.pathname)}
        theme="light"
        onClick={(e) => {
          navigate(e.key);
        }}
      />
    </Sider>
  );
};
