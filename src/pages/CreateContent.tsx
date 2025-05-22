
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, Video, FileText, Loader2, CheckCircle2, Film, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { VisualEditor } from "@/components/VisualEditor";
import { toast } from "sonner";
import { generateContent, AIContentGeneratorParams } from "@/services/aiService";

export type ContentGenerationData = {
  title?: string;
  slides?: string[];
  script?: string;
  caption?: string;
  hashtags?: string[];
};

export default function CreateContent() {
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState<AIContentGeneratorParams["contentType"]>("carrossel");
  const [carouselType, setCarouselType] = useState("multi");
  const [currentStep, setCurrentStep] = useState<"generate" | "edit">("generate");
  const [generatedContent, setGeneratedContent] = useState<ContentGenerationData | null>(null);
  const [artStyle, setArtStyle] = useState("minimalista");
  
  // Form inputs
  const [niche, setNiche] = useState("");
  const [style, setStyle] = useState("educativo");
  const [target, setTarget] = useState("");
  const [topic, setTopic] = useState("");
  const [slideCount, setSlideCount] = useState("5");
  const [videoDuration, setVideoDuration] = useState("30");
  const [captionLength, setCaptionLength] = useState("medium");
  
  // Upload states
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Configurar parâmetros para a API
      const params: AIContentGeneratorParams = {
        contentType,
        niche,
        style,
        target,
        topic
      };
      
      // Adicionar parâmetros específicos do tipo de conteúdo
      if (contentType === "carrossel") {
        params.carouselType = carouselType as any;
        params.slides = parseInt(slideCount);
      } else if (contentType === "video") {
        params.duration = parseInt(videoDuration);
      } else if (contentType === "legenda") {
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

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedVideo(file);
      toast.success("Vídeo carregado", {
        description: "Seu vídeo foi carregado e está pronto para processamento."
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {currentStep === "generate" 
              ? "Criar Novo Conteúdo em Segundos" 
              : "Personalizar Conteúdo"}
          </h1>
          
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
                    <div className="space-y-2">
                      <Label htmlFor="niche">Nicho</Label>
                      <Input 
                        id="niche" 
                        placeholder="Ex: Psicologia, Marketing, Finanças, Moda..." 
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                      />
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
                    
                    <div className="space-y-2">
                      <Label>Tipo de Conteúdo</Label>
                      <Tabs defaultValue="carrossel" onValueChange={(v) => setContentType(v as AIContentGeneratorParams["contentType"])} className="w-full">
                        <TabsList className="grid grid-cols-4">
                          <TabsTrigger value="carrossel" className="flex items-center gap-2">
                            <Image className="h-4 w-4" />
                            Carrossel
                          </TabsTrigger>
                          <TabsTrigger value="video" className="flex items-center gap-2">
                            <Video className="h-4 w-4" />
                            Roteiro para Vídeo
                          </TabsTrigger>
                          <TabsTrigger value="legenda" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Legenda
                          </TabsTrigger>
                          <TabsTrigger value="reels" className="flex items-center gap-2">
                            <Film className="h-4 w-4" />
                            Reels/Shorts
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="carrossel" className="pt-4">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="carouselType">Tipo de Publicação</Label>
                              <Select defaultValue="multi" onValueChange={setCarouselType}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="multi">Carrossel (Múltiplos Slides)</SelectItem>
                                  <SelectItem value="single">Post Único</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {carouselType === "multi" && (
                              <div className="space-y-2">
                                <Label htmlFor="slides">Quantidade de Slides</Label>
                                <Select defaultValue="5" onValueChange={setSlideCount}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione a quantidade" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="3">3 slides</SelectItem>
                                    <SelectItem value="5">5 slides</SelectItem>
                                    <SelectItem value="7">7 slides</SelectItem>
                                    <SelectItem value="10">10 slides</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                            
                            <div className="space-y-2">
                              <Label htmlFor="artStyle">Estilo Visual</Label>
                              <Select defaultValue="minimalista" onValueChange={setArtStyle}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o estilo visual" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="minimalista">Minimalista</SelectItem>
                                  <SelectItem value="tumblr">Tumblr</SelectItem>
                                  <SelectItem value="informal">Informal</SelectItem>
                                  <SelectItem value="corporativo">Corporativo</SelectItem>
                                  <SelectItem value="moderno">Moderno e Colorido</SelectItem>
                                  <SelectItem value="elegante">Elegante</SelectItem>
                                  <SelectItem value="retro">Retrô</SelectItem>
                                  <SelectItem value="custom">Criar do Zero</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="video" className="pt-4">
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
                            <div className="space-y-2">
                              <Label htmlFor="scriptType">Tipo de Roteiro</Label>
                              <Textarea 
                                id="scriptType" 
                                placeholder="Descreva o tipo de roteiro que você deseja. Ex: Um roteiro informativo sobre os benefícios da meditação"
                                className="min-h-[80px]"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                              />
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="legenda" className="pt-4">
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
                        </TabsContent>
                        
                        <TabsContent value="reels" className="pt-4">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="videoUpload">Upload de Vídeo</Label>
                              <Input 
                                id="videoUpload" 
                                type="file" 
                                accept="video/*" 
                                onChange={handleVideoUpload}
                              />
                              {uploadedVideo && (
                                <p className="text-sm text-green-600 mt-1">
                                  ✓ Vídeo selecionado: {uploadedVideo.name}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="videoUrl">Ou URL do Vídeo</Label>
                              <Input 
                                id="videoUrl" 
                                placeholder="Cole o link do vídeo aqui..." 
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="reelsDescription">Descrição do Conteúdo</Label>
                              <Textarea 
                                id="reelsDescription" 
                                placeholder="O que você deseja mostrar neste Reels/Short?"
                                className="min-h-[80px]"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                              />
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                    
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
                        'Gerar Conteúdo com IA'
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
                contentType={contentType}
                artStyle={artStyle} 
                carouselType={carouselType} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
