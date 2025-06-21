
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Phone,
  Mail
} from "lucide-react";
import { format } from "date-fns";
import { AgendamentoAdmin } from "@/services/adminApi";

interface AgendamentoCardProps {
  agendamento: AgendamentoAdmin;
  onConcluir: (id: number) => void;
  onCancelar: (id: number) => void;
}

const AgendamentoCard = ({ agendamento, onConcluir, onCancelar }: AgendamentoCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmado':
        return <Badge className="bg-blue-100 text-blue-800">Confirmado</Badge>;
      case 'concluido':
        return <Badge className="bg-green-100 text-green-800">Concluído</Badge>;
      case 'cancelado':
        return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{agendamento.clienteNome}</span>
            </div>
            {getStatusBadge(agendamento.status)}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <strong>Barbeiro:</strong> {agendamento.barbeiroNome}
            </div>
            <div>
              <strong>Serviço:</strong> {agendamento.servicoNome}
            </div>
            <div>
              <strong>Valor:</strong> R$ {agendamento.valor}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(agendamento.data), "dd/MM/yyyy")} às {agendamento.horario}
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {agendamento.clienteTelefone}
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {agendamento.clienteEmail}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 ml-4">
          {agendamento.status === 'confirmado' && (
            <>
              <Button
                size="sm"
                onClick={() => onConcluir(agendamento.id)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Concluir
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onCancelar(agendamento.id)}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Cancelar
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgendamentoCard;
