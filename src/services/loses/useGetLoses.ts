import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai/index';

import { LosesInterface } from '../../model/interface/loses/LosesInterface.ts';
import { filterAtom } from '../../state/atoms/filterAtom.ts';
import { SelectedUsagePointsAtom } from '../../state/atoms/selectedUsagePointsAtom.ts';
import { convertTimezone } from '../../utility/conversions/date.ts';
import { axiosInstance } from '../axios/axiosInstance.ts';

export const key = ['LOSES_QUERY'];
export const useGetLoses = () => {
  const [filterSettings] = useAtom(filterAtom);
  const [upIds] = useAtom(SelectedUsagePointsAtom);

  return useQuery({
    enabled: !!filterSettings.fromDt && !!filterSettings.toDt,
    queryFn: async (): Promise<Array<LosesInterface>> => {
      const { data } = await axiosInstance.get('KPIs', {
        params: {
          fromDt:
            filterSettings.fromDt && convertTimezone(filterSettings.fromDt),
          toDt: filterSettings.toDt && convertTimezone(filterSettings.toDt),
          upIds: upIds.join()
        }
      });
      return data;
    },
    queryKey: [
      ...key,
      filterSettings.fromDt,
      filterSettings.toDt,
      filterSettings.upIds?.join()
    ]
  });
};
