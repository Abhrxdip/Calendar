import { useState, useCallback, useMemo } from 'react';
import { format, addMonths, subMonths, startOfToday, addWeeks, subWeeks, startOfWeek } from 'date-fns';
import clsx from 'clsx';
import MonthView from './MonthView';
import WeekView from './WeekView';
import type { CalendarViewProps, ViewType } from './CalendarView.types';

export default function CalendarView({
  initialDate = new Date(),
  initialView = 'month',
  events = [],
  onDateClick,
  onEventClick,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [view, setView] = useState<ViewType>(initialView);

  const handlePrevious = useCallback(() => {
    setCurrentDate(prev => view === 'month' ? subMonths(prev, 1) : subWeeks(prev, 1));
  }, [view]);

  const handleNext = useCallback(() => {
    setCurrentDate(prev => view === 'month' ? addMonths(prev, 1) : addWeeks(prev, 1));
  }, [view]);

  const handleToday = useCallback(() => {
    setCurrentDate(startOfToday());
  }, []);

  const handleViewChange = useCallback((newView: ViewType) => {
    setView(newView);
  }, []);

  const displayText = useMemo(() => {
    if (view === 'month') {
      return format(currentDate, 'MMMM yyyy');
    }
    const weekStart = startOfWeek(currentDate);
    return format(weekStart, 'MMM d, yyyy');
  }, [currentDate, view]);

  return (
    <div className="w-full">
      <div className="calendar-header">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900" id="calendar-heading">
            {displayText}
          </h2>
          <button
            onClick={handleToday}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Go to today's date"
          >
            Today
          </button>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-1 sm:space-x-2" role="group" aria-label="Calendar navigation">
            <button
              onClick={handlePrevious}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label={`Previous ${view}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label={`Next ${view}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex items-center bg-gray-100 rounded-lg p-1" role="group" aria-label="View selection">
            <button
              onClick={() => handleViewChange('month')}
              className={clsx(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                view === 'month'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              )}
              aria-pressed={view === 'month'}
              aria-label="Switch to month view"
            >
              Month
            </button>
            <button
              onClick={() => handleViewChange('week')}
              className={clsx(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                view === 'week'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              )}
              aria-pressed={view === 'week'}
              aria-label="Switch to week view"
            >
              Week
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6" role="region" aria-labelledby="calendar-heading" aria-live="polite">
        {view === 'month' ? (
          <MonthView
            currentDate={currentDate}
            events={events}
            onDateClick={onDateClick}
            onEventClick={onEventClick}
          />
        ) : (
          <WeekView
            currentDate={currentDate}
            events={events}
            onDateClick={onDateClick}
            onEventClick={onEventClick}
          />
        )}
      </div>
    </div>
  );
}
