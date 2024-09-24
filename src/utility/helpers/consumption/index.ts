import { LineGraphData } from '../../../model/graphs/LineGraphData.ts';
import { Reading } from '../../../model/interface/usagePoint/Reading.ts';

function transformData(data: Reading[]): LineGraphData[] {
  const groupedData: Record<string, { x: string; y: number }[]> = {};
  const readingTypes: Record<string, string> = {};

  data.forEach((item) => {
    const id = `${item.usagePointId}_${item.readingTypeName}`;
    if (!groupedData[id]) {
      groupedData[id] = [];
      readingTypes[id] = item.readingTypeName;
    }
    groupedData[id].push({ x: item.time, y: item.value });
  });

  return Object.keys(groupedData).map((id) => ({
    id,
    data: groupedData[id],
    readingType: readingTypes[id]
  }));
}
const getUniqueValues = (data: Reading[], key: keyof Reading) => {
  if (Array.isArray(data)) {
    const uniqueValues = new Set<string>();
    for (const item of data) {
      const value = item[key];
      if (value !== null && value !== undefined) {
        uniqueValues.add(String(value));
      }
    }
    return Array.from(uniqueValues, (value) => ({
      text: value,
      value
    }));
  }
};
const sliceLineGraphDataByDate = (
  data: LineGraphData[],
  dateRange: { from?: string; to?: string }
): LineGraphData[] => {
  const fromDate = dateRange.from ? Date.parse(dateRange.from) : 0;
  const toDate = dateRange.to ? Date.parse(dateRange.to) : Infinity;
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const originalData = item.data;
    let filteredData = null;
    for (let j = 0; j < originalData.length; j++) {
      const point = originalData[j];
      const pointDate = Date.parse(point.x);
      if (pointDate >= fromDate && pointDate <= toDate) {
        if (filteredData) {
          filteredData.push(point);
        }
      } else {
        if (!filteredData) {
          filteredData = originalData.slice(0, j);
        }
      }
    }
    if (filteredData) {
      result.push({ ...item, data: filteredData });
    } else {
      result.push(item);
    }
  }
  return result;
};
const sortByDate = (data: LineGraphData[]): LineGraphData[] =>
  data.map((graph) => {
    return {
      ...graph,
      data: graph.data.sort((a, b) => Date.parse(a.x) - Date.parse(b.x))
    };
  });

export { getUniqueValues, sliceLineGraphDataByDate, sortByDate, transformData };
