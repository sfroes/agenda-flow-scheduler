
import { format, addDays, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

export default WeeklyView;
