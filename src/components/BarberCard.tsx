
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface BarberCardProps {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  photo: string;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const BarberCard = ({ id, name, specialty, experience, photo, isSelected, onSelect }: BarberCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg card-hover ${
        isSelected ? 'ring-2 ring-barber-gold bg-barber-gold/5' : ''
      }`}
      onClick={() => onSelect(id)}
    >
      <CardContent className="p-6 text-center">
        <div className="relative mb-4">
          <img 
            src={photo} 
            alt={name}
            className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-barber-gold/30"
          />
          {isSelected && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-barber-gold rounded-full flex items-center justify-center">
              <span className="text-barber-dark text-xs">✓</span>
            </div>
          )}
        </div>
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-barber-gold text-sm mb-2">{specialty}</p>
        <Badge variant="outline" className="text-xs">
          {experience}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default BarberCard;
