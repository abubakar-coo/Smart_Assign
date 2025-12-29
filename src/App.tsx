import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import ServicesDetails from "./pages/ServicesDetails";
import Portfolio from "./pages/Portfolio";
import TestimonialsPage from "./pages/Testimonials";
import TeamPage from "./pages/Team";
import ServiceDetail from "./pages/ServiceDetail";
import PortfolioDetail from "./pages/PortfolioDetail";
import Careers from "./pages/Careers";
import CareersTest from "./pages/CareersTest";
import FileTest from "./pages/FileTest";
import Admin from "./pages/Admin";
import AdminSimple from "./pages/AdminSimple";
import AdminTest from "./pages/AdminTest";
import AdminDebug from "./pages/AdminDebug";
import AdminFixed from "./pages/AdminFixed";
import AdminFinal from "./pages/AdminFinal";
import Test from "./pages/Test";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<ServicesDetails />} />
          <Route path="/services/:serviceName" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:projectId" element={<PortfolioDetail />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/file-test" element={<FileTest />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin-simple" element={<AdminSimple />} />
              <Route path="/admin-test" element={<AdminTest />} />
              <Route path="/admin-debug" element={<AdminDebug />} />
              <Route path="/test" element={<Test />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
