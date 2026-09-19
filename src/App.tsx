import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import RouteOptimizer from "./components/RouteOptimizer";
import LiveTrafficMap from "./components/LiveTrafficMap";
import TrafficCharts from "./components/TrafficCharts";
import IncidentManager from "./components/IncidentManager";
import UserManager from "./components/UserManager";
import TrafficControlCenter from "./components/TrafficControlCenter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/route-planner" element={<div className="min-h-screen bg-background pt-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><RouteOptimizer /></div></div>} />
          <Route path="/live-map" element={<div className="min-h-screen bg-background pt-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><LiveTrafficMap /></div></div>} />
          <Route path="/traffic-charts" element={<div className="min-h-screen bg-background pt-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><TrafficCharts /></div></div>} />
          <Route path="/incidents" element={<div className="min-h-screen bg-background pt-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><IncidentManager /></div></div>} />
          <Route path="/users" element={<div className="min-h-screen bg-background pt-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><UserManager /></div></div>} />
          <Route path="/traffic-control" element={<div className="min-h-screen bg-background pt-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><TrafficControlCenter /></div></div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
