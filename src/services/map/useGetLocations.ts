import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { LocationInterface } from '../../model/interface/LocationInterface.ts';
import { axiosClickerInstance } from '../axios/axiosClickerApi';

export const key = ['LOCATIONS_KEY'];

export const useGetLocations = () => {
  const { data, isSuccess } = useQuery({
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const res =
        await axiosClickerInstance.get<LocationInterface[]>(
          '/location/summary'
        );
      return res.data;
    },
    queryKey: [...key]
  });
  return { data, isSuccess };
};
