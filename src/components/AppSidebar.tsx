
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
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const menuItems = [
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
    url: "/create/platforms",
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

export function AppSidebar() {
  const location = useLocation();

  const isActive = (url: string) => {
    // Exact match for most routes
    if (url === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    
    if (url === "/create") {
      return location.pathname === "/create";
    }
    
    if (url === "/content-planning") {
      return location.pathname === "/content-planning";
    }
    
    if (url === "/content-generator") {
      return location.pathname === "/content-generator" || 
             location.pathname === "/presentation-text" || 
             location.pathname === "/presentation-design";
    }
    
    if (url === "/create/platforms") {
      return location.pathname === "/create/platforms" || location.pathname === "/schedule";
    }
    
    // For content items with query parameters, check both path and search
    if (url.includes("?type=")) {
      const [path, search] = url.split("?");
      return location.pathname === path && location.search === `?${search}`;
    }
    
    // For other paths, check if current path starts with the url
    return location.pathname.startsWith(url);
  };

  const getMenuButtonClass = (url: string) => {
    if (isActive(url)) {
      return "bg-purple-600 text-white hover:bg-purple-700 hover:text-white";
    }
    return "";
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl">
          <div className="bg-purple-100 p-1 rounded-full">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
            AutoPostAI
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getMenuButtonClass(item.url)}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Ferramentas IA</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aiToolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getMenuButtonClass(item.url)}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Conteúdos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getMenuButtonClass(item.url)}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Ferramentas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getMenuButtonClass(item.url)}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Conta</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getMenuButtonClass(item.url)}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button variant="ghost" className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
