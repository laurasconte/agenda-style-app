
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { adminApi, AgendamentoAdmin } from "@/services/adminApi";
import AdminLayout from "@/components/admin/AdminLayout";
import AgendamentosFilters from "@/components/admin/AgendamentosFilters";
import AgendamentosList from "@/components/admin/AgendamentosList";
import { FiltersState } from "@/types/agendamentos";

const AdminAgendamentos = () => {
  const { toast } = useToast();
  const [agendamentos, setAgendamentos] = useState<AgendamentoAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersState>({
    barbeiro: "",
    data: "",
    status: "todos",
    cliente: ""
  });

  useEffect(() => {
    loadAgendamentos();
  }, [filters]);

  const loadAgendamentos = async () => {
    setLoading(true);
    try {
      const filterParams = {
        ...filters,
        status: filters.status === "todos" ? "" : filters.status
      };
      const data = await adminApi.getAgendamentos(filterParams);
      setAgendamentos(data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os agendamentos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = async (id: number) => {
    try {
      await adminApi.cancelarAgendamento(id);
      toast({
        title: "Agendamento cancelado",
        description: "O agendamento foi cancelado com sucesso"
      });
      loadAgendamentos();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível cancelar o agendamento",
        variant: "destructive"
      });
    }
  };

  const handleConcluir = async (id: number) => {
    try {
      await adminApi.concluirAgendamento(id);
      toast({
        title: "Agendamento concluído",
        description: "O agendamento foi marcado como concluído"
      });
      loadAgendamentos();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível concluir o agendamento",
        variant: "destructive"
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-barber-dark">
            Gerenciar Agendamentos
          </h1>
          <p className="text-gray-600">
            Visualize e gerencie todos os agendamentos da barbearia
          </p>
        </div>

        <AgendamentosFilters
          filters={filters}
          onFiltersChange={setFilters}
        />

        <AgendamentosList
          agendamentos={agendamentos}
          loading={loading}
          onConcluir={handleConcluir}
          onCancelar={handleCancelar}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminAgendamentos;
