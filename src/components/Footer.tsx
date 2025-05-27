
import { Clock, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-barber-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-barber-gold mb-4">Barber Style</h3>
            <p className="text-gray-300 mb-4">
              A melhor experiência em cortes masculinos e cuidados pessoais. 
              Tradição e modernidade em um só lugar.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-barber-gold to-barber-gold-light rounded"></div>
          </div>

          <div className="animate-slide-in-left">
            <h4 className="text-lg font-semibold text-barber-gold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-barber-gold" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-barber-gold" />
                <span>Rua das Barbearias, 123 - Centro</span>
              </div>
            </div>
          </div>

          <div className="animate-slide-in-right">
            <h4 className="text-lg font-semibold text-barber-gold mb-4">Horários</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-barber-gold" />
                <div>
                  <p>Segunda a Sexta: 9h às 19h</p>
                  <p>Sábado: 9h às 17h</p>
                  <p>Domingo: Fechado</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-barber-gold/20 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Barber Style. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
