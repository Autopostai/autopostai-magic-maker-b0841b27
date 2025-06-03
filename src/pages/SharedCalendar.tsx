
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Video, Image, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useParams } from "react-router-dom";

export default function SharedCalendar() {
  const { calendarId } = useParams();
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [showContentDialog, setShowContentDialog] = useState(false);

  // Mock data - em uma implementação real, isso viria de uma API baseada no calendarId
  const calendarData = [
    {
      date: "2025-06-01",
      content: {
        type: "Carrossel",
        title: "10 Dicas de Produtividade",
        description: "Conteúdo educativo sobre dicas de produtividade para marketing digital. Este post vai engajar sua audiência e agregar valor ao seu feed.",
        platform: "Instagram",
        time: "09:00"
      }
    },
    {
      date: "2025-06-02",
      content: {
        type: "Vídeo",
        title: "Como Criar Conteúdo Viral",
        description: "Conteúdo educativo sobre como criar conteúdo viral para marketing digital. Este post vai engajar sua audiência e agregar valor ao seu feed.",
        platform: "TikTok",
        time: "14:00"
      }
    },
    // ... mais conteúdos
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

  const handleContentClick = (content: any, dateStr: string) => {
    setSelectedContent({ ...content, date: dateStr });
    setShowContentDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <Calendar className="h-10 w-10 text-purple-600" />
            Calendário de Conteúdo
          </h1>
          <p className="text-gray-600 text-lg">
            Planejamento de conteúdo compartilhado
          </p>
        </div>

        {/* Calendário */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Junho 2025</CardTitle>
            <CardDescription className="text-base">
              Clique em qualquer conteúdo para ver os detalhes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div key={day} className="p-3 text-center font-semibold text-gray-600 bg-gray-100 rounded">
                  {day}
                </div>
              ))}
              
              {Array.from({ length: 30 }, (_, i) => {
                const day = i + 1;
                const dateStr = `2025-06-${day.toString().padStart(2, '0')}`;
                const hasContent = calendarData.find(item => item.date === dateStr);
                
                return (
                  <div
                    key={day}
                    className="p-2 min-h-[120px] border rounded-lg transition-colors bg-white border-gray-200 hover:bg-gray-50"
                  >
                    <div className="font-semibold text-gray-900 mb-2 text-center">{day}</div>
                    {hasContent && (
                      <div
                        className={`text-xs p-2 rounded cursor-pointer hover:opacity-80 ${getContentColor(hasContent.content.type)}`}
                        onClick={() => handleContentClick(hasContent.content, dateStr)}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          {getContentIcon(hasContent.content.type)}
                          <span className="truncate font-medium">{hasContent.content.type}</span>
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

        {/* Dialog de Visualização de Conteúdo */}
        <Dialog open={showContentDialog} onOpenChange={setShowContentDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Detalhes do Conteúdo - {selectedContent?.date ? new Date(selectedContent.date + 'T00:00:00').getDate() : ''} de Junho
              </DialogTitle>
            </DialogHeader>
            {selectedContent && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-semibold text-sm text-gray-700 block mb-1">Tipo de Conteúdo:</label>
                    <p className="text-gray-600 text-base">{selectedContent.type}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-sm text-gray-700 block mb-1">Plataforma:</label>
                    <p className="text-gray-600 text-base">{selectedContent.platform}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-sm text-gray-700 block mb-1">Horário:</label>
                    <p className="text-gray-600 text-base">{selectedContent.time}</p>
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-sm text-gray-700 block mb-1">Título:</label>
                  <p className="text-gray-600 text-base">{selectedContent.title}</p>
                </div>
                <div>
                  <label className="font-semibold text-sm text-gray-700 block mb-1">Descrição da Ideia:</label>
                  <p className="text-gray-600 text-base leading-relaxed">{selectedContent.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Criado com AutoPostAI - Planejamento de conteúdo inteligente
          </p>
        </div>
      </div>
    </div>
  );
}
