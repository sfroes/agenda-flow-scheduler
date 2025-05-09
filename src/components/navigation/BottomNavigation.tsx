
import { Link } from 'react-router-dom';
import { Calendar, User, Briefcase, Settings } from 'lucide-react';
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  className?: string;
}

const BottomNavigation = ({ className }: BottomNavigationProps) => {
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 h-16 bg-white border-t z-50 flex justify-around items-center px-2",
      className
    )}>
      <BottomNavigationItem to="/" icon={<Calendar className="h-5 w-5" />} text="Agenda" />
      <BottomNavigationItem to="/companies" icon={<Briefcase className="h-5 w-5" />} text="Empresas" />
      <BottomNavigationItem to="/services" icon={<Settings className="h-5 w-5" />} text="Serviços" />
      <BottomNavigationItem to="/professionals" icon={<User className="h-5 w-5" />} text="Profissionais" />
    </div>
  );
};

interface BottomNavigationItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const BottomNavigationItem = ({ to, icon, text }: BottomNavigationItemProps) => {
  return (
    <Link to={to} className="flex flex-col items-center justify-center w-full">
      <div className="text-sidebar-foreground">{icon}</div>
      <span className="text-xs mt-1 text-sidebar-foreground">{text}</span>
    </Link>
  );
};

export default BottomNavigation;
