import { useQuery } from '@tanstack/react-query';
import { UsagePointV3DTO } from 'src/model/interface/usagePoint/UsagePointV3DTO';

import { axiosClickerV3Instance } from '../axios/axiosClickerApi';

export const UP_BY_TRAFO_ID_KEY = 'UP_BY_TRAFO_ID_KEY';

export const useGetUsagePointsByTrafo = (trafoId: null | number) => {
  const { data, isFetching, isLoading, isSuccess } = useQuery({
    enabled: Boolean(trafoId),
    queryFn: async () => {
      const res = await axiosClickerV3Instance.get<UsagePointV3DTO[]>(
        `/usage-points/trafostation/${trafoId}`
      );
      return res.data.filter((up) => Boolean(up.location));
    },
    queryKey: [UP_BY_TRAFO_ID_KEY, trafoId],
    staleTime: Infinity
  });
  return { data, isFetching, isLoading, isSuccess };
};
