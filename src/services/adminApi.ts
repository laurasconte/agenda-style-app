
// API Mock para funcionalidades administrativas
import { format, addDays, subDays } from "date-fns";

export interface Admin {
  id: number;
  email: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  admin: Admin;
}

export interface AgendamentoAdmin {
  id: number;
  clienteNome: string;
  clienteTelefone: string;
  clienteEmail: string;
  barbeiroNome: string;
  servicoNome: string;
  data: string;
  horario: string;
  status: 'confirmado' | 'cancelado' | 'concluido';
  valor: number;
  createdAt: string;
}

export interface DashboardStats {
  totalAgendamentos: number;
  agendamentosHoje: number;
  faturamentoMes: number;
  cancelamentos: number;
}

// Mock data
const mockAdmin: Admin = {
  id: 1,
  email: "admin@barbearia.com",
  name: "Administrador"
};

const mockAgendamentos: AgendamentoAdmin[] = [
  {
    id: 1,
    clienteNome: "João Silva",
    clienteTelefone: "(11) 99999-1111",
    clienteEmail: "joao@email.com",
    barbeiroNome: "Carlos Silva",
    servicoNome: "Corte Masculino",
    data: format(new Date(), "yyyy-MM-dd"),
    horario: "10:00",
    status: "confirmado",
    valor: 35,
    createdAt: format(subDays(new Date(), 1), "yyyy-MM-dd HH:mm:ss")
  },
  {
    id: 2,
    clienteNome: "Pedro Santos",
    clienteTelefone: "(11) 99999-2222",
    clienteEmail: "pedro@email.com",
    barbeiroNome: "Ricardo Santos",
    servicoNome: "Combo Completo",
    data: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    horario: "14:30",
    status: "confirmado",
    valor: 55,
    createdAt: format(subDays(new Date(), 2), "yyyy-MM-dd HH:mm:ss")
  },
  {
    id: 3,
    clienteNome: "Maria Oliveira",
    clienteTelefone: "(11) 99999-3333",
    clienteEmail: "maria@email.com",
    barbeiroNome: "João Pedro",
    servicoNome: "Corte + Barba",
    data: format(subDays(new Date(), 1), "yyyy-MM-dd"),
    horario: "16:00",
    status: "concluido",
    valor: 45,
    createdAt: format(subDays(new Date(), 3), "yyyy-MM-dd HH:mm:ss")
  }
];

// Simulação de storage para token
const getStoredToken = (): string | null => {
  return localStorage.getItem('admin_token');
};

const setStoredToken = (token: string): void => {
  localStorage.setItem('admin_token', token);
};

const removeStoredToken = (): void => {
  localStorage.removeItem('admin_token');
};

export const adminApi = {
  login: async (credentials: LoginData): Promise<LoginResponse> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (credentials.email === "admin@barbearia.com" && credentials.password === "123456") {
      const token = "mock_admin_token_" + Date.now();
      setStoredToken(token);
      
      return {
        token,
        admin: mockAdmin
      };
    } else {
      throw new Error("Credenciais inválidas");
    }
  },

  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    removeStoredToken();
  },

  validateToken: async (): Promise<Admin> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const token = getStoredToken();
    if (token && token.startsWith("mock_admin_token_")) {
      return mockAdmin;
    } else {
      throw new Error("Token inválido");
    }
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const hoje = format(new Date(), "yyyy-MM-dd");
    const agendamentosHoje = mockAgendamentos.filter(a => a.data === hoje).length;
    const faturamentoMes = mockAgendamentos
      .filter(a => a.status === 'concluido')
      .reduce((sum, a) => sum + a.valor, 0);
    
    return {
      totalAgendamentos: mockAgendamentos.length,
      agendamentosHoje,
      faturamentoMes,
      cancelamentos: mockAgendamentos.filter(a => a.status === 'cancelado').length
    };
  },

  getAgendamentos: async (filters?: {
    barbeiro?: string;
    data?: string;
    status?: string;
    cliente?: string;
  }): Promise<AgendamentoAdmin[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    let filtered = [...mockAgendamentos];
    
    if (filters?.barbeiro) {
      filtered = filtered.filter(a => 
        a.barbeiroNome.toLowerCase().includes(filters.barbeiro!.toLowerCase())
      );
    }
    
    if (filters?.data) {
      filtered = filtered.filter(a => a.data === filters.data);
    }
    
    if (filters?.status) {
      filtered = filtered.filter(a => a.status === filters.status);
    }
    
    if (filters?.cliente) {
      filtered = filtered.filter(a => 
        a.clienteNome.toLowerCase().includes(filters.cliente!.toLowerCase())
      );
    }
    
    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  cancelarAgendamento: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const agendamento = mockAgendamentos.find(a => a.id === id);
    if (agendamento) {
      agendamento.status = 'cancelado';
    }
  },

  concluirAgendamento: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const agendamento = mockAgendamentos.find(a => a.id === id);
    if (agendamento) {
      agendamento.status = 'concluido';
    }
  }
};
