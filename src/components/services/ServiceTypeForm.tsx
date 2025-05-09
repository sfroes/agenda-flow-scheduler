
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const serviceTypeSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  description: z.string().optional(),
});

type ServiceTypeFormValues = z.infer<typeof serviceTypeSchema>;

interface ServiceTypeFormProps {
  initialData?: ServiceTypeFormValues;
  onSubmit?: (data: ServiceTypeFormValues) => void;
}

const ServiceTypeForm = ({ initialData, onSubmit }: ServiceTypeFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ServiceTypeFormValues>({
    resolver: zodResolver(serviceTypeSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
    },
  });

  const handleSubmit = async (values: ServiceTypeFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Here you would typically send data to your backend
      console.log("Service type data:", values);
      
      if (onSubmit) {
        onSubmit(values);
      }
      
      toast.success("Tipo de serviço salvo com sucesso!");
      
      if (!initialData) {
        form.reset();
      }
    } catch (error) {
      console.error("Error saving service type:", error);
      toast.error("Erro ao salvar tipo de serviço");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>
          {initialData ? "Editar Tipo de Serviço" : "Cadastrar Novo Tipo de Serviço"}
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
                    <Input placeholder="Nome do tipo de serviço" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição do tipo de serviço (opcional)"
                      {...field}
                    />
                  </FormControl>
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

export default ServiceTypeForm;
