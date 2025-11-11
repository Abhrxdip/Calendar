import { useState, useCallback } from 'react';
import { getNextMonth, getPreviousMonth, getTodayDate } from '../utils/date.utils';
import type { ViewType } from '../components/Calendar/CalendarView.types';

interface UseCalendarReturn {
  currentDate: Date;
  view: ViewType;
  selectedDate: Date | null;
  setView: (view: ViewType) => void;
  goToNextMonth: () => void;
  goToPreviousMonth: () => void;
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
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
    selectDate,
    clearSelectedDate,
  };
};
