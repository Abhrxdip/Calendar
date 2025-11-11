import type { CalendarEvent } from '../components/Calendar/CalendarView.types';

export const filterEventsByDate = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  return events.filter(event => {
    const eventStart = new Date(event.startDate);
    return (
      eventStart.getFullYear() === date.getFullYear() &&
      eventStart.getMonth() === date.getMonth() &&
      eventStart.getDate() === date.getDate()
    );
  });
};

export const filterEventsByDateTime = (events: CalendarEvent[], date: Date, hour: number): CalendarEvent[] => {
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

export const sortEventsByStartDate = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
};

export const getEventDuration = (event: CalendarEvent): number => {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  return end.getTime() - start.getTime();
};

export const getEventDurationInHours = (event: CalendarEvent): number => {
  return getEventDuration(event) / (1000 * 60 * 60);
};

export const isEventOngoing = (event: CalendarEvent, currentTime: Date = new Date()): boolean => {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  return currentTime >= start && currentTime <= end;
};

export const hasEventConflict = (event1: CalendarEvent, event2: CalendarEvent): boolean => {
  const start1 = new Date(event1.startDate);
  const end1 = new Date(event1.endDate);
  const start2 = new Date(event2.startDate);
  const end2 = new Date(event2.endDate);

  return (start1 < end2 && end1 > start2);
};

export const findConflictingEvents = (event: CalendarEvent, allEvents: CalendarEvent[]): CalendarEvent[] => {
  return allEvents.filter(e => e.id !== event.id && hasEventConflict(event, e));
};

export const generateEventId = (): string => {
  return `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const validateEvent = (event: Omit<CalendarEvent, 'id'>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!event.title || event.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (event.title && event.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  if (event.description && event.description.length > 500) {
    errors.push('Description must be less than 500 characters');
  }

  const start = new Date(event.startDate);
  const end = new Date(event.endDate);

  if (end <= start) {
    errors.push('End date must be after start date');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const groupEventsByDate = (events: CalendarEvent[]): Map<string, CalendarEvent[]> => {
  const grouped = new Map<string, CalendarEvent[]>();

  events.forEach(event => {
    const dateKey = new Date(event.startDate).toDateString();
    const existing = grouped.get(dateKey) || [];
    grouped.set(dateKey, [...existing, event]);
  });

  return grouped;
};

export const getEventsInRange = (events: CalendarEvent[], startDate: Date, endDate: Date): CalendarEvent[] => {
  return events.filter(event => {
    const eventStart = new Date(event.startDate);
    return eventStart >= startDate && eventStart <= endDate;
  });
};
