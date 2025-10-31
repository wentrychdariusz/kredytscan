
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AnalizaKredytowa from "./pages/AnalizaKredytowa";
import SuspiciousAnalysis from "./pages/SuspiciousAnalysis";
import Podziekowania from "./pages/Podziekowania";
import PodziękowanieBezVIP from "./pages/PodziękowanieBezVIP";
import ABTestStats from "./pages/ABTestStats";
import AdminLogin from "./pages/AdminLogin";
import AdminLogout from "./pages/AdminLogout";
import NotFound from "./pages/NotFound";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import PaymentTest from "./pages/PaymentTest";
import PaymentExpress from "./pages/PaymentExpress";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnalizaKredytowa />} />
          <Route path="/analiza-kredytowa" element={<AnalizaKredytowa />} />
          <Route path="/podziekowania" element={<Podziekowania />} />
          <Route path="/podziekowaniebezvip" element={<PodziękowanieBezVIP />} />
          <Route path="/payment" element={<PaymentTest />} />
          <Route path="/payment-express" element={<PaymentExpress />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/panel" element={
            <ProtectedAdminRoute>
              <ABTestStats />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin-logout" element={<AdminLogout />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
