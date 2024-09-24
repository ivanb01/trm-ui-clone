self.onmessage = function (event) {
  const { axis, data, numElements } = event.data;
  const result = spreadArray(numElements, axis, data);
  postMessage(result);
};

function spreadArray(numElements, axis, data) {
  if (numElements < 2) return [];
  const [first, last] = [
    data[0]?.data[0],
    data[0]?.data[data[0]?.data.length - 1]
  ];
  const numInBetween = Math.max(0, numElements - 2);
  const step =
    numInBetween > 0 ? (data[0]?.data.length - 1) / (numInBetween + 1) : 0;
  const array = [];
  array.push(first);
  for (let i = 1; i <= numInBetween; i++) {
    const index = Math.round(step * i);
    array.push(data[0]?.data[index]);
  }
  array.push(last);
  return array.map((item) => item?.[axis]);
}
