export type ViewType = 'month' | 'week';

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  color?: string;
  category?: string;
  description?: string;
}

export interface CalendarEventInput {
  title: string;
  startDate: Date;
  endDate: Date;
  color?: string;
  category?: string;
  description?: string;
}

export interface CalendarSelection {
  anchor: Date | null;
  range: { start: Date; end: Date } | null;
  focused: Date;
  isDragging: boolean;
}

export interface CalendarHoverPreview {
  eventId: string;
  position: { x: number; y: number };
}

export interface CalendarDragPayload {
  eventId: string;
  originStart: Date;
  duration: number;
  view: ViewType;
}

export interface CalendarCellProps {
  date: Date;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  isInRange?: boolean;
  events?: CalendarEvent[];
  maxVisibleEvents?: number;
  focusable?: boolean;
  onSelect?: (date: Date, modifiers?: { shiftKey: boolean; metaKey: boolean; ctrlKey: boolean }) => void;
  onHover?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onEventDragStart?: (event: CalendarEvent, originDate: Date) => void;
  onEventDragEnd?: () => void;
  onEventHover?: (event: CalendarEvent | null, position?: { x: number; y: number }) => void;
  onMoreClick?: (date: Date) => void;
}

export interface MonthViewProps {
  currentDate: Date;
  focusedDate: Date;
  selection: CalendarSelection;
  eventsByDay: Map<string, CalendarEvent[]>;
  maxVisibleEvents?: number;
  onSelectDate: (date: Date, modifiers: { shiftKey: boolean; metaKey: boolean; ctrlKey: boolean }) => void;
  onHoverDate: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onEventDragStart: (event: CalendarEvent, originDate: Date) => void;
  onEventDragEnd: () => void;
  onEventHover: (event: CalendarEvent | null, position?: { x: number; y: number }) => void;
  onShowOverflow: (date: Date) => void;
}

export interface WeekViewEventLayout {
  event: CalendarEvent;
  top: number;
  height: number;
  left: number;
  width: number;
}

export interface WeekViewDayLayout {
  date: Date;
  events: WeekViewEventLayout[];
}

export interface WeekViewProps {
  currentDate: Date;
  stepMinutes: number;
  focusedDate: Date;
  eventsByDay: WeekViewDayLayout[];
  selection: CalendarSelection;
  onDateSelect: (date: Date, modifiers: { shiftKey: boolean; metaKey: boolean; ctrlKey: boolean }) => void;
  onSlotPointerDown: (date: Date) => void;
  onSlotPointerEnter: (date: Date) => void;
  onSlotPointerUp: () => void;
  onEventClick: (event: CalendarEvent) => void;
  onEventDragStart: (event: CalendarEvent, originDate: Date) => void;
  onEventDragEnd: () => void;
  onEventHover: (event: CalendarEvent | null, position?: { x: number; y: number }) => void;
}

export interface CalendarViewProps {
  initialDate?: Date;
  initialView?: ViewType;
  defaultEvents?: CalendarEvent[];
  events?: CalendarEvent[];
  onEventsChange?: (events: CalendarEvent[]) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date) => void;
  hourStep?: 30 | 60;
  minHour?: number;
  maxHour?: number;
}
