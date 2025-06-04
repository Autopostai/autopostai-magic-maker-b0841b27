
import { useState, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, Upload, 
  Type, Image, Sticker, Scissors, Download, Undo, Redo,
  Save, Layers, Filter, Zap, ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

export default function VideoEditor() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [volume, setVolume] = useState([50]);
  const [selectedFormat, setSelectedFormat] = useState("16:9");
  const videoRef = useRef<HTMLVideoElement>(null);

  const formats = [
    { label: "16:9", value: "16:9", desc: "YouTube, Landscape" },
    { label: "9:16", value: "9:16", desc: "Stories, Reels" },
    { label: "1:1", value: "1:1", desc: "Instagram Post" },
    { label: "4:5", value: "4:5", desc: "Instagram Portrait" }
  ];

  const tools = [
    { icon: Scissors, label: "Cortar", active: false },
    { icon: Type, label: "Texto", active: false },
    { icon: Image, label: "Imagem", active: false },
    { icon: Sticker, label: "Stickers", active: false },
    { icon: Filter, label: "Filtros", active: false },
    { icon: Zap, label: "Efeitos", active: false }
  ];

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

  const handleTimelineChange = (value: number[]) => {
    setCurrentTime(value[0]);
    if (videoRef.current) {
      videoRef.current.currentTime = (value[0] / 100) * duration;
    }
  };

  return (
    <DashboardLayout>
      <div className="h-screen flex flex-col bg-gray-900 text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="text-white hover:bg-gray-700">
              <Link to="/create">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Editor de Vídeo</h1>
          </div>

          {/* Format Selection */}
          <div className="flex items-center gap-2">
            {formats.map((format) => (
              <Button
                key={format.value}
                variant={selectedFormat === format.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedFormat(format.value)}
                className="text-xs"
              >
                {format.label}
              </Button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Redo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Video Preview */}
            <div className="flex-1 flex items-center justify-center bg-black p-4">
              <div 
                className={`
                  bg-gray-800 rounded-lg overflow-hidden shadow-lg
                  ${selectedFormat === "16:9" ? "aspect-video w-full max-w-4xl" : ""}
                  ${selectedFormat === "9:16" ? "aspect-[9/16] h-full max-h-[600px]" : ""}
                  ${selectedFormat === "1:1" ? "aspect-square w-full max-w-lg" : ""}
                  ${selectedFormat === "4:5" ? "aspect-[4/5] w-full max-w-md" : ""}
                `}
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Play className="h-8 w-8" />
                    </div>
                    <p className="text-white/60">Clique em upload para adicionar vídeo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="p-4 bg-gray-800 border-t border-gray-700">
              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button variant="ghost" size="sm">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="lg" onClick={togglePlayPause}>
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                <Button variant="ghost" size="sm">
                  <SkipForward className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 ml-4">
                  <Volume2 className="h-4 w-4" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="w-24"
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                  <Slider
                    value={[currentTime]}
                    onValueChange={handleTimelineChange}
                    max={duration}
                    step={0.1}
                    className="flex-1"
                  />
                  <span>{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</span>
                </div>

                {/* Timeline Tracks */}
                <div className="space-y-1">
                  <div className="h-8 bg-blue-600 rounded relative">
                    <div className="absolute inset-1 bg-blue-500 rounded text-xs flex items-center justify-center">
                      Vídeo Principal
                    </div>
                  </div>
                  <div className="h-6 bg-green-600 rounded relative">
                    <div className="absolute inset-1 bg-green-500 rounded text-xs flex items-center justify-center">
                      Legenda/Texto
                    </div>
                  </div>
                  <div className="h-6 bg-purple-600 rounded relative">
                    <div className="absolute inset-1 bg-purple-500 rounded text-xs flex items-center justify-center">
                      Overlay/Imagens
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            {/* Tools */}
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-sm font-medium mb-3">Ferramentas</h3>
              <div className="grid grid-cols-3 gap-2">
                {tools.map((tool, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="flex flex-col gap-1 h-auto py-3"
                  >
                    <tool.icon className="h-4 w-4" />
                    <span className="text-xs">{tool.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Media Upload */}
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-sm font-medium mb-3">Mídia</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Adicionar Vídeo
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Image className="h-4 w-4 mr-2" />
                  Adicionar Imagem
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Volume2 className="h-4 w-4 mr-2" />
                  Adicionar Áudio
                </Button>
              </div>
            </div>

            {/* Properties */}
            <div className="p-4 flex-1">
              <h3 className="text-sm font-medium mb-3">Propriedades</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-300 mb-1 block">Posição X</label>
                  <Input type="number" defaultValue="0" className="bg-gray-700 border-gray-600" />
                </div>
                <div>
                  <label className="text-xs text-gray-300 mb-1 block">Posição Y</label>
                  <Input type="number" defaultValue="0" className="bg-gray-700 border-gray-600" />
                </div>
                <div>
                  <label className="text-xs text-gray-300 mb-1 block">Escala</label>
                  <Slider defaultValue={[100]} max={200} step={1} className="mt-2" />
                </div>
                <div>
                  <label className="text-xs text-gray-300 mb-1 block">Opacidade</label>
                  <Slider defaultValue={[100]} max={100} step={1} className="mt-2" />
                </div>
              </div>
            </div>

            {/* Layers */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-4 w-4" />
                <h3 className="text-sm font-medium">Camadas</h3>
              </div>
              <div className="space-y-1">
                <div className="p-2 bg-gray-700 rounded text-xs">Texto: Título Principal</div>
                <div className="p-2 bg-gray-700 rounded text-xs">Imagem: Logo</div>
                <div className="p-2 bg-gray-600 rounded text-xs">Vídeo: Principal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
