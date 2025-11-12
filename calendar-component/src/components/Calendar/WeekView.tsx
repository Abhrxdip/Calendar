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
    <div className="container">
      <div className="weekgrid">
        <div className="weekhead">
          <span className="hidden-sm">Time</span>
          <span className="show-sm">T</span>
        </div>
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className={clsx(
              'weekday',
              isToday(day) && 'from-blue-50 to-blue-100'
            )}
          >
            <div className="hint hidden sm:block">
              {format(day, 'EEE')}
            </div>
            <div className="hint show-sm">
              {format(day, 'EEE').slice(0, 1)}
            </div>
            <div className={clsx(
              'daynumber',
              isToday(day) ? 'text-purple-600' : 'text-gray-900'
            )}>
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>

  <div className="scroll">
        {timeSlots.map((hour) => (
          <div key={hour} className="weekrow">
            <div className="timecol">
              <span className="hidden-sm">
                {format(addHours(startOfDay(new Date()), hour), 'h:mm a')}
              </span>
              <span className="show-sm">
                {format(addHours(startOfDay(new Date()), hour), 'ha')}
              </span>
            </div>
            {weekDays.map((day) => {
              const dayEvents = getEventsForDateTime(day, hour);
              return (
                <div
                  key={`${day.toISOString()}-${hour}`}
                  className={clsx(
                    'slot border-r border-gray-100 p-1 cursor-pointer min-h-16',
                    isToday(day) && 'bg-primary-50 bg-opacity-20'
                  )}
                  onClick={() => handleSlotClick(day, hour)}
                >
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="event"
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
