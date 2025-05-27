
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Calendar, Clock, User, Mail, Phone } from "lucide-react";
import { format } from "date-fns";

const Confirmacao = () => {
  const location = useLocation();
  const agendamento = location.state?.agendamento;

  useEffect(() => {
    // Rolar para o topo da página
    window.scrollTo(0, 0);
  }, []);

  if (!agendamento) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-barber-cream to-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Agendamento não encontrado</h1>
          <Link to="/agendamento">
            <Button className="btn-gold">Fazer Novo Agendamento</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-barber-cream to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-green-600 mb-2">
              Agendamento Confirmado!
            </h1>
            <p className="text-lg text-gray-600">
              Seu horário foi reservado com sucesso
            </p>
          </div>

          {/* Agendamento Details */}
          <Card className="animate-slide-in-left">
            <CardHeader className="bg-gradient-to-r from-barber-gold/20 to-barber-gold-light/20">
              <CardTitle className="text-center text-2xl">
                Detalhes do seu Agendamento
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {/* Barbeiro */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-barber-gold/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-barber-gold" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Barbeiro</p>
                  <p className="font-semibold text-lg">{agendamento.barbeiro?.name}</p>
                  <p className="text-barber-gold text-sm">{agendamento.barbeiro?.specialty}</p>
                </div>
              </div>

              {/* Serviço */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-barber-gold/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">✂️</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Serviço</p>
                  <p className="font-semibold text-lg">{agendamento.servico?.name}</p>
                  <p className="text-barber-gold text-sm">R$ {agendamento.servico?.price}</p>
                </div>
              </div>

              {/* Data e Horário */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-barber-gold/20 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-barber-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Data</p>
                    <p className="font-semibold">{format(new Date(agendamento.data), "dd/MM/yyyy")}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-barber-gold/20 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-barber-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Horário</p>
                    <p className="font-semibold">{agendamento.horario}</p>
                  </div>
                </div>
              </div>

              {/* Dados do Cliente */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">Seus Dados</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-barber-gold" />
                    <span>{agendamento.clienteNome}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-barber-gold" />
                    <span>{agendamento.clienteTelefone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-barber-gold" />
                    <span>{agendamento.clienteEmail}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="mt-6 bg-blue-50 animate-slide-in-right">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-3 text-blue-800">
                Informações Importantes
              </h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Chegue com 10 minutos de antecedência</li>
                <li>• Em caso de necessidade de cancelamento, avise com até 2 horas de antecedência</li>
                <li>• Confirmação enviada por email e WhatsApp</li>
                <li>• Dúvidas? Entre em contato: (11) 99999-9999</li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in">
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full btn-gold-outline">
                Voltar ao Início
              </Button>
            </Link>
            <Link to="/agendamento" className="flex-1">
              <Button className="w-full btn-gold">
                Fazer Novo Agendamento
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Confirmacao;
