import { ReactNode } from 'react';
import {
  IndexRouteObject,
  NonIndexRouteObject
} from 'react-router/dist/lib/context';

export type CustomRoute = Omit<
  IndexRouteObject | NonIndexRouteObject,
  'children'
> & {
  children?: CustomRoute[];
  collapsable?: boolean;
  icon?: Element | ReactNode;
  menuItem?: boolean;
  title?: string;
};
