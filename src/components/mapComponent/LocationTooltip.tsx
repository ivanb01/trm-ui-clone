import { Typography } from 'antd';
import React from 'react';
import SuperCluster from 'supercluster';

import {
  Consumer,
  ControlUp,
  Exchange,
  Producer,
  Prosumer,
  TS35,
  TS110,
  TS1004,
  TSGeneral
} from '../../icons';
import { LocationDataDTOV2 } from '../../model/interface/usagePoint/LocationDataDTOV2';
import SelectTrafo from './SelectTrafo';

const { Text } = Typography;

interface Props {
  setSelectedConnection: React.Dispatch<
    React.SetStateAction<LocationDataDTOV2 | null>
  >;
  setTooltipProps: React.Dispatch<
    React.SetStateAction<SuperCluster.AnyProps | null>
  >;
  isOverlayHovered: React.MutableRefObject<boolean>;
  props: SuperCluster.AnyProps | null;
  // setSelectedTrafoIds: React.Dispatch<React.SetStateAction<null | number[]>>;
}

const LocationTooltip: React.FC<Props> = ({
  isOverlayHovered,
  props,
  setSelectedConnection,
  // setSelectedTrafoIds,
  setTooltipProps
}) => {
  if (!props) return null;

  const {
    ts35,
    ts110,
    ts1004,
    tsUnspecified,
    upConsumer,
    upControl,
    upExchange,
    upProducer,
    upProsumer
  } =
    'aggregatedData' in props
      ? props['aggregatedData']
      : 'location' in props
        ? props.location
        : props;
  const isOnlyOne =
    ts35 +
      ts110 +
      ts1004 +
      tsUnspecified +
      upConsumer +
      upControl +
      upExchange +
      upProducer +
      upProsumer <=
    1;
  if (isOnlyOne) return null;
  const shouldSelectTrafo = Boolean(props.location?.trafos?.length);

  return (
    <div className="rounded-[16px] bg-black bg-opacity-60 p-4">
      <div className="flex gap-x-2 ">
        <div>
          <div className={'flex items-center justify-start gap-2'}>
            <div className="relative flex size-[25px] items-center justify-center">
              <Consumer color={'#ADD8E6FF'} size={20} />
            </div>
            <Text className={'text-white'}>Consumer</Text>
            <Text className={'ml-auto text-white'}>{upConsumer || 0}</Text>
          </div>
          <div className={'flex items-center justify-start gap-2'}>
            <div className="relative flex size-[25px] items-center justify-center">
              <Producer color={'#4682B4'} size={20} />
            </div>
            <Text className={'text-white'}>Producer</Text>
            <Text className={'ml-auto text-white'}>{upProducer || 0}</Text>
          </div>
          <div className={'flex items-center justify-start gap-2'}>
            <div className="relative flex size-[25px] items-center justify-center">
              <Prosumer color={'#00CED1'} size={20} />
            </div>
            <Text className={'text-white'}>Prosumer</Text>
            <Text className={'ml-auto text-white'}>{upProsumer || 0}</Text>
          </div>
          <div className={'flex items-center justify-start gap-2'}>
            <div className="relative flex size-[25px] items-center justify-center">
              <ControlUp color={'#7B68EE'} size={20} />
            </div>
            <Text className={'text-white'}>Control</Text>
            <Text className={'ml-auto text-white'}>{upControl || 0}</Text>
          </div>
          <div className={'flex items-center justify-start gap-2'}>
            <div className="relative flex size-[25px] items-center justify-center">
              <Exchange color={'#008080'} size={20} />
            </div>
            <Text className={'text-white'}>Exchange</Text>
            <Text className={'ml-auto text-white'}>{upExchange || 0}</Text>
          </div>
        </div>
        <div>
          <div className={'flex items-center justify-start gap-2'}>
            <div className="relative flex size-[25px] items-center justify-center">
              <TS35 color={'#FFD700'} size={20} />
            </div>
            <Text className={'text-white'}>35kV</Text>
            <Text className={'ml-auto ml-auto text-white'}>{ts35 || 0}</Text>
          </div>
          <div className={'flex items-center justify-start gap-2'}>
            <div className="relative flex size-[25px] items-center justify-center">
              <TS1004 color={'#FF8C00'} size={20} />
            </div>

            <Text className={'text-white'}>10kV/0.4kV</Text>
            <Text className={'ml-auto text-white'}>{ts1004 || 0}</Text>
          </div>
          <div className={'flex items-center justify-start gap-2'}>
            <div className="relative flex size-[25px] items-center justify-center">
              <TS110 color={'#FF4500'} size={20} />
            </div>
            <Text className={'text-white'}>110kV</Text>
            <Text className={'ml-auto text-white'}>{ts110 || 0}</Text>
          </div>
          <div className={'flex items-center justify-start gap-2'}>
            <div className="relative flex size-[25px] items-center justify-center">
              <TSGeneral color={'#FFD700'} size={20} />
            </div>
            <Text className={'text-white'}>Unspecified</Text>
            <Text className={'ml-auto text-white'}>{tsUnspecified || 0}</Text>
          </div>
        </div>
      </div>
      {shouldSelectTrafo ? (
        <SelectTrafo
          isOverlayHovered={isOverlayHovered}
          location={props.location}
          setSelectedConnection={setSelectedConnection}
          // setSelectedTrafoIds={setSelectedTrafoIds}
          setTooltipProps={setTooltipProps}
          trafos={props.location.trafos}
        />
      ) : null}
    </div>
  );
};

export default LocationTooltip;
