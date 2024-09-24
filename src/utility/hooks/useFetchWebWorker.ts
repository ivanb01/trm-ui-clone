import { useEffect, useRef, useState } from 'react';

import {
  WorkerMessage,
  WorkerParams
} from '../../services/readings/useGetReadings.ts';

export const useFetchWebWorker = (url: string) => {
  const workerRef = useRef<Worker | null>(null);
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('/workers/fetchReadings.js', import.meta.url)
    );
    workerRef.current.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const { data, done, error, size } = event.data;
      if (error) {
        setError(error);
        workerRef.current?.terminate();
        setLoading(false);
        return;
      }
      if (size !== undefined) {
        setProgress(size);
      }
      if (data) {
        setData(JSON.parse(data));
      }
      if (done) {
        workerRef.current?.terminate();
        setLoading(false);
      }
    };
    return () => {
      workerRef.current?.terminate();
    };
  }, [url]);

  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({ url } as WorkerParams);
    }
  }, [url]);

  return { data, error, loading, progress };
};
