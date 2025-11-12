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
    <div className="wrapper">
      <div className="header">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <h2 className="heading" id="heading">
            {displayText}
          </h2>
          <button
            onClick={handleToday}
            className="btnprimary"
            aria-label="Go to today's date"
          >
            Today
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2" role="group" aria-label="Calendar navigation">
            <button
              onClick={handlePrevious}
              className="btnnav"
              aria-label={`Previous ${view}`}
            >
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="btnnav"
              aria-label={`Next ${view}`}
            >
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex items-center bg-gray-100 rounded-lg p-1 shadow-inner" role="group" aria-label="View selection">
            <button
              onClick={() => handleViewChange('month')}
              className={clsx(
                'toggle',
                view === 'month' ? 'active' : 'inactive'
              )}
              aria-pressed={view === 'month'}
              aria-label="Switch to month view"
            >
              Month
            </button>
            <button
              onClick={() => handleViewChange('week')}
              className={clsx(
                'toggle',
                view === 'week' ? 'active' : 'inactive'
              )}
              aria-pressed={view === 'week'}
              aria-label="Switch to week view"
            >
              Week
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6" role="region" aria-labelledby="heading" aria-live="polite">
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
