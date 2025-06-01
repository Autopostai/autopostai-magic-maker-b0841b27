
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { LineChart, Instagram, Youtube, Facebook, Linkedin, Twitter, Plus, BarChart3, Users, Eye, Heart, MessageCircle, Share, TrendingUp, TrendingDown } from "lucide-react";

export default function Metrics() {
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);

  const platforms = [
    {
      name: "Instagram",
      icon: Instagram,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      connected: false
    },
    {
      name: "TikTok",
      icon: () => <div className="w-5 h-5 bg-black rounded" />,
      color: "bg-black",
      connected: false
    },
    {
      name: "YouTube",
      icon: Youtube,
      color: "bg-red-600",
      connected: false
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600",
      connected: false
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700",
      connected: false
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500",
      connected: false
    }
  ];

  // Dados simulados de métricas (seria obtido das APIs das redes sociais)
  const mockMetrics = {
    instagram: {
      followers: 12500,
      engagement: 4.2,
      reach: 45000,
      likes: 3200,
      comments: 150,
      shares: 89,
      growth: 12.5
    },
    youtube: {
      subscribers: 8900,
      views: 125000,
      watchTime: 2400,
      likes: 1800,
      comments: 95,
      shares: 65,
      growth: 8.3
    }
  };

  const handleConnectPlatform = (platformName: string) => {
    setConnectedPlatforms(prev => 
      prev.includes(platformName) 
        ? prev.filter(p => p !== platformName)
        : [...prev, platformName]
    );
  };

  const MetricCard = ({ title, value, change, icon: Icon }: { 
    title: string; 
    value: string | number; 
    change: number; 
    icon: any 
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-purple-600" />
            <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {Math.abs(change)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-purple-600" />
            Métricas das Redes Sociais
          </h1>
          <p className="text-gray-600">
            Conecte suas redes sociais para acompanhar as métricas no dashboard
          </p>
        </div>

        {/* Conectar Plataformas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-purple-600" />
              Conectar Redes Sociais
            </CardTitle>
            <CardDescription>
              Conecte suas contas para visualizar métricas em tempo real
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {platforms.map((platform) => {
                const isConnected = connectedPlatforms.includes(platform.name);
                return (
                  <div
                    key={platform.name}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      isConnected 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                    onClick={() => handleConnectPlatform(platform.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg text-white ${platform.color}`}>
                          <platform.icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-gray-900">{platform.name}</span>
                      </div>
                      <Button
                        size="sm"
                        variant={isConnected ? "default" : "outline"}
                        className={isConnected ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {isConnected ? "Conectado" : "Conectar"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Métricas do Instagram */}
        {connectedPlatforms.includes("Instagram") && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Instagram className="h-5 w-5 text-purple-600" />
                Métricas do Instagram
              </CardTitle>
              <CardDescription>Últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Seguidores"
                  value={mockMetrics.instagram.followers.toLocaleString()}
                  change={mockMetrics.instagram.growth}
                  icon={Users}
                />
                <MetricCard
                  title="Alcance"
                  value={mockMetrics.instagram.reach.toLocaleString()}
                  change={15.3}
                  icon={Eye}
                />
                <MetricCard
                  title="Curtidas"
                  value={mockMetrics.instagram.likes.toLocaleString()}
                  change={8.7}
                  icon={Heart}
                />
                <MetricCard
                  title="Taxa de Engajamento"
                  value={`${mockMetrics.instagram.engagement}%`}
                  change={2.1}
                  icon={TrendingUp}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Métricas do YouTube */}
        {connectedPlatforms.includes("YouTube") && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-600" />
                Métricas do YouTube
              </CardTitle>
              <CardDescription>Últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Inscritos"
                  value={mockMetrics.youtube.subscribers.toLocaleString()}
                  change={mockMetrics.youtube.growth}
                  icon={Users}
                />
                <MetricCard
                  title="Visualizações"
                  value={mockMetrics.youtube.views.toLocaleString()}
                  change={22.1}
                  icon={Eye}
                />
                <MetricCard
                  title="Tempo de Exibição"
                  value={`${mockMetrics.youtube.watchTime}h`}
                  change={12.8}
                  icon={LineChart}
                />
                <MetricCard
                  title="Curtidas"
                  value={mockMetrics.youtube.likes.toLocaleString()}
                  change={18.4}
                  icon={Heart}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Estado vazio */}
        {connectedPlatforms.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhuma rede social conectada
              </h3>
              <p className="text-gray-600 mb-6">
                Conecte suas redes sociais para começar a acompanhar suas métricas
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                Conectar primeira rede social
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
