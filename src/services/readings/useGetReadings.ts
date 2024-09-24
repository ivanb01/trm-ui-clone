import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import { Reading } from '../../model/interface/usagePoint/Reading.ts';
import { url as baseUrl } from '../../services/axios/axiosInstance.ts';
import { filterAtom } from '../../state/atoms/filterAtom.ts';
import { SelectedUsagePointsAtom } from '../../state/atoms/selectedUsagePointsAtom.ts';
import { useFetchWebWorker } from '../../utility/hooks/useFetchWebWorker.ts';

export const key = ['READINGS_QUERY'];
export interface WorkerMessage {
  chunk?: any[];
  data?: any;
  done?: boolean;
  error?: string;
  size?: number;
}

export interface WorkerParams {
  url: string;
}

export const useGetReadings = () => {
  const [filterSettings] = useAtom(filterAtom);
  const [upIds] = useAtom(SelectedUsagePointsAtom);
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (filterSettings.fromDt) {
      params.append('fromDt', filterSettings.fromDt);
    }
    if (filterSettings.toDt) {
      params.append('toDt', filterSettings.toDt);
    }
    if (filterSettings.rtIds && filterSettings.rtIds?.length > 0) {
      params.append('rtIds', filterSettings.rtIds.join());
    }
    if (upIds && upIds?.length > 0) {
      params.append('upIds', upIds.join());
    }
    setUrl(`${baseUrl}readings?${params.toString()}`);
  }, [filterSettings, upIds]);

  const { data, error, loading, progress } = useFetchWebWorker(url);
  const query = useQuery({
    enabled:
      !!url && !loading && !!filterSettings.fromDt && !!filterSettings.fromDt,
    queryFn: async (): Promise<Array<Reading>> => data,
    queryKey: [
      ...key,
      filterSettings.fromDt,
      filterSettings.fromDt,
      ...filterSettings.rtIds,
      ...upIds
    ]
  });

  return { ...query, error, loading, progress };
};
