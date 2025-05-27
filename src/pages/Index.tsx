
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, User, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-barber-cream to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-barber-dark/90 to-barber-dark/70"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&h=800&fit=crop')"
          }}
        ></div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Barber <span className="text-gradient">Style</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-slide-in-left">
            Experimente o melhor em cortes masculinos e cuidados pessoais. 
            Tradição, qualidade e estilo em cada serviço.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-right">
            <Link to="/agendamento">
              <Button size="lg" className="btn-gold text-lg px-8 py-4">
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Agora
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="btn-gold-outline text-lg px-8 py-4">
              Ver Serviços
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oferecemos uma gama completa de serviços para o homem moderno
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Corte Masculino",
                description: "Cortes clássicos e modernos",
                price: "R$ 35",
                icon: "✂️"
              },
              {
                title: "Barba Completa",
                description: "Modelagem e acabamento",
                price: "R$ 25",
                icon: "🧔"
              },
              {
                title: "Combo Completo",
                description: "Corte + Barba + Extras",
                price: "R$ 55",
                icon: "⭐"
              },
              {
                title: "Corte + Barba",
                description: "O mais pedido",
                price: "R$ 45",
                icon: "👨"
              }
            ].map((service, index) => (
              <Card key={index} className="card-hover animate-fade-in">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="text-2xl font-bold text-barber-gold">{service.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Por que nos escolher?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <User className="w-12 h-12 text-barber-gold" />,
                title: "Profissionais Qualificados",
                description: "Barbeiros experientes com técnicas modernas e tradicionais"
              },
              {
                icon: <Clock className="w-12 h-12 text-barber-gold" />,
                title: "Agendamento Online",
                description: "Reserve seu horário de forma rápida e prática"
              },
              {
                icon: <CheckCircle className="w-12 h-12 text-barber-gold" />,
                title: "Qualidade Garantida",
                description: "Produtos premium e atendimento personalizado"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center animate-fade-in">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-barber-dark to-barber-dark-light text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Pronto para uma nova experiência?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Agende seu horário agora e descubra por que somos a barbearia preferida da região
          </p>
          <Link to="/agendamento">
            <Button size="lg" className="btn-gold text-lg px-8 py-4">
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Meu Horário
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
