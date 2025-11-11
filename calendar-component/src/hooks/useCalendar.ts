import { useState, useCallback } from 'react';
import { getNextMonth, getPreviousMonth, getTodayDate, addWeeks, subWeeks } from '../utils/date.utils';
import type { ViewType } from '../components/Calendar/CalendarView.types';

interface UseCalendarReturn {
  currentDate: Date;
  view: ViewType;
  selectedDate: Date | null;
  setView: (view: ViewType) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToNextMonth: () => void;
  goToPreviousMonth: () => void;
  goToNextWeek: () => void;
  goToPreviousWeek: () => void;
  goToToday: () => void;
  selectDate: (date: Date) => void;
  clearSelectedDate: () => void;
}

export const useCalendar = (initialDate?: Date, initialView: ViewType = 'month'): UseCalendarReturn => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate || getTodayDate());
  const [view, setView] = useState<ViewType>(initialView);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const goToNextMonth = useCallback(() => {
    setCurrentDate(prev => getNextMonth(prev));
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setCurrentDate(prev => getPreviousMonth(prev));
  }, []);

  const goToNextWeek = useCallback(() => {
    setCurrentDate(prev => addWeeks(prev, 1));
  }, []);

  const goToPreviousWeek = useCallback(() => {
    setCurrentDate(prev => subWeeks(prev, 1));
  }, []);

  const goToNext = useCallback(() => {
    if (view === 'month') {
      goToNextMonth();
    } else {
      goToNextWeek();
    }
  }, [view, goToNextMonth, goToNextWeek]);

  const goToPrevious = useCallback(() => {
    if (view === 'month') {
      goToPreviousMonth();
    } else {
      goToPreviousWeek();
    }
  }, [view, goToPreviousMonth, goToPreviousWeek]);

  const goToToday = useCallback(() => {
    setCurrentDate(getTodayDate());
  }, []);

  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const clearSelectedDate = useCallback(() => {
    setSelectedDate(null);
  }, []);

  return {
    currentDate,
    view,
    selectedDate,
    setView,
    goToNext,
    goToPrevious,
    goToNextMonth,
    goToPreviousMonth,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
    selectDate,
    clearSelectedDate,
  };
};
