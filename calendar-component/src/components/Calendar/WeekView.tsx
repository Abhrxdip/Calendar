import { format, startOfWeek, addDays, addHours, startOfDay } from 'date-fns';
import clsx from 'clsx';
import type { WeekViewProps } from './CalendarView.types';

export default function WeekView({ currentDate, events = [], onDateClick }: WeekViewProps) {
  const weekStart = startOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForDateTime = (date: Date, hour: number) => {
    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      return (
        eventStart.getFullYear() === date.getFullYear() &&
        eventStart.getMonth() === date.getMonth() &&
        eventStart.getDate() === date.getDate() &&
        eventStart.getHours() === hour
      );
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-8 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="py-3 px-2 text-sm font-semibold text-gray-700 bg-gray-50 border-r border-gray-200">
          <span className="hidden sm:inline">Time</span>
          <span className="sm:hidden">T</span>
        </div>
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className="py-3 px-2 text-center border-r border-gray-200 bg-gray-50"
          >
            <div className="text-xs text-gray-600 hidden sm:block">
              {format(day, 'EEE')}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 sm:hidden">
              {format(day, 'EEE').slice(0, 1)}
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-y-auto max-h-[600px] scrollbar-hide">
        {timeSlots.map((hour) => (
          <div key={hour} className="grid grid-cols-8 border-b border-gray-100">
            <div className="py-4 px-2 text-xs text-gray-600 border-r border-gray-200 bg-gray-50">
              <span className="hidden sm:inline">
                {format(addHours(startOfDay(new Date()), hour), 'h:mm a')}
              </span>
              <span className="sm:hidden">
                {format(addHours(startOfDay(new Date()), hour), 'ha')}
              </span>
            </div>
            {weekDays.map((day) => {
              const dayEvents = getEventsForDateTime(day, hour);
              return (
                <div
                  key={`${day.toISOString()}-${hour}`}
                  className={clsx(
                    'week-time-slot border-r border-gray-100 p-1 hover:bg-gray-50 transition-colors cursor-pointer'
                  )}
                  onClick={() => onDateClick?.(addHours(day, hour))}
                >
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-xs px-2 py-1 rounded text-white truncate mb-1"
                      style={{ backgroundColor: event.color }}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
