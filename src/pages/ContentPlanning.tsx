
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
import { Sparkles, Calendar, Target, Users, MessageSquare, Globe, Lightbulb, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function ContentPlanning() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    postsPerMonth: "",
    postsPerDay: "",
    niche: "",
    contentTypes: [] as string[],
    platforms: [] as string[],
    communicationTone: "",
    customTone: "",
    contentIdeas: "",
    importantDates: ""
  });

  const [showCustomTone, setShowCustomTone] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

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
    "Motivacional",
    "Outro"
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

  const handleToneChange = (value: string) => {
    setFormData(prev => ({ ...prev, communicationTone: value }));
    if (value === "Outro") {
      setShowCustomTone(true);
    } else {
      setShowCustomTone(false);
      setFormData(prev => ({ ...prev, customTone: "" }));
    }
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.postsPerMonth) {
      errors.push("Quantidade de postagens no mês");
    }

    if (!formData.niche.trim()) {
      errors.push("Nicho");
    }

    if (formData.contentTypes.length === 0) {
      errors.push("Tipo de conteúdo preferido");
    }

    if (formData.platforms.length === 0) {
      errors.push("Principais plataformas");
    }

    if (!formData.communicationTone) {
      errors.push("Tom de comunicação");
    }

    if (formData.communicationTone === "Outro" && !formData.customTone.trim()) {
      errors.push("Tom de comunicação personalizado");
    }

    return errors;
  };

  const handleGeneratePlanning = () => {
    const errors = validateForm();
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      toast.error("Campos obrigatórios não preenchidos", {
        description: "Por favor, preencha todas as informações obrigatórias para continuar."
      });
      return;
    }

    setValidationErrors([]);

    // Preparar dados finais com tom customizado se necessário
    const finalData = {
      ...formData,
      communicationTone: formData.communicationTone === "Outro" ? formData.customTone : formData.communicationTone
    };

    // Passar dados para o calendário
    navigate("/content-calendar", { state: finalData });
  };

  // Determinar se o campo de posts por dia deve ser exibido
  const shouldShowDailyPosts = parseInt(formData.postsPerMonth) >= 30;

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

        {validationErrors.length > 0 && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800 mb-2">Campos obrigatórios não preenchidos:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6">
          {/* Quantidade de Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Frequência de Publicação *
              </CardTitle>
              <CardDescription>
                Defina quantos posts você quer publicar
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postsPerMonth">Quantidade de postagens no mês *</Label>
                <Input
                  id="postsPerMonth"
                  type="number"
                  placeholder="Ex: 30"
                  value={formData.postsPerMonth}
                  onChange={(e) => setFormData(prev => ({ ...prev, postsPerMonth: e.target.value }))}
                  className={validationErrors.includes("Quantidade de postagens no mês") ? "border-red-500" : ""}
                />
              </div>
              {shouldShowDailyPosts && (
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
              )}
            </CardContent>
          </Card>

          {/* Nicho */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Seu Nicho *
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
                className={validationErrors.includes("Nicho") ? "border-red-500" : ""}
              />
            </CardContent>
          </Card>

          {/* Tipos de Conteúdo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Tipos de Conteúdo Preferido *
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
              {validationErrors.includes("Tipo de conteúdo preferido") && (
                <p className="text-sm text-red-600 mt-2">Selecione pelo menos um tipo de conteúdo</p>
              )}
            </CardContent>
          </Card>

          {/* Plataformas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-600" />
                Principais Plataformas de Publicação *
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
              {validationErrors.includes("Principais plataformas") && (
                <p className="text-sm text-red-600 mt-2">Selecione pelo menos uma plataforma</p>
              )}
            </CardContent>
          </Card>

          {/* Tom de Comunicação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                Tom de Comunicação Desejado *
              </CardTitle>
              <CardDescription>
                Como você quer se comunicar com sua audiência?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={formData.communicationTone} onValueChange={handleToneChange}>
                <SelectTrigger className={validationErrors.includes("Tom de comunicação") ? "border-red-500" : ""}>
                  <SelectValue placeholder="Selecione o tom de comunicação" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((tone) => (
                    <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {showCustomTone && (
                <div>
                  <Label htmlFor="customTone">Digite seu tom de comunicação personalizado *</Label>
                  <Input
                    id="customTone"
                    placeholder="Ex: Descontraído e amigável"
                    value={formData.customTone}
                    onChange={(e) => setFormData(prev => ({ ...prev, customTone: e.target.value }))}
                    className={validationErrors.includes("Tom de comunicação personalizado") ? "border-red-500" : ""}
                  />
                </div>
              )}
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
