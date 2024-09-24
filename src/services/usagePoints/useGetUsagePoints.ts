import { keepPreviousData, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useAtom } from 'jotai/index';
import { Extent } from 'ol/extent';

import { UsagePointInfo } from '../../model/interface/usagePoint/UsagePointInfo.ts';
import { filterAtom } from '../../state/atoms/filterAtom.ts';
import { SelectedUsagePointsAtom } from '../../state/atoms/selectedUsagePointsAtom.ts';
import { axiosInstance } from '../axios/axiosInstance.ts';

export const key = ['USAGE_POINTS_QUERY'];
export const useGetUsagePoints = (mapBounds: Extent | undefined) => {
  const [, setUpIds] = useAtom(SelectedUsagePointsAtom);
  const [filterSettings] = useAtom(filterAtom);

  return useQuery({
    enabled: Boolean(mapBounds),
    placeholderData: keepPreviousData,
    queryFn: async ({ signal }): Promise<Array<UsagePointInfo>> => {
      const ckIds = filterSettings.ckIds
        .map((item) => item - 21000)
        .join()
        .toString();
      const psIds = filterSettings.psIds
        .map((item) => item - 22000)
        .join()
        .toString();
      const ugIds = filterSettings.ugIds
        ?.map((item) => item - 23000)
        .join()
        .toString();
      const params = new URLSearchParams({
        firstCrdLat: `${mapBounds?.[1]}`,
        firstCrdLon: `${mapBounds?.[0]}`,
        secondCrdLat: `${mapBounds?.[3]}`,
        secondCrdLon: `${mapBounds?.[2]}`
      });
      if (ckIds && ckIds?.length > 0) {
        params.append('ckIds', ckIds);
      }
      if (psIds && psIds?.length > 0) {
        params.append('psIds', psIds);
      }
      if (ugIds && ugIds?.length > 0) {
        params.append('ugIds', ugIds);
      }
      const stringParams = params.toString();

      const { data } = await axiosInstance.get<Array<UsagePointInfo>>(
        // 'usagePoints?dt=2024-04-11T22:00:00.000Z&firstCrdLat=-85.0511&secondCrdLat=85.0511&firstCrdLon=-180&secondCrdLon=180'
        `usagePoints?dt=${dayjs(filterSettings.toDt).toISOString()}&${stringParams}`,
        { signal }
      );

      setUpIds(data.map((usagePointInfo) => usagePointInfo.id));
      return data;
    },
    queryKey: [...key, mapBounds, filterSettings]
  });
};
