import { useQuery } from '@tanstack/react-query';

import { FilterTypeEnum } from '../../model/app-model/enums/FilterTypeEnum.ts';
import { axiosInstance } from '../axios/axiosInstance.ts';

const key = ['REF_LIST_QUERY'];
export const useGetRefList = ({ name }: { name: FilterTypeEnum }) =>
  useQuery({
    queryFn: async (): Promise<Record<number, string>> => {
      const { data } = await axiosInstance.get('refList', {
        params: { name }
      });
      return data;
    },
    queryKey: [...key, name],
    staleTime: 1000 * 60 * 60
  });
