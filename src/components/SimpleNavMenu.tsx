
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Home, BarChart3, Calendar, Users, Settings, 
  Palette, Video, Zap, TrendingUp, Target,
  FileText, Image, Music, Share2, Globe,
  Smartphone, Monitor, Instagram, Youtube
} from "lucide-react";

export function SimpleNavMenu() {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      items: [
        { name: "Início", href: "/dashboard", icon: Home },
        { name: "Métricas", href: "/metrics", icon: BarChart3 },
        { name: "Calendário", href: "/content-calendar", icon: Calendar },
        { name: "Analytics", href: "/analytics", icon: TrendingUp },
      ]
    },
    {
      title: "Criação",
      items: [
        { name: "Design Editor", href: "/design-editor", icon: Palette },
        { name: "Editor de Vídeo", href: "/video-editor", icon: Video },
        { name: "Criar Conteúdo", href: "/create", icon: FileText },
        { name: "Templates", href: "/create/templates", icon: Image },
      ]
    },
    {
      title: "IA Tools",
      items: [
        { name: "Gerador de Conteúdo", href: "/content-generator", icon: Zap },
        { name: "Detector de Trends", href: "/trend-detector", icon: TrendingUp },
        { name: "Otimizador Bio", href: "/bio-optimizer", icon: Target },
        { name: "Resumidor Vídeo", href: "/video-summarizer", icon: Video },
      ]
    },
    {
      title: "Conteúdo",
      items: [
        { name: "Biblioteca", href: "/library", icon: FileText },
        { name: "Planejamento", href: "/content-planning", icon: Calendar },
        { name: "Agendamento", href: "/schedule", icon: Calendar },
        { name: "Mockups", href: "/mockup/gallery", icon: Image },
      ]
    },
    {
      title: "Plataformas",
      items: [
        { name: "Conectar", href: "/connect-platforms", icon: Globe },
        { name: "Instagram", href: "#", icon: Instagram },
        { name: "YouTube", href: "#", icon: Youtube },
        { name: "TikTok", href: "#", icon: Smartphone },
      ]
    },
    {
      title: "Configurações",
      items: [
        { name: "Configurações", href: "/settings", icon: Settings },
        { name: "Suporte", href: "/support", icon: Users },
        { name: "Tutoriais", href: "/tutorials", icon: FileText },
      ]
    }
  ];

  return (
    <ScrollArea className="h-full py-6 pl-6 pr-6">
      <div className="space-y-6">
        {menuItems.map((section) => (
          <div key={section.title}>
            <h3 className="mb-2 px-2 text-sm font-semibold tracking-tight text-gray-500 uppercase">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Button
                    key={item.name}
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start ${
                      isActive 
                        ? "bg-purple-50 text-purple-700 hover:bg-purple-100" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    asChild
                  >
                    <Link to={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Upgrade para Pro</h4>
            <p className="text-xs text-purple-700 mb-3">
              Desbloqueie recursos avançados e tenha acesso ilimitado
            </p>
            <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
              Fazer Upgrade
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
