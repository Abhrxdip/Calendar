import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addWeeks,
  differenceInCalendarDays,
  differenceInMinutes,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  max,
  min,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
  startOfDay,
  startOfMonth,
  startOfToday,
  startOfWeek,
  subMonths,
  subWeeks,
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

export const getWeekRange = (date: Date): { start: Date; end: Date } => {
  const start = startOfWeek(date);
  return { start, end: addDays(start, 6) };
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

export const getDateKey = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const getDateTimeKey = (date: Date, stepMinutes: number): string => {
  const block = Math.floor((date.getHours() * 60 + date.getMinutes()) / stepMinutes);
  return `${getDateKey(date)}-${block}`;
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

export const isWithinRange = (date: Date, range: { start: Date; end: Date } | null): boolean => {
  if (!range) return false;
  const start = min([range.start, range.end]);
  const end = max([range.start, range.end]);
  return (isAfter(date, start) || isSameDay(date, start)) && (isBefore(date, end) || isSameDay(date, end));
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

export const moveDateByDays = (date: Date, days: number): Date => {
  return addDays(date, days);
};

export const moveDateByWeeks = (date: Date, weeks: number): Date => {
  return addWeeks(date, weeks);
};

export const clampToDayBounds = (date: Date, minHour: number, maxHour: number): Date => {
  const limitedHour = Math.min(Math.max(date.getHours(), minHour), maxHour - 1);
  return setMinutes(setHours(date, limitedHour), date.getMinutes());
};

export const normalizeToStep = (date: Date, stepMinutes: number): Date => {
  const total = date.getHours() * 60 + date.getMinutes();
  const normalized = Math.floor(total / stepMinutes) * stepMinutes;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return setMilliseconds(setSeconds(setMinutes(setHours(date, hours), minutes), 0), 0);
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

export const getMinutesBetween = (start: Date, end: Date): number => {
  return differenceInMinutes(end, start);
};

export const getDaysBetween = (start: Date, end: Date): number => {
  return Math.abs(differenceInCalendarDays(end, start));
};

export const addMinutesToDate = (date: Date, minutes: number): Date => {
  return addMinutes(date, minutes);
};

export const clampSelectionRange = (start: Date, end: Date): { start: Date; end: Date } => {
  const orderedStart = min([start, end]);
  const orderedEnd = max([start, end]);
  return { start: orderedStart, end: orderedEnd };
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
  addMinutes,
  addWeeks,
  subWeeks,
  differenceInMinutes,
  differenceInCalendarDays,
};
