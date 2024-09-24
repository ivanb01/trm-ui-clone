import { Button, Space } from 'antd';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import SuperCluster from 'supercluster';

import { TransformerStationDTO } from '../../model/interface/usagePoint/TransformerStationDTO.ts';

interface Props {
  setSelectedTransformerStation: React.Dispatch<
    React.SetStateAction<TransformerStationDTO | null>
  >;
  properties: SuperCluster.AnyProps | null;
}

const TooltipRow = <T extends ReactNode>({ children }: { children: T }) => (
  <div className="flex tabular-nums text-gray-800">{children}</div>
);

const TransformerStationOverview: React.FC<{
  setSelectedTransformerStation: React.Dispatch<
    React.SetStateAction<TransformerStationDTO | null>
  >;
  station: TransformerStationDTO;
}> = ({ setSelectedTransformerStation, station }) => {
  const navigate = useNavigate();
  return (
    <div>
      <TooltipRow>
        Name: <div className={'ml-1 font-bold'}>{station.name}</div>
      </TooltipRow>
      <TooltipRow>
        Type: <div className={'ml-1 font-bold'}>{station.usage_point_type}</div>
      </TooltipRow>
      <TooltipRow>
        Uniq id: <div className={'ml-1 font-bold'}>{station.nitesId}</div>
      </TooltipRow>
      <TooltipRow>
        Code: <div className={'ml-1 font-bold'}>{station.ucode}</div>
      </TooltipRow>
      <Space>
        <Button onClick={() => setSelectedTransformerStation(station)}>
          See UP relations
        </Button>
        <Button onClick={() => navigate(`/transformer-station/${station.id}`)}>
          See more details
        </Button>
      </Space>
    </div>
  );
};
export const TransformerStationTooltip = ({
  properties,
  setSelectedTransformerStation
}: Props) => {
  if (!properties) return null;

  const isCluster = Boolean(properties.cluster);

  const leaves = isCluster
    ? (properties.leaves as TransformerStationDTO[])
    : [properties.location as TransformerStationDTO];

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="app-custom-scroll flex max-h-[300px] flex-col gap-y-2 overflow-y-auto rounded bg-white p-4 shadow-xl">
      {leaves.map((ts) => (
        <TransformerStationOverview
          key={ts.id}
          setSelectedTransformerStation={setSelectedTransformerStation}
          station={ts}
        />
      ))}
    </div>
  );
};
