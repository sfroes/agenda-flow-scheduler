
import { useState, useMemo } from 'react';
import { startOfWeek } from 'date-fns';
import { useIsMobile } from "@/hooks/use-mobile";
import { mockAppointments, professionals, services, statusOptions } from './mockData';
import CalendarHeader from './CalendarHeader';
import DailyView from './DailyView';
import WeeklyView from './WeeklyView';
import CalendarSidebar from './CalendarSidebar';
import FilterToolbar from './FilterToolbar';

const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentView, setCurrentView] = useState<'day' | 'week'>('day');
  const [weekStartDate, setWeekStartDate] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );
  const [selectedProfessional, setSelectedProfessional] = useState<string>('Todos');
  const [selectedService, setSelectedService] = useState<string>('Todos');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  const isMobile = useIsMobile();

  const handlePrevious = () => {
    if (currentView === 'day') {
      setSelectedDate(prevDate => {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() - 1);
        return newDate;
      });
    } else {
      setWeekStartDate(prevDate => {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() - 7);
        return newDate;
      });
    }
  };

  const handleNext = () => {
    if (currentView === 'day') {
      setSelectedDate(prevDate => {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
      });
    } else {
      setWeekStartDate(prevDate => {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() + 7);
        return newDate;
      });
    }
  };

  const handleSelectSlot = (time: Date) => {
    // Here you would open a modal to create an appointment
    console.log("Selected time slot:", time);
  };
  
  const filteredAppointments = useMemo(() => {
    return mockAppointments.filter(appointment => {
      // Filter by professional
      if (selectedProfessional !== 'Todos' && appointment.professional !== selectedProfessional) {
        return false;
      }
      
      // Filter by service
      if (selectedService !== 'Todos' && appointment.service !== selectedService) {
        return false;
      }
      
      // Filter by status
      if (selectedStatus !== 'todos' && appointment.status !== selectedStatus) {
        return false;
      }
      
      return true;
    });
  }, [selectedProfessional, selectedService, selectedStatus]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        <CalendarHeader 
          currentView={currentView}
          setCurrentView={setCurrentView}
          selectedDate={selectedDate}
          weekStartDate={weekStartDate}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
        
        <FilterToolbar
          professionals={professionals}
          services={services}
          statusOptions={statusOptions}
          selectedProfessional={selectedProfessional}
          setSelectedProfessional={setSelectedProfessional}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          isFilterDrawerOpen={isFilterDrawerOpen}
          setIsFilterDrawerOpen={setIsFilterDrawerOpen}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CalendarSidebar 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          filteredAppointments={filteredAppointments}
        />
        
        <div className="md:col-span-3">
          {currentView === 'day' ? (
            <DailyView 
              date={selectedDate}
              appointments={filteredAppointments}
              onSelectSlot={handleSelectSlot}
            />
          ) : (
            <WeeklyView
              startDate={weekStartDate}
              appointments={filteredAppointments}
              onSelectSlot={handleSelectSlot}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
