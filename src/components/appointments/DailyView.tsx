
import { startOfDay, addHours, isSameDay, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import TimeSlot from './TimeSlot';

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

export default DailyView;
