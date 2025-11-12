import { useState, useCallback } from 'react';
import CalendarView from './components/Calendar/CalendarView';
import EventModal from './components/Calendar/EventModal';
import type { CalendarEvent } from './components/Calendar/CalendarView.types';
import { useEventManager } from './hooks/useEventManager';

const sampleEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Team Standup',
    startDate: new Date(2025, 10, 15, 9, 0),
    endDate: new Date(2025, 10, 15, 9, 30),
    color: '#3b82f6',
    category: 'Meeting'
  },
  {
    id: 'evt-2',
    title: 'Design Review',
    startDate: new Date(2025, 10, 15, 14, 0),
    endDate: new Date(2025, 10, 15, 15, 30),
    color: '#10b981',
    category: 'Design'
  },
  {
    id: 'evt-3',
    title: 'Client Call',
    startDate: new Date(2025, 10, 18, 10, 0),
    endDate: new Date(2025, 10, 18, 11, 0),
    color: '#f59e0b',
    category: 'Meeting'
  },
  {
    id: 'evt-4',
    title: 'Sprint Planning',
    startDate: new Date(2025, 10, 20, 13, 0),
    endDate: new Date(2025, 10, 20, 15, 0),
    color: '#8b5cf6',
    category: 'Planning'
  },
];

function App() {
  const { events, addEvent, updateEvent, deleteEvent } = useEventManager(sampleEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleDateClick = useCallback((date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(undefined);
    setIsModalOpen(true);
  }, []);

  const handleEventClick = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(undefined);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(undefined);
    setSelectedDate(undefined);
  }, []);

  const handleEventSave = useCallback((eventData: Omit<CalendarEvent, 'id'>) => {
    if (selectedEvent) {
      updateEvent(selectedEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
  }, [selectedEvent, addEvent, updateEvent]);

  const handleEventDelete = useCallback((id: string) => {
    deleteEvent(id);
  }, [deleteEvent]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <CalendarView
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
        <EventModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleEventSave}
          onDelete={handleEventDelete}
          event={selectedEvent}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}

export default App;
