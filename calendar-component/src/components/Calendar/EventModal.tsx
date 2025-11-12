import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { format } from 'date-fns';
import Modal from '../primitives/Modal';
import Button from '../primitives/Button';
import Select from '../primitives/Select';
import type { CalendarEvent, EventFormData, FormErrors } from './CalendarView.types';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: EventFormData) => void;
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
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isOpen) {
      if (event) {
        setTitle(event.title);
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

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
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
          <label htmlFor="title" className="label">
            Title <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className="input"
            placeholder="Event title"
            autoFocus
            required
            aria-required="true"
            aria-invalid={errors.title ? 'true' : 'false'}
            aria-describedby={errors.title ? 'error hint' : 'hint'}
          />
          {errors.title && (
            <p id="error" className="error" role="alert">
              {errors.title}
            </p>
          )}
          <p id="hint" className="hint" aria-live="polite">
            {title.length}/100 characters
          </p>
        </div>

        <div>
          <label htmlFor="desc" className="label">
            Description
          </label>
          <textarea
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={3}
            className="input"
            placeholder="Event description (optional)"
            aria-invalid={errors.description ? 'true' : 'false'}
            aria-describedby={errors.description ? 'descerror deschint' : 'deschint'}
          />
          {errors.description && (
            <p id="descerror" className="error" role="alert">
              {errors.description}
            </p>
          )}
          <p id="deschint" className="hint" aria-live="polite">
            {description.length}/500 characters
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start" className="label">
              Start Date & Time <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              type="datetime-local"
              id="start"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="end" className="label">
              End Date & Time <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              type="datetime-local"
              id="end"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input"
              required
              aria-required="true"
              aria-invalid={errors.endDate ? 'true' : 'false'}
              aria-describedby={errors.endDate ? 'enderr' : undefined}
            />
            {errors.endDate && (
              <p id="enderr" className="error" role="alert">
                {errors.endDate}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label id="colors" className="label">
              Color
            </label>
            <div className="flex space-x-2" role="group" aria-labelledby="colors">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setColor(option.value)}
                  className="colorpicker"
                  style={{
                    backgroundColor: option.value,
                    borderColor: color === option.value ? '#8b5cf6' : 'transparent',
                    boxShadow: color === option.value ? '0 0 0 3px rgba(139, 92, 246, 0.2)' : undefined,
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

        <div className="actions">
          {event && onDelete ? (
            <Button type="button" variant="danger" onClick={handleDeleteClick}>
              Delete Event
            </Button>
          ) : (
            <div />
          )}
          <div className="btngroup">
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
