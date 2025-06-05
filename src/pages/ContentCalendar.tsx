
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, Edit, Clock, Download, Share2, FileText, Save, Plus } from "lucide-react";
import { toast } from "sonner";

interface ContentItem {
  id: string;
  title: string;
  platform: string;
  contentType: string;
  description: string;
  date: string;
  time: string;
  day: number;
}

interface FormData {
  postsPerMonth: string;
  niche: string;
  contentTypes: string[];
  platforms: string[];
  communicationTone: string;
  contentIdeas: string;
  importantDates: string;
}

export default function ContentCalendar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData] = useState<FormData>(location.state);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showListEdit, setShowListEdit] = useState(false);

  useEffect(() => {
    if (!formData) {
      navigate("/content-planning");
      return;
    }
    generateContent();
  }, [formData, navigate]);

  const generateContent = () => {
    const postsCount = parseInt(formData.postsPerMonth);
    const items: ContentItem[] = [];
    
    const contentThemes = generateThemesByNiche(formData.niche);
    
    for (let i = 0; i < postsCount; i++) {
      const day = Math.floor((i * 30) / postsCount) + 1;
      const platform = formData.platforms[i % formData.platforms.length];
      const contentType = formData.contentTypes[i % formData.contentTypes.length];
      const theme = contentThemes[i % contentThemes.length];
      
      items.push({
        id: `content-${i + 1}`,
        title: theme.title,
        platform,
        contentType,
        description: theme.description,
        date: `2024-12-${day.toString().padStart(2, '0')}`,
        time: getRandomTime(),
        day
      });
    }
    
    setContentItems(items.sort((a, b) => a.day - b.day));
  };

  const generateThemesByNiche = (niche: string) => {
    const themes: { title: string; description: string }[] = [];
    
    if (niche.toLowerCase().includes('saúde') || niche.toLowerCase().includes('bem-estar')) {
      themes.push(
        { title: "5 Dicas para Melhorar o Sono", description: "Compartilhe técnicas de higiene do sono e rotinas noturnas" },
        { title: "Benefícios da Meditação", description: "Explique como a meditação pode transformar a saúde mental" },
        { title: "Alimentação Saudável", description: "Dicas práticas para uma dieta equilibrada" },
        { title: "Exercícios em Casa", description: "Rotina de treinos que pode ser feita em casa" },
        { title: "Importância da Hidratação", description: "Como a água impacta nossa saúde diária" }
      );
    } else if (niche.toLowerCase().includes('marketing') || niche.toLowerCase().includes('digital')) {
      themes.push(
        { title: "Estratégias de Instagram", description: "Como crescer organicamente no Instagram" },
        { title: "Copywriting Persuasivo", description: "Técnicas para escrever textos que vendem" },
        { title: "SEO para Iniciantes", description: "Conceitos básicos de otimização para buscadores" },
        { title: "E-mail Marketing", description: "Como criar campanhas de e-mail eficazes" },
        { title: "Análise de Métricas", description: "Principais KPIs para acompanhar no marketing digital" }
      );
    } else {
      themes.push(
        { title: `Dicas de ${niche}`, description: `Compartilhe conhecimentos valiosos sobre ${niche}` },
        { title: `Erros Comuns em ${niche}`, description: `Principais erros que iniciantes cometem` },
        { title: `Ferramentas para ${niche}`, description: `Melhores ferramentas e recursos da área` },
        { title: `Tendências em ${niche}`, description: `O que está em alta no mercado` },
        { title: `Casos de Sucesso`, description: `Exemplos inspiradores na área de ${niche}` }
      );
    }
    
    return themes;
  };

  const getRandomTime = () => {
    const hours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
    return hours[Math.floor(Math.random() * hours.length)];
  };

  const handleEditItem = (item: ContentItem) => {
    setEditingItem({ ...item });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    
    setContentItems(prev => 
      prev.map(item => 
        item.id === editingItem.id ? editingItem : item
      )
    );
    
    setShowEditDialog(false);
    setEditingItem(null);
    toast.success("Conteúdo atualizado com sucesso!");
  };

  const handleCreateNow = (item: ContentItem) => {
    navigate("/create/method", { 
      state: { 
        contentType: item.contentType,
        platform: item.platform,
        title: item.title,
        description: item.description
      } 
    });
  };

  const handleShareCalendar = () => {
    const url = `${window.location.origin}/shared-calendar/${Date.now()}`;
    navigator.clipboard.writeText(url);
    toast.success("Link do calendário copiado para a área de transferência!");
  };

  const handleDownloadPDF = () => {
    toast.success("PDF do planejamento será baixado em breve!");
  };

  if (!formData) {
    return null;
  }

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => navigate("/content-planning")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Calendar className="h-8 w-8 text-purple-600" />
              Calendário de Conteúdo
            </h1>
            <p className="text-gray-600">
              {contentItems.length} conteúdos planejados para {formData.niche}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <Button onClick={() => setShowListEdit(true)} variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Editar Conteúdos
          </Button>
          <Button onClick={handleDownloadPDF} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Baixar PDF do Planejamento
          </Button>
          <Button onClick={handleShareCalendar} variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar Calendário
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day} className="p-2 text-center font-medium text-gray-500 border-b">
              {day}
            </div>
          ))}
          
          {daysInMonth.map(day => {
            const dayContent = contentItems.filter(item => item.day === day);
            
            return (
              <div key={day} className="min-h-[120px] p-2 border border-gray-200 rounded-lg">
                <div className="font-medium text-sm text-gray-600 mb-2">{day}</div>
                
                {dayContent.map(item => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <div className="bg-purple-100 text-purple-800 p-2 rounded text-xs mb-1 cursor-pointer hover:bg-purple-200 transition-colors">
                        <div className="font-medium truncate">{item.title}</div>
                        <div className="text-purple-600">{item.time}</div>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {item.platform}
                        </Badge>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{item.title}</DialogTitle>
                        <DialogDescription>
                          {item.date} às {item.time}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <strong>Plataforma:</strong> {item.platform}
                        </div>
                        <div>
                          <strong>Tipo de Conteúdo:</strong> {item.contentType}
                        </div>
                        <div>
                          <strong>Descrição:</strong> {item.description}
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => handleEditItem(item)} variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                          <Button onClick={() => handleCreateNow(item)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Criar Agora
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            );
          })}
        </div>

        {/* Dialog de Edição Individual */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Conteúdo</DialogTitle>
            </DialogHeader>
            {editingItem && (
              <div className="space-y-4">
                <div>
                  <Label>Título</Label>
                  <Input
                    value={editingItem.title}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, title: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label>Plataforma</Label>
                  <Select value={editingItem.platform} onValueChange={(value) => setEditingItem(prev => prev ? { ...prev, platform: value } : null)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.platforms.map(platform => (
                        <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tipo de Conteúdo</Label>
                  <Select value={editingItem.contentType} onValueChange={(value) => setEditingItem(prev => prev ? { ...prev, contentType: value } : null)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.contentTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Textarea
                    value={editingItem.description}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, description: e.target.value } : null)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Data</Label>
                    <Input
                      type="date"
                      value={editingItem.date}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, date: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label>Horário</Label>
                    <Input
                      type="time"
                      value={editingItem.time}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, time: e.target.value } : null)}
                    />
                  </div>
                </div>
                <Button onClick={handleSaveEdit} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog de Edição em Lista */}
        <Dialog open={showListEdit} onOpenChange={setShowListEdit}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Todos os Conteúdos</DialogTitle>
              <DialogDescription>
                Edite todos os conteúdos do mês em formato de lista
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {contentItems.map((item, index) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">Conteúdo {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Título</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => {
                            const newItems = [...contentItems];
                            newItems[index].title = e.target.value;
                            setContentItems(newItems);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Plataforma</Label>
                        <Select 
                          value={item.platform} 
                          onValueChange={(value) => {
                            const newItems = [...contentItems];
                            newItems[index].platform = value;
                            setContentItems(newItems);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {formData.platforms.map(platform => (
                              <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Data</Label>
                        <Input
                          type="date"
                          value={item.date}
                          onChange={(e) => {
                            const newItems = [...contentItems];
                            newItems[index].date = e.target.value;
                            setContentItems(newItems);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Horário</Label>
                        <Input
                          type="time"
                          value={item.time}
                          onChange={(e) => {
                            const newItems = [...contentItems];
                            newItems[index].time = e.target.value;
                            setContentItems(newItems);
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Descrição</Label>
                      <Textarea
                        value={item.description}
                        onChange={(e) => {
                          const newItems = [...contentItems];
                          newItems[index].description = e.target.value;
                          setContentItems(newItems);
                        }}
                      />
                    </div>
                    <Button onClick={() => handleCreateNow(item)} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Agora
                    </Button>
                  </CardContent>
                </Card>
              ))}
              <Button onClick={() => setShowListEdit(false)} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Todas as Alterações
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
