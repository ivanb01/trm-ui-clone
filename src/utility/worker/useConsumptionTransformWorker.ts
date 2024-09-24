import { useEffect, useMemo, useState } from 'react';

export const useConsumptionTransformWorker = (data: any, control: boolean) => {
  const [result, setResult] = useState(null);

  const worker = useMemo(
    () => new Worker('workers/consumptionTransformWorker.js'),
    []
  );

  useEffect(() => {
    if (control && data.length) {
      worker.postMessage(data);

      worker.onmessage = (event) => {
        setResult(event.data);
        worker.terminate();
      };

      return () => worker.terminate();
    }
  }, [control, data, worker]);

  return result;
};
