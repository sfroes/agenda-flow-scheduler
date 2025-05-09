
import { Link } from 'react-router-dom';
import { Calendar, User, Briefcase, Settings, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col h-full bg-sidebar border-r shadow-lg",
        "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="text-xl font-bold text-schedule-blue">Agenda Pro</div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <SidebarItem 
            to="/" 
            icon={<Calendar className="h-5 w-5" />} 
            text="Agenda" 
          />
          <SidebarItem 
            to="/companies" 
            icon={<Briefcase className="h-5 w-5" />} 
            text="Empresas" 
          />
          <SidebarItem 
            to="/services" 
            icon={<Settings className="h-5 w-5" />} 
            text="Serviços" 
          />
          <SidebarItem 
            to="/professionals" 
            icon={<User className="h-5 w-5" />} 
            text="Profissionais" 
          />
        </ul>
      </nav>

      <div className="p-4 border-t">
        <SidebarItem 
          to="/settings" 
          icon={<Settings className="h-5 w-5" />} 
          text="Configurações" 
        />
      </div>
    </div>
  );
};

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const SidebarItem = ({ to, icon, text }: SidebarItemProps) => {
  return (
    <li>
      <Link 
        to={to} 
        className="flex items-center p-2 rounded-md hover:bg-sidebar-accent group transition-colors"
      >
        <span className="text-sidebar-foreground">{icon}</span>
        <span className="ml-3 text-sidebar-foreground">{text}</span>
      </Link>
    </li>
  );
};

export default Sidebar;
