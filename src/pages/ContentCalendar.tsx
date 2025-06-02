
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Calendar, Edit, Download, Clock, Users, MessageSquare, Video, Image, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContentCalendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);

  // Dados de exemplo do calendário gerado pela IA
  const [calendarData, setCalendarData] = useState([
    {
      date: "2025-06-03",
      content: {
        type: "Carrossel",
        title: "10 Dicas de Produtividade para 2025",
        description: "A ideia desse conteúdo é apresentar 10 dicas práticas para melhorar a produtividade no dia a dia, focando em métodos simples que qualquer pessoa pode aplicar.",
        platform: "Instagram",
        time: "09:00"
      }
    },
    {
      date: "2025-06-04",
      content: {
        type: "Vídeo",
        title: "Como Definir Metas Alcançáveis",
        description: "Este vídeo motivacional ensina sobre planejamento estratégico, mostrando como estabelecer objetivos realistas e criar um plano de ação efetivo.",
        platform: "TikTok",
        time: "18:00"
      }
    },
    {
      date: "2025-06-05",
      content: {
        type: "Imagem com texto",
        title: "Frase Motivacional da Quinta",
        description: "Post inspirador para meio da semana, com uma frase poderosa sobre persistência e crescimento pessoal, acompanhada de um design atrativo.",
        platform: "Instagram",
        time: "08:00"
      }
    },
    {
      date: "2025-06-06",
      content: {
        type: "Carrossel",
        title: "5 Hábitos para o Sucesso",
        description: "Carrossel educativo que detalha cinco hábitos fundamentais que pessoas bem-sucedidas praticam diariamente.",
        platform: "Instagram",
        time: "10:00"
      }
    },
    {
      date: "2025-06-07",
      content: {
        type: "Vídeo",
        title: "Mindset de Crescimento",
        description: "Vídeo sobre como desenvolver uma mentalidade de crescimento e superar limitações pessoais.",
        platform: "TikTok",
        time: "19:00"
      }
    }
  ]);

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

  const handleEditContent = (content: any) => {
    setEditingContent({ ...content });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingContent && selectedDate) {
      const updatedData = calendarData.map(item => 
        item.date === selectedDate 
          ? { ...item, content: editingContent }
          : item
      );
      setCalendarData(updatedData);
      setIsEditDialogOpen(false);
      setEditingContent(null);
    }
  };

  const selectedContent = calendarData.find(item => item.date === selectedDate);

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
                <div className="text-2xl font-bold text-purple-600">{calendarData.length}</div>
                <div className="text-sm text-gray-600">Posts no Mês</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Tipos de Conteúdo</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">2</div>
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
            <CardTitle>Junho 2025</CardTitle>
            <CardDescription>
              Clique em qualquer conteúdo para ver os detalhes e editar
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
              {Array.from({ length: 30 }, (_, i) => {
                const day = i + 1;
                const dateStr = `2025-06-${day.toString().padStart(2, '0')}`;
                const hasContent = calendarData.find(item => item.date === dateStr);
                
                return (
                  <div
                    key={day}
                    className="p-2 min-h-[100px] border rounded-lg transition-colors bg-white border-gray-200 hover:bg-gray-50"
                  >
                    <div className="font-semibold text-gray-900 mb-1">{day}</div>
                    {hasContent && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <div
                            className={`text-xs p-2 rounded cursor-pointer hover:opacity-80 ${getContentColor(hasContent.content.type)}`}
                            onClick={() => setSelectedDate(dateStr)}
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
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detalhes do Conteúdo - {day} de Junho</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="font-semibold text-sm text-gray-700">Tipo de Conteúdo:</label>
                                <p className="text-gray-600">{hasContent.content.type}</p>
                              </div>
                              <div>
                                <label className="font-semibold text-sm text-gray-700">Plataforma:</label>
                                <p className="text-gray-600">{hasContent.content.platform}</p>
                              </div>
                              <div>
                                <label className="font-semibold text-sm text-gray-700">Horário:</label>
                                <p className="text-gray-600">{hasContent.content.time}</p>
                              </div>
                            </div>
                            <div>
                              <label className="font-semibold text-sm text-gray-700">Título:</label>
                              <p className="text-gray-600">{hasContent.content.title}</p>
                            </div>
                            <div>
                              <label className="font-semibold text-sm text-gray-700">Descrição da Ideia:</label>
                              <p className="text-gray-600">{hasContent.content.description}</p>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button 
                                size="sm" 
                                className="bg-purple-600 hover:bg-purple-700"
                                onClick={() => handleEditContent(hasContent.content)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </Button>
                              <Button size="sm" variant="outline">
                                Criar Agora
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Dialog de Edição */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Conteúdo</DialogTitle>
            </DialogHeader>
            {editingContent && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Título</Label>
                  <Input
                    id="edit-title"
                    value={editingContent.title}
                    onChange={(e) => setEditingContent({...editingContent, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-type">Tipo de Conteúdo</Label>
                  <Select value={editingContent.type} onValueChange={(value) => setEditingContent({...editingContent, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Carrossel">Carrossel</SelectItem>
                      <SelectItem value="Vídeo">Vídeo</SelectItem>
                      <SelectItem value="Imagem com texto">Imagem com texto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-description">Descrição da Ideia</Label>
                  <Textarea
                    id="edit-description"
                    value={editingContent.description}
                    onChange={(e) => setEditingContent({...editingContent, description: e.target.value})}
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveEdit} className="bg-purple-600 hover:bg-purple-700">
                    Salvar Alterações
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
