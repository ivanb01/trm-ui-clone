import { StopOutlined } from '@ant-design/icons';
import { ColorSchemeId } from '@nivo/colors/dist/types/schemes';
import { ResponsiveLineCanvas } from '@nivo/line';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

import { LineGraphData } from '../../../model/graphs/LineGraphData';
import { dataFormatAtom } from '../../../state/atoms/dataFormatAtom';
import { preferencesAtom } from '../../../state/atoms/preferencesAtom';

export interface TimeSeriesProps {
  data: LineGraphData[];
  legend?: boolean;
  xTicksNumber?: number;
  yAxis?: boolean;
}

export const TimeSeries = ({
  data,
  xTicksNumber = 3,
  yAxis = true
}: TimeSeriesProps) => {
  const [theme] = useAtom(preferencesAtom);
  const [format] = useAtom(dataFormatAtom);

  /**
   * Returns fixed number of ticks on axis in order to declutter if too many values will be displayed
   * @param numElements
   * @param axis
   */
  const spreadArray = (
    numElements: number,
    axis: 'x' | 'y'
  ): (number | string)[] => {
    if (numElements < 2) return [];

    const graphData = data[0].data;
    const length = graphData.length;

    if (numElements >= length) {
      return graphData.map((item) => item[axis]);
    }

    const result = new Array(numElements);
    const step = (length - 1) / (numElements - 1);

    for (let i = 0; i < numElements; i++) {
      const index = Math.round(i * step);
      result[i] = graphData[index][axis];
    }

    return result;
  };

  /**
   * Checks if any series have more than two elements so graph can be drawn
   */
  const hasValidData = useMemo(
    () => data.some((item) => item.data.length > 1),
    [data]
  );

  return (
    <div className="size-full">
      {hasValidData ? (
        <ResponsiveLineCanvas
          axisBottom={{
            format: (value) => dayjs(value).format(format.date),
            legendOffset: 36,
            legendPosition: 'middle',
            tickPadding: 5,
            tickRotation: 0,
            tickSize: 5,
            tickValues: spreadArray(xTicksNumber, 'x')
          }}
          axisLeft={
            yAxis
              ? {
                  tickPadding: 0,
                  tickRotation: 0,
                  tickSize: 5
                }
              : null
          }
          colors={{
            scheme: (theme.graphScheme as ColorSchemeId) ?? 'category10'
          }}
          yScale={{
            max: 'auto',
            min: 0,
            reverse: false,
            stacked: false,
            type: 'linear'
          }}
          areaOpacity={0.2}
          axisRight={null}
          axisTop={null}
          crosshairType="cross"
          data={data}
          data-cy="time-series"
          debugMesh={false}
          debugSlices={false}
          enableArea={true}
          enableGridX={false}
          enableGridY={false}
          enablePoints={false}
          enableSlices={false}
          enableTouchCrosshair={true}
          isInteractive={true}
          legends={[]}
          lineWidth={1}
          margin={{ bottom: 50, left: 50, right: 50, top: 50 }}
          pointBorderColor={{ from: 'serieColor' }}
          pointBorderWidth={2}
          pointColor={{ theme: 'background' }}
          pointSize={10}
          sliceTooltip={() => null}
          tooltip={() => null}
          xScale={{ type: 'point' }}
          yFormat=" >-.2f"
          enableCrosshair
        />
      ) : (
        <div className="relative flex h-32 items-center justify-center">
          <StopOutlined className="text-xl text-red-700" /> No data available
        </div>
      )}
    </div>
  );
};
