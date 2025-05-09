
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import FilterDrawer from "./FilterDrawer";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilterToolbarProps {
  professionals: string[];
  services: string[];
  statusOptions: { value: string; label: string }[];
  selectedProfessional: string;
  setSelectedProfessional: (value: string) => void;
  selectedService: string;
  setSelectedService: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (open: boolean) => void;
}

const FilterToolbar = ({
  professionals,
  services,
  statusOptions,
  selectedProfessional,
  setSelectedProfessional,
  selectedService,
  setSelectedService,
  selectedStatus,
  setSelectedStatus,
  isFilterDrawerOpen,
  setIsFilterDrawerOpen,
}: FilterToolbarProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex justify-between space-x-2">
      {isMobile ? (
        <FilterDrawer
          isOpen={isFilterDrawerOpen}
          setIsOpen={setIsFilterDrawerOpen}
          professionals={professionals}
          services={services}
          statusOptions={statusOptions}
          selectedProfessional={selectedProfessional}
          setSelectedProfessional={setSelectedProfessional}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      ) : (
        <div className="md:flex items-center space-x-2 hidden">
          <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Profissional" />
            </SelectTrigger>
            <SelectContent>
              {professionals.map(prof => (
                <SelectItem key={prof} value={prof}>{prof}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Serviço" />
            </SelectTrigger>
            <SelectContent>
              {services.map(service => (
                <SelectItem key={service} value={service}>{service}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <Button>
        Novo Agendamento
      </Button>
    </div>
  );
};

export default FilterToolbar;
