# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

# Calendar Component

A fully-featured, accessible calendar component built with React, TypeScript, and Tailwind CSS. Supports month and week views, event management, keyboard navigation, and meets WCAG 2.1 AA accessibility standards.

## 🚀 Features

### Core Functionality
- ✅ **Month View**: 42-cell grid (6×7) with proper date display
- ✅ **Week View**: Time-slot based view with hourly granularity
- ✅ **Event Management**: Create, edit, and delete events with validation
- ✅ **Date Navigation**: Previous/Next navigation and "Today" quick jump
- ✅ **View Toggle**: Seamless switching between month and week views
- ✅ **Real-time Updates**: Instant UI updates after CRUD operations

### Advanced Features
- ✅ **Keyboard Navigation**: Full arrow key support with visual focus indicators
- ✅ **Form Validation**: Title required, end time validation, character limits
- ✅ **Color Coding**: 8 preset colors for event categorization
- ✅ **Event Categories**: Meeting, Design, Development, Planning, Personal
- ✅ **Responsive Design**: Mobile-first, works on all screen sizes
- ✅ **Performance Optimized**: React.memo, useMemo, useCallback throughout

### Accessibility (WCAG 2.1 AA)
- ✅ **Keyboard Accessible**: Tab, Enter, Space, Arrow keys, Escape
- ✅ **ARIA Compliant**: Proper roles, labels, and live regions
- ✅ **Focus Management**: Visible focus indicators, focus trap in modals
- ✅ **Screen Reader Friendly**: Descriptive labels and announcements
- ✅ **High Contrast**: 4.5:1+ color contrast ratios

## 📦 Tech Stack

- **React 19** - UI library
- **TypeScript 5.6** - Type safety with strict mode
- **Tailwind CSS 3** - Utility-first styling
- **Vite 7** - Build tool and dev server
- **date-fns** - Date manipulation
- **clsx** - Conditional class names
- **Storybook 8** - Component documentation

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── CalendarView.tsx        # Main calendar container
│   │   ├── CalendarView.types.ts   # TypeScript interfaces
│   │   ├── MonthView.tsx            # Month grid layout
│   │   ├── WeekView.tsx             # Week time-slot layout
│   │   ├── CalendarCell.tsx         # Individual day cell
│   │   ├── EventModal.tsx           # Event create/edit form
│   │   └── CalendarView.stories.tsx # Storybook stories
│   └── primitives/
│       ├── Modal.tsx                # Accessible modal dialog
│       ├── Button.tsx               # Styled button component
│       └── Select.tsx               # Form select component
├── hooks/
│   ├── useCalendar.ts               # Calendar state management
│   └── useEventManager.ts           # Event CRUD operations
├── utils/
│   ├── date.utils.ts                # Date helper functions
│   └── event.utils.ts               # Event validation & filtering
├── types/
│   └── utility.types.ts             # Advanced TypeScript utilities
└── styles/
    └── globals.css                  # Global styles & Tailwind config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhrxdip/Calendar.git
   cd Calendar/calendar-component
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Run Storybook** (optional)
   ```bash
   npm run storybook
   ```
   Open [http://localhost:6006](http://localhost:6006) to view component documentation.

### Build for Production

```bash
npm run build
npm run preview
```

## 🎮 Usage

### Basic Example

```tsx
import CalendarView from './components/Calendar/CalendarView';
import { useState } from 'react';
import type { CalendarEvent } from './components/Calendar/CalendarView.types';

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const handleDateClick = (date: Date) => {
    console.log('Date clicked:', date);
  };

  const handleEventClick = (event: CalendarEvent) => {
    console.log('Event clicked:', event);
  };

  return (
    <CalendarView
      events={events}
      onDateClick={handleDateClick}
      onEventClick={handleEventClick}
    />
  );
}
```

### With Event Management

```tsx
import { useEventManager } from './hooks/useEventManager';
import EventModal from './components/Calendar/EventModal';

function App() {
  const { events, addEvent, updateEvent, deleteEvent } = useEventManager();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>();

  return (
    <>
      <CalendarView
        events={events}
        onDateClick={(date) => {
          setSelectedDate(date);
          setIsModalOpen(true);
        }}
        onEventClick={(event) => {
          setSelectedEvent(event);
          setIsModalOpen(true);
        }}
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={selectedEvent ? updateEvent : addEvent}
        onDelete={deleteEvent}
        event={selectedEvent}
      />
    </>
  );
}
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` / `Shift+Tab` | Navigate between interactive elements |
| `Arrow Keys` | Navigate calendar cells (Up/Down/Left/Right) |
| `Enter` / `Space` | Open event or create new event |
| `Escape` | Close modal dialog |

## 🎨 Customization

### Colors

Event colors are defined in `EventModal.tsx`:

```typescript
const colorOptions = [
  { value: '#3b82f6', label: 'Blue' },
  { value: '#10b981', label: 'Green' },
  { value: '#f59e0b', label: 'Amber' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#ef4444', label: 'Red' },
  { value: '#ec4899', label: 'Pink' },
  { value: '#06b6d4', label: 'Cyan' },
  { value: '#84cc16', label: 'Lime' },
];
```

### Tailwind Configuration

Customize theme in `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3b82f6',
          600: '#2563eb',
          // ... more shades
        }
      }
    }
  }
}
```

## 🏗️ Architecture Decisions

### State Management
- **Local State**: React hooks (useState, useReducer) for component state
- **Custom Hooks**: useCalendar for navigation, useEventManager for CRUD
- **No Redux**: Kept simple for component library scope

### Type Safety
- **Strict TypeScript**: Enabled strict mode, no `any` types
- **Interface-first**: Interfaces for object shapes, types for unions
- **Type Guards**: Runtime validation with type predicates
- **Utility Types**: Advanced types in `types/utility.types.ts`

### Performance
- **React.memo**: All view components memoized
- **useMemo**: Expensive computations cached (date calculations, event filtering)
- **useCallback**: Event handlers stabilized to prevent re-renders
- **Map-based Lookup**: O(1) event lookup by date key

### Accessibility
- **Focus Management**: Modal focus trap, focus restoration
- **ARIA**: Comprehensive labels, roles, and live regions
- **Keyboard Navigation**: Full keyboard support with visual indicators
- **Screen Readers**: Descriptive announcements and context

## 🧪 Testing

Run type checking:
```bash
npm run type-check
```

Run linting:
```bash
npm run lint
```

## 🐛 Known Limitations

1. **Drag & Drop**: Not yet implemented (planned for v2)
2. **Recurring Events**: Currently supports single events only
3. **Time Zones**: Uses browser local time, no timezone conversion
4. **Event Overlap**: Week view shows overlapping events stacked, not side-by-side
5. **Print Styling**: No dedicated print styles yet
6. **i18n**: Currently English only, no internationalization

## 📝 Future Enhancements

- [ ] Drag and drop event rescheduling
- [ ] Recurring events (daily, weekly, monthly)
- [ ] Event conflict detection
- [ ] Multi-day events spanning rows
- [ ] Custom time ranges (business hours)
- [ ] Export to .ics format
- [ ] Integration with Google Calendar API
- [ ] Dark mode support
- [ ] Internationalization (i18n)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👤 Author

**Abhrxdip**
- GitHub: [@Abhrxdip](https://github.com/Abhrxdip)

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [date-fns](https://date-fns.org/) - Date utilities
- [Vite](https://vitejs.dev/) - Build tool
- [Storybook](https://storybook.js.org/) - Component documentation

---

**⭐ If you find this project helpful, please give it a star!**

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
