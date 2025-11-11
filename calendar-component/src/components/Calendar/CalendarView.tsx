import { useState } from 'react';
import { format, addMonths, subMonths, startOfToday } from 'date-fns';
import clsx from 'clsx';
import MonthView from './MonthView';
import WeekView from './WeekView';
import type { CalendarViewProps, ViewType } from './CalendarView.types';

export default function CalendarView({
  initialDate = new Date(),
  initialView = 'month',
  events = [],
  onDateClick,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [view, setView] = useState<ViewType>(initialView);

  const handlePrevious = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNext = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const handleToday = () => {
    setCurrentDate(startOfToday());
  };

  const handleViewChange = (newView: ViewType) => {
    setView(newView);
  };

  return (
    <div className="w-full">
      <div className="calendar-header">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button
            onClick={handleToday}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Today
          </button>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={handlePrevious}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Previous month"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Next month"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => handleViewChange('month')}
              className={clsx(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
                view === 'month'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              Month
            </button>
            <button
              onClick={() => handleViewChange('week')}
              className={clsx(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
                view === 'week'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {view === 'month' ? (
          <MonthView
            currentDate={currentDate}
            events={events}
            onDateClick={onDateClick}
          />
        ) : (
          <WeekView
            currentDate={currentDate}
            events={events}
            onDateClick={onDateClick}
          />
        )}
      </div>
    </div>
  );
}
