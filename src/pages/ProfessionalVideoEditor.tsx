
import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, Pause, Upload, Save, Download, Undo, Redo, Menu, Share,
  Scissors, Type, Volume2, ZoomIn, ZoomOut, Grid, Mic, Video,
  Image, Music, Sparkles, Filter, Zap, RotateCcw, Palette
} from "lucide-react";
import { toast } from "sonner";

interface VideoElement {
  id: string;
  type: 'video' | 'audio' | 'text' | 'image' | 'effect';
  startTime: number;
  duration: number;
  track: number;
  content?: string;
  style?: any;
  selected?: boolean;
}

export default function ProfessionalVideoEditor() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [elements, setElements] = useState<VideoElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<VideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [resolution, setResolution] = useState('1080p');
  const [aspectRatio, setaspectRatio] = useState('9:16');

  const resolutionOptions = ['720p', '1080p', '2K', '4K'];
  const aspectRatioOptions = [
    { label: 'TikTok/Reels (9:16)', value: '9:16' },
    { label: 'Instagram Feed (1:1)', value: '1:1' },
    { label: 'YouTube (16:9)', value: '16:9' },
    { label: 'Instagram Post (4:5)', value: '4:5' }
  ];

  const visualEffects = [
    'Glitch', 'Blur', 'VHS', 'Zoom', 'TV Noise', 'Flash', 
    'Light Rays', 'Gradient', 'Smoke', 'Fire', 'Particles'
  ];

  const transitions = [
    'Fade', 'Slide', 'Zoom In/Out', 'Spin', 'Cross Dissolve', 
    'Morph', 'Shake', 'Wipe', 'Push', 'Cover'
  ];

  const filters = [
    'Vintage', 'Vibrant', 'Black & White', 'Sepia', 'Cool', 
    'Warm', 'Dramatic', 'Natural', 'High Contrast', 'Soft'
  ];

  useEffect(() => {
    // Initialize timeline
    const interval = setInterval(() => {
      if (isPlaying && videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const addTextElement = () => {
    const newElement: VideoElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      startTime: currentTime,
      duration: 3,
      track: 2,
      content: 'Clique para editar',
      style: {
        font: 'Arial',
        size: 24,
        color: '#ffffff',
        position: { x: 50, y: 50 }
      }
    };
    
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement);
    toast.success("Texto adicionado à timeline!");
  };

  const addVideoFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const newElement: VideoElement = {
          id: `video-${Date.now()}`,
          type: 'video',
          startTime: 0,
          duration: 10, // This would be actual video duration
          track: 0,
          content: URL.createObjectURL(file)
        };
        
        setElements(prev => [...prev, newElement]);
        toast.success("Vídeo adicionado!");
      }
    };
    input.click();
  };

  const addAudioFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const newElement: VideoElement = {
          id: `audio-${Date.now()}`,
          type: 'audio',
          startTime: currentTime,
          duration: 5, // This would be actual audio duration
          track: 1,
          content: URL.createObjectURL(file)
        };
        
        setElements(prev => [...prev, newElement]);
        toast.success("Áudio adicionado!");
      }
    };
    input.click();
  };

  const recordVoice = () => {
    toast.info("Iniciando gravação de voz...");
    // Voice recording logic would go here
  };

  const generateSubtitles = () => {
    toast.info("Gerando legendas automáticas com IA...");
    // AI subtitle generation logic would go here
  };

  const removeBackground = () => {
    if (selectedElement?.type === 'video') {
      toast.info("Removendo fundo com IA...");
      // AI background removal logic would go here
    }
  };

  const handleExport = () => {
    toast.success(`Exportando vídeo em ${resolution} (${aspectRatio})...`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <DashboardLayout>
      <div className="flex h-screen flex-col">
        {/* Header */}
        <div className="bg-purple-600 text-white p-2 flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700">
            <Menu className="h-4 w-4" />
          </Button>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700" onClick={addVideoFile}>
              <Upload className="h-4 w-4 mr-1" />
              Importar Vídeo
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700" onClick={addAudioFile}>
              <Volume2 className="h-4 w-4 mr-1" />
              Importar Áudio
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700" onClick={recordVoice}>
              <Mic className="h-4 w-4 mr-1" />
              Gravar Voz
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700">
              <Redo className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1" />

          <div className="flex gap-2 items-center">
            <Select value={resolution} onValueChange={setResolution}>
              <SelectTrigger className="w-24 bg-purple-700 border-purple-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {resolutionOptions.map(res => (
                  <SelectItem key={res} value={res}>{res}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={aspectRatio} onValueChange={setAspectRatio}>
              <SelectTrigger className="w-32 bg-purple-700 border-purple-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {aspectRatioOptions.map(ratio => (
                  <SelectItem key={ratio.value} value={ratio.value}>
                    {ratio.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700" onClick={handleExport}>
              <Download className="h-4 w-4 mr-1" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-80 bg-gray-50 border-r overflow-y-auto">
            <Tabs defaultValue="media" className="p-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="media">Mídia</TabsTrigger>
                <TabsTrigger value="effects">Efeitos</TabsTrigger>
                <TabsTrigger value="text">Texto</TabsTrigger>
                <TabsTrigger value="ai">IA</TabsTrigger>
              </TabsList>

              <TabsContent value="media" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-4">Biblioteca de Mídia</h3>
                    <div className="space-y-2">
                      <Button onClick={addVideoFile} variant="outline" className="w-full justify-start">
                        <Video className="h-4 w-4 mr-2" />
                        Adicionar Vídeo
                      </Button>
                      <Button onClick={addAudioFile} variant="outline" className="w-full justify-start">
                        <Music className="h-4 w-4 mr-2" />
                        Adicionar Áudio
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Image className="h-4 w-4 mr-2" />
                        Adicionar Imagem
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-4">Templates de Vídeo</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="aspect-video bg-gray-200 rounded cursor-pointer hover:bg-gray-300 flex items-center justify-center text-xs">
                          Template {i}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="effects" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-4">Efeitos Visuais</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {visualEffects.map(effect => (
                        <Button key={effect} variant="outline" size="sm" className="text-xs">
                          {effect}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-4">Transições</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {transitions.map(transition => (
                        <Button key={transition} variant="outline" size="sm" className="text-xs">
                          {transition}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-4">Filtros</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {filters.map(filter => (
                        <Button key={filter} variant="outline" size="sm" className="text-xs">
                          <Filter className="h-3 w-3 mr-1" />
                          {filter}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="text" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-4">Texto Animado</h3>
                    <Button onClick={addTextElement} className="w-full mb-4">
                      <Type className="h-4 w-4 mr-2" />
                      Adicionar Texto
                    </Button>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm">Entrada</Button>
                        <Button variant="outline" size="sm">Saída</Button>
                        <Button variant="outline" size="sm">Loop</Button>
                        <Button variant="outline" size="sm">3D</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-4">Recursos com IA</h3>
                    <div className="space-y-2">
                      <Button onClick={generateSubtitles} variant="outline" className="w-full justify-start">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Legendas Automáticas
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Volume2 className="h-4 w-4 mr-2" />
                        Text-to-Speech
                      </Button>
                      <Button onClick={removeBackground} variant="outline" className="w-full justify-start">
                        <Zap className="h-4 w-4 mr-2" />
                        Remover Fundo
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Correção Automática
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Palette className="h-4 w-4 mr-2" />
                        Sugerir Cortes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Preview Area */}
            <div className="flex-1 flex items-center justify-center bg-black p-8">
              <div className="relative">
                <video
                  ref={videoRef}
                  className="max-w-full max-h-full rounded-lg shadow-lg"
                  style={{ aspectRatio: aspectRatio.replace(':', '/') }}
                >
                  <source src="" type="video/mp4" />
                </video>
                
                {/* Text Overlays */}
                {elements
                  .filter(el => el.type === 'text' && currentTime >= el.startTime && currentTime <= el.startTime + el.duration)
                  .map(textEl => (
                    <div
                      key={textEl.id}
                      className="absolute pointer-events-none"
                      style={{
                        left: `${textEl.style?.position?.x || 50}%`,
                        top: `${textEl.style?.position?.y || 50}%`,
                        color: textEl.style?.color || '#ffffff',
                        fontSize: `${textEl.style?.size || 24}px`,
                        fontFamily: textEl.style?.font || 'Arial'
                      }}
                    >
                      {textEl.content}
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white border-t p-4">
              <div className="flex items-center gap-4 mb-4">
                <Button onClick={togglePlayPause} size="sm">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                
                <span className="text-sm font-mono">{formatTime(currentTime)}</span>
                
                <div className="flex-1 mx-4">
                  <Slider
                    value={[currentTime]}
                    onValueChange={(value) => setCurrentTime(value[0])}
                    max={duration}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                
                <span className="text-sm font-mono">{formatTime(duration)}</span>
              </div>

              {/* Timeline */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-2 mb-4">
                  <Label>Timeline</Label>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Slider
                      value={[zoom]}
                      onValueChange={(value) => setZoom(value[0])}
                      min={25}
                      max={200}
                      step={25}
                      className="w-24"
                    />
                    <Button variant="outline" size="sm">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div ref={timelineRef} className="space-y-2">
                  {/* Video Track */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-16 text-gray-600">Vídeo</span>
                    <div className="flex-1 h-12 bg-blue-100 rounded relative border">
                      {elements
                        .filter(el => el.type === 'video')
                        .map(videoEl => (
                          <div
                            key={videoEl.id}
                            className="absolute h-10 bg-blue-500 rounded m-1 cursor-pointer hover:bg-blue-600"
                            style={{
                              left: `${(videoEl.startTime / (duration || 1)) * 100}%`,
                              width: `${(videoEl.duration / (duration || 1)) * 100}%`
                            }}
                          />
                        ))
                      }
                    </div>
                  </div>

                  {/* Audio Track */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-16 text-gray-600">Áudio</span>
                    <div className="flex-1 h-12 bg-green-100 rounded relative border">
                      {elements
                        .filter(el => el.type === 'audio')
                        .map(audioEl => (
                          <div
                            key={audioEl.id}
                            className="absolute h-10 bg-green-500 rounded m-1 cursor-pointer hover:bg-green-600"
                            style={{
                              left: `${(audioEl.startTime / (duration || 1)) * 100}%`,
                              width: `${(audioEl.duration / (duration || 1)) * 100}%`
                            }}
                          />
                        ))
                      }
                    </div>
                  </div>

                  {/* Text Track */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-16 text-gray-600">Texto</span>
                    <div className="flex-1 h-12 bg-yellow-100 rounded relative border">
                      {elements
                        .filter(el => el.type === 'text')
                        .map(textEl => (
                          <div
                            key={textEl.id}
                            className="absolute h-10 bg-yellow-500 rounded m-1 cursor-pointer hover:bg-yellow-600 flex items-center px-2"
                            style={{
                              left: `${(textEl.startTime / (duration || 1)) * 100}%`,
                              width: `${(textEl.duration / (duration || 1)) * 100}%`
                            }}
                          >
                            <span className="text-xs text-white truncate">{textEl.content}</span>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  {/* Effects Track */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-16 text-gray-600">Efeitos</span>
                    <div className="flex-1 h-12 bg-purple-100 rounded relative border">
                      {elements
                        .filter(el => el.type === 'effect')
                        .map(effectEl => (
                          <div
                            key={effectEl.id}
                            className="absolute h-10 bg-purple-500 rounded m-1 cursor-pointer hover:bg-purple-600"
                            style={{
                              left: `${(effectEl.startTime / (duration || 1)) * 100}%`,
                              width: `${(effectEl.duration / (duration || 1)) * 100}%`
                            }}
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
