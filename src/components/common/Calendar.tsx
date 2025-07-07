import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
  disabledDates = [],
  className = ''
}) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return disabledDates.some(disabledDate => 
      date.toDateString() === disabledDate.toDateString()
    );
  };

  const isDateSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (!isDateDisabled(date)) {
      onDateSelect(date);
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const disabled = isDateDisabled(date);
      const selected = isDateSelected(date);
      const today = isToday(date);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={disabled}
          className={`
            h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 
            ${selected 
              ? 'bg-primary-600 text-white shadow-lg scale-110' 
              : today
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }
            ${disabled 
              ? 'opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-600' 
              : 'cursor-pointer hover:scale-105'
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
        </div>
        
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="h-10 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-6 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
            <span>Selecionado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary-100 dark:bg-primary-900 rounded-full"></div>
            <span>Hoje</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <span>Indisponível</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;