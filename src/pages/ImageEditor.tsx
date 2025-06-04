import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Type, Image, Shapes, Upload, Download, Undo, Redo,
  Save, Layers, Palette, ArrowLeft, Square, Circle,
  Triangle, Star, Heart, Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ImageEditor() {
  const [selectedFormat, setSelectedFormat] = useState("instagram-post");
  const [selectedTool, setSelectedTool] = useState("text");
  const [selectedElement, setSelectedElement] = useState(null);

  const formats = [
    { id: "instagram-post", name: "Post Instagram", size: "1080x1080", ratio: "1:1" },
    { id: "instagram-story", name: "Story Instagram", size: "1080x1920", ratio: "9:16" },
    { id: "youtube-thumbnail", name: "Thumbnail YouTube", size: "1280x720", ratio: "16:9" },
    { id: "facebook-post", name: "Post Facebook", size: "1200x630", ratio: "1.91:1" },
    { id: "custom", name: "Personalizado", size: "Custom", ratio: "Custom" }
  ];

  const tools = [
    { id: "text", icon: Type, label: "Texto" },
    { id: "elements", icon: Shapes, label: "Elementos" },
    { id: "images", icon: Image, label: "Imagens" },
    { id: "background", icon: Palette, label: "Fundo" },
    { id: "upload", icon: Upload, label: "Upload" }
  ];

  const shapes = [
    { icon: Square, name: "Retângulo" },
    { icon: Circle, name: "Círculo" },
    { icon: Triangle, name: "Triângulo" },
    { icon: Star, name: "Estrela" },
    { icon: Heart, name: "Coração" },
    { icon: Sparkles, name: "Sparkle" }
  ];

  const textPresets = [
    { name: "Título Principal", style: "text-4xl font-bold" },
    { name: "Subtítulo", style: "text-2xl font-semibold" },
    { name: "Corpo do Texto", style: "text-base" },
    { name: "Legenda", style: "text-sm" }
  ];

  const backgroundColors = [
    "#ffffff", "#000000", "#ff6b6b", "#4ecdc4", "#45b7d1", 
    "#96ceb4", "#ffeaa7", "#dda0dd", "#98d8c8", "#f7dc6f"
  ];

  const getCanvasClass = () => {
    switch (selectedFormat) {
      case "instagram-post":
        return "aspect-square w-full max-w-lg";
      case "instagram-story":
        return "aspect-[9/16] h-full max-h-[600px]";
      case "youtube-thumbnail":
        return "aspect-video w-full max-w-2xl";
      case "facebook-post":
        return "aspect-[1.91/1] w-full max-w-2xl";
      default:
        return "aspect-square w-full max-w-lg";
    }
  };

  const renderSidebar = () => {
    switch (selectedTool) {
      case "text":
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Adicionar Texto</h3>
            <div className="space-y-2">
              {textPresets.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Type className="h-4 w-4 mr-2" />
                  {preset.name}
                </Button>
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fonte</label>
              <select className="w-full p-2 border rounded">
                <option>Inter</option>
                <option>Roboto</option>
                <option>Open Sans</option>
                <option>Montserrat</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tamanho</label>
              <Slider defaultValue={[24]} min={8} max={72} step={1} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cor</label>
              <div className="grid grid-cols-5 gap-2">
                {backgroundColors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded cursor-pointer border-2 border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      
      case "elements":
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Formas</h3>
            <div className="grid grid-cols-3 gap-2">
              {shapes.map((shape, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="flex flex-col gap-1 h-auto py-3"
                >
                  <shape.icon className="h-4 w-4" />
                  <span className="text-xs">{shape.name}</span>
                </Button>
              ))}
            </div>
            
            <h3 className="font-medium mt-6">Ícones</h3>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-100 rounded border flex items-center justify-center cursor-pointer hover:bg-gray-200"
                >
                  <Star className="h-4 w-4 text-gray-600" />
                </div>
              ))}
            </div>
          </div>
        );
      
      case "images":
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Imagens</h3>
            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload de Imagem
            </Button>
            
            <h4 className="font-medium">Biblioteca</h4>
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded border cursor-pointer hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </div>
        );
      
      case "background":
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Cor de Fundo</h3>
            <div className="grid grid-cols-5 gap-2">
              {backgroundColors.map((color, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded cursor-pointer border-2 border-gray-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            
            <h3 className="font-medium">Gradientes</h3>
            <div className="space-y-2">
              <div className="w-full h-10 rounded cursor-pointer bg-gradient-to-r from-purple-400 to-pink-400" />
              <div className="w-full h-10 rounded cursor-pointer bg-gradient-to-r from-blue-400 to-cyan-400" />
              <div className="w-full h-10 rounded cursor-pointer bg-gradient-to-r from-green-400 to-blue-500" />
              <div className="w-full h-10 rounded cursor-pointer bg-gradient-to-r from-orange-400 to-red-400" />
            </div>
            
            <h3 className="font-medium">Imagem de Fundo</h3>
            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload de Fundo
            </Button>
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Upload</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Arraste ou clique para upload</p>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="h-screen flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/create">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Editor de Imagem</h1>
          </div>

          {/* Format Selection */}
          <div className="flex items-center gap-2">
            <select 
              value={selectedFormat} 
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="px-3 py-1 border rounded text-sm"
            >
              {formats.map((format) => (
                <option key={format.id} value={format.id}>
                  {format.name} ({format.size})
                </option>
              ))}
            </select>
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
          {/* Tools Sidebar */}
          <div className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col">
            {tools.map((tool) => (
              <Button
                key={tool.id}
                variant={selectedTool === tool.id ? "default" : "ghost"}
                size="sm"
                className="flex flex-col gap-1 h-16 rounded-none"
                onClick={() => setSelectedTool(tool.id)}
              >
                <tool.icon className="h-5 w-5" />
                <span className="text-xs">{tool.label}</span>
              </Button>
            ))}
          </div>

          {/* Properties Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
            {renderSidebar()}
          </div>

          {/* Main Canvas */}
          <div className="flex-1 bg-gray-100 flex items-center justify-center p-8">
            <div className={`${getCanvasClass()} bg-white rounded-lg shadow-lg overflow-hidden relative`}>
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-white rounded-lg mb-4 mx-auto flex items-center justify-center shadow-sm">
                    <Type className="h-8 w-8 text-purple-600" />
                  </div>
                  <p>Clique em uma ferramenta para começar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Panel */}
          <div className="w-64 bg-white border-l border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-4 w-4" />
              <h3 className="font-medium">Camadas</h3>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                Texto: Título Principal
              </div>
              <div className="p-2 bg-gray-50 border border-gray-200 rounded text-sm">
                Forma: Retângulo
              </div>
              <div className="p-2 bg-gray-50 border border-gray-200 rounded text-sm">
                Fundo
              </div>
            </div>

            {selectedElement && (
              <div className="space-y-4">
                <h4 className="font-medium">Propriedades</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Posição X</label>
                    <Input type="number" defaultValue={0} size="sm" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Posição Y</label>
                    <Input type="number" defaultValue={0} size="sm" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Largura</label>
                    <Input type="number" defaultValue={100} size="sm" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Altura</label>
                    <Input type="number" defaultValue={100} size="sm" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Opacidade</label>
                    <Slider defaultValue={[100]} max={100} step={1} className="mt-2" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
