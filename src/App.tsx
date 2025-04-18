
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AssistantProvider } from "./contexts/AssistantContext";
import AiAssistant from "./components/assistant/AiAssistant";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetCodeVerification from "./pages/ResetCodeVerification";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Forums from "./pages/Forums";
import ForumDetail from "./pages/ForumDetail";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Teacher from "./pages/Teacher";
import Resources from "./pages/Resources";
import TeachersList from "./pages/TeachersList";
import HelpCenter from "./pages/HelpCenter";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";

// New pages
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Schedule from "./pages/Schedule";
import NewCourse from "./pages/NewCourse";
import NewEbook from "./pages/NewEbook";
import NewDiscussion from "./pages/NewDiscussion";
import AdminPanel from "./pages/AdminPanel";
import AdminAction from "./pages/AdminAction";

// Layout components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const queryClient = new QueryClient();

// AnimatePresence wrapper component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<ResetCodeVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="/forums/:id" element={<ForumDetail />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/teachers" element={<TeachersList />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        
        {/* New routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/new-course" element={<NewCourse />} />
        <Route path="/new-ebook" element={<NewEbook />} />
        <Route path="/new-discussion" element={<NewDiscussion />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
        <Route path="/admin/action" element={<AdminAction />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AssistantProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pt-24">
                <AnimatedRoutes />
              </main>
              <Footer />
              <AiAssistant />
            </div>
          </BrowserRouter>
        </AssistantProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
