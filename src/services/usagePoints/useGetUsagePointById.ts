import { useQuery } from '@tanstack/react-query';

import { axiosClickerInstance } from '../axios/axiosClickerApi';

export const UP_BY_ID_KEY = 'UP_BY_ID_KEY';

export const useGetUsagePointsPerTS = (upId: string) => {
  const { data, isSuccess } = useQuery({
    queryFn: async () => {
      const res = await axiosClickerInstance.get<any>(`/usage-point/${upId}`);
      return res.data;
    },
    queryKey: [UP_BY_ID_KEY, upId]
  });
  return { data, isSuccess };
};
