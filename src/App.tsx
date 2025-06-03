
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateContent from "./pages/CreateContent";
import CreateMethod from "./pages/CreateMethod";
import CreateContentType from "./pages/CreateContentType";
import CreateScript from "./pages/CreateScript";
import CreateCaption from "./pages/CreateCaption";
import Content from "./pages/Content";
import ViewContent from "./pages/ViewContent";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Library from "./pages/Library";
import ConnectPlatforms from "./pages/ConnectPlatforms";
import SelectPlatforms from "./pages/SelectPlatforms";
import Schedule from "./pages/Schedule";
import VideoSummarizer from "./pages/VideoSummarizer";
import TrendDetector from "./pages/TrendDetector";
import ContentGenerator from "./pages/ContentGenerator";
import PresentationText from "./pages/PresentationText";
import PresentationDesign from "./pages/PresentationDesign";
import BioOptimizer from "./pages/BioOptimizer";
import BioResult from "./pages/BioResult";
import DigitalProducts from "./pages/DigitalProducts";
import Metrics from "./pages/Metrics";
import ContentPlanning from "./pages/ContentPlanning";
import ContentCalendar from "./pages/ContentCalendar";
import EditContents from "./pages/EditContents";
import SharedCalendar from "./pages/SharedCalendar";
import TemplateGallery from "./pages/TemplateGallery";
import MockupGallery from "./pages/MockupGallery";
import MockupPreview from "./pages/MockupPreview";
import MockupEditor from "./pages/MockupEditor";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreateContent />} />
                <Route path="/create/type" element={<CreateContentType />} />
                <Route path="/create/method" element={<CreateMethod />} />
                <Route path="/create/script" element={<CreateScript />} />
                <Route path="/create/caption" element={<CreateCaption />} />
                <Route path="/create/platforms" element={<ConnectPlatforms />} />
                <Route path="/content" element={<Content />} />
                <Route path="/content/:id" element={<ViewContent />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/support" element={<Support />} />
                <Route path="/library" element={<Library />} />
                <Route path="/platforms" element={<SelectPlatforms />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/video-summarizer" element={<VideoSummarizer />} />
                <Route path="/trend-detector" element={<TrendDetector />} />
                <Route path="/content-generator" element={<ContentGenerator />} />
                <Route path="/presentation-text" element={<PresentationText />} />
                <Route path="/presentation-design" element={<PresentationDesign />} />
                <Route path="/bio-optimizer" element={<BioOptimizer />} />
                <Route path="/bio-result" element={<BioResult />} />
                <Route path="/digital-products" element={<DigitalProducts />} />
                <Route path="/metrics" element={<Metrics />} />
                <Route path="/content-planning" element={<ContentPlanning />} />
                <Route path="/content-calendar" element={<ContentCalendar />} />
                <Route path="/edit-contents" element={<EditContents />} />
                <Route path="/shared-calendar/:calendarId" element={<SharedCalendar />} />
                <Route path="/templates" element={<TemplateGallery />} />
                <Route path="/mockups" element={<MockupGallery />} />
                <Route path="/mockup/:id" element={<MockupPreview />} />
                <Route path="/mockup/:id/editor" element={<MockupEditor />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
