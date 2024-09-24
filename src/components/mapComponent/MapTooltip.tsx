import { Tabs, TabsProps } from 'antd';
import { ReactNode } from 'react';
import SuperCluster from 'supercluster';

import { EventDTO } from '../../model/interface/usagePoint/EventDTO.ts';
import {
  AddressFormat,
  UsagePointInfo
} from '../../model/interface/usagePoint/UsagePointInfo.ts';
import { TableDate } from '../shared/table/table-types/TableDate.tsx';

interface Props {
  properties: SuperCluster.AnyProps | null;
}

function formatAddress(address: AddressFormat) {
  const addressSplit = address.split(' > ');
  return addressSplit;
}

const TooltipRow = <T extends ReactNode>({ children }: { children: T }) => (
  <div className="flex tabular-nums text-gray-800">{children}</div>
);

const EventsContent: React.FC<{ event: EventDTO }> = ({ event }) => {
  return (
    <>
      <TooltipRow>
        Type: <div className={'ml-1 font-bold'}>{event.eventTypeName}</div>
      </TooltipRow>
      <TooltipRow>
        Metric: <div className={'ml-1 font-bold'}>{event.eventMetric}</div>
      </TooltipRow>
      <TooltipRow>
        Date:{' '}
        <div className={'ml-1 flex font-bold'}>
          <TableDate val={event.fromDt} /> - <TableDate val={event.toDt} />
        </div>
      </TooltipRow>
    </>
  );
};
export const MapTooltip = ({ properties }: Props) => {
  if (!properties) return null;
  const isCluster = Boolean(properties.cluster);
  if (isCluster) {
    const leaves = properties.leaves as UsagePointInfo[];
    return (
      <div className="flex max-h-[300px] flex-col gap-y-2 overflow-y-auto rounded bg-white p-4 shadow-xl">
        <TooltipRow>
          Cluster:{' '}
          <div className={'ml-1 font-bold'}>{leaves.length}&nbsp;points</div>
        </TooltipRow>
        <TooltipRow>
          Total power:{' '}
          <div className={'ml-1 font-bold'}>
            {leaves
              .reduce((acc, l) => {
                return l.ratedPower + acc;
              }, 0)
              .toFixed(2)}
          </div>
        </TooltipRow>
      </div>
    );
  }

  const {
    id,
    address,
    customerKind,
    events,
    extUcode,
    fromDt,
    lat,
    lon,
    name,
    notice,
    pricingStructure,
    ratedPower,
    toDt,
    ucode,
    usageGroup,
    usagePointType
  } = properties.location as UsagePointInfo;

  const [state, zipCity, zip, city, street, streetNum] = formatAddress(address);
  const hasEvents = Boolean(events?.length);
  const tabs: TabsProps['items'] = (events || []).map((e, idx) => ({
    children: <EventsContent event={e} />,
    key: `${idx}`,
    label: e.eventTypeName
  }));

  return (
    <div
      className={
        'custom-scroll flex max-h-[300px] flex-col items-center overflow-y-auto rounded bg-white p-4 shadow-xl'
      }
    >
      <div>
        <div className={'text-lg font-bold text-blue-500'}>ID:&nbsp;{id}</div>
        <TooltipRow>Name: {name}</TooltipRow>
        <TooltipRow>
          Country: <div className={'ml-1 font-bold'}>{state}</div>
        </TooltipRow>
        <TooltipRow>
          Postal Code:
          <div className={'ml-1 font-bold'}>
            {zip} {zipCity}
          </div>
        </TooltipRow>
        <TooltipRow>
          City: <div className={'ml-1 font-bold'}>{city}</div>
        </TooltipRow>
        <TooltipRow>
          Street: <div className={'ml-1 font-bold'}>{street}</div>
        </TooltipRow>
        {Boolean(streetNum) && (
          <TooltipRow>
            Street Number: <div className={'ml-1 font-bold'}>{streetNum}</div>
          </TooltipRow>
        )}
        <TooltipRow>
          Location:{' '}
          <div className={'ml-1 font-bold'}>
            {lon}, {lat}
          </div>
        </TooltipRow>
        <TooltipRow>
          Rated power: <div className={'ml-1 font-bold'}>{ratedPower}</div>
        </TooltipRow>
        <TooltipRow>
          Customer kind: <div className={'ml-1 font-bold'}>{customerKind}</div>
        </TooltipRow>
        <TooltipRow>
          Ucode: <div className={'ml-1 font-bold'}>{ucode}</div>
        </TooltipRow>
        <TooltipRow>
          Ext Ucode: <div className={'ml-1 font-bold'}>{extUcode}</div>
        </TooltipRow>
        <TooltipRow>
          Date:{' '}
          <div className={'ml-1 flex font-bold'}>
            <TableDate val={fromDt} /> - <TableDate val={toDt} />
          </div>
        </TooltipRow>
        <TooltipRow>
          Pricing structure:{' '}
          <div className={'ml-1 font-bold'}>{pricingStructure}</div>
        </TooltipRow>
        <TooltipRow>
          Usage group: <div className={'ml-1 font-bold'}>{usageGroup}</div>
        </TooltipRow>
        <TooltipRow>
          Usage point type:{' '}
          <div className={'ml-1 font-bold'}>{usagePointType}</div>
        </TooltipRow>
        <TooltipRow>
          Notice: <div className={'ml-1 font-bold'}>{notice}</div>
        </TooltipRow>
        <TooltipRow>
          <span className="font-bold">Events:</span>
          <div className={'ml-1 font-bold'}>
            {hasEvents ? events.length : 'None'}
          </div>
        </TooltipRow>
        <div>
          <Tabs defaultActiveKey={'0'} items={tabs} />
        </div>
      </div>
    </div>
  );
};
