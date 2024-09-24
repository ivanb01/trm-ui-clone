import './style.scss';

import { Slider } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef } from 'react';

import { LineGraphData } from '../../../model/graphs/LineGraphData.ts';
import { TimeSeries } from '../timeSeriesGraph/TimeSeries.tsx';

interface GraphFilterProps {
  data: LineGraphData[];
  onSelectRange: (e: number[], value: { from: string; to: string }) => void;
}
export const GraphFilter = ({ data, onSelectRange }: GraphFilterProps) => {
  const ref = useRef<HTMLInputElement>(null);
  function extractUniqueDates(data: LineGraphData[]): string[] {
    const dateSet = new Set<string>();

    data.forEach((item) => {
      item.data.forEach((point) => {
        dateSet.add(point.x);
      });
    });

    return Array.from(dateSet).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
  }
  const uniqueDates = extractUniqueDates(data);
  const handleSliderChange = useCallback(
    (range: number[]) => {
      onSelectRange(range, {
        from: uniqueDates[range[0]],
        to: uniqueDates[range[1]]
      });
    },
    [data]
  );
  useEffect(() => {
    handleSliderChange([0, data[0]?.data?.length]);
  }, []);

  const formatter = (value: number) => {
    return value > -1 && dayjs(uniqueDates[value]).format('DD.MM.YYYY HH:mm');
  };
  return (
    <div className={'relative h-32'}>
      <Slider
        className={
          'absolute bottom-16 left-[45px] z-10 w-[calc(100%-100px)] p-0'
        }
        styles={{
          handle: { cursor: 'col-resize', height: 36, width: 1 },
          rail: { background: 'transparent', height: 36 },
          track: {
            background:
              'linear-gradient(0, rgba(255,255,255,0.2) 10%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 90%, rgba(255,255,255,0.2) 100%)',
            height: 40
          }
        }}
        defaultValue={[0, data[0]?.data?.length - 1]}
        max={data[0]?.data?.length - 1}
        min={0}
        range={{ draggableTrack: true }}
        ref={ref}
        tooltip={{ formatter: (e) => e && formatter(e) }}
        onChangeComplete={(e: number[]) => handleSliderChange(e)}
      />
      <TimeSeries data={data} xTicksNumber={8} yAxis={false} />
    </div>
  );
};
