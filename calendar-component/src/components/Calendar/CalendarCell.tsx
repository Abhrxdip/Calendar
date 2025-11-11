import { memo, useCallback, useRef, useEffect } from 'react';
import { format, isToday } from 'date-fns';
import clsx from 'clsx';
import type { CalendarEvent } from './CalendarView.types';

interface CalendarCellProps {
  date: Date;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  isFocused?: boolean;
  events?: CalendarEvent[];
  onClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent, date: Date) => void;
}

function CalendarCell({
  date,
  isCurrentMonth = true,
  isToday: isTodayProp,
  isSelected = false,
  isFocused = false,
  events = [],
  onClick,
  onEventClick,
  onKeyDown,
}: CalendarCellProps) {
  const todayCheck = isTodayProp ?? isToday(date);
  const displayEvents = events.slice(0, 3);
  const remainingCount = events.length - 3;
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && cellRef.current) {
      cellRef.current.focus();
    }
  }, [isFocused]);

  const handleCellClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.calendar-event')) {
      return;
    }
    onClick?.(date);
  }, [date, onClick]);

  const handleEventClick = useCallback((e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation();
    onEventClick?.(event);
  }, [onEventClick]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (events.length > 0) {
        onEventClick?.(events[0]);
      } else {
        onClick?.(date);
      }
    } else {
      onKeyDown?.(e, date);
    }
  }, [date, events, onClick, onEventClick, onKeyDown]);

  const monthName = format(date, 'MMMM');
  const dayNumber = format(date, 'd');
  const year = format(date, 'yyyy');
  const eventCountText = events.length > 0 
    ? `${events.length} event${events.length > 1 ? 's' : ''}` 
    : 'No events';

  return (
    <div
      ref={cellRef}
      tabIndex={isFocused ? 0 : -1}
      role="button"
      aria-label={`${monthName} ${dayNumber}, ${year}. ${eventCountText}.${todayCheck ? ' Today.' : ''}${!isCurrentMonth ? ' Outside current month.' : ''}`}
      aria-pressed={isSelected}
      className={clsx(
        'calendar-cell min-h-24 sm:min-h-32 transition-colors outline-none',
        !isCurrentMonth && 'bg-gray-50',
        isSelected && 'ring-2 ring-primary-500',
        isFocused && 'ring-2 ring-blue-400 ring-offset-1',
        onClick && 'cursor-pointer hover:bg-gray-50 focus-visible:bg-gray-50'
      )}
      onClick={handleCellClick}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center justify-between mb-1">
        <span
          className={clsx(
            'text-sm font-medium',
            !isCurrentMonth && 'text-gray-400',
            isCurrentMonth && !todayCheck && 'text-gray-900',
            todayCheck && 'bg-primary-500 text-white rounded-full w-7 h-7 flex items-center justify-center'
          )}
        >
          {format(date, 'd')}
        </span>
      </div>
      
      <div className="space-y-1">
        {displayEvents.map((event) => (
          <div
            key={event.id}
            className="calendar-event cursor-pointer hover:opacity-80 transition-opacity"
            style={{ backgroundColor: event.color || '#3b82f6' }}
            title={event.title}
            onClick={(e) => handleEventClick(e, event)}
          >
            {event.title}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="text-xs text-gray-600 font-medium px-2">
            +{remainingCount} more
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(CalendarCell);
