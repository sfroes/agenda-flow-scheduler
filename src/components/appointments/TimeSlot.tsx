
import { format } from 'date-fns';

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

export default TimeSlot;
