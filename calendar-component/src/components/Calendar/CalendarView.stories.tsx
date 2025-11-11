import type { Meta, StoryObj } from '@storybook/react';
import CalendarView from './CalendarView';
import type { CalendarEvent } from './CalendarView.types';

const meta: Meta<typeof CalendarView> = {
  title: 'Calendar/CalendarView',
  component: CalendarView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CalendarView>;

const sampleEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Team Standup',
    startDate: new Date(2025, 10, 15, 9, 0),
    endDate: new Date(2025, 10, 15, 9, 30),
    color: '#3b82f6',
    category: 'Meeting',
    description: 'Daily team sync meeting',
  },
  {
    id: 'evt-2',
    title: 'Design Review',
    startDate: new Date(2025, 10, 15, 14, 0),
    endDate: new Date(2025, 10, 15, 15, 30),
    color: '#10b981',
    category: 'Design',
    description: 'Review new UI designs',
  },
  {
    id: 'evt-3',
    title: 'Client Call',
    startDate: new Date(2025, 10, 18, 10, 0),
    endDate: new Date(2025, 10, 18, 11, 0),
    color: '#f59e0b',
    category: 'Meeting',
  },
  {
    id: 'evt-4',
    title: 'Sprint Planning',
    startDate: new Date(2025, 10, 20, 13, 0),
    endDate: new Date(2025, 10, 20, 15, 0),
    color: '#8b5cf6',
    category: 'Planning',
  },
  {
    id: 'evt-5',
    title: 'Code Review',
    startDate: new Date(2025, 10, 22, 11, 0),
    endDate: new Date(2025, 10, 22, 12, 0),
    color: '#ec4899',
    category: 'Development',
  },
];

const largeDataset: CalendarEvent[] = Array.from({ length: 25 }, (_, i) => ({
  id: `evt-large-${i}`,
  title: `Event ${i + 1}`,
  startDate: new Date(2025, 10, 10 + (i % 15), 9 + (i % 8), 0),
  endDate: new Date(2025, 10, 10 + (i % 15), 10 + (i % 8), 0),
  color: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'][i % 5],
  category: ['Meeting', 'Design', 'Development', 'Planning', 'Personal'][i % 5],
  description: `Description for event ${i + 1}`,
}));

export const Default: Story = {
  args: {
    initialDate: new Date(2025, 10, 15),
    initialView: 'month',
    events: sampleEvents,
  },
};

export const EmptyState: Story = {
  args: {
    initialDate: new Date(2025, 10, 15),
    initialView: 'month',
    events: [],
  },
};

export const WeekView: Story = {
  args: {
    initialDate: new Date(2025, 10, 15),
    initialView: 'week',
    events: sampleEvents,
  },
};

export const LargeDataset: Story = {
  args: {
    initialDate: new Date(2025, 10, 15),
    initialView: 'month',
    events: largeDataset,
  },
};

export const InteractivePlayground: Story = {
  args: {
    initialDate: new Date(2025, 10, 15),
    initialView: 'month',
    events: sampleEvents,
    onDateClick: (date: Date) => {
      console.log('Date clicked:', date);
    },
    onEventClick: (event: CalendarEvent) => {
      console.log('Event clicked:', event);
    },
  },
};

export const AccessibilityDemo: Story = {
  args: {
    initialDate: new Date(2025, 10, 15),
    initialView: 'month',
    events: sampleEvents,
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigate using keyboard: Tab, Shift+Tab, Enter, Space, Arrow keys, Escape',
      },
    },
  },
};
