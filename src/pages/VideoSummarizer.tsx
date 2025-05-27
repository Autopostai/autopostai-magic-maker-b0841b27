
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Youtube, Loader2, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

export default function VideoSummarizer() {
  const [loading, setLoading] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [startTime, setStartTime] = useState([0]);
  const [endTime, setEndTime] = useState([30]);
  const [outputFormat, setOutputFormat] = useState("carrossel");
  const [videoDuration, setVideoDuration] = useState(120); // duração simulada em segundos
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedVideo(file);
      toast.success("Vídeo carregado com sucesso!");
    }
  };

  const handleYoutubeSubmit = () => {
    if (!youtubeUrl) {
      toast.error("Por favor, insira um link do YouTube válido");
      return;
    }
    
    // Simular carregamento do vídeo do YouTube
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVideoDuration(300); // 5 minutos simulados
      toast.success("Vídeo do YouTube carregado!");
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSummarize = async () => {
    if (!youtubeUrl && !uploadedVideo) {
      toast.error("Por favor, adicione um vídeo primeiro");
      return;
    }

    setLoading(true);
    
    try {
      // Simular processamento do resumo
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success("Resumo gerado com sucesso!", {
        description: "Seu conteúdo foi criado e está pronto para edição."
      });
      
      // Aqui redirecionaria para o editor com o conteúdo gerado
    } catch (error) {
      toast.error("Erro ao processar vídeo", {
        description: "Tente novamente com outro vídeo."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
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

        <Tabs defaultValue="youtube" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="youtube" className="flex items-center gap-2">
              <Youtube className="h-4 w-4" />
              YouTube
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="youtube" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vídeo do YouTube</CardTitle>
                <CardDescription>
                  Cole o link do YouTube e selecione o trecho que deseja resumir
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="youtube-url">Link do YouTube</Label>
                  <div className="flex gap-2">
                    <Input
                      id="youtube-url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                    />
                    <Button onClick={handleYoutubeSubmit} disabled={loading}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Carregar"}
                    </Button>
                  </div>
                </div>

                {youtubeUrl && !loading && (
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
                        <Youtube className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Selecionar Trecho</Label>
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

        {/* Configurações de Output */}
        <Card>
          <CardHeader>
            <CardTitle>Formato de Saída</CardTitle>
            <CardDescription>
              Escolha como você quer que o conteúdo seja gerado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Conteúdo</Label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="post">Post Único</SelectItem>
                  <SelectItem value="carrossel">Carrossel</SelectItem>
                  <SelectItem value="reels">Reels/Shorts Editado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleSummarize}
              size="lg"
              className="w-full"
              disabled={loading || (!youtubeUrl && !uploadedVideo)}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando Vídeo...
                </>
              ) : (
                "Gerar Resumo com IA"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
