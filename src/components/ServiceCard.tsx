
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface ServiceCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const ServiceCard = ({ id, name, description, price, duration, isSelected, onSelect }: ServiceCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected ? 'ring-2 ring-barber-gold bg-barber-gold/5' : 'hover:shadow-xl'
      }`}
      onClick={() => onSelect(id)}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg">{name}</h3>
          <Badge variant="outline" className="text-barber-gold border-barber-gold">
            R$ {price}
          </Badge>
        </div>
        <p className="text-gray-600 mb-3">{description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          {duration} min
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
