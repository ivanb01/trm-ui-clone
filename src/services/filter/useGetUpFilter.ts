import { useQuery } from '@tanstack/react-query';

import { axiosClickerInstance } from '../axios/axiosClickerApi.ts';

export const key = ['USAGE_POINT_FILTER'];
export const useGetUpFilter = () =>
  useQuery({
    _optimisticResults: 'optimistic',
    queryFn: async (): Promise<Record<string, Array<string>>> => {
      const { data } = await axiosClickerInstance('/usage-point/filters');
      return data;
    },
    queryKey: [...key],
    staleTime: Infinity
  });
