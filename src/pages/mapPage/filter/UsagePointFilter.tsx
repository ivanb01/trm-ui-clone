/* eslint-disable tailwindcss/no-custom-classname */
import { FC } from 'react';

import { UsagePointFilterSelection } from './UsagePointFilterSelection.tsx';

export interface UsagePointFilterInterface {
  upGroups: string[] | undefined;
  upId: string[] | undefined;
  upKind: string[] | undefined;
  upPricing: string[] | undefined;
  upType: string[] | undefined;
}

interface Props {
  onChange: (prop: string, val: string[]) => void;
  values: UsagePointFilterInterface;
}
export const UsagePointFilter: FC<Props> = ({ onChange, values }) => {
  return (
    <div className={'flex flex-wrap gap-1'}>
      <UsagePointFilterSelection
        filterProp={'upGroup'}
        placeholder={'Usage group'}
        prop={'upGroup'}
        values={values}
        onChange={onChange}
      />
      <UsagePointFilterSelection
        filterProp={'upPricing'}
        placeholder={'Pricing structure'}
        prop={'upPricingStructure'}
        values={values}
        onChange={onChange}
      />
      <UsagePointFilterSelection
        filterProp={'upKind'}
        placeholder={'Customer kind'}
        prop={'upCustomerKind'}
        values={values}
        onChange={onChange}
      />
    </div>
  );
};
