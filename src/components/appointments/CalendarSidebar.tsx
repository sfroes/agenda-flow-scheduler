
import { isSameDay } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from 'date-fns';

interface CalendarSidebarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  filteredAppointments: any[];
}

const CalendarSidebar = ({ selectedDate, setSelectedDate, filteredAppointments }: CalendarSidebarProps) => {
  return (
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
  );
};

export default CalendarSidebar;
