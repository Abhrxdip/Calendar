export type ViewType = 'month' | 'week';

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  color: string;
  category?: string;
  description?: string;
}

export interface CalendarCellProps {
  date: Date;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  events?: CalendarEvent[];
  onClick?: (date: Date) => void;
}

export interface MonthViewProps {
  currentDate: Date;
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
}

export interface WeekViewProps {
  currentDate: Date;
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
}

export interface CalendarViewProps {
  initialDate?: Date;
  initialView?: ViewType;
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date) => void;
}
