import { useQuery } from '@tanstack/react-query';

import { UsagePointDTO } from '../../model/interface/usagePoint/UsagePointDTO';
import { axiosClickerInstance } from '../axios/axiosClickerApi';

export const UP_PER_STATION_KEY = 'UP_PER_STATION_KEY';

export const useGetUsagePointsPerTS = (
  transformerStationId: string | undefined
) =>
  useQuery({
    enabled: Boolean(transformerStationId),
    queryFn: async (): Promise<UsagePointDTO[]> => {
      const { data } = await axiosClickerInstance.get(
        `/usage-point/by-transformer-station/${transformerStationId}`
      );
      return data;
    },
    queryKey: [UP_PER_STATION_KEY, transformerStationId]
  });
