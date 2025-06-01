
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Sparkles, Calendar, Target, Users, MessageSquare, Globe, Lightbulb, Clock } from "lucide-react";

export default function ContentPlanning() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    postsPerMonth: "",
    postsPerDay: "",
    niche: "",
    contentTypes: [] as string[],
    platforms: [] as string[],
    communicationTone: "",
    contentIdeas: "",
    importantDates: ""
  });

  const contentTypes = [
    "Vídeos",
    "Carrossel",
    "Imagem com texto",
    "Reels",
    "Stories",
    "Infográficos",
    "Citações",
    "Tutoriais"
  ];

  const platforms = [
    "Instagram",
    "TikTok",
    "YouTube Shorts",
    "Facebook",
    "LinkedIn",
    "Twitter",
    "Pinterest",
    "WhatsApp Status"
  ];

  const tones = [
    "Educativo",
    "Inspirador",
    "Engraçado",
    "Direto",
    "Profundo",
    "Casual",
    "Profissional",
    "Motivacional"
  ];

  const handleContentTypeChange = (type: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      contentTypes: checked 
        ? [...prev.contentTypes, type]
        : prev.contentTypes.filter(t => t !== type)
    }));
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      platforms: checked 
        ? [...prev.platforms, platform]
        : prev.platforms.filter(p => p !== platform)
    }));
  };

  const handleGeneratePlanning = () => {
    // Aqui você salvaria os dados e redirecionaria para o calendário
    navigate("/content-calendar");
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Calendar className="h-8 w-8 text-purple-600" />
            Planejamento de Conteúdo
          </h1>
          <p className="text-gray-600">
            Configure suas preferências para gerar um planejamento personalizado de conteúdo
          </p>
        </div>

        <div className="grid gap-6">
          {/* Quantidade de Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Frequência de Publicação
              </CardTitle>
              <CardDescription>
                Defina quantos posts você quer publicar
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postsPerMonth">Quantidade de postagens no mês</Label>
                <Input
                  id="postsPerMonth"
                  type="number"
                  placeholder="Ex: 30"
                  value={formData.postsPerMonth}
                  onChange={(e) => setFormData(prev => ({ ...prev, postsPerMonth: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="postsPerDay">Quantidade de postagens por dia</Label>
                <Input
                  id="postsPerDay"
                  type="number"
                  placeholder="Ex: 1"
                  value={formData.postsPerDay}
                  onChange={(e) => setFormData(prev => ({ ...prev, postsPerDay: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Nicho */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Seu Nicho
              </CardTitle>
              <CardDescription>
                Qual é o seu nicho ou área de atuação?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Ex: Saúde e bem-estar, Marketing digital, Culinária..."
                value={formData.niche}
                onChange={(e) => setFormData(prev => ({ ...prev, niche: e.target.value }))}
              />
            </CardContent>
          </Card>

          {/* Tipos de Conteúdo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Tipos de Conteúdo Preferido
              </CardTitle>
              <CardDescription>
                Selecione os formatos que você prefere criar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {contentTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={formData.contentTypes.includes(type)}
                      onCheckedChange={(checked) => handleContentTypeChange(type, checked as boolean)}
                    />
                    <Label htmlFor={type} className="text-sm">{type}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Plataformas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-600" />
                Principais Plataformas de Publicação
              </CardTitle>
              <CardDescription>
                Onde você vai publicar seu conteúdo?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {platforms.map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform}
                      checked={formData.platforms.includes(platform)}
                      onCheckedChange={(checked) => handlePlatformChange(platform, checked as boolean)}
                    />
                    <Label htmlFor={platform} className="text-sm">{platform}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tom de Comunicação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                Tom de Comunicação Desejado
              </CardTitle>
              <CardDescription>
                Como você quer se comunicar com sua audiência?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={formData.communicationTone} onValueChange={(value) => setFormData(prev => ({ ...prev, communicationTone: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tom de comunicação" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((tone) => (
                    <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Ideias de Conteúdo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-purple-600" />
                Ideias de Conteúdos que Quer Gerar
              </CardTitle>
              <CardDescription>
                Compartilhe suas ideias, tópicos ou temas específicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Ex: Dicas de produtividade, receitas saudáveis, tutoriais de marketing..."
                value={formData.contentIdeas}
                onChange={(e) => setFormData(prev => ({ ...prev, contentIdeas: e.target.value }))}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Datas Importantes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                Datas Importantes ou Eventos no Mês
              </CardTitle>
              <CardDescription>
                Mencione datas especiais, lançamentos ou eventos importantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Ex: Black Friday (29/11), Natal (25/12), lançamento do produto (15/12)..."
                value={formData.importantDates}
                onChange={(e) => setFormData(prev => ({ ...prev, importantDates: e.target.value }))}
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Botão de Gerar */}
          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleGeneratePlanning}
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              GERAR PLANEJAMENTO DE CONTEÚDO
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
