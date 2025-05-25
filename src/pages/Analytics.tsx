import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, TrendingUp, TrendingDown, Eye, Heart, 
  MessageCircle, Share, Users, Calendar
} from "lucide-react";

export default function Analytics() {
  const stats = [
    {
      title: "Total de Visualizações",
      value: "45.2K",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
      color: "text-blue-600"
    },
    {
      title: "Engajamento",
      value: "3.8K",
      change: "+8.2%",
      trend: "up",
      icon: Heart,
      color: "text-red-600"
    },
    {
      title: "Comentários",
      value: "892",
      change: "-2.1%",
      trend: "down",
      icon: MessageCircle,
      color: "text-green-600"
    },
    {
      title: "Compartilhamentos",
      value: "234",
      change: "+15.3%",
      trend: "up",
      icon: Share,
      color: "text-purple-600"
    }
  ];

  const topPosts = [
    {
      id: "1",
      title: "5 Dicas para Melhorar sua Saúde Mental",
      views: 12470,
      likes: 890,
      comments: 156,
      platform: "Instagram"
    },
    {
      id: "2",
      title: "Como fazer um bolo de chocolate perfeito",
      views: 8930,
      likes: 634,
      comments: 89,
      platform: "Facebook"
    },
    {
      id: "3",
      title: "10 Exercícios para fazer em casa",
      views: 6720,
      likes: 445,
      comments: 67,
      platform: "LinkedIn"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Análises</h1>
          <p className="text-gray-600">Acompanhe o desempenho dos seus conteúdos e engajamento.</p>
        </div>

        {/* Period Selector */}
        <Tabs defaultValue="month" className="space-y-6">
          <TabsList>
            <TabsTrigger value="week">Última Semana</TabsTrigger>
            <TabsTrigger value="month">Último Mês</TabsTrigger>
            <TabsTrigger value="quarter">Último Trimestre</TabsTrigger>
            <TabsTrigger value="year">Último Ano</TabsTrigger>
          </TabsList>

          <TabsContent value="month" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {stat.trend === "up" ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          )}
                          <p className={`text-xs ${
                            stat.trend === "up" ? "text-green-600" : "text-red-600"
                          }`}>
                            {stat.change} vs mês anterior
                          </p>
                        </div>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Desempenho por Período
                  </CardTitle>
                  <CardDescription>
                    Visualizações e engajamento dos últimos 30 dias
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Gráfico de desempenho</p>
                      <p className="text-sm text-gray-400">Em breve...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Posts com Melhor Desempenho
                  </CardTitle>
                  <CardDescription>
                    Seus conteúdos mais populares do mês
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPosts.map((post, index) => (
                      <div key={post.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{post.title}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {post.views.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {post.comments}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Desempenho por Plataforma
                </CardTitle>
                <CardDescription>
                  Compare o engajamento entre diferentes redes sociais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Instagram</span>
                      <span className="text-sm text-green-600">+12.5%</span>
                    </div>
                    <div className="text-2xl font-bold">24.8K</div>
                    <div className="text-sm text-gray-500">visualizações</div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Facebook</span>
                      <span className="text-sm text-green-600">+8.3%</span>
                    </div>
                    <div className="text-2xl font-bold">15.2K</div>
                    <div className="text-sm text-gray-500">visualizações</div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">LinkedIn</span>
                      <span className="text-sm text-green-600">+15.7%</span>
                    </div>
                    <div className="text-2xl font-bold">5.2K</div>
                    <div className="text-sm text-gray-500">visualizações</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other time period tabs would have similar content */}
          <TabsContent value="week">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Dados da última semana</h3>
              <p className="text-gray-500">Análises detalhadas em desenvolvimento...</p>
            </div>
          </TabsContent>

          <TabsContent value="quarter">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Dados do último trimestre</h3>
              <p className="text-gray-500">Análises detalhadas em desenvolvimento...</p>
            </div>
          </TabsContent>

          <TabsContent value="year">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Dados do último ano</h3>
              <p className="text-gray-500">Análises detalhadas em desenvolvimento...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
