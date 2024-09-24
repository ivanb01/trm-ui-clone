self.onmessage = function (event) {
  const data = event.data;
  const result = transformData(data);
  postMessage(result);
};

function transformData(data) {
  const groupedData = {};

  data.forEach((item) => {
    const id = `${item.usagePointId}_${item.readingTypeName}`;
    if (!groupedData[id]) {
      groupedData[id] = {
        id,
        data: [],
        readingType: item.readingTypeName
      };
    }
    groupedData[id].data.push({ x: item.time, y: item.value });
  });

  return Object.values(groupedData).filter((item) => item.data.length > 0);
}
