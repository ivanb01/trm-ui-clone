import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { LocationDataDTOV2 } from '../../model/interface/usagePoint/LocationDataDTOV2';
import { TrafoV3DTO } from '../../model/interface/usagePoint/TrafoV3DTO.ts';
import { axiosClickerV3Instance } from '../axios/axiosClickerApi';

export const TRAFOS_DATA_V3 = 'TRAFOS_DATA_V3';

const responseCache: { data: TrafoV3DTO[] | null } = { data: null };

export const useGetTrafosV3 = ({
  filter
}: {
  filter: Record<string, Array<number | string>>;
}) => {
  return useQuery({
    placeholderData: keepPreviousData,
    queryFn: async () => {
      let res = responseCache;
      if (!res.data) {
        res = await axiosClickerV3Instance.get<TrafoV3DTO[]>(
          '/transformer-stations/counts'
        );
      }

      const worker = new Worker(
        new URL('./clusteringWorker.js', import.meta.url),
        { type: 'module' }
      );
      worker.postMessage({ filter: filter, res: res.data });
      const transformedResponse = await new Promise<LocationDataDTOV2[]>(
        (resolve) => {
          worker.onmessage = (
            ev: MessageEvent<{ transformedRes: LocationDataDTOV2[] }>
          ) => {
            resolve(ev.data.transformedRes);
          };
        }
      );

      return transformedResponse;
    },
    queryKey: [TRAFOS_DATA_V3, filter],
    staleTime: 60 * 1000 * 60 * 5
  });
};
