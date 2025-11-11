import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
  startOfDay,
  endOfDay,
  addDays,
  addHours,
  startOfToday,
} from 'date-fns';

export const getMonthDays = (date: Date): Date[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
};

export const getWeekDays = (date: Date): Date[] => {
  const weekStart = startOfWeek(date);
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
};

export const formatDateHeader = (date: Date): string => {
  return format(date, 'MMMM yyyy');
};

export const formatDayNumber = (date: Date): string => {
  return format(date, 'd');
};

export const formatWeekDay = (date: Date, short = false): string => {
  return format(date, short ? 'EEE' : 'EEEE');
};

export const formatTime = (date: Date, short = false): string => {
  return format(date, short ? 'h:mm a' : 'h:mm a');
};

export const formatTimeSlot = (hour: number): string => {
  return format(addHours(startOfDay(new Date()), hour), 'h:mm a');
};

export const isDateInMonth = (date: Date, monthDate: Date): boolean => {
  return isSameMonth(date, monthDate);
};

export const isDateToday = (date: Date): boolean => {
  return isToday(date);
};

export const areDatesEqual = (date1: Date, date2: Date): boolean => {
  return isSameDay(date1, date2);
};

export const getNextMonth = (date: Date): Date => {
  return addMonths(date, 1);
};

export const getPreviousMonth = (date: Date): Date => {
  return subMonths(date, 1);
};

export const getTodayDate = (): Date => {
  return startOfToday();
};

export const getDateRange = (start: Date, end: Date): Date[] => {
  return eachDayOfInterval({ start, end });
};

export const getDayStart = (date: Date): Date => {
  return startOfDay(date);
};

export const getDayEnd = (date: Date): Date => {
  return endOfDay(date);
};

export {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
  startOfDay,
  endOfDay,
  addDays,
  addHours,
  startOfToday,
};
