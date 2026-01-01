import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";

// Immediate imports for critical pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load all other pages for code splitting
const Contact = lazy(() => import("./pages/Contact"));
const ServicesDetails = lazy(() => import("./pages/ServicesDetails"));
const RoadMap = lazy(() => import("./pages/RoadMap"));
const TeamPage = lazy(() => import("./pages/Team"));
const ScheduleConsultation = lazy(() => import("./pages/ScheduleConsultation"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const PortfolioDetail = lazy(() => import("./pages/PortfolioDetail"));
const Careers = lazy(() => import("./pages/Careers"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const TeamMemberDetail = lazy(() => import("./pages/TeamMemberDetail"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Optimized QueryClient with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes (increased from 1 minute)
      gcTime: 10 * 60 * 1000, // 10 minutes (increased from 5 minutes)
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      // Network mode for better performance
      networkMode: 'online',
    },
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<ServicesDetails />} />
            <Route path="/services/:serviceName" element={<ServiceDetail />} />
            <Route path="/roadmap" element={<RoadMap />} />
            <Route path="/portfolio/:projectId" element={<PortfolioDetail />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/schedule-consultation" element={<ScheduleConsultation />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/team/:memberName" element={<TeamMemberDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
