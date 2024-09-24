import {
  ApiOutlined,
  DashboardOutlined,
  DeleteRowOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { ErrorBoundaryRoute, Page } from '@layout';
import {
  Dashboard,
  Login,
  MapPageClickerV4,
  Preferences,
  Readings
} from '@pages';
import { Result } from 'antd';
import { createBrowserRouter, Link, RouteObject } from 'react-router-dom';

import { Placeholder } from '../components/placeholder/Placeholder.tsx';
import { CustomRoute } from '../model/interface/router/CustomRoute.ts';
import { Insights } from '../pages/insights/Insights.tsx';
import { Losses } from '../pages/losses/Losses.tsx';
import { TransformerDetailsPage } from '../pages/transformerDetails/TransformerDetailsPage.tsx';
import { MainRoutes } from './routes/MainRoutes.ts';
import { SettingsRoutes } from './routes/SettingsRoutes.ts';

export const mainAreaRoutes: Array<CustomRoute> = [
  {
    collapsable: true,
    element: <Dashboard />,
    errorElement: <ErrorBoundaryRoute />,
    icon: <DashboardOutlined />,
    index: true,
    menuItem: true,
    title: 'Dashboard'
  },
  {
    collapsable: true,
    element: <MapPageClickerV4 />,
    errorElement: <ErrorBoundaryRoute />,
    icon: <GlobalOutlined />,
    menuItem: true,
    path: MainRoutes.MAP,
    title: 'Map'
  },
  {
    collapsable: true,
    element: <TransformerDetailsPage />,
    errorElement: <ErrorBoundaryRoute />,
    menuItem: false,
    path: `${MainRoutes.TRANSFORMER}/:id`,
    title: 'transformer station'
  },
  {
    collapsable: true,
    element: <Readings />,
    errorElement: <ErrorBoundaryRoute />,
    icon: <ApiOutlined />,
    menuItem: true,
    path: MainRoutes.READINGS,
    title: 'Consumption'
  },
  {
    collapsable: true,
    element: <Losses />,
    errorElement: <ErrorBoundaryRoute />,
    icon: <DeleteRowOutlined />,
    menuItem: true,
    path: MainRoutes.LOSES,
    title: 'Losses'
  },
  {
    collapsable: true,
    element: <Insights />,
    errorElement: <ErrorBoundaryRoute />,
    icon: <InfoCircleOutlined />,
    menuItem: true,
    path: MainRoutes.INSIGHTS,
    title: 'Insights'
  },
  {
    children: [
      {
        element: <Preferences />,
        menuItem: true,
        path: SettingsRoutes.PREFERENCES,
        title: 'Preferences'
      }
    ],
    collapsable: true,
    errorElement: <ErrorBoundaryRoute />,
    icon: <SettingOutlined />,
    menuItem: true,
    path: MainRoutes.SETTINGS,
    title: 'Settings'
  },
  {
    element: <Placeholder />,
    errorElement: <ErrorBoundaryRoute />,
    icon: <WarningOutlined />,
    menuItem: false,
    path: MainRoutes.ERROR,
    title: 'Error page'
  },
  {
    element: (
      <Result
        extra={
          <Link to={'/'} type="primary">
            Back Home
          </Link>
        }
        status="404"
        subTitle="Sorry, the page you visited does not exist."
        title="404"
      />
    ),
    errorElement: <ErrorBoundaryRoute />,
    path: '*'
  }
];
const routes: CustomRoute[] = [
  {
    element: <Login />,
    errorElement: <ErrorBoundaryRoute />,
    path: MainRoutes.LOGIN
  },
  {
    children: mainAreaRoutes,
    element: <Page />,
    path: MainRoutes.HOME
  }
];
export const router = createBrowserRouter(routes as Array<RouteObject>);
