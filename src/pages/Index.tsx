
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import AppointmentForm from "@/components/appointments/AppointmentForm";
import CompanyForm from "@/components/companies/CompanyForm";
import ServiceTypeForm from "@/components/services/ServiceTypeForm";
import ServiceForm from "@/components/services/ServiceForm";
import ProfessionalForm from "@/components/professionals/ProfessionalForm";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [activeTab, setActiveTab] = useState("agenda");
  const isMobile = useIsMobile();

  return (
    <Layout title="Painel de Agendamentos">
      <Tabs defaultValue="agenda" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className={`grid w-full max-w-4xl mx-auto ${isMobile ? "grid-cols-3" : "grid-cols-5"}`}>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
          {!isMobile && <TabsTrigger value="empresas">Empresas</TabsTrigger>}
          {!isMobile && <TabsTrigger value="tipos-servicos">Tipos de Serviço</TabsTrigger>}
          {isMobile && <TabsTrigger value="servicos">Serviços</TabsTrigger>}
          {!isMobile && <TabsTrigger value="servicos">Serviços</TabsTrigger>}
          <TabsTrigger value="profissionais">Profissionais</TabsTrigger>
        </TabsList>
        
        <TabsContent value="agenda" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <AppointmentCalendar />
          </div>
        </TabsContent>
        
        <TabsContent value="empresas">
          <CompanyForm />
        </TabsContent>
        
        <TabsContent value="tipos-servicos">
          <ServiceTypeForm />
        </TabsContent>
        
        <TabsContent value="servicos">
          <ServiceForm />
        </TabsContent>
        
        <TabsContent value="profissionais">
          <ProfessionalForm />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Index;
