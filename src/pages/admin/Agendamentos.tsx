
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { adminApi, AgendamentoAdmin } from "@/services/adminApi";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Calendar,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  Mail
} from "lucide-react";
import { format } from "date-fns";

const AdminAgendamentos = () => {
  const { toast } = useToast();
  const [agendamentos, setAgendamentos] = useState<AgendamentoAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
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

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="cliente">Cliente</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="cliente"
                    value={filters.cliente}
                    onChange={(e) => setFilters({...filters, cliente: e.target.value})}
                    placeholder="Nome do cliente"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="barbeiro">Barbeiro</Label>
                <Input
                  id="barbeiro"
                  value={filters.barbeiro}
                  onChange={(e) => setFilters({...filters, barbeiro: e.target.value})}
                  placeholder="Nome do barbeiro"
                />
              </div>
              
              <div>
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  type="date"
                  value={filters.data}
                  onChange={(e) => setFilters({...filters, data: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={filters.status} 
                  onValueChange={(value) => setFilters({...filters, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="confirmado">Confirmado</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4">
              <Button 
                onClick={() => setFilters({barbeiro: "", data: "", status: "todos", cliente: ""})}
                variant="outline"
              >
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Agendamentos */}
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
                  <div 
                    key={agendamento.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
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
                              onClick={() => handleConcluir(agendamento.id)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Concluir
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleCancelar(agendamento.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Cancelar
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAgendamentos;
