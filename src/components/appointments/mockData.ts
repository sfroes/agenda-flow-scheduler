
// Mock data for appointments
export const mockAppointments = [
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
export const professionals = ['Todos', 'Carlos Pereira', 'Ana Oliveira'];
export const services = ['Todos', 'Corte de Cabelo', 'Manicure', 'Corte e Barba', 'Coloração'];
export const statusOptions = [
  { value: 'todos', label: 'Todos' },
  { value: 'pre-agendado', label: 'Pré-agendado' },
  { value: 'agendado', label: 'Agendado' },
  { value: 'confirmado', label: 'Confirmado' },
  { value: 'cancelado', label: 'Cancelado' },
  { value: 'feriado', label: 'Feriado' },
];
