import { Badge, Tag, TreeSelect, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { TbSquareDotFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

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
} from '../../../icons';
import { LocationDataDTOV2 } from '../../../model/interface/usagePoint/LocationDataDTOV2.ts';
// import { useGetTsFilter } from '../../../services/filter/useGetTsFilter.ts';
// import { useGetUpFilter } from '../../../services/filter/useGetUpFilter.ts';
import { useGetTrafosV3 } from '../../../services/usagePoints/useGetTrafosV3.ts';
import { getSearchParamsAsObject } from '../../../utility/helpers/filter.ts';

const { Text } = Typography;
const { SHOW_CHILD } = TreeSelect;

const getLabel = (key: string) => {
  switch (key) {
    case 'tsTypes':
      return (
        <div className={'flex items-center justify-start gap-2'}>
          <Text>Transformer Stations</Text>
        </div>
      );
    case 'upTypes':
      return (
        <div className={'flex items-center justify-start gap-2'}>
          <Text>Usage Points</Text>
        </div>
      );
  }
};
interface Props {
  isTsContext?: boolean;
  updateFilter: (e: Record<string, Array<string>>) => void;
}
const NestedSelect: FC<Props> = ({ isTsContext, updateFilter }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tSFilterData] = useState({
    tsType: [
      'Distributivna trafostanica',
      'Distributivna trafostanica 110kV',
      'DISTRIBUTIVNA TRAFOSTANICA 10/0,4 KV',
      'Distributivna trafostanica 35kV'
    ]
  });

  const [upFilterData] = useState({
    upType: [
      'Distribucija, kontrolno',
      'Distribucija, kupac',
      'Distribucija, kupac - proizvodac',
      'Distribucija, proizvođač',
      'Distribucija, razmena'
    ]
  });

  // const { data: upFilterData } = useGetUpFilter();
  // const { data: tSFilterData } = useGetTsFilter();
  const [value, setValue] = useState<string[]>([]);
  const { data: locationsData } = useGetTrafosV3({
    filter: { tsTypes: [], upTypes: [] }
  });
  function summarizeProperties(dataArray?: Array<LocationDataDTOV2>) {
    const summary = {
      ts35: 0,
      ts110: 0,
      ts1004: 0,
      tsUnspecified: 0,
      upConsumer: 0,
      upControl: 0,
      upExchange: 0,
      upProducer: 0,
      upProsumer: 0
    };

    dataArray?.forEach((obj) => {
      summary.tsUnspecified += obj.tsUnspecified || 0;
      summary.ts35 += obj.ts35 || 0;
      summary.ts1004 += obj.ts1004 || 0;
      summary.ts110 += obj.ts110 || 0;
      summary.upProducer += obj.upProducer || 0;
      summary.upConsumer += obj.upConsumer || 0;
      summary.upProsumer += obj.upProsumer || 0;
      summary.upControl += obj.upControl || 0;
      summary.upExchange += obj.upExchange || 0;
    });

    return summary;
  }

  const pointCount = summarizeProperties(locationsData);
  useEffect(() => {
    const values = getSearchParamsAsObject(location.search);
    const ts = values.tsTypes ?? [];
    const up = values.upTypes ?? [];
    const val = [...ts, ...up];
    setValue(val);
    //updateFilter({ tsTypes: ts, upTypes: up });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, upFilterData, tSFilterData]);
  const associateAmountWithData = (
    prop: string,
    data: Record<string, number>
  ) => {
    switch (prop) {
      case 'Distribucija, kontrolno':
        return {
          count: data.upControl,
          icon: <ControlUp color={'#ADD8E6'} size={15} />
        };
      case 'Distribucija, kupac - proizvodac':
        return {
          count: data.upProsumer,
          icon: <Prosumer color={'#00CED1'} size={15} />
        };
      case 'Distribucija, kupac':
        return {
          count: data.upConsumer,
          icon: <Consumer color={'#ADD8E6'} size={15} />
        };
      case 'Distribucija, razmena': {
        return {
          count: data.upExchange,
          icon: <Exchange color={'#008080'} size={15} />
        };
      }
      case 'Distribucija, proizvođač': {
        return {
          count: data.upProducer,
          icon: <Producer color={'#4682B4'} size={15} />
        };
      }
      case 'DISTRIBUTIVNA TRAFOSTANICA 10/0,4 KV':
        return {
          count: data.ts1004,
          icon: <TS1004 color={'#FF8C00'} size={15} />
        };
      case 'Distributivna trafostanica 35kV':
        return { count: data.ts35, icon: <TS35 color={'#FFD700'} size={15} /> };
      case 'Distributivna trafostanica 110kV':
        return {
          count: data.ts110,
          icon: <TS110 color={'#FF4500'} size={15} />
        };
      case 'Distributivna trafostanica':
        return {
          count: data.tsUnspecified,
          icon: <TSGeneral color={'#FFD700'} size={15} />
        };
    }
  };
  const treeData = [
    {
      children: upFilterData?.upType.map((type: string) => {
        return {
          key: type,
          title: (
            <div className={'flex items-center gap-4'}>
              {associateAmountWithData(type, pointCount)?.icon}
              {type}{' '}
              <Tag>{associateAmountWithData(type, pointCount)?.count}</Tag>
            </div>
          ),
          value: type
        };
      }),
      key: 'upTypes',
      title: (
        <div className={'flex items-center justify-start gap-2'}>
          <TbSquareDotFilled color={'skyblue'} size={18} />
          <Text>Usage Points</Text>
        </div>
      ),
      value: 'Usage Points'
    },
    {
      children: tSFilterData?.tsType.map((type: string) => {
        return {
          disabled: Boolean(isTsContext),
          key: type,
          title: (
            <div className={'flex items-center gap-4'}>
              {associateAmountWithData(type, pointCount)?.icon}
              {type}{' '}
              <Tag>{associateAmountWithData(type, pointCount)?.count}</Tag>
            </div>
          ),
          value: type
        };
      }),
      disabled: Boolean(isTsContext),
      key: 'tsTypes',
      title: (
        <div className={'flex items-center justify-start gap-2'}>
          <TbSquareDotFilled color={'orange'} size={18} />
          <Text>Transformer Stations</Text>
        </div>
      ),
      value: 'Transformer Stations'
    }
  ];

  const onChange = (newValue: string[]) => {
    console.log('new value ', newValue, treeData);
    const groupedValues: { [key: string]: string[] } = {};
    newValue.forEach((val) => {
      treeData.forEach((parentNode) => {
        const subOptions = parentNode.children?.map((child) => child.value);
        if (subOptions?.includes(val)) {
          if (!groupedValues[parentNode.key]) {
            groupedValues[parentNode.key] = [];
          }
          groupedValues[parentNode.key].push(val);
        }
      });
    });
    updateFilter(groupedValues);
    setValue(newValue);
    const params = new URLSearchParams(location.search);
    params.delete('tsTypes');
    params.delete('upTypes');
    Object.entries(groupedValues).forEach(([key, value]) => {
      params.append(key, value.map(encodeURIComponent).join(','));
    });
    navigate({ search: params.toString() });
  };

  const getAggregatedDisplayValue = () => {
    const countMap = new Map();

    treeData.forEach((item) => {
      const subOptions = item.children?.map((subItem) => subItem.value) || [];
      const selectedSubOptions = subOptions.filter((subOption) =>
        value.includes(subOption)
      );
      if (selectedSubOptions.length > 0) {
        countMap.set(item.key, selectedSubOptions.length);
      }
    });

    if (Array.from(countMap.entries()).length > 0)
      return (
        <div className={'flex items-center justify-start gap-4'}>
          <Text>Location types: </Text>
          {Array.from(countMap.entries())?.map(([key, count]) => (
            <div className={'flex items-center justify-start gap-1'} key={key}>
              {getLabel(key)}
              <Badge
                color={
                  key === 'upTypes'
                    ? 'skyblue'
                    : key === 'tsTypes'
                      ? 'orange'
                      : 'gray'
                }
                styles={{
                  indicator: {
                    borderRadius: 4
                  }
                }}
                count={count}
              />
            </div>
          ))}
        </div>
      );
    else return null;
  };

  return (
    <div>
      <TreeSelect
        allowClear={false}
        dropdownStyle={{ maxHeight: 450, overflow: 'auto', width: 450 }}
        maxTagCount={0}
        maxTagPlaceholder={() => getAggregatedDisplayValue()}
        multiple={false}
        placeholder={<Text>Location types</Text>}
        showCheckedStrategy={SHOW_CHILD}
        showSearch={false}
        size="middle"
        style={{ width: 450 }}
        treeCheckStrictly={false}
        treeCheckable={true}
        treeData={treeData}
        treeDataSimpleMode={false}
        treeNodeFilterProp="title"
        value={value}
        variant={'borderless'}
        treeDefaultExpandAll
        onChange={onChange}
      />
    </div>
  );
};

export default NestedSelect;
