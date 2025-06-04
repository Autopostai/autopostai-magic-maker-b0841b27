
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Type, Upload, Download, Layers, Palette, Image, Square, Circle, Triangle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ImageEditor() {
  const [selectedFormat, setSelectedFormat] = useState("post");
  const [selectedExport, setSelectedExport] = useState("png");

  const formatOptions = [
    { value: "post", label: "Post Instagram (1080x1080)" },
    { value: "story", label: "Story Instagram (1080x1920)" },
    { value: "thumbnail", label: "Thumbnail YouTube (1280x720)" },
    { value: "facebook", label: "Post Facebook (1200x630)" }
  ];

  const exportOptions = [
    { value: "png", label: "PNG (Alta Qualidade)" },
    { value: "jpg", label: "JPG (Compacto)" },
    { value: "pdf", label: "PDF (Documento)" }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Editor de Imagem</h1>
          <p className="text-gray-600">
            Crie designs incríveis com ferramentas profissionais
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Canvas Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Canvas de Design</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Image className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg text-gray-600">Seu design aparecerá aqui</p>
                    <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                      Começar Novo Design
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layers Panel */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Camadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span className="text-sm">Texto Principal</span>
                    <Button size="sm" variant="ghost">
                      <Layers className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">Background</span>
                    <Button size="sm" variant="ghost">
                      <Layers className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tools Panel */}
          <div className="space-y-4">
            {/* Format Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Formato</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            {/* Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ferramentas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Textos</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Type className="mr-2 h-4 w-4" />
                      Título
                    </Button>
                    <Button variant="outline" size="sm">
                      <Type className="mr-2 h-4 w-4" />
                      Subtítulo
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Elementos</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">
                      <Square className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Circle className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Triangle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Mídia</h4>
                  <Button variant="outline" className="w-full" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Imagem
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Background</h4>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded cursor-pointer"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded cursor-pointer"></div>
                    <div className="w-8 h-8 bg-green-500 rounded cursor-pointer"></div>
                    <div className="w-8 h-8 bg-red-500 rounded cursor-pointer"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exportar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedExport} onValueChange={setSelectedExport}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {exportOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Download className="mr-2 h-4 w-4" />
                  Baixar Design
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
