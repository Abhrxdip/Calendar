import { memo, useMemo, useState, useCallback } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth } from 'date-fns';
import CalendarCell from './CalendarCell';
import type { CalendarEvent } from './CalendarView.types';

interface MonthViewProps {
  currentDate: Date;
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

function MonthView({ currentDate, events = [], onDateClick, onEventClick }: MonthViewProps) {
  const [focusedDateIndex, setFocusedDateIndex] = useState<number | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = useMemo(() => {
    const allDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    if (allDays.length < 42) {
      const remaining = 42 - allDays.length;
      const lastDay = allDays[allDays.length - 1];
      for (let i = 1; i <= remaining; i++) {
        allDays.push(new Date(lastDay.getTime() + i * 24 * 60 * 60 * 1000));
      }
    }
    return allDays.slice(0, 42);
  }, [calendarStart, calendarEnd]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach(event => {
      const eventStart = new Date(event.startDate);
      const dateKey = `${eventStart.getFullYear()}-${eventStart.getMonth()}-${eventStart.getDate()}`;
      const existing = map.get(dateKey) || [];
      map.set(dateKey, [...existing, event]);
    });
    return map;
  }, [events]);

  const getEventsForDate = useCallback((date: Date) => {
    const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return eventsByDate.get(dateKey) || [];
  }, [eventsByDate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, date: Date) => {
    const currentIndex = days.findIndex(d => d.getTime() === date.getTime());
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = Math.max(0, currentIndex - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        newIndex = Math.min(days.length - 1, currentIndex + 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        newIndex = Math.max(0, currentIndex - 7);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newIndex = Math.min(days.length - 1, currentIndex + 7);
        break;
      default:
        return;
    }

    setFocusedDateIndex(newIndex);
  }, [days]);

  return (
    <div className="container">
      <div className="daygrid" role="row">
        {weekDays.map((day) => (
          <div
            key={day}
            role="columnheader"
            className="weekhead"
          >
            <span className="hidden-sm">{day}</span>
            <span className="show-sm" aria-label={day}>{day.slice(0, 1)}</span>
          </div>
        ))}
      </div>
      
      <div className="daygrid" role="grid" aria-label="Calendar days">
        {days.map((day, index) => (
          <CalendarCell
            key={day.toISOString()}
            date={day}
            isCurrentMonth={isSameMonth(day, currentDate)}
            isFocused={focusedDateIndex === index}
            events={getEventsForDate(day)}
            onClick={onDateClick}
            onEventClick={onEventClick}
            onKeyDown={handleKeyDown}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(MonthView);
