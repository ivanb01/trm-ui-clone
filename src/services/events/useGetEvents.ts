import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai/index';

import { EventMetric } from '../../model/interface/events/EventMetrics.ts';
import { filterAtom } from '../../state/atoms/filterAtom.ts';
import { convertTimezone } from '../../utility/conversions/date.ts';
import { axiosInstance } from '../axios/axiosInstance.ts';

export const key = ['EVENTS_QUERY'];
export const useGetEvents = () => {
  const [filterSettings] = useAtom(filterAtom);

  return useQuery({
    enabled:
      !!filterSettings.fromDt &&
      !!filterSettings.toDt &&
      !!filterSettings.upIds?.length,
    queryFn: async (): Promise<Array<EventMetric>> => {
      const { data } = await axiosInstance.get('events', {
        params: {
          fromDt:
            filterSettings.fromDt && convertTimezone(filterSettings.fromDt),
          toDt: filterSettings.toDt && convertTimezone(filterSettings.toDt),
          upIds: filterSettings.upIds?.join()
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
