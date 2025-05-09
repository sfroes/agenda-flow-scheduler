
import { useState, useMemo } from 'react';
import { format, startOfWeek, addDays, startOfDay, addHours, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Mock data for appointments
const mockAppointments = [
  {
    id: '1',
    clientName: 'João Silva',
    service: 'Corte de Cabelo',
    professional: 'Carlos Pereira',
    startTime: new Date(2025, 4, 9, 10, 0),
    endTime: new Date(2025, 4, 9, 10, 30),
    status: 'agendado',
  },
  {
    id: '2',
    clientName: 'Maria Souza',
    service: 'Manicure',
    professional: 'Ana Oliveira',
    startTime: new Date(2025, 4, 9, 14, 0),
    endTime: new Date(2025, 4, 9, 15, 0),
    status: 'confirmado',
  },
  {
    id: '3',
    clientName: 'Pedro Almeida',
    service: 'Corte e Barba',
    professional: 'Carlos Pereira',
    startTime: new Date(2025, 4, 10, 11, 0),
    endTime: new Date(2025, 4, 10, 12, 0),
    status: 'cancelado',
  },
  {
    id: '4',
    clientName: 'Ana Costa',
    service: 'Coloração',
    professional: 'Ana Oliveira',
    startTime: new Date(2025, 4, 10, 14, 0),
    endTime: new Date(2025, 4, 10, 16, 0),
    status: 'pre-agendado',
  },
];

// Mock data for professionals and services
const professionals = ['Todos', 'Carlos Pereira', 'Ana Oliveira'];
const services = ['Todos', 'Corte de Cabelo', 'Manicure', 'Corte e Barba', 'Coloração'];
const statusOptions = [
  { value: 'todos', label: 'Todos' },
  { value: 'pre-agendado', label: 'Pré-agendado' },
  { value: 'agendado', label: 'Agendado' },
  { value: 'confirmado', label: 'Confirmado' },
  { value: 'cancelado', label: 'Cancelado' },
  { value: 'feriado', label: 'Feriado' },
];

interface TimeSlotProps {
  time: Date;
  appointments: any[];
  onSelectSlot: (time: Date) => void;
}

const TimeSlot = ({ time, appointments, onSelectSlot }: TimeSlotProps) => {
  const timeLabel = format(time, 'HH:mm');
  const appointmentsAtTime = appointments.filter(app => 
    time >= app.startTime && time < app.endTime
  );
  
  return (
    <div 
      className={`h-16 border-t p-1 relative ${appointmentsAtTime.length ? 'bg-blue-50' : ''}`}
      onClick={() => onSelectSlot(time)}
    >
      <div className="text-xs text-gray-500">{timeLabel}</div>
      {appointmentsAtTime.map(appointment => (
        <div 
          key={appointment.id}
          className={`absolute inset-0 mt-5 mx-1 rounded text-white text-xs p-1 truncate
            ${appointment.status === 'cancelado' ? 'bg-red-500' : 
              appointment.status === 'pre-agendado' ? 'bg-yellow-500' : 
              appointment.status === 'confirmado' ? 'bg-green-600' : 'bg-schedule-blue'
            }`}
          style={{ 
            top: '20%',
            height: '70%',
          }}
        >
          {appointment.clientName} - {appointment.service}
        </div>
      ))}
    </div>
  );
};

interface DailyViewProps {
  date: Date;
  appointments: any[];
  onSelectSlot: (time: Date) => void;
}

const DailyView = ({ date, appointments, onSelectSlot }: DailyViewProps) => {
  const dayStart = startOfDay(date);
  const hours = Array.from({ length: 12 }).map((_, i) => addHours(dayStart, 8 + i)); // 8 AM to 7 PM
  
  const filteredAppointments = appointments.filter(app => 
    isSameDay(app.startTime, date)
  );

  return (
    <div className="border rounded-md">
      <div className="bg-schedule-blue text-white p-2 font-medium text-center">
        {format(date, 'EEEE, d MMMM', { locale: ptBR })}
      </div>
      <div className="h-[600px] overflow-y-auto">
        {hours.map(time => (
          <TimeSlot 
            key={time.toISOString()} 
            time={time} 
            appointments={filteredAppointments}
            onSelectSlot={onSelectSlot}
          />
        ))}
      </div>
    </div>
  );
};

interface WeeklyViewProps {
  startDate: Date;
  appointments: any[];
  onSelectSlot: (time: Date) => void;
}

const WeeklyView = ({ startDate, appointments, onSelectSlot }: WeeklyViewProps) => {
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  return (
    <div className="grid grid-cols-7 gap-2">
      {weekDays.map(day => (
        <div key={day.toISOString()} className="border rounded-md">
          <div className="bg-gray-100 p-1 text-center text-sm font-medium">
            {format(day, 'EEE, d', { locale: ptBR })}
          </div>
          <div className="p-1 h-32 overflow-y-auto">
            {appointments
              .filter(app => isSameDay(app.startTime, day))
              .map(app => (
                <div 
                  key={app.id}
                  className="bg-schedule-blue text-white text-xs p-1 mb-1 rounded cursor-pointer"
                  onClick={() => onSelectSlot(app.startTime)}
                >
                  {format(app.startTime, 'HH:mm')} - {app.clientName}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

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
      setSelectedDate(addDays(selectedDate, -1));
    } else {
      setWeekStartDate(addDays(weekStartDate, -7));
    }
  };

  const handleNext = () => {
    if (currentView === 'day') {
      setSelectedDate(addDays(selectedDate, 1));
    } else {
      setWeekStartDate(addDays(weekStartDate, 7));
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

  const FilterContent = () => (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Profissional</label>
        <Select 
          value={selectedProfessional} 
          onValueChange={setSelectedProfessional}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um profissional" />
          </SelectTrigger>
          <SelectContent>
            {professionals.map(prof => (
              <SelectItem key={prof} value={prof}>
                {prof}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Serviço</label>
        <Select 
          value={selectedService} 
          onValueChange={setSelectedService}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um serviço" />
          </SelectTrigger>
          <SelectContent>
            {services.map(service => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <Select 
          value={selectedStatus} 
          onValueChange={setSelectedStatus}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
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

        <div className="flex justify-between space-x-2">
          {isMobile ? (
            <Drawer open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filtros</DrawerTitle>
                </DrawerHeader>
                <FilterContent />
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button>Aplicar</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ) : (
            <div className="md:flex items-center space-x-2 hidden">
              <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Profissional" />
                </SelectTrigger>
                <SelectContent>
                  {professionals.map(prof => (
                    <SelectItem key={prof} value={prof}>{prof}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Serviço" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem key={service} value={service}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <Button>
            Novo Agendamento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
            
            <div className="mt-4">
              <h3 className="font-medium mb-2">Agendamentos de Hoje</h3>
              <div className="space-y-2">
                {filteredAppointments
                  .filter(app => isSameDay(app.startTime, new Date()))
                  .map(app => (
                    <div key={app.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{app.clientName}</p>
                        <p className="text-sm text-gray-500">{app.service}</p>
                      </div>
                      <Badge 
                        className={
                          app.status === 'cancelado' ? 'bg-red-500' : 
                          app.status === 'pre-agendado' ? 'bg-yellow-500' : 
                          app.status === 'confirmado' ? 'bg-green-600' : ''
                        }
                      >
                        {format(app.startTime, 'HH:mm')}
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
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
