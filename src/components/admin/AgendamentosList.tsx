
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { AgendamentoAdmin } from "@/services/adminApi";
import AgendamentoCard from "./AgendamentoCard";

interface AgendamentosListProps {
  agendamentos: AgendamentoAdmin[];
  loading: boolean;
  onConcluir: (id: number) => void;
  onCancelar: (id: number) => void;
}

const AgendamentosList = ({ agendamentos, loading, onConcluir, onCancelar }: AgendamentosListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Agendamentos ({agendamentos.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-barber-gold"></div>
          </div>
        ) : agendamentos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhum agendamento encontrado
          </div>
        ) : (
          <div className="space-y-4">
            {agendamentos.map((agendamento) => (
              <AgendamentoCard
                key={agendamento.id}
                agendamento={agendamento}
                onConcluir={onConcluir}
                onCancelar={onCancelar}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgendamentosList;
