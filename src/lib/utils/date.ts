import { format, isValid, parseISO } from 'date-fns';

export const formatDate = (
  date: string | Date | undefined,
  formatString = 'MMM yyyy'
) => {
  if (!date) return 'N/A';

  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(parsedDate)) return 'Invalid date';
    return format(parsedDate, formatString);
  } catch (error) {
    return 'Invalid date';
  }
};
