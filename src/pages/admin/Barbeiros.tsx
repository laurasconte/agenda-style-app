
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiBarbeiros, Barbeiro } from "@/services/api";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Users,
  Plus,
  Edit,
  UserCheck,
  UserX
} from "lucide-react";

const AdminBarbeiros = () => {
  const { toast } = useToast();
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBarbeiro, setEditingBarbeiro] = useState<Barbeiro | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    experience: "",
    photo: ""
  });

  useEffect(() => {
    loadBarbeiros();
  }, []);

  const loadBarbeiros = async () => {
    try {
      const data = await apiBarbeiros.getAll();
      setBarbeiros(data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os barbeiros",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.specialty || !formData.experience) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: editingBarbeiro ? "Barbeiro atualizado!" : "Barbeiro adicionado!",
      description: "As alterações foram salvas com sucesso"
    });

    // Reset form
    setFormData({
      name: "",
      specialty: "",
      experience: "",
      photo: ""
    });
    setEditingBarbeiro(null);
  };

  const handleEdit = (barbeiro: Barbeiro) => {
    setEditingBarbeiro(barbeiro);
    setFormData({
      name: barbeiro.name,
      specialty: barbeiro.specialty,
      experience: barbeiro.experience,
      photo: barbeiro.photo
    });
  };

  const handleToggleStatus = (id: number, active: boolean) => {
    const action = active ? "ativado" : "desativado";
    toast({
      title: `Barbeiro ${action}!`,
      description: `O barbeiro foi ${action} com sucesso`
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-barber-dark">
            Gerenciar Barbeiros
          </h1>
          <p className="text-gray-600">
            Adicione, edite ou gerencie os barbeiros da sua equipe
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulário */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {editingBarbeiro ? "Editar Barbeiro" : "Novo Barbeiro"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Nome completo do barbeiro"
                  />
                </div>
                
                <div>
                  <Label htmlFor="specialty">Especialidade *</Label>
                  <Input
                    id="specialty"
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                    placeholder="Ex: Cortes Clássicos"
                  />
                </div>
                
                <div>
                  <Label htmlFor="experience">Experiência *</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    placeholder="Ex: 8 anos"
                  />
                </div>
                
                <div>
                  <Label htmlFor="photo">URL da Foto</Label>
                  <Input
                    id="photo"
                    value={formData.photo}
                    onChange={(e) => setFormData({...formData, photo: e.target.value})}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="btn-gold">
                    {editingBarbeiro ? "Atualizar" : "Adicionar"} Barbeiro
                  </Button>
                  
                  {editingBarbeiro && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setEditingBarbeiro(null);
                        setFormData({
                          name: "",
                          specialty: "",
                          experience: "",
                          photo: ""
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

          {/* Lista de Barbeiros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Equipe de Barbeiros
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-barber-gold"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {barbeiros.map((barbeiro) => (
                    <div 
                      key={barbeiro.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <img 
                          src={barbeiro.photo} 
                          alt={barbeiro.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{barbeiro.name}</h3>
                          <p className="text-gray-600">{barbeiro.specialty}</p>
                          <p className="text-sm text-gray-500">{barbeiro.experience} de experiência</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Switch 
                              defaultChecked={true}
                              onCheckedChange={(checked) => handleToggleStatus(barbeiro.id, checked)}
                            />
                            <span className="text-sm">
                              {true ? (
                                <UserCheck className="h-4 w-4 text-green-600" />
                              ) : (
                                <UserX className="h-4 w-4 text-red-600" />
                              )}
                            </span>
                          </div>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(barbeiro)}
                          >
                            <Edit className="h-4 w-4" />
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

export default AdminBarbeiros;
