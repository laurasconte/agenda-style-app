
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

interface FiltersState {
  barbeiro: string;
  data: string;
  status: string;
  cliente: string;
}

interface AgendamentosFiltersProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
}

const AgendamentosFilters = ({ filters, onFiltersChange }: AgendamentosFiltersProps) => {
  const updateFilter = (key: keyof FiltersState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      barbeiro: "",
      data: "",
      status: "todos",
      cliente: ""
    });
  };

  return (
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
                onChange={(e) => updateFilter("cliente", e.target.value)}
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
              onChange={(e) => updateFilter("barbeiro", e.target.value)}
              placeholder="Nome do barbeiro"
            />
          </div>
          
          <div>
            <Label htmlFor="data">Data</Label>
            <Input
              id="data"
              type="date"
              value={filters.data}
              onChange={(e) => updateFilter("data", e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="status">Status</Label>
            <Select 
              value={filters.status} 
              onValueChange={(value) => updateFilter("status", value)}
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
          <Button onClick={clearFilters} variant="outline">
            Limpar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgendamentosFilters;
