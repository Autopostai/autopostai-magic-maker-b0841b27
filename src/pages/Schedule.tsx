
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, Clock, Instagram, Facebook, Youtube, Linkedin,
  Calendar as CalendarIcon, Edit, Trash2
} from "lucide-react";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const scheduledPosts = [
    {
      id: "1",
      title: "5 Dicas para Melhorar sua Saúde Mental",
      platform: "instagram",
      scheduledFor: "2024-05-25T14:30:00",
      status: "scheduled",
      type: "carousel"
    },
    {
      id: "2",
      title: "Como fazer um bolo de chocolate perfeito",
      platform: "facebook",
      scheduledFor: "2024-05-25T18:00:00",
      status: "scheduled",
      type: "video"
    },
    {
      id: "3",
      title: "10 Exercícios para fazer em casa",
      platform: "linkedin",
      scheduledFor: "2024-05-26T08:00:00",
      status: "scheduled",
      type: "post"
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case "youtube":
        return <Youtube className="h-4 w-4 text-red-500" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4 text-blue-700" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "Instagram";
      case "facebook":
        return "Facebook";
      case "youtube":
        return "YouTube";
      case "linkedin":
        return "LinkedIn";
      default:
        return platform;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Agendamentos</h1>
            <p className="text-gray-600">Gerencie seus posts agendados e planeje seu conteúdo.</p>
          </div>
          
          <Button asChild>
            <Link to="/create/platforms">
              <Plus className="h-4 w-4 mr-2" />
              Agendar Post
            </Link>
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Calendário
              </CardTitle>
              <CardDescription>Selecione uma data para ver os agendamentos</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Scheduled Posts */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Posts Agendados
                </CardTitle>
                <CardDescription>
                  {scheduledPosts.length} posts agendados para os próximos dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getPlatformIcon(post.platform)}
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <span>{getPlatformName(post.platform)}</span>
                            <span>•</span>
                            <span>{new Date(post.scheduledFor).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {post.status === 'scheduled' ? 'Agendado' : 'Publicado'}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {scheduledPosts.length === 0 && (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Nenhum post agendado</h3>
                      <p className="text-gray-500 mb-4">
                        Comece agendando seus primeiros posts para manter sua presença online ativa.
                      </p>
                      <Button asChild>
                        <Link to="/create/platforms">
                          <Plus className="h-4 w-4 mr-2" />
                          Agendar Primeiro Post
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-500">Esta Semana</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">48</div>
                    <div className="text-sm text-gray-500">Este Mês</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">127</div>
                    <div className="text-sm text-gray-500">Total</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
