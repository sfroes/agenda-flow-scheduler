
import { ReactNode, useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNavigation from "../navigation/BottomNavigation";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar by default on all devices
  useEffect(() => {
    setSidebarOpen(false);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        >
          <div 
            className={`${isMobile ? "w-64" : "w-64"} h-full`}
            onClick={e => e.stopPropagation()}
          >
            <Sidebar className="h-full" />
          </div>
        </div>
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title}>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
        </Header>
        
        <main className={cn(
          "flex-1 overflow-y-auto p-2 md:p-6",
          isMobile && "pb-20" // Add padding at the bottom for mobile to account for bottom navigation
        )}>
          {children}
        </main>

        {isMobile && <BottomNavigation />}
      </div>
    </div>
  );
};

export default Layout;
