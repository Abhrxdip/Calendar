import { useState, useCallback } from 'react';
import { generateEventId, validateEvent, sortEventsByStartDate } from '../utils/event.utils';
import type { CalendarEvent, EventFormData, EventOperationResult } from '../components/Calendar/CalendarView.types';

interface UseEventManagerReturn {
  events: CalendarEvent[];
  addEvent: (event: EventFormData) => EventOperationResult<CalendarEvent>;
  updateEvent: (id: string, updates: Partial<EventFormData>) => EventOperationResult;
  deleteEvent: (id: string) => void;
  getEvent: (id: string) => CalendarEvent | undefined;
  clearAllEvents: () => void;
  setEvents: (events: CalendarEvent[]) => void;
}

export const useEventManager = (initialEvents: CalendarEvent[] = []): UseEventManagerReturn => {
  const [events, setEventsState] = useState<CalendarEvent[]>(sortEventsByStartDate(initialEvents));

  const addEvent = useCallback((event: EventFormData): EventOperationResult<CalendarEvent> => {
    const validation = validateEvent(event);
    
    if (!validation.valid) {
      return { success: false, errors: validation.errors };
    }

    const newEvent: CalendarEvent = {
      ...event,
      id: generateEventId(),
    };

    setEventsState(prev => sortEventsByStartDate([...prev, newEvent]));
    
    return { success: true, data: newEvent };
  }, []);

  const updateEvent = useCallback((id: string, updates: Partial<EventFormData>): EventOperationResult => {
    const existingEvent = events.find(e => e.id === id);
    
    if (!existingEvent) {
      return { success: false, errors: ['Event not found'] };
    }

    const updatedEvent: CalendarEvent = { ...existingEvent, ...updates };
    const validation = validateEvent(updatedEvent);
    
    if (!validation.valid) {
      return { success: false, errors: validation.errors };
    }

    setEventsState(prev => 
      sortEventsByStartDate(prev.map(e => e.id === id ? updatedEvent : e))
    );
    
    return { success: true };
  }, [events]);

  const deleteEvent = useCallback((id: string) => {
    setEventsState(prev => prev.filter(e => e.id !== id));
  }, []);

  const getEvent = useCallback((id: string) => {
    return events.find(e => e.id === id);
  }, [events]);

  const clearAllEvents = useCallback(() => {
    setEventsState([]);
  }, []);

  const setEvents = useCallback((newEvents: CalendarEvent[]) => {
    setEventsState(sortEventsByStartDate(newEvents));
  }, []);

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    clearAllEvents,
    setEvents,
  };
};
