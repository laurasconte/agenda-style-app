
// Simulação de API - Em produção, substitua pelas chamadas reais ao Spring Boot
const API_BASE_URL = 'http://localhost:8080/api';

export interface Barbeiro {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  photo: string;
}

export interface Servico {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
}

export interface HorarioDisponivel {
  time: string;
  available: boolean;
}

export interface AgendamentoData {
  barbeiroId: number;
  servicoId: number;
  data: string;
  horario: string;
  clienteNome: string;
  clienteTelefone: string;
  clienteEmail: string;
}

// Mock data para desenvolvimento
const mockBarbeiros: Barbeiro[] = [
  {
    id: 1,
    name: "Carlos Silva",
    specialty: "Cortes Clássicos",
    experience: "8 anos",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Ricardo Santos",
    specialty: "Barbas & Bigodes",
    experience: "12 anos",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "João Pedro",
    specialty: "Cortes Modernos",
    experience: "6 anos",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];

const mockServicos: Servico[] = [
  {
    id: 1,
    name: "Corte Masculino",
    description: "Corte tradicional com acabamento na navalha",
    price: 35,
    duration: 45
  },
  {
    id: 2,
    name: "Barba Completa",
    description: "Aparar, modelar e finalizar com produtos premium",
    price: 25,
    duration: 30
  },
  {
    id: 3,
    name: "Combo Completo",
    description: "Corte + Barba + Sobrancelha + Produtos",
    price: 55,
    duration: 75
  },
  {
    id: 4,
    name: "Corte + Barba",
    description: "Serviço completo de corte e barba",
    price: 45,
    duration: 60
  }
];

// Simulação de API calls
export const apiBarbeiros = {
  getAll: async (): Promise<Barbeiro[]> => {
    // Simula chamada: GET /api/barbeiros
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockBarbeiros;
  }
};

export const apiServicos = {
  getAll: async (): Promise<Servico[]> => {
    // Simula chamada: GET /api/servicos
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockServicos;
  }
};

export const apiHorarios = {
  getDisponiveis: async (barbeiroId: number, data: string): Promise<HorarioDisponivel[]> => {
    // Simula chamada: GET /api/horarios-disponiveis?barbeiroId=1&data=2024-01-15
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const horarios = [
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
    ];
    
    return horarios.map(time => ({
      time,
      available: Math.random() > 0.3 // 70% de chance de estar disponível
    }));
  }
};

export const apiAgendamentos = {
  criar: async (agendamento: AgendamentoData): Promise<{ id: number; message: string }> => {
    // Simula chamada: POST /api/agendamentos
    await new Promise(resolve => setTimeout(resolve, 800));
    
    console.log('Agendamento criado:', agendamento);
    
    return {
      id: Math.floor(Math.random() * 1000),
      message: "Agendamento realizado com sucesso!"
    };
  }
};
