function getRandomInt(min: number, max: number): number {
  return Math.random() * (max - min + 1) + min;
}

interface MockData {
  id: string;
  averageMonthlyConsumption: number;
  date: string;
  highestPeriodMonthConsumption: number;
  lastMonthConsumption: number;
  name: string;
  ratedPower: number;
  someValue: number;
}
// Function to generate data for each day for the given range of dates
function generateDataForThreeMonths(): MockData[] {
  const data: MockData[] = [];
  const radix = 36;
  const strLength = 7;
  const startDate = new Date('1995-01-01');
  const endDate = new Date();
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateString = currentDate.toUTCString();

    const yValue = getRandomInt(100, 1000);
    data.push({
      id: (Math.random() + 1).toString(radix).substring(strLength),
      averageMonthlyConsumption: getRandomInt(0, 100),
      date: dateString,
      highestPeriodMonthConsumption: getRandomInt(0, 100),
      lastMonthConsumption: getRandomInt(0, 100),
      name: (Math.random() + 1).toString(radix).substring(strLength),
      ratedPower: getRandomInt(0, 10),
      someValue: yValue
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
}

export { generateDataForThreeMonths };
