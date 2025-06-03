import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Calendar, Edit, Download, Clock, Users, MessageSquare, Video, Image, X, Share2, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ContentCalendar() {
  const location = useLocation();
  const navigate = useNavigate();
  const planningData = location.state;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [shareLink, setShareLink] = useState("");
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [showContentDialog, setShowContentDialog] = useState(false);

  // Função para distribuir postagens estrategicamente no mês
  const distributePostsStrategically = (postsCount: number) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = currentDate.getDate();
    
    // Calcular dias disponíveis no mês atual
    const availableDays = daysInMonth - startDay + 1;
    
    // Se temos mais posts que dias disponíveis, alguns dias terão múltiplos posts
    const postsPerDay = Math.ceil(postsCount / availableDays);
    const interval = Math.floor(availableDays / postsCount);
    
    const distributedDays = [];
    let currentDay = startDay;
    
    for (let i = 0; i < postsCount; i++) {
      // Se o intervalo for maior que 1, distribua com espaçamento
      if (interval > 1) {
        distributedDays.push(currentDay);
        currentDay += interval;
        
        // Se ultrapassar o final do mês, volte para distribuir
        if (currentDay > daysInMonth) {
          currentDay = startDay + (i % interval) + 1;
        }
      } else {
        // Para muitas postagens, distribua sequencialmente
        distributedDays.push(startDay + i);
        if (startDay + i > daysInMonth) {
          distributedDays[distributedDays.length - 1] = daysInMonth;
        }
      }
    }
    
    return distributedDays;
  };

  // Gerar dados do calendário baseado nas preferências do usuário
  const generateCalendarData = () => {
    if (!planningData) return [];
    
    const postsCount = parseInt(planningData.postsPerMonth) || 25;
    const niche = planningData.niche || "Geral";
    const contentTypes = planningData.contentTypes || ["Carrossel", "Vídeo", "Imagem com texto"];
    const platforms = planningData.platforms || ["Instagram", "TikTok"];
    const tone = planningData.communicationTone || "Educativo";
    
    // Gerar temas baseados no nicho
    const getContentByNiche = (niche: string) => {
      const themes = {
        "Saúde e bem-estar": [
          "Dicas de Alimentação Saudável",
          "Exercícios para Iniciantes",
          "Rotina de Cuidados com a Pele",
          "Meditação e Mindfulness",
          "Receitas Fit e Nutritivas",
          "Benefícios da Água",
          "Vitaminas Essenciais",
          "Sono de Qualidade"
        ],
        "Marketing digital": [
          "Estratégias de Instagram",
          "Como Criar Conteúdo Viral",
          "Métricas que Realmente Importam",
          "Ferramentas de Automação",
          "Copywriting Persuasivo",
          "SEO para Iniciantes",
          "Email Marketing",
          "Growth Hacking"
        ],
        "Culinária": [
          "Receitas Rápidas e Fáceis",
          "Técnicas de Cozimento",
          "Ingredientes Secretos",
          "Doces Sem Açúcar",
          "Pratos Vegetarianos",
          "Conservação de Alimentos",
          "Temperos Especiais",
          "Cozinha Internacional"
        ]
      };
      
      return themes[niche as keyof typeof themes] || [
        "Dicas de Produtividade",
        "Motivação Diária",
        "Crescimento Pessoal",
        "Organização e Planejamento",
        "Desenvolvimento de Hábitos",
        "Gestão do Tempo",
        "Objetivos e Metas",
        "Autoconhecimento"
      ];
    };
    
    const themes = getContentByNiche(niche);
    const generatedData = [];
    
    // Usar distribuição estratégica
    const distributedDays = distributePostsStrategically(postsCount);
    
    // Começar do mês atual
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    
    for (let i = 0; i < postsCount; i++) {
      const day = distributedDays[i] || (i % 30) + 1;
      const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      
      const themeIndex = i % themes.length;
      const contentTypeIndex = i % contentTypes.length;
      const platformIndex = i % platforms.length;
      
      generatedData.push({
        date: dateStr,
        content: {
          type: contentTypes[contentTypeIndex],
          title: themes[themeIndex],
          description: `Conteúdo ${tone.toLowerCase()} sobre ${themes[themeIndex].toLowerCase()} para ${niche.toLowerCase()}. Este post vai engajar sua audiência e agregar valor ao seu feed.`,
          platform: platforms[platformIndex],
          time: `${Math.floor(Math.random() * 12) + 8}:00`
        }
      });
    }
    
    return generatedData;
  };

  const [calendarData, setCalendarData] = useState(generateCalendarData());

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

  const handleEditContent = (content: any) => {
    setEditingContent({ ...content });
    setIsEditDialogOpen(true);
    setShowContentDialog(false);
  };

  const handleSaveEdit = () => {
    if (editingContent && selectedContent?.date) {
      const updatedData = calendarData.map(item => 
        item.date === selectedContent.date 
          ? { ...item, content: editingContent }
          : item
      );
      setCalendarData(updatedData);
      setIsEditDialogOpen(false);
      setEditingContent(null);
      setSelectedContent({ ...selectedContent, ...editingContent });
      setShowContentDialog(true); // Voltar para o dialog de visualização
      toast.success("Conteúdo atualizado com sucesso!");
    }
  };

  const handleShareCalendar = () => {
    const uniqueId = Math.random().toString(36).substr(2, 9);
    const generatedLink = `${window.location.origin}/shared-calendar/${uniqueId}`;
    setShareLink(generatedLink);
    setShowShareDialog(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copiado para a área de transferência!");
  };

  const handleEditContents = () => {
    navigate("/edit-contents", { state: { calendarData, planningData } });
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
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleEditContents}
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar Conteúdos
          </Button>
          <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
            <Download className="mr-2 h-4 w-4" />
            Baixar PDF do Planejamento
          </Button>
          <Button 
            variant="outline" 
            className="border-green-600 text-green-600 hover:bg-green-50"
            onClick={handleShareCalendar}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Compartilhar Calendário
          </Button>
        </div>

        {/* Resumo do Planejamento */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Resumo do Planejamento</CardTitle>
            <CardDescription>
              Visão geral do seu calendário de conteúdo - Posts distribuídos estrategicamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{calendarData.length}</div>
                <div className="text-sm text-gray-600">Posts no Mês</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{planningData?.contentTypes?.length || 3}</div>
                <div className="text-sm text-gray-600">Tipos de Conteúdo</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{planningData?.platforms?.length || 2}</div>
                <div className="text-sm text-gray-600">Plataformas</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{planningData?.niche || "Geral"}</div>
                <div className="text-sm text-gray-600">Nicho</div>
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
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div key={day} className="p-2 text-center font-semibold text-gray-600 bg-gray-50 rounded">
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
                    className="p-2 min-h-[100px] border rounded-lg transition-colors bg-white border-gray-200 hover:bg-gray-50"
                  >
                    <div className="font-semibold text-gray-900 mb-1">{day}</div>
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
              <DialogTitle>
                Detalhes do Conteúdo - {selectedContent?.date ? new Date(selectedContent.date + 'T00:00:00').getDate() : ''} de Junho
              </DialogTitle>
            </DialogHeader>
            {selectedContent && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-sm text-gray-700">Tipo de Conteúdo:</label>
                    <p className="text-gray-600">{selectedContent.type}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-sm text-gray-700">Plataforma:</label>
                    <p className="text-gray-600">{selectedContent.platform}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-sm text-gray-700">Horário:</label>
                    <p className="text-gray-600">{selectedContent.time}</p>
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-sm text-gray-700">Título:</label>
                  <p className="text-gray-600">{selectedContent.title}</p>
                </div>
                <div>
                  <label className="font-semibold text-sm text-gray-700">Descrição da Ideia:</label>
                  <p className="text-gray-600">{selectedContent.description}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm" 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleEditContent(selectedContent)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button size="sm" variant="outline">
                    Criar Agora
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog de Edição */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Conteúdo Individual</DialogTitle>
            </DialogHeader>
            {editingContent && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <SelectItem value="Reels">Reels</SelectItem>
                        <SelectItem value="Stories">Stories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-time">Horário de Postagem</Label>
                    <Input
                      id="edit-time"
                      value={editingContent.time}
                      onChange={(e) => setEditingContent({...editingContent, time: e.target.value})}
                      placeholder="Ex: 14:00"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-title">Título</Label>
                  <Input
                    id="edit-title"
                    value={editingContent.title}
                    onChange={(e) => setEditingContent({...editingContent, title: e.target.value})}
                  />
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

        {/* Dialog de Compartilhamento */}
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Compartilhar Calendário</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Link gerado para compartilhamento público do seu calendário:
              </p>
              <div className="flex gap-2">
                <Input value={shareLink} readOnly className="flex-1" />
                <Button onClick={handleCopyLink} size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Qualquer pessoa com este link poderá visualizar seu calendário de conteúdo.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
