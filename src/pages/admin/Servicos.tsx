
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiServicos, Servico } from "@/services/api";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Scissors,
  Plus,
  Edit,
  Trash,
  Clock,
  DollarSign
} from "lucide-react";

const AdminServicos = () => {
  const { toast } = useToast();
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingServico, setEditingServico] = useState<Servico | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: ""
  });

  useEffect(() => {
    loadServicos();
  }, []);

  const loadServicos = async () => {
    try {
      const data = await apiServicos.getAll();
      setServicos(data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os serviços",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price || !formData.duration) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: editingServico ? "Serviço atualizado!" : "Serviço criado!",
      description: "As alterações foram salvas com sucesso"
    });

    // Reset form
    setFormData({
      name: "",
      description: "",
      price: "",
      duration: ""
    });
    setEditingServico(null);
  };

  const handleEdit = (servico: Servico) => {
    setEditingServico(servico);
    setFormData({
      name: servico.name,
      description: servico.description,
      price: servico.price.toString(),
      duration: servico.duration.toString()
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Serviço removido!",
      description: "O serviço foi removido com sucesso"
    });
    // Em uma implementação real, faria a chamada para a API
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-barber-dark">
            Gerenciar Serviços
          </h1>
          <p className="text-gray-600">
            Adicione, edite ou remova serviços da sua barbearia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulário */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {editingServico ? "Editar Serviço" : "Novo Serviço"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Serviço</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ex: Corte Masculino"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Descreva o serviço..."
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="35"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">Duração (min)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="45"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="btn-gold">
                    {editingServico ? "Atualizar" : "Criar"} Serviço
                  </Button>
                  
                  {editingServico && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setEditingServico(null);
                        setFormData({
                          name: "",
                          description: "",  
                          price: "",
                          duration: ""
                        });
                      }}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Lista de Serviços */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scissors className="h-5 w-5" />
                Serviços Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-barber-gold"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {servicos.map((servico) => (
                    <div 
                      key={servico.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{servico.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{servico.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              R$ {servico.price}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {servico.duration} min
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(servico)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(servico.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminServicos;
