
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { VisualEditor } from "@/components/VisualEditor";
import { toast } from "sonner";
import { generateContent, AIContentGeneratorParams } from "@/services/aiService";
import { useNavigate, useSearchParams } from "react-router-dom";

export type ContentGenerationData = {
  title?: string;
  slides?: string[];
  script?: string;
  caption?: string;
  hashtags?: string[];
};

export default function CreateContent() {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState<"generate" | "edit">("generate");
  const [generatedContent, setGeneratedContent] = useState<ContentGenerationData | null>(null);
  const navigate = useNavigate();
  
  // Get content type from URL params
  const contentTypeFromUrl = searchParams.get('type') || 'carrossel';
  const methodFromUrl = searchParams.get('method') || 'ai';
  
  // Form inputs
  const [niche, setNiche] = useState(searchParams.get('niche') || "");
  const [style, setStyle] = useState(searchParams.get('style') || "educativo");
  const [target, setTarget] = useState(searchParams.get('target') || "");
  const [topic, setTopic] = useState(searchParams.get('topic') || "");
  const [slideCount, setSlideCount] = useState(searchParams.get('slideCount') || "5");
  const [videoDuration, setVideoDuration] = useState(searchParams.get('videoDuration') || "30");
  const [captionLength, setCaptionLength] = useState(searchParams.get('captionLength') || "medium");
  const [carouselType, setCarouselType] = useState(searchParams.get('carouselType') || "multi");
  const [artStyle, setArtStyle] = useState(searchParams.get('artStyle') || "educativo");
  const [language, setLanguage] = useState("pt");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Configurar parâmetros para a API
      const params: AIContentGeneratorParams = {
        contentType: contentTypeFromUrl as any,
        niche,
        style,
        target,
        topic
      };
      
      // Adicionar parâmetros específicos do tipo de conteúdo
      if (contentTypeFromUrl === "carrossel") {
        params.carouselType = carouselType as any;
        params.slides = parseInt(slideCount);
      } else if (contentTypeFromUrl === "video") {
        params.duration = parseInt(videoDuration);
      } else if (contentTypeFromUrl === "legenda") {
        params.length = captionLength as any;
      }
      
      // Chamar API para gerar conteúdo
      const content = await generateContent(params);
      
      // Atualizar estado com o conteúdo gerado
      setGeneratedContent(content);
      setCurrentStep("edit");
      
      toast.success("Conteúdo gerado com sucesso!", {
        description: "Use o editor visual para personalizar seu conteúdo antes de exportar.",
      });
    } catch (error) {
      console.error("Erro ao gerar conteúdo:", error);
      toast.error("Erro na geração de conteúdo", {
        description: "Ocorreu um problema ao gerar seu conteúdo. Tente novamente."
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleBackToGenerate = () => {
    setCurrentStep("generate");
  };

  const getContentTypeTitle = (type: string) => {
    const titles: Record<string, string> = {
      'carrossel': 'Carrossel',
      'post': 'Post Único',
      'video': 'Roteiro para Vídeo',
      'reels': 'Reels/Shorts',
      'legenda': 'Legenda'
    };
    return titles[type] || type;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {currentStep === "generate" 
                ? `Criar ${getContentTypeTitle(contentTypeFromUrl)} com IA` 
                : "Personalizar Conteúdo"}
            </h1>
            <p className="text-gray-600">
              {currentStep === "generate" 
                ? "Defina os parâmetros para que a IA gere seu conteúdo personalizado"
                : "Use o editor para personalizar seu conteúdo antes de exportar"}
            </p>
          </div>
        </div>
        
        {currentStep === "generate" ? (
          <Card>
            <CardHeader>
              <CardTitle>Definir Parâmetros</CardTitle>
              <CardDescription>
                Preencha as informações abaixo para gerar seu conteúdo em menos de 30 segundos
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma do Conteúdo</Label>
                      <Select 
                        defaultValue={language} 
                        onValueChange={setLanguage}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt">Português</SelectItem>
                          <SelectItem value="en">Inglês</SelectItem>
                          <SelectItem value="es">Espanhol</SelectItem>
                          <SelectItem value="fr">Francês</SelectItem>
                          <SelectItem value="de">Alemão</SelectItem>
                          <SelectItem value="it">Italiano</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="niche">Nicho</Label>
                      <Input 
                        id="niche" 
                        placeholder="Ex: Psicologia, Marketing, Finanças, Moda..." 
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="style">Estilo de Escrita</Label>
                      <Select 
                        defaultValue={style} 
                        onValueChange={setStyle}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estilo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="educativo">Educativo</SelectItem>
                          <SelectItem value="persuasivo">Persuasivo</SelectItem>
                          <SelectItem value="informal">Informal</SelectItem>
                          <SelectItem value="divertido">Divertido</SelectItem>
                          <SelectItem value="emocional">Profundo e Emocional</SelectItem>
                          <SelectItem value="vendas">Vendas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="target">Público-alvo</Label>
                      <Input 
                        id="target" 
                        placeholder="Ex: Mulheres 25-35 anos, Empreendedores..." 
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Configurações específicas por tipo de conteúdo */}
                  {contentTypeFromUrl === "carrossel" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Formato da Publicação</Label>
                        <RadioGroup defaultValue="multi" onValueChange={setCarouselType}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="multi" id="multi" />
                            <Label htmlFor="multi">Carrossel (múltiplas imagens com sequência)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="single" id="single" />
                            <Label htmlFor="single">Post de Imagem Única</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {carouselType === "multi" && (
                        <div className="space-y-2">
                          <Label htmlFor="slides">Quantidade de Slides</Label>
                          <Select defaultValue="5" onValueChange={setSlideCount}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a quantidade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2">2 slides</SelectItem>
                              <SelectItem value="3">3 slides</SelectItem>
                              <SelectItem value="4">4 slides</SelectItem>
                              <SelectItem value="5">5 slides</SelectItem>
                              <SelectItem value="6">6 slides</SelectItem>
                              <SelectItem value="7">7 slides</SelectItem>
                              <SelectItem value="8">8 slides</SelectItem>
                              <SelectItem value="9">9 slides</SelectItem>
                              <SelectItem value="10">10 slides</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="artStyle">Estilo Visual</Label>
                        <Select defaultValue="educativo" onValueChange={setArtStyle}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o estilo visual" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">TODOS OS EFEITOS VISUAIS</SelectItem>
                            <SelectItem value="educativo">Estilo Educativo</SelectItem>
                            <SelectItem value="medico">Estilo Médico/Científico</SelectItem>
                            <SelectItem value="empreendedor">Estilo Empreendedor</SelectItem>
                            <SelectItem value="estetico">Estilo Estético/Beleza</SelectItem>
                            <SelectItem value="divertido-pop">Estilo Divertido/Pop</SelectItem>
                            <SelectItem value="espiritual">Estilo Espiritual/Holístico</SelectItem>
                            <SelectItem value="luxo">Estilo Luxo</SelectItem>
                            <SelectItem value="podcast">Estilo Podcast/Youtube</SelectItem>
                            <SelectItem value="feminino">Estilo Feminino Suave</SelectItem>
                            <SelectItem value="masculino">Estilo Masculino Sólido</SelectItem>
                            <SelectItem value="religioso">Estilo Religioso/Inspiracional</SelectItem>
                            <SelectItem value="jornalistico">Estilo "Notícia" ou Jornalístico</SelectItem>
                            <SelectItem value="minimalista">Estilo Minimalista</SelectItem>
                            <SelectItem value="informal-design">Estilo Informal</SelectItem>
                            <SelectItem value="corporativo">Estilo Corporativo</SelectItem>
                            <SelectItem value="elegante">Estilo Elegante</SelectItem>
                            <SelectItem value="moderno">Estilo Moderno e Elegante</SelectItem>
                            <SelectItem value="retro">Estilo Retrô</SelectItem>
                            <SelectItem value="gamer">Estilo Gamer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {contentTypeFromUrl === "video" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duração do Vídeo</Label>
                        <Select defaultValue="30" onValueChange={setVideoDuration}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a duração" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 segundos</SelectItem>
                            <SelectItem value="30">30 segundos</SelectItem>
                            <SelectItem value="60">60 segundos</SelectItem>
                            <SelectItem value="90">90 segundos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {contentTypeFromUrl === "legenda" && (
                    <div className="space-y-2">
                      <Label htmlFor="length">Tamanho da Legenda</Label>
                      <Select defaultValue="medium" onValueChange={setCaptionLength}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tamanho" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Curta</SelectItem>
                          <SelectItem value="medium">Média</SelectItem>
                          <SelectItem value="long">Longa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="topic">Tópico Específico (opcional)</Label>
                    <Textarea 
                      id="topic" 
                      placeholder="Descreva um tópico específico ou deixe em branco para a IA sugerir"
                      className="min-h-[100px]"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button type="submit" size="lg" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Gerando Conteúdo...
                      </>
                    ) : (
                      "Gerar Conteúdo com IA"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-center border-t pt-6">
              <div className="space-y-3 text-center">
                <p className="text-sm text-gray-500">
                  Lembrete: Você tem 27 gerações restantes no seu plano Creator.
                </p>
                <div className="flex items-center justify-center gap-8 text-sm">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span>Legendas automáticas</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span>Roteiros otimizados</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span>Hashtags sugeridas</span>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={handleBackToGenerate}>
                Voltar para Geração
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Conteúdo Gerado
                </span>
              </div>
            </div>
            
            <VisualEditor 
              content={generatedContent} 
              contentType={contentTypeFromUrl as any}
              artStyle={artStyle} 
              carouselType={carouselType} 
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
