import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';

export const formatDate = (date: Date | string): string => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedDate = toZonedTime(date, timezone);
  // const zonedDate = formatInTimeZone(date, timezone);
  const now = toZonedTime(new Date(), timezone);

  console.log('date: ', date);
  console.log('timezone: ', timezone);
  console.log('zoned date: ', zonedDate);
  console.log('now: ', now);
  console.log('===============');

  if (isToday(zonedDate)) {
    return formatDistanceToNow(zonedDate, { addSuffix: true }); // "5 minutes ago"
  }
  if (isYesterday(zonedDate)) return 'Yesterday';
  if (zonedDate.getFullYear() === now.getFullYear()) {
    return format(zonedDate, 'MMM d'); // "Nov 29"
  }
  return format(zonedDate, 'MMM d, yyyy'); // "Nov 29 Nov, 2024
};
