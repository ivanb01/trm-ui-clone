import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { Card } from 'antd';
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const Dashboard = () => {
  const layouts: Layouts = {
    lg: [
      { h: 4, i: 'a', w: 2, x: 0, y: 0 },
      { h: 2, i: 'b', w: 3, x: 4, y: 0 },
      { h: 2, i: 'c', w: 2, x: 9, y: 0 }
    ],
    md: [],
    sm: [],
    xs: [],
    xxs: []
  };
  layouts.md = layouts.lg.map((item) => ({ ...item, w: 5 }));
  layouts.sm = layouts.lg.map((item) => ({ ...item, w: 2 }));
  layouts.xs = layouts.lg.map((item) => ({ ...item, w: 4 }));
  layouts.xxs = layouts.lg.map((item) => ({ ...item, w: 4 }));

  return (
    <ResponsiveGridLayout
      breakpoints={{ lg: 996, md: 768, sm: 480, xs: 0, xxs: 0 }}
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="layout m-auto h-full"
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      compactType={'horizontal'}
      layouts={layouts}
      rowHeight={150}
    >
      <Card data-cy="acard" key="a" title="Widget 1" />
      <Card data-cy="bcard" key="b" title="Widget 2" />
      <Card data-cy="ccard" key="c" title="Widget 3" />
    </ResponsiveGridLayout>
  );
};
