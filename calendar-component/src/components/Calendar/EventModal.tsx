import { useState } from 'react';
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
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [startDate, setStartDate] = useState(
    event?.startDate ? format(event.startDate, "yyyy-MM-dd'T'HH:mm") : 
    selectedDate ? format(selectedDate, "yyyy-MM-dd'T'HH:mm") : 
    format(new Date(), "yyyy-MM-dd'T'HH:mm")
  );
  const [endDate, setEndDate] = useState(
    event?.endDate ? format(event.endDate, "yyyy-MM-dd'T'HH:mm") : 
    selectedDate ? format(new Date(selectedDate.getTime() + 3600000), "yyyy-MM-dd'T'HH:mm") : 
    format(new Date(Date.now() + 3600000), "yyyy-MM-dd'T'HH:mm")
  );
  const [color, setColor] = useState(event?.color || '#3b82f6');
  const [category, setCategory] = useState(event?.category || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setStartDate(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
    setEndDate(format(new Date(Date.now() + 3600000), "yyyy-MM-dd'T'HH:mm"));
    setColor('#3b82f6');
    setCategory('');
    setErrors({});
    onClose();
  };

  const handleDeleteClick = () => {
    if (event && onDelete) {
      onDelete(event.id);
      handleClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={event ? 'Edit Event' : 'Create Event'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
            placeholder="Event title"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          <p className="mt-1 text-xs text-gray-500">{title.length}/100 characters</p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
            placeholder="Event description (optional)"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          <p className="mt-1 text-xs text-gray-500">{description.length}/500 characters</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
            />
            {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex space-x-2">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setColor(option.value)}
                  className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                  style={{
                    backgroundColor: option.value,
                    borderColor: color === option.value ? '#000' : 'transparent',
                  }}
                  title={option.label}
                  aria-label={option.label}
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
            <Button type="button" variant="outline" onClick={handleClose}>
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
