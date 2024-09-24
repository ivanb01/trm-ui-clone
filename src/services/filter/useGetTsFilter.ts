import { useQuery } from '@tanstack/react-query';

import { axiosClickerInstance } from '../axios/axiosClickerApi.ts';

export const key = ['TRANSFORMER_STATION_FILTER'];
export const useGetTsFilter = () =>
  useQuery({
    queryFn: async (): Promise<Record<string, Array<string>>> => {
      const { data } = await axiosClickerInstance(
        '/transformer-stations/filters'
      );
      return data;
    },
    queryKey: [...key],
    staleTime: Infinity
  });
