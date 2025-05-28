
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import CreateContent from "./pages/CreateContent";
import CreateContentType from "./pages/CreateContentType";
import CreateAI from "./pages/CreateAI";
import CreateScript from "./pages/CreateScript";
import CreateCaption from "./pages/CreateCaption";
import Content from "./pages/Content";
import Schedule from "./pages/Schedule";
import Analytics from "./pages/Analytics";
import Library from "./pages/Library";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pricing from "./pages/Pricing";
import ViewContent from "./pages/ViewContent";
import SelectPlatforms from "./pages/SelectPlatforms";
import CreateMethod from "./pages/CreateMethod";
import TemplateGallery from "./pages/TemplateGallery";
import VideoSummarizer from "./pages/VideoSummarizer";
import TrendDetector from "./pages/TrendDetector";
import BioOptimizer from "./pages/BioOptimizer";
import ContentGenerator from "./pages/ContentGenerator";
import MockupGallery from "./pages/MockupGallery";
import MockupPreview from "./pages/MockupPreview";
import MockupEditor from "./pages/MockupEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateContentType />} />
          <Route path="/create/content" element={<CreateContent />} />
          <Route path="/create/ai" element={<CreateAI />} />
          <Route path="/create/script" element={<CreateScript />} />
          <Route path="/create/caption" element={<CreateCaption />} />
          <Route path="/create/platforms" element={<SelectPlatforms />} />
          <Route path="/create/method" element={<CreateMethod />} />
          <Route path="/create/templates" element={<TemplateGallery />} />
          <Route path="/mockup/gallery" element={<MockupGallery />} />
          <Route path="/mockup/preview/:id" element={<MockupPreview />} />
          <Route path="/mockup/editor/:id" element={<MockupEditor />} />
          <Route path="/video-summarizer" element={<VideoSummarizer />} />
          <Route path="/trend-detector" element={<TrendDetector />} />
          <Route path="/bio-optimizer" element={<BioOptimizer />} />
          <Route path="/content-generator" element={<ContentGenerator />} />
          <Route path="/content" element={<Content />} />
          <Route path="/content/:id" element={<ViewContent />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/library" element={<Library />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
