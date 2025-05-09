
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Briefcase, Settings, Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-sidebar transition-all duration-300 border-r",
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="text-xl font-bold text-schedule-blue">Agenda Pro</div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="ml-auto text-sidebar-foreground"
        >
          {isCollapsed ? <Menu /> : <X />}
        </Button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <SidebarItem 
            to="/" 
            icon={<Calendar className="h-5 w-5" />} 
            text="Agenda" 
            isCollapsed={isCollapsed} 
          />
          <SidebarItem 
            to="/companies" 
            icon={<Briefcase className="h-5 w-5" />} 
            text="Empresas" 
            isCollapsed={isCollapsed} 
          />
          <SidebarItem 
            to="/services" 
            icon={<Settings className="h-5 w-5" />} 
            text="Serviços" 
            isCollapsed={isCollapsed} 
          />
          <SidebarItem 
            to="/professionals" 
            icon={<User className="h-5 w-5" />} 
            text="Profissionais" 
            isCollapsed={isCollapsed} 
          />
        </ul>
      </nav>

      <div className="p-4 border-t">
        <SidebarItem 
          to="/settings" 
          icon={<Settings className="h-5 w-5" />} 
          text="Configurações" 
          isCollapsed={isCollapsed} 
        />
      </div>
    </div>
  );
};

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isCollapsed: boolean;
}

const SidebarItem = ({ to, icon, text, isCollapsed }: SidebarItemProps) => {
  return (
    <li>
      <Link 
        to={to} 
        className="flex items-center p-2 rounded-md hover:bg-sidebar-accent group transition-colors"
      >
        <span className="text-sidebar-foreground">{icon}</span>
        {!isCollapsed && (
          <span className="ml-3 text-sidebar-foreground">{text}</span>
        )}
        {isCollapsed && (
          <div className="absolute left-20 rounded-md px-2 py-1 ml-6 bg-sidebar-accent text-sidebar-accent-foreground text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap z-50">
            {text}
          </div>
        )}
      </Link>
    </li>
  );
};

export default Sidebar;
