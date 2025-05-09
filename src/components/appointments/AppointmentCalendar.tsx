
import { useState } from 'react';
import { format, startOfWeek, addDays, startOfDay, addHours, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock data for appointments
const mockAppointments = [
  {
    id: '1',
    clientName: 'João Silva',
    service: 'Corte de Cabelo',
    professional: 'Carlos Pereira',
    startTime: new Date(2025, 4, 9, 10, 0),
    endTime: new Date(2025, 4, 9, 10, 30),
  },
  {
    id: '2',
    clientName: 'Maria Souza',
    service: 'Manicure',
    professional: 'Ana Oliveira',
    startTime: new Date(2025, 4, 9, 14, 0),
    endTime: new Date(2025, 4, 9, 15, 0),
  },
  {
    id: '3',
    clientName: 'Pedro Almeida',
    service: 'Corte e Barba',
    professional: 'Carlos Pereira',
    startTime: new Date(2025, 4, 10, 11, 0),
    endTime: new Date(2025, 4, 10, 12, 0),
  },
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
          className="absolute inset-0 mt-5 mx-1 rounded bg-schedule-blue text-white text-xs p-1 truncate"
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
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
          <span className="font-medium">
            {currentView === 'day' 
              ? format(selectedDate, 'PPP', { locale: ptBR })
              : `${format(weekStartDate, 'd MMM', { locale: ptBR })} - ${format(addDays(weekStartDate, 6), 'd MMM', { locale: ptBR })}`
            }
          </span>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button>
          Novo Agendamento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1">
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
                {mockAppointments
                  .filter(app => isSameDay(app.startTime, new Date()))
                  .map(app => (
                    <div key={app.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{app.clientName}</p>
                        <p className="text-sm text-gray-500">{app.service}</p>
                      </div>
                      <Badge>{format(app.startTime, 'HH:mm')}</Badge>
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
              appointments={mockAppointments}
              onSelectSlot={handleSelectSlot}
            />
          ) : (
            <WeeklyView
              startDate={weekStartDate}
              appointments={mockAppointments}
              onSelectSlot={handleSelectSlot}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
