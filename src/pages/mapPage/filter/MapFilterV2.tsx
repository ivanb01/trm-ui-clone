import './filter.scss';

import { ClearOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router';

import NestedSelect from '../../../components/shared/nestedSelect/NestedSelect.tsx';

interface Props {
  isTsContext: boolean;
  setFilter: (e: Record<string, Array<string>>) => void;
  setTpIdFilter: (e?: string) => void;
  transformer?: string;
}

export const MapFilterV2 = forwardRef<HTMLDivElement, Props>(
  ({ isTsContext, setFilter }, ref) => {
    const navigate = useNavigate();

    const clearFilters = () => {
      navigate({ search: '' });
      setFilter({});
    };

    return (
      <div className={'z-10 w-full pb-4'} ref={ref}>
        <div className={''}>
          <Button
            icon={<ClearOutlined />}
            size={'small'}
            danger
            onClick={clearFilters}
          >
            Clear all filters
          </Button>
        </div>
        <div className={'mt-2 flex flex-wrap gap-1'}>
          <NestedSelect isTsContext={isTsContext} updateFilter={setFilter} />
        </div>
      </div>
    );
  }
);

MapFilterV2.displayName = 'MapFilterV2';
