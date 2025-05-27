
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-barber-dark/95 backdrop-blur-sm border-b border-barber-gold/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-barber-gold to-barber-gold-light rounded-full flex items-center justify-center">
              <span className="text-barber-dark font-bold text-lg">BS</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Barber Style</h1>
              <p className="text-barber-gold text-sm">Premium Barbershop</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-barber-gold transition-colors">
              Início
            </Link>
            <Link to="/agendamento" className="text-white hover:text-barber-gold transition-colors">
              Agendar
            </Link>
            <div className="flex items-center space-x-2 text-barber-gold">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Seg-Sáb: 9h-19h</span>
            </div>
          </nav>

          <Link to="/agendamento">
            <Button className="btn-gold">
              <Calendar className="w-4 h-4 mr-2" />
              Agendar Horário
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
