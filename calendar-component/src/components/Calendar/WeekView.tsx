import { memo, useMemo, useCallback } from 'react';
import { format, startOfWeek, addDays, addHours, startOfDay, isToday } from 'date-fns';
import clsx from 'clsx';
import type { CalendarEvent } from './CalendarView.types';

interface WeekViewProps {
  currentDate: Date;
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

function WeekView({ currentDate, events = [], onDateClick, onEventClick }: WeekViewProps) {
  const weekStart = startOfWeek(currentDate);
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  const eventsByDateTime = useMemo(() => {
    const eventMap = new Map<string, CalendarEvent[]>();
    events.forEach(event => {
      const eventStart = new Date(event.startDate);
      const dateKey = `${eventStart.getFullYear()}-${eventStart.getMonth()}-${eventStart.getDate()}-${eventStart.getHours()}`;
      const existing = eventMap.get(dateKey) || [];
      eventMap.set(dateKey, [...existing, event]);
    });
    return eventMap;
  }, [events]);

  const getEventsForDateTime = useCallback((date: Date, hour: number) => {
    const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${hour}`;
    return eventsByDateTime.get(dateKey) || [];
  }, [eventsByDateTime]);

  const handleSlotClick = useCallback((date: Date, hour: number) => {
    const slotDate = addHours(date, hour);
    onDateClick?.(slotDate);
  }, [onDateClick]);

  const handleEventClick = useCallback((e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation();
    onEventClick?.(event);
  }, [onEventClick]);

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
            className={clsx(
              'py-3 px-2 text-center border-r border-gray-200 bg-gray-50',
              isToday(day) && 'bg-primary-50'
            )}
          >
            <div className="text-xs text-gray-600 hidden sm:block">
              {format(day, 'EEE')}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 sm:hidden">
              {format(day, 'EEE').slice(0, 1)}
            </div>
            <div className={clsx(
              'text-lg font-semibold',
              isToday(day) ? 'text-primary-600' : 'text-gray-900'
            )}>
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
                    'week-time-slot border-r border-gray-100 p-1 hover:bg-gray-50 transition-colors cursor-pointer min-h-16',
                    isToday(day) && 'bg-primary-50 bg-opacity-20'
                  )}
                  onClick={() => handleSlotClick(day, hour)}
                >
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-xs px-2 py-1 rounded text-white truncate mb-1 cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: event.color || '#3b82f6' }}
                      title={`${event.title}\n${format(new Date(event.startDate), 'h:mm a')} - ${format(new Date(event.endDate), 'h:mm a')}`}
                      onClick={(e) => handleEventClick(e, event)}
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

export default memo(WeekView);
