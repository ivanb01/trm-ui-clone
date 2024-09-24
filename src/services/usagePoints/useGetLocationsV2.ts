import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { LocationDataDTOV2 } from '../../model/interface/usagePoint/LocationDataDTOV2.ts';
import { axiosClickerInstance } from '../axios/axiosClickerApi';

export const LOCATION_DATA_V2 = 'LOCATION_DATA_V2';

export const useGetLocationsDataV2 = ({
  filter
}: {
  filter: Record<string, Array<number | string>>;
}) => {
  const payloadData = () => {
    const ts = filter.tsTypes ?? [];
    const up = filter.upTypes ?? [];
    if (
      (ts.length > 0 && up.length > 0) ||
      (ts.length === 0 && up.length === 0)
    ) {
      return {
        tsTypes: ts,
        upTypes: up
      };
    }
    if (ts.length > 0 && up.length === 0) {
      return {
        tsTypes: ts,
        upTypes: ['undefined']
      };
    }
    if (ts.length === 0 && up.length > 0) {
      return {
        tsTypes: ['undefined'],
        upTypes: up
      };
    }
  };
  return useQuery({
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const res = await axiosClickerInstance.post<LocationDataDTOV2[]>(
        '/location/summary',
        payloadData()
      );

      return res.data;
    },
    queryKey: [
      LOCATION_DATA_V2,
      payloadData()?.tsTypes,
      payloadData()?.upTypes
    ],
    staleTime: 60 * 1000 * 60 * 5
  });
};
