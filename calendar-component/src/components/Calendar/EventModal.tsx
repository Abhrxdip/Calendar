import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { format } from 'date-fns';
import Modal from '../primitives/Modal';
import Button from '../primitives/Button';
import Select from '../primitives/Select';
import type { CalendarEvent } from './CalendarView.types';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onDelete?: (id: string) => void;
  event?: CalendarEvent;
  selectedDate?: Date;
}

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

const categoryOptions = [
  { value: '', label: 'No Category' },
  { value: 'Meeting', label: 'Meeting' },
  { value: 'Design', label: 'Design' },
  { value: 'Development', label: 'Development' },
  { value: 'Planning', label: 'Planning' },
  { value: 'Personal', label: 'Personal' },
];

export default function EventModal({ isOpen, onClose, onSave, onDelete, event, selectedDate }: EventModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [color, setColor] = useState('#3b82f6');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      if (event) {
        setTitle(event.title || '');
        setDescription(event.description || '');
        setStartDate(format(new Date(event.startDate), "yyyy-MM-dd'T'HH:mm"));
        setEndDate(format(new Date(event.endDate), "yyyy-MM-dd'T'HH:mm"));
        setColor(event.color || '#3b82f6');
        setCategory(event.category || '');
      } else {
        const baseDate = selectedDate || new Date();
        setTitle('');
        setDescription('');
        setStartDate(format(baseDate, "yyyy-MM-dd'T'HH:mm"));
        setEndDate(format(new Date(baseDate.getTime() + 3600000), "yyyy-MM-dd'T'HH:mm"));
        setColor('#3b82f6');
        setCategory('');
      }
      setErrors({});
    }
  }, [isOpen, event, selectedDate]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end <= start) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      color,
      category: category || undefined,
    });
    
    onClose();
  };

  const handleDeleteClick = () => {
    if (event && onDelete) {
      onDelete(event.id);
      onClose();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={event ? 'Edit Event' : 'Create Event'}
      description={event ? 'Update event details below' : 'Fill in the details to create a new calendar event'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="event-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 sm:text-sm px-3 py-2 border transition-colors"
            placeholder="Event title"
            autoFocus
            required
            aria-required="true"
            aria-invalid={errors.title ? 'true' : 'false'}
            aria-describedby={errors.title ? 'title-error title-hint' : 'title-hint'}
          />
          {errors.title && (
            <p id="title-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.title}
            </p>
          )}
          <p id="title-hint" className="mt-1 text-xs text-gray-500" aria-live="polite">
            {title.length}/100 characters
          </p>
        </div>

        <div>
          <label htmlFor="event-description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="event-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 sm:text-sm px-3 py-2 border transition-colors"
            placeholder="Event description (optional)"
            aria-invalid={errors.description ? 'true' : 'false'}
            aria-describedby={errors.description ? 'description-error description-hint' : 'description-hint'}
          />
          {errors.description && (
            <p id="description-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.description}
            </p>
          )}
          <p id="description-hint" className="mt-1 text-xs text-gray-500" aria-live="polite">
            {description.length}/500 characters
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="event-start-date" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date & Time <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              type="datetime-local"
              id="event-start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 sm:text-sm px-3 py-2 border transition-colors"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="event-end-date" className="block text-sm font-medium text-gray-700 mb-1">
              End Date & Time <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              type="datetime-local"
              id="event-end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 sm:text-sm px-3 py-2 border transition-colors"
              required
              aria-required="true"
              aria-invalid={errors.endDate ? 'true' : 'false'}
              aria-describedby={errors.endDate ? 'end-date-error' : undefined}
            />
            {errors.endDate && (
              <p id="end-date-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.endDate}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label id="color-label" className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex space-x-2" role="group" aria-labelledby="color-label">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setColor(option.value)}
                  className="w-8 h-8 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
                  style={{
                    backgroundColor: option.value,
                    borderColor: color === option.value ? '#000' : 'transparent',
                  }}
                  title={option.label}
                  aria-label={`Select ${option.label} color`}
                  aria-pressed={color === option.value}
                />
              ))}
            </div>
          </div>

          <Select
            label="Category"
            options={categoryOptions}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="flex justify-between pt-4 border-t">
          {event && onDelete ? (
            <Button type="button" variant="danger" onClick={handleDeleteClick}>
              Delete Event
            </Button>
          ) : (
            <div />
          )}
          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {event ? 'Save Changes' : 'Create Event'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
