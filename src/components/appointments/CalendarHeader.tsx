
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CalendarHeaderProps {
  currentView: 'day' | 'week';
  setCurrentView: (view: 'day' | 'week') => void;
  selectedDate: Date;
  weekStartDate: Date;
  handlePrevious: () => void;
  handleNext: () => void;
}

const CalendarHeader = ({ 
  currentView, 
  setCurrentView, 
  selectedDate, 
  weekStartDate,
  handlePrevious, 
  handleNext 
}: CalendarHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
      <div className="flex space-x-2">
        <Button
          variant="outline"
          className={currentView === 'day' ? 'bg-schedule-blue text-white' : ''}
          onClick={() => setCurrentView('day')}
        >
          Dia
        </Button>
        <Button
          variant="outline"
          className={currentView === 'week' ? 'bg-schedule-blue text-white' : ''}
          onClick={() => setCurrentView('week')}
        >
          Semana
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={handlePrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-medium text-sm md:text-base">
          {currentView === 'day' 
            ? format(selectedDate, 'PPP', { locale: ptBR })
            : `${format(weekStartDate, 'd MMM', { locale: ptBR })} - ${format(addDays(weekStartDate, 6), 'd MMM', { locale: ptBR })}`
          }
        </span>
        <Button variant="outline" size="icon" onClick={handleNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
