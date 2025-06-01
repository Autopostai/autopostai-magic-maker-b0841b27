
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Calendar, Edit, Download, Clock, Users, MessageSquare, Video, Image } from "lucide-react";

export default function ContentCalendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Dados de exemplo do calendário gerado pela IA
  const calendarData = [
    {
      date: "2025-01-01",
      content: {
        type: "Carrossel",
        title: "10 Dicas de Produtividade para 2025",
        description: "Carrossel educativo com dicas práticas",
        platform: "Instagram",
        time: "09:00"
      }
    },
    {
      date: "2025-01-02",
      content: {
        type: "Vídeo",
        title: "Como Definir Metas Alcançáveis",
        description: "Vídeo motivacional sobre planejamento",
        platform: "TikTok",
        time: "18:00"
      }
    },
    {
      date: "2025-01-03",
      content: {
        type: "Imagem com texto",
        title: "Frase Motivacional da Quinta",
        description: "Post inspirador para meio da semana",
        platform: "Instagram",
        time: "08:00"
      }
    },
    // Adicione mais conteúdos conforme necessário
  ];

  const getContentIcon = (type: string) => {
    switch (type) {
      case "Vídeo":
        return <Video className="h-4 w-4" />;
      case "Carrossel":
        return <MessageSquare className="h-4 w-4" />;
      case "Imagem com texto":
        return <Image className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getContentColor = (type: string) => {
    switch (type) {
      case "Vídeo":
        return "bg-red-100 border-red-200 text-red-700";
      case "Carrossel":
        return "bg-blue-100 border-blue-200 text-blue-700";
      case "Imagem com texto":
        return "bg-green-100 border-green-200 text-green-700";
      default:
        return "bg-gray-100 border-gray-200 text-gray-700";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Calendar className="h-8 w-8 text-purple-600" />
            Calendário de Conteúdo Gerado
          </h1>
          <p className="text-gray-600">
            Seu planejamento de conteúdo personalizado está pronto! Você pode editar ou baixar em PDF.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Edit className="mr-2 h-4 w-4" />
            Editar Conteúdos
          </Button>
          <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
            <Download className="mr-2 h-4 w-4" />
            Baixar PDF do Planejamento
          </Button>
        </div>

        {/* Resumo do Planejamento */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Resumo do Planejamento</CardTitle>
            <CardDescription>
              Visão geral do seu calendário de conteúdo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">30</div>
                <div className="text-sm text-gray-600">Posts no Mês</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-600">Tipos de Conteúdo</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-600">Plataformas</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">1</div>
                <div className="text-sm text-gray-600">Post por Dia</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendário */}
        <Card>
          <CardHeader>
            <CardTitle>Janeiro 2025</CardTitle>
            <CardDescription>
              Clique em qualquer data para ver os detalhes do conteúdo
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Grid do Calendário */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {/* Cabeçalho dos dias da semana */}
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div key={day} className="p-2 text-center font-semibold text-gray-600 bg-gray-50 rounded">
                  {day}
                </div>
              ))}
              
              {/* Dias do mês */}
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const dateStr = `2025-01-${day.toString().padStart(2, '0')}`;
                const hasContent = calendarData.find(item => item.date === dateStr);
                
                return (
                  <div
                    key={day}
                    className={`p-2 min-h-[80px] border rounded-lg cursor-pointer transition-colors ${
                      selectedDate === dateStr ? 'bg-purple-100 border-purple-300' : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedDate(dateStr)}
                  >
                    <div className="font-semibold text-gray-900 mb-1">{day}</div>
                    {hasContent && (
                      <div className={`text-xs p-1 rounded ${getContentColor(hasContent.content.type)}`}>
                        <div className="flex items-center gap-1 mb-1">
                          {getContentIcon(hasContent.content.type)}
                          <span className="truncate">{hasContent.content.type}</span>
                        </div>
                        <div className="truncate font-medium">{hasContent.content.title}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{hasContent.content.time}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detalhes do Conteúdo Selecionado */}
        {selectedDate && calendarData.find(item => item.date === selectedDate) && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Detalhes do Conteúdo - {selectedDate}</CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const content = calendarData.find(item => item.date === selectedDate)?.content;
                if (!content) return null;
                
                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="font-semibold">Tipo de Conteúdo:</Label>
                        <p className="text-gray-600">{content.type}</p>
                      </div>
                      <div>
                        <Label className="font-semibold">Plataforma:</Label>
                        <p className="text-gray-600">{content.platform}</p>
                      </div>
                      <div>
                        <Label className="font-semibold">Horário:</Label>
                        <p className="text-gray-600">{content.time}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="font-semibold">Título:</Label>
                      <p className="text-gray-600">{content.title}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Descrição:</Label>
                      <p className="text-gray-600">{content.description}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                      <Button size="sm" variant="outline">
                        Criar Agora
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
