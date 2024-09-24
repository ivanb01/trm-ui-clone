import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
const currentOffsetMinutes = dayjs().utcOffset();

const offsetHours = Math.floor(currentOffsetMinutes / 60);
const offsetMinutes = Math.abs(currentOffsetMinutes % 60);

// Format the offset
const formattedOffset = `${offsetHours >= 0 ? '+' : '-'}${String(Math.abs(offsetHours)).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;

function convertTimezone(dateString: string) {
  const [datePart] = dateString.split('T');
  return `${datePart}T${'00:00:00'}${formattedOffset}`;
}

export { convertTimezone };
