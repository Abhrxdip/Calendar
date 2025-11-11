import CalendarView from './components/Calendar/CalendarView';
import type { CalendarEvent } from './components/Calendar/CalendarView.types';

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
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <CalendarView
          events={sampleEvents}
          onDateClick={(date) => console.log('Date clicked:', date)}
          onEventClick={(event) => console.log('Event clicked:', event)}
        />
      </div>
    </div>
  )
}

export default App
