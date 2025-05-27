
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Globe, Loader2, Play, Pause, FileText, Image, Film, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

export default function VideoSummarizer() {
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [startTime, setStartTime] = useState([0]);
  const [endTime, setEndTime] = useState([30]);
  const [outputFormat, setOutputFormat] = useState("carrossel");
  const [videoDuration, setVideoDuration] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [summary, setSummary] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [showContentOptions, setShowContentOptions] = useState(false);
  const navigate = useNavigate();

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedVideo(file);
      toast.success("Vídeo carregado com sucesso!");
    }
  };

  const handleUrlSubmit = () => {
    if (!videoUrl) {
      toast.error("Por favor, insira um link de vídeo válido");
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVideoDuration(300);
      toast.success("Vídeo carregado!");
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGenerateSummary = async () => {
    if (!videoUrl && !uploadedVideo) {
      toast.error("Por favor, adicione um vídeo primeiro");
      return;
    }

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockSummary = `Resumo do vídeo (${formatTime(startTime[0])} - ${formatTime(endTime[0])}):

Este vídeo aborda conceitos fundamentais sobre produtividade e gestão de tempo. Os principais pontos discutidos incluem:

1. **Técnica Pomodoro**: Método de trabalho em blocos de 25 minutos com pausas de 5 minutos
2. **Priorização de tarefas**: Como identificar e focar nas atividades mais importantes
3. **Eliminação de distrações**: Estratégias para manter o foco durante o trabalho
4. **Planejamento semanal**: Importância de organizar as tarefas com antecedência
5. **Avaliação de resultados**: Como medir e melhorar a produtividade ao longo do tempo

O vídeo apresenta exemplos práticos e ferramentas que podem ser implementadas imediatamente para melhorar a eficiência no trabalho e nos estudos.`;

      setSummary(mockSummary);
      setShowSummary(true);
      
      toast.success("Resumo gerado com sucesso!");
    } catch (error) {
      toast.error("Erro ao processar vídeo");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateContent = (contentType: string) => {
    setShowContentOptions(false);
    
    // Navegar para a página de criação apropriada com o resumo como contexto
    const queryParams = new URLSearchParams({
      source: 'video-summary',
      summary: summary,
      contentType: contentType
    });
    
    if (contentType === 'post' || contentType === 'carrossel') {
      navigate(`/create/method?${queryParams.toString()}`);
    } else {
      navigate(`/create/content?${queryParams.toString()}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Resumir Vídeo com IA</h1>
            <p className="text-gray-600">
              Transforme qualquer vídeo em conteúdo para suas redes sociais
            </p>
          </div>
        </div>

        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              URL do Vídeo
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="url" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>URL do Vídeo</CardTitle>
                <CardDescription>
                  Cole o link do YouTube, TikTok, Instagram ou outra plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="video-url">Link do Vídeo</Label>
                  <div className="flex gap-2">
                    <Input
                      id="video-url"
                      placeholder="https://www.youtube.com/watch?v=... ou https://www.tiktok.com/..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                    />
                    <Button onClick={handleUrlSubmit} disabled={loading}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Carregar"}
                    </Button>
                  </div>
                </div>

                {videoUrl && !loading && (
                  <div className="space-y-4 mt-6">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Prévia do Vídeo</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                      </div>
                      <div className="h-48 bg-gray-200 rounded flex items-center justify-center">
                        <Globe className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Selecionar Trecho (opcional)</Label>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Início: {formatTime(startTime[0])}</span>
                            <span>Fim: {formatTime(endTime[0])}</span>
                          </div>
                          <div className="space-y-2">
                            <Slider
                              value={startTime}
                              onValueChange={setStartTime}
                              max={videoDuration}
                              step={1}
                              className="w-full"
                            />
                            <Slider
                              value={endTime}
                              onValueChange={setEndTime}
                              max={videoDuration}
                              step={1}
                              className="w-full"
                            />
                          </div>
                          <div className="text-xs text-gray-500 text-center">
                            Duração selecionada: {formatTime(endTime[0] - startTime[0])}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload de Vídeo</CardTitle>
                <CardDescription>
                  Faça upload de um vídeo da sua galeria
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="video-upload">Escolher Vídeo</Label>
                  <Input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                  />
                  {uploadedVideo && (
                    <p className="text-sm text-green-600">
                      ✓ Vídeo selecionado: {uploadedVideo.name}
                    </p>
                  )}
                </div>

                {uploadedVideo && (
                  <div className="space-y-4 mt-6">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Vídeo Carregado</span>
                      </div>
                      <div className="h-48 bg-gray-200 rounded flex items-center justify-center">
                        <Upload className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Selecionar Trecho (opcional)</Label>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Início: {formatTime(startTime[0])}</span>
                            <span>Fim: {formatTime(endTime[0])}</span>
                          </div>
                          <div className="space-y-2">
                            <Slider
                              value={startTime}
                              onValueChange={setStartTime}
                              max={videoDuration}
                              step={1}
                              className="w-full"
                            />
                            <Slider
                              value={endTime}
                              onValueChange={setEndTime}
                              max={videoDuration}
                              step={1}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Gerar Resumo */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo em Texto</CardTitle>
            <CardDescription>
              Gere um resumo em texto do vídeo antes de criar conteúdo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleGenerateSummary}
              size="lg"
              className="w-full"
              disabled={loading || (!videoUrl && !uploadedVideo)}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando Resumo...
                </>
              ) : (
                "Gerar Resumo em Texto"
              )}
            </Button>

            {showSummary && (
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Resumo Gerado:</Label>
                  <Textarea 
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="min-h-[200px] bg-white"
                    placeholder="O resumo aparecerá aqui..."
                  />
                </div>

                <Button 
                  onClick={() => setShowContentOptions(true)}
                  size="lg"
                  className="w-full"
                >
                  Criar Conteúdo a partir do Resumo
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Opções de Criação de Conteúdo */}
        {showContentOptions && (
          <Card>
            <CardHeader>
              <CardTitle>Criar Conteúdo para Redes Sociais</CardTitle>
              <CardDescription>
                Escolha o tipo de conteúdo que deseja criar com base no resumo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => handleCreateContent('legenda')}
                >
                  <MessageSquare className="h-8 w-8 text-green-600" />
                  <span className="font-medium">Criar Legenda</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => handleCreateContent('post')}
                >
                  <Image className="h-8 w-8 text-blue-600" />
                  <span className="font-medium">Post Único</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => handleCreateContent('carrossel')}
                >
                  <FileText className="h-8 w-8 text-purple-600" />
                  <span className="font-medium">Carrossel</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => handleCreateContent('video')}
                >
                  <MessageSquare className="h-8 w-8 text-orange-600" />
                  <span className="font-medium">Roteiro de Vídeo</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => handleCreateContent('reels')}
                >
                  <Film className="h-8 w-8 text-red-600" />
                  <span className="font-medium">Reels/Short</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
