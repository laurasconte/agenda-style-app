
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BarberCard from "@/components/BarberCard";
import ServiceCard from "@/components/ServiceCard";
import { 
  apiBarbeiros, 
  apiServicos, 
  apiHorarios, 
  apiAgendamentos,
  Barbeiro, 
  Servico, 
  HorarioDisponivel 
} from "@/services/api";
import { Calendar as CalendarIcon, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Agendamento = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Estados
  const [step, setStep] = useState(1);
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [horarios, setHorarios] = useState<HorarioDisponivel[]>([]);
  const [loading, setLoading] = useState(false);

  // Seleções
  const [selectedBarbeiro, setSelectedBarbeiro] = useState<number | null>(null);
  const [selectedServico, setSelectedServico] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Dados do cliente
  const [clienteData, setClienteData] = useState({
    nome: "",
    telefone: "",
    email: ""
  });

  // Carregar dados iniciais
  useEffect(() => {
    loadBarbeiros();
    loadServicos();
  }, []);

  // Carregar horários quando barbeiro e data forem selecionados
  useEffect(() => {
    if (selectedBarbeiro && selectedDate) {
      loadHorarios();
    }
  }, [selectedBarbeiro, selectedDate]);

  const loadBarbeiros = async () => {
    try {
      const data = await apiBarbeiros.getAll();
      setBarbeiros(data);
      console.log('Barbeiros carregados:', data);
    } catch (error) {
      console.error('Erro ao carregar barbeiros:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os barbeiros",
        variant: "destructive"
      });
    }
  };

  const loadServicos = async () => {
    try {
      const data = await apiServicos.getAll();
      setServicos(data);
      console.log('Serviços carregados:', data);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os serviços",
        variant: "destructive"
      });
    }
  };

  const loadHorarios = async () => {
    if (!selectedBarbeiro || !selectedDate) return;
    
    setLoading(true);
    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const data = await apiHorarios.getDisponiveis(selectedBarbeiro, dateStr);
      setHorarios(data);
      console.log('Horários carregados:', data);
    } catch (error) {
      console.error('Erro ao carregar horários:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os horários",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    console.log('Tentando avançar para próximo step. Step atual:', step);
    console.log('Barbeiro selecionado:', selectedBarbeiro);
    console.log('Serviço selecionado:', selectedServico);
    console.log('Data selecionada:', selectedDate);
    console.log('Horário selecionado:', selectedTime);

    if (step === 1 && !selectedBarbeiro) {
      toast({
        title: "Selecione um barbeiro",
        description: "Escolha o barbeiro para continuar",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 2 && !selectedServico) {
      toast({
        title: "Selecione um serviço",
        description: "Escolha o serviço desejado",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 3 && (!selectedDate || !selectedTime)) {
      toast({
        title: "Selecione data e horário",
        description: "Escolha a data e o horário para seu agendamento",
        variant: "destructive"
      });
      return;
    }

    console.log('Avançando para step:', step + 1);
    setStep(step + 1);
  };

  const handlePrevious = () => {
    console.log('Voltando para step:', step - 1);
    setStep(step - 1);
  };

  const handleSelectBarbeiro = (id: number) => {
    console.log('Barbeiro selecionado:', id);
    setSelectedBarbeiro(id);
  };

  const handleSelectServico = (id: number) => {
    console.log('Serviço selecionado:', id);
    setSelectedServico(id);
  };

  const handleSubmit = async () => {
    if (!clienteData.nome || !clienteData.telefone || !clienteData.email) {
      toast({
        title: "Preencha todos os campos",
        description: "Todos os campos são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const agendamento = {
        barbeiroId: selectedBarbeiro!,
        servicoId: selectedServico!,
        data: format(selectedDate!, "yyyy-MM-dd"),
        horario: selectedTime,
        clienteNome: clienteData.nome,
        clienteTelefone: clienteData.telefone,
        clienteEmail: clienteData.email
      };

      console.log('Enviando agendamento:', agendamento);
      await apiAgendamentos.criar(agendamento);
      
      toast({
        title: "Agendamento realizado!",
        description: "Seu agendamento foi confirmado com sucesso"
      });

      navigate("/confirmacao", { 
        state: { 
          agendamento: {
            ...agendamento,
            barbeiro: barbeiros.find(b => b.id === selectedBarbeiro),
            servico: servicos.find(s => s.id === selectedServico)
          } 
        } 
      });
    } catch (error) {
      console.error('Erro no agendamento:', error);
      toast({
        title: "Erro no agendamento",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const stepTitles = [
    "Escolha o Barbeiro",
    "Selecione o Serviço", 
    "Data e Horário",
    "Seus Dados"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-barber-cream to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {stepTitles.map((title, index) => (
              <div 
                key={index}
                className={`flex items-center ${index < stepTitles.length - 1 ? 'flex-1' : ''}`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  ${step > index + 1 ? 'bg-barber-gold text-barber-dark' : 
                    step === index + 1 ? 'bg-barber-gold text-barber-dark' : 
                    'bg-gray-300 text-gray-600'}
                `}>
                  {index + 1}
                </div>
                <span className={`ml-2 text-sm ${step === index + 1 ? 'font-semibold' : ''}`}>
                  {title}
                </span>
                {index < stepTitles.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${
                    step > index + 1 ? 'bg-barber-gold' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {stepTitles[step - 1]}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Step 1: Selecionar Barbeiro */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {barbeiros.map((barbeiro) => (
                  <BarberCard
                    key={barbeiro.id}
                    {...barbeiro}
                    isSelected={selectedBarbeiro === barbeiro.id}
                    onSelect={handleSelectBarbeiro}
                  />
                ))}
              </div>
            )}

            {/* Step 2: Selecionar Serviço */}
            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {servicos.map((servico) => (
                  <ServiceCard
                    key={servico.id}
                    {...servico}
                    isSelected={selectedServico === servico.id}
                    onSelect={handleSelectServico}
                  />
                ))}
              </div>
            )}

            {/* Step 3: Data e Horário */}
            {step === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <Label className="text-lg font-semibold mb-4 block">Escolha a Data</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border"
                  />
                </div>
                
                <div>
                  <Label className="text-lg font-semibold mb-4 block">Horários Disponíveis</Label>
                  {selectedDate ? (
                    <div className="grid grid-cols-3 gap-3">
                      {loading ? (
                        <div className="col-span-3 text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-barber-gold mx-auto"></div>
                          <p className="mt-2">Carregando horários...</p>
                        </div>
                      ) : (
                        horarios.map((horario) => (
                          <Button
                            key={horario.time}
                            variant={selectedTime === horario.time ? "default" : "outline"}
                            disabled={!horario.available}
                            onClick={() => setSelectedTime(horario.time)}
                            className={`${selectedTime === horario.time ? 'bg-barber-gold text-barber-dark' : ''}`}
                          >
                            {horario.time}
                          </Button>
                        ))
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">Selecione uma data primeiro</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Dados do Cliente */}
            {step === 4 && (
              <div className="max-w-md mx-auto space-y-6">
                <div>
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    value={clienteData.nome}
                    onChange={(e) => setClienteData({...clienteData, nome: e.target.value})}
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    value={clienteData.telefone}
                    onChange={(e) => setClienteData({...clienteData, telefone: e.target.value})}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={clienteData.email}
                    onChange={(e) => setClienteData({...clienteData, email: e.target.value})}
                    placeholder="seu@email.com"
                  />
                </div>

                {/* Resumo do Agendamento */}
                {selectedBarbeiro && selectedServico && selectedDate && selectedTime && (
                  <Card className="mt-6 bg-barber-gold/10">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Resumo do Agendamento</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Barbeiro:</strong> {barbeiros.find(b => b.id === selectedBarbeiro)?.name}</p>
                        <p><strong>Serviço:</strong> {servicos.find(s => s.id === selectedServico)?.name}</p>
                        <p><strong>Data:</strong> {format(selectedDate, "dd/MM/yyyy")}</p>
                        <p><strong>Horário:</strong> {selectedTime}</p>
                        <p><strong>Valor:</strong> R$ {servicos.find(s => s.id === selectedServico)?.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={step === 1}
              >
                Voltar
              </Button>
              
              {step < 4 ? (
                <Button onClick={handleNext} className="btn-gold">
                  Próximo
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="btn-gold"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-barber-dark mr-2"></div>
                      Agendando...
                    </>
                  ) : (
                    "Confirmar Agendamento"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Agendamento;
