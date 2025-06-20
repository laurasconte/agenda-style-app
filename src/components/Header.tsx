
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-barber-dark text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div 
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h1 className="text-2xl font-bold">Barbearia Classic</h1>
            <p className="text-barber-gold text-sm">Tradição em cortes masculinos</p>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Button 
              variant="ghost" 
              className="text-white hover:text-barber-gold"
              onClick={() => navigate("/")}
            >
              Início
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-barber-gold"
              onClick={() => navigate("/agendamento")}
            >
              Agendar
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-barber-gold flex items-center gap-2"
              onClick={() => navigate("/admin/login")}
            >
              <Settings className="h-4 w-4" />
              Admin
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
