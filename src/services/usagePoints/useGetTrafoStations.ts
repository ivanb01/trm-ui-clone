import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { TransformerStationDTO } from '../../../src/model/interface/usagePoint/TransformerStationDTO';
import { axiosClickerInstance } from '../axios/axiosClickerApi';

export const TRAFO_STATIONS_KEY = 'TRAFO_STATIONS_KEY';

export const useGetTrafoStations = () => {
  const { data, isSuccess } = useQuery({
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const res = await axiosClickerInstance.get<TransformerStationDTO[]>(
        '/transformer-station/all'
      );
      return res.data;
    },
    queryKey: [TRAFO_STATIONS_KEY]
  });
  return { data, isSuccess };
};
