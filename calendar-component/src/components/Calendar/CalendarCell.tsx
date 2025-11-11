import { format, isToday } from 'date-fns';
import clsx from 'clsx';
import type { CalendarCellProps } from './CalendarView.types';

export default function CalendarCell({
  date,
  isCurrentMonth = true,
  isToday: isTodayProp,
  isSelected = false,
  events = [],
  onClick,
}: CalendarCellProps) {
  const todayCheck = isTodayProp ?? isToday(date);
  const displayEvents = events.slice(0, 3);
  const remainingCount = events.length - 3;

  return (
    <div
      className={clsx(
        'calendar-cell min-h-24 sm:min-h-32',
        !isCurrentMonth && 'bg-gray-50 text-gray-400',
        isSelected && 'ring-2 ring-primary-500',
        onClick && 'cursor-pointer'
      )}
      onClick={() => onClick?.(date)}
    >
      <div className="flex items-center justify-between mb-1">
        <span
          className={clsx(
            'text-sm font-medium',
            todayCheck && 'bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
          )}
        >
          {format(date, 'd')}
        </span>
      </div>
      
      <div className="space-y-1">
        {displayEvents.map((event) => (
          <div
            key={event.id}
            className="calendar-event"
            style={{ backgroundColor: event.color }}
            title={event.title}
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
