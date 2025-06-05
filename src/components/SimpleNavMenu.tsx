
import { 
  Calendar, 
  Home, 
  Settings, 
  PlusCircle, 
  BarChart3, 
  FileText, 
  Image, 
  Video, 
  MessageSquare,
  Clock,
  Users,
  HelpCircle,
  LogOut,
  TrendingUp,
  BookOpen,
  PlayCircle,
  Youtube,
  Megaphone,
  Package,
  Clipboard,
  LineChart
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Criar Conteúdo",
    url: "/create",
    icon: PlusCircle,
  },
  {
    title: "Planejamento de Conteúdo",
    url: "/content-planning",
    icon: Clipboard,
  },
  {
    title: "Meus Conteúdos",
    url: "/content",
    icon: FileText,
  },
];

const aiToolsItems = [
  {
    title: "Resumir Vídeo",
    url: "/video-summarizer",
    icon: PlayCircle,
  },
  {
    title: "Detector de Tendências",
    url: "/trend-detector",
    icon: TrendingUp,
  },
  {
    title: "Otimizar Bio",
    url: "/bio-optimizer",
    icon: Users,
  },
  {
    title: "Gerar Apresentação",
    url: "/content-generator",
    icon: BookOpen,
  },
  {
    title: "Produtos Digitais",
    url: "/digital-products",
    icon: Package,
  },
];

const contentItems = [
  {
    title: "Posts",
    url: "/content?type=post",
    icon: Image,
  },
  {
    title: "Carrosséis",
    url: "/content?type=carousel",
    icon: FileText,
  },
  {
    title: "Thumbnails",
    url: "/content?type=thumbnail",
    icon: Youtube,
  },
  {
    title: "Criativos",
    url: "/content?type=ads",
    icon: Megaphone,
  },
  {
    title: "Vídeos",
    url: "/content?type=video",
    icon: Video,
  },
  {
    title: "Roteiros",
    url: "/content?type=script",
    icon: MessageSquare,
  },
];

const toolsItems = [
  {
    title: "Agendar Posts",
    url: "/schedule",
    icon: Clock,
  },
  {
    title: "Métricas",
    url: "/metrics",
    icon: LineChart,
  },
  {
    title: "Análises",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Biblioteca",
    url: "/library",
    icon: Image,
  },
];

const accountItems = [
  {
    title: "Configurações",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Suporte",
    url: "/support",
    icon: HelpCircle,
  },
];

export function SimpleNavMenu() {
  const location = useLocation();

  const isActive = (url: string) => {
    if (url === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    
    if (url === "/create") {
      return location.pathname === "/create";
    }
    
    if (url === "/content-planning") {
      return location.pathname === "/content-planning" || location.pathname === "/content-calendar";
    }
    
    if (url === "/content-generator") {
      return location.pathname === "/content-generator" || 
             location.pathname === "/presentation-text" || 
             location.pathname === "/presentation-design";
    }
    
    if (url === "/schedule") {
      return location.pathname === "/schedule";
    }

    if (url === "/content") {
      return location.pathname === "/content" && !location.search;
    }
    
    if (url.includes("?type=")) {
      const [path, search] = url.split("?");
      return location.pathname === path && location.search === `?${search}`;
    }
    
    return location.pathname.startsWith(url);
  };

  const getMenuButtonClass = (url: string) => {
    if (isActive(url)) {
      return "bg-purple-600 text-white hover:bg-purple-700 hover:text-white w-full justify-start";
    }
    return "w-full justify-start hover:bg-gray-100";
  };

  return (
    <div className="h-full bg-white border-r overflow-y-auto">
      <div className="p-4">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl mb-6">
          <div className="bg-purple-100 p-1 rounded-full">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
            AutoPostAI
          </span>
        </Link>

        <div className="space-y-6">
          <div>
            <div className="space-y-1">
              {mainMenuItems.map((item) => (
                <Button key={item.title} asChild variant="ghost" className={getMenuButtonClass(item.url)}>
                  <Link to={item.url}>
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2 px-2">Ferramentas IA</h3>
            <div className="space-y-1">
              {aiToolsItems.map((item) => (
                <Button key={item.title} asChild variant="ghost" className={getMenuButtonClass(item.url)}>
                  <Link to={item.url}>
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2 px-2">Conteúdos</h3>
            <div className="space-y-1">
              {contentItems.map((item) => (
                <Button key={item.title} asChild variant="ghost" className={getMenuButtonClass(item.url)}>
                  <Link to={item.url}>
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2 px-2">Ferramentas</h3>
            <div className="space-y-1">
              {toolsItems.map((item) => (
                <Button key={item.title} asChild variant="ghost" className={getMenuButtonClass(item.url)}>
                  <Link to={item.url}>
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2 px-2">Conta</h3>
            <div className="space-y-1">
              {accountItems.map((item) => (
                <Button key={item.title} asChild variant="ghost" className={getMenuButtonClass(item.url)}>
                  <Link to={item.url}>
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
}
