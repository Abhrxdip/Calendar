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

export type EventFormData = Omit<CalendarEvent, 'id'>;

export type FormErrors = Partial<Record<keyof EventFormData, string>>;

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface EventOperationResult<T = void> {
  success: boolean;
  errors?: string[];
  data?: T;
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

export interface KeyboardModifiers {
  shiftKey: boolean;
  metaKey: boolean;
  ctrlKey: boolean;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface Position {
  x: number;
  y: number;
}

export const isCalendarEvent = (obj: unknown): obj is CalendarEvent => {
  if (typeof obj !== 'object' || obj === null) return false;
  const event = obj as Record<string, unknown>;
  return (
    typeof event.id === 'string' &&
    typeof event.title === 'string' &&
    event.startDate instanceof Date &&
    event.endDate instanceof Date
  );
};

export const isValidEventFormData = (data: unknown): data is EventFormData => {
  if (typeof data !== 'object' || data === null) return false;
  const form = data as Record<string, unknown>;
  return (
    typeof form.title === 'string' &&
    form.startDate instanceof Date &&
    form.endDate instanceof Date &&
    (form.color === undefined || typeof form.color === 'string') &&
    (form.category === undefined || typeof form.category === 'string') &&
    (form.description === undefined || typeof form.description === 'string')
  );
};
