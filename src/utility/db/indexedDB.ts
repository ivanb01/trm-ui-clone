// src/utils/indexedDB.ts

import { useQuery } from '@tanstack/react-query';

import { LineGraphData } from '../../model/graphs/LineGraphData.ts';
import { Reading } from '../../model/interface/usagePoint/Reading.ts';

const dbName = 'lineGraphDataDB';
const dbVersion = 1;
const rawStoreName = 'rawResponseStore';
const graphDataStoreName = 'graphDataStore';

export const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(rawStoreName)) {
        db.createObjectStore(rawStoreName, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(graphDataStoreName)) {
        db.createObjectStore(graphDataStoreName, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject(`IndexedDB error: ${(event.target as IDBOpenDBRequest).error}`);
    };
  });
};

export const saveRawData = async (data: any): Promise<string> => {
  const db = await openDatabase();
  const transaction = db.transaction([rawStoreName], 'readwrite');
  const store = transaction.objectStore(rawStoreName);
  const request = store.put({ id: 'rawResponse', data });

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve('Raw data saved successfully');
    };
    request.onerror = (event) => {
      reject(`Error saving raw data: ${(event.target as IDBRequest).error}`);
    };
  });
};

export const saveGraphData = async (data: LineGraphData[]): Promise<string> => {
  const db = await openDatabase();
  const transaction = db.transaction([graphDataStoreName], 'readwrite');
  const store = transaction.objectStore(graphDataStoreName);

  return new Promise((resolve, reject) => {
    data.forEach((item) => {
      const request = store.put(item);
      request.onerror = (event) => {
        reject(
          `Error saving graph data: ${(event.target as IDBRequest).error}`
        );
      };
    });

    transaction.oncomplete = () => {
      resolve('Graph data saved successfully');
    };

    transaction.onerror = (event) => {
      reject(`Transaction error: ${(event.target as IDBRequest).error}`);
    };
  });
};

export const getGraphDataByIds = async (
  ids: string[]
): Promise<LineGraphData[]> => {
  const db = await openDatabase();
  const transaction = db.transaction([graphDataStoreName], 'readonly');
  const store = transaction.objectStore(graphDataStoreName);

  const promises = ids.map((id) => {
    const request = store.get(id);
    return new Promise<LineGraphData>((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result);
      };
      request.onerror = (event) => {
        reject(
          `Error retrieving graph data: ${(event.target as IDBRequest).error}`
        );
      };
    });
  });

  return Promise.all(promises);
};

export const getRawData = async (): Promise<any> => {
  const db = await openDatabase();
  const transaction = db.transaction([rawStoreName], 'readonly');
  const store = transaction.objectStore(rawStoreName);
  const request = store.get('rawResponse');

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      resolve((event.target as IDBRequest).result?.data || []);
    };
    request.onerror = (event) => {
      reject(
        `Error retrieving raw data: ${(event.target as IDBRequest).error}`
      );
    };
  });
};

export const getPaginatedRawData = async (
  offset: number,
  limit: number,
  ids?: string[],
  readingTypes?: string[]
): Promise<{ total: number; data: any[] }> => {
  let filteredData = await getRawData();

  if (ids && ids.length > 0) {
    filteredData = filteredData.filter((item: Reading) =>
      ids.includes(item.usagePointId.toString())
    );
  }

  if (readingTypes && readingTypes.length > 0) {
    filteredData = filteredData.filter((item: Reading) =>
      readingTypes.includes(item.readingTypeName)
    );
  }

  const total = filteredData.length;
  const paginatedData = filteredData.slice(offset, offset + limit);
  return { data: paginatedData, total };
};
export const usePaginatedRawData = (
  page: number,
  pageSize: number,
  ids?: string[],
  readingTypes?: string[]
) => {
  return useQuery({
    queryFn: async (): Promise<{ total: number; data: Reading[] }> => {
      const offset = page * pageSize;
      return await getPaginatedRawData(offset, pageSize, ids, readingTypes);
    },
    queryKey: [
      'paginatedRawData',
      page,
      pageSize,
      ids?.join(','),
      readingTypes?.join(',')
    ]
  });
};

export const getGraphData = async (): Promise<LineGraphData[]> => {
  const db = await openDatabase();
  const transaction = db.transaction([graphDataStoreName], 'readonly');
  const store = transaction.objectStore(graphDataStoreName);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      resolve((event.target as IDBRequest).result);
    };
    request.onerror = (event) => {
      reject(
        `Error retrieving graph data: ${(event.target as IDBRequest).error}`
      );
    };
  });
};
