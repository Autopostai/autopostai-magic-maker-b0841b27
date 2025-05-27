
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Plus, TrendingUp, Users, Eye, Heart, MessageCircle,
  FileText, Image, Video, Clock, Calendar, BarChart3, BookOpen
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Conteúdos Criados",
      value: "127",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Engajamento Total",
      value: "45.2K",
      change: "+23%",
      icon: Heart,
      color: "text-red-600"
    },
    {
      title: "Visualizações",
      value: "892K",
      change: "+18%",
      icon: Eye,
      color: "text-green-600"
    },
    {
      title: "Seguidores Ganhos",
      value: "2.4K",
      change: "+31%",
      icon: Users,
      color: "text-purple-600"
    }
  ];

  const recentContent = [
    {
      id: "1",
      title: "5 Dicas para Melhorar sua Saúde Mental",
      type: "carousel",
      createdAt: "2024-05-15T14:30:00",
      status: "published",
      engagement: 247
    },
    {
      id: "2",
      title: "Como fazer um bolo de chocolate perfeito",
      type: "video",
      createdAt: "2024-05-18T10:15:00",
      status: "published",
      engagement: 356
    },
    {
      id: "3",
      title: "10 Exercícios para fazer em casa",
      type: "post",
      createdAt: "2024-05-20T08:45:00",
      status: "draft",
      engagement: 0
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "post":
        return <Image className="h-4 w-4 text-orange-500" />;
      case "carousel":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "video":
        return <Video className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Bem-vindo de volta! Aqui está um resumo da sua atividade.</p>
          </div>
          
          <Button asChild>
            <Link to="/create">
              <Plus className="h-4 w-4 mr-2" />
              Criar Conteúdo
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.change} vs mês anterior</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Content */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Conteúdos Recentes
              </CardTitle>
              <CardDescription>Seus últimos conteúdos criados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContent.map((content) => (
                  <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(content.type)}
                      <div>
                        <p className="font-medium">{content.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(content.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        content.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {content.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </span>
                      {content.engagement > 0 && (
                        <span className="text-sm text-gray-600">
                          {content.engagement} interações
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/content">Ver Todos os Conteúdos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link to="/create?type=post">
                    <Image className="h-4 w-4 mr-2" />
                    Criar Post
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/create?type=carousel">
                    <FileText className="h-4 w-4 mr-2" />
                    Criar Carrossel
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/create?type=video">
                    <Video className="h-4 w-4 mr-2" />
                    Criar Vídeo
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/video-summarizer">
                    <Video className="h-4 w-4 mr-2" />
                    Resumir Vídeo
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/trend-detector">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Detector de Tendências
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/bio-optimizer">
                    <Users className="h-4 w-4 mr-2" />
                    Otimizar Bio
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/content-generator">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Gerar eBook/PDF
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/schedule">
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Posts
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Uso do Plano
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Gerações utilizadas</span>
                      <span>27/30</span>
                    </div>
                    <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Renova em 30/05/2024
                  </div>
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <Link to="/pricing">
                      Fazer Upgrade
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
