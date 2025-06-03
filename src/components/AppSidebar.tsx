
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
    url: "/create/type",
    icon: PlusCircle,
    routes: ["/create", "/create/type", "/create/method", "/create/script", "/create/caption", "/create/ai", "/mockups", "/mockup"]
  },
  {
    title: "Planejamento de Conteúdo",
    url: "/content-planning",
    icon: Clipboard,
    routes: ["/content-planning", "/content-calendar", "/edit-contents"]
  },
  {
    title: "Meus Conteúdos",
    url: "/content",
    icon: FileText,
    routes: ["/content"]
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
    routes: ["/bio-optimizer", "/bio-result"]
  },
  {
    title: "Gerar Apresentação",
    url: "/content-generator",
    icon: BookOpen,
    routes: ["/content-generator", "/presentation-text", "/presentation-design"]
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
    routes: ["/create/platforms", "/schedule"]
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

  const isActive = (item: any) => {
    // Check if current pathname matches the main URL
    if (location.pathname === item.url) {
      return true;
    }
    
    // Check if current pathname matches any of the defined routes for this item
    if (item.routes) {
      return item.routes.some((route: string) => {
        if (route.includes("?")) {
          const [path, search] = route.split("?");
          return location.pathname === path && location.search === `?${search}`;
        }
        return location.pathname.startsWith(route);
      });
    }
    
    // For content items with query parameters
    if (item.url.includes("?type=")) {
      const [path, search] = item.url.split("?");
      return location.pathname === path && location.search === `?${search}`;
    }
    
    return false;
  };

  const getMenuButtonClass = (item: any) => {
    if (isActive(item)) {
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
                  <SidebarMenuButton asChild className={getMenuButtonClass(item)}>
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
                  <SidebarMenuButton asChild className={getMenuButtonClass(item)}>
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
                  <SidebarMenuButton asChild className={getMenuButtonClass(item)}>
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
                  <SidebarMenuButton asChild className={getMenuButtonClass(item)}>
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
                  <SidebarMenuButton asChild className={getMenuButtonClass(item)}>
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
