
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Play, Pause, Upload, Type, Sticker, Palette, Download, Scissors, Volume2, RotateCcw, RotateCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function VideoEditor() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("9:16");
  const [selectedQuality, setSelectedQuality] = useState("1080p");

  const formatOptions = [
    { value: "16:9", label: "16:9 (Landscape)" },
    { value: "9:16", label: "9:16 (Vertical)" },
    { value: "1:1", label: "1:1 (Square)" },
    { value: "4:5", label: "4:5 (Portrait)" }
  ];

  const qualityOptions = [
    { value: "720p", label: "720p HD" },
    { value: "1080p", label: "1080p Full HD" },
    { value: "4k", label: "4K Ultra HD" }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Editor de Vídeo</h1>
          <p className="text-gray-600">
            Edite seus vídeos com ferramentas profissionais
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Preview */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Preview do Vídeo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
                  <div className="text-white text-center">
                    <Upload className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Faça upload do seu vídeo</p>
                    <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                      <Upload className="mr-2 h-4 w-4" />
                      Selecionar Vídeo
                    </Button>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="flex items-center gap-4 mb-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <div className="flex-1">
                    <Slider defaultValue={[0]} max={100} step={1} className="w-full" />
                  </div>
                  <span className="text-sm text-gray-500">00:00 / 01:30</span>
                </div>

                {/* Timeline */}
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-16">Vídeo</span>
                        <div className="flex-1 h-8 bg-blue-200 rounded flex items-center px-2">
                          <div className="w-full h-4 bg-blue-500 rounded"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-16">Texto</span>
                        <div className="flex-1 h-8 bg-gray-100 rounded flex items-center px-2">
                          <div className="w-1/3 h-4 bg-green-500 rounded mr-2"></div>
                          <div className="w-1/4 h-4 bg-green-500 rounded"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-16">Overlay</span>
                        <div className="flex-1 h-8 bg-gray-100 rounded flex items-center px-2">
                          <div className="w-1/6 h-4 bg-orange-500 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          {/* Tools Panel */}
          <div className="space-y-4">
            {/* Format & Quality */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exportar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Formato</label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formatOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Qualidade</label>
                  <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {qualityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Vídeo
                </Button>
              </CardContent>
            </Card>

            {/* Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ferramentas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Scissors className="mr-2 h-4 w-4" />
                    Cortar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Type className="mr-2 h-4 w-4" />
                    Texto
                  </Button>
                  <Button variant="outline" size="sm">
                    <Sticker className="mr-2 h-4 w-4" />
                    Stickers
                  </Button>
                  <Button variant="outline" size="sm">
                    <Palette className="mr-2 h-4 w-4" />
                    Filtros
                  </Button>
                  <Button variant="outline" size="sm">
                    <Volume2 className="mr-2 h-4 w-4" />
                    Áudio
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Efeitos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
