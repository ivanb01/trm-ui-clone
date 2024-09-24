import { Button, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useEffect, useState } from 'react';
import SuperCluster from 'supercluster';

import { LocationDataDTOV2 } from '../../model/interface/usagePoint/LocationDataDTOV2';
import { TrafoV3DTO } from '../../model/interface/usagePoint/TrafoV3DTO';

interface Props {
  setSelectedConnection: React.Dispatch<
    React.SetStateAction<LocationDataDTOV2 | null>
  >;
  setTooltipProps: React.Dispatch<
    React.SetStateAction<SuperCluster.AnyProps | null>
  >;
  isOverlayHovered: React.MutableRefObject<boolean>;
  location: LocationDataDTOV2;

  trafos: TrafoV3DTO[];
}

const SelectTrafo: React.FC<Props> = ({
  isOverlayHovered,
  location,
  setSelectedConnection,

  setTooltipProps,
  trafos
}) => {
  const [selectedTrafos, setSelectedTrafos] = useState(trafos.map((t) => t.id));

  useEffect(() => {
    setSelectedTrafos(trafos.map((t) => t.id));
  }, [trafos]);

  function getType(typeId: number) {
    switch (typeId) {
      case 6:
        return 'Unspecified';
      case 7: {
        return '110kV';
      }
      case 8: {
        return '10kV/0.4kV';
      }
      case 9: {
        return '35kV';
      }
    }
  }

  function onChangeCheckbox(e: CheckboxChangeEvent, id: number) {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedTrafos((trs) => [...trs, id]);
    } else {
      setSelectedTrafos((trs) => trs.filter((t) => t !== id));
    }
  }

  function onSelectAll() {
    setSelectedTrafos((trs) => {
      if (trs.length === trafos.length) return [];
      return trafos.map((t) => t.id);
    });
  }

  function onApply() {
    // setSelectedTrafoIds(selectedTrafos);

    const tsStats = {
      ts35: 0,
      ts110: 0,
      ts1004: 0,
      tsUnspecified: 0
    };
    const filteredTrafos = location.trafos.filter((t) =>
      selectedTrafos.includes(t.id)
    );
    filteredTrafos.forEach((t) => {
      switch (t.type_id) {
        case 6: {
          tsStats.tsUnspecified += 1;
          break;
        }
        case 7: {
          tsStats.ts110 += 1;
          break;
        }
        case 8: {
          tsStats.ts1004 += 1;
          break;
        }
        case 9: {
          tsStats.ts35 += 1;
          break;
        }
      }
    });
    setSelectedConnection({
      ...location,
      trafos: filteredTrafos,
      ...tsStats
    });
    setTooltipProps(null);
    isOverlayHovered.current = false;
  }
  return (
    <div className="flex flex-col gap-y-1 text-white">
      <div>Select trafo(s)</div>
      <Checkbox
        checked={selectedTrafos.length === trafos.length}
        onChange={onSelectAll}
      >
        <span className="text-white">Select All</span>
      </Checkbox>
      {trafos.map((t: TrafoV3DTO) => (
        <div key={t.id}>
          <Checkbox
            checked={selectedTrafos.includes(t.id)}
            onChange={(e) => onChangeCheckbox(e, t.id)}
          >
            <span className="text-white">
              {getType(t.type_id)}&nbsp;-&nbsp;{t.id}
            </span>
          </Checkbox>
        </div>
      ))}
      <Button disabled={!selectedTrafos.length} onClick={onApply}>
        Apply
      </Button>
    </div>
  );
};

export default SelectTrafo;
