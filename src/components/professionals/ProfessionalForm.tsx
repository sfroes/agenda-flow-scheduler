
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for services
const mockServices = [
  { id: "1", name: "Corte Masculino" },
  { id: "2", name: "Corte Feminino" },
  { id: "3", name: "Manicure" },
  { id: "4", name: "Pedicure" },
  { id: "5", name: "Massagem Relaxante" },
];

const professionalSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  specialization: z.string().optional(),
  bio: z.string().optional(),
  services: z.array(z.string()).optional(),
});

type ProfessionalFormValues = z.infer<typeof professionalSchema>;

interface ProfessionalFormProps {
  initialData?: ProfessionalFormValues;
  onSubmit?: (data: ProfessionalFormValues) => void;
}

const ProfessionalForm = ({ initialData, onSubmit }: ProfessionalFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfessionalFormValues>({
    resolver: zodResolver(professionalSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      phone: "",
      specialization: "",
      bio: "",
      services: [],
    },
  });

  const handleSubmit = async (values: ProfessionalFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Here you would typically send data to your backend
      console.log("Professional data:", values);
      
      if (onSubmit) {
        onSubmit(values);
      }
      
      toast.success("Profissional salvo com sucesso!");
      
      if (!initialData) {
        form.reset();
      }
    } catch (error) {
      console.error("Error saving professional:", error);
      toast.error("Erro ao salvar profissional");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {initialData ? "Editar Profissional" : "Cadastrar Novo Profissional"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especialização</FormLabel>
                  <FormControl>
                    <Input placeholder="Especialização (opcional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biografia</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Informações sobre o profissional (opcional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="services"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Serviços Oferecidos</FormLabel>
                    <FormDescription>
                      Selecione os serviços que este profissional pode realizar
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mockServices.map((service) => (
                      <FormField
                        key={service.id}
                        control={form.control}
                        name="services"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={service.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(service.id)}
                                  onCheckedChange={(checked) => {
                                    const updatedServices = checked
                                      ? [...(field.value || []), service.id]
                                      : (field.value || []).filter(
                                          (value) => value !== service.id
                                        );
                                    field.onChange(updatedServices);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {service.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfessionalForm;
