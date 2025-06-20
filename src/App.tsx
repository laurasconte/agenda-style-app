import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Agendamento from "./pages/Agendamento";
import Confirmacao from "./pages/Confirmacao";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAgendamentos from "./pages/admin/Agendamentos";
import AdminServicos from "./pages/admin/Servicos";
import AdminBarbeiros from "./pages/admin/Barbeiros";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/agendamento" element={<Agendamento />} />
            <Route path="/confirmacao" element={<Confirmacao />} />
            
            {/* Rotas Administrativas */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/agendamentos" 
              element={
                <ProtectedRoute>
                  <AdminAgendamentos />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/servicos" 
              element={
                <ProtectedRoute>
                  <AdminServicos />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/barbeiros" 
              element={
                <ProtectedRoute>
                  <AdminBarbeiros />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
