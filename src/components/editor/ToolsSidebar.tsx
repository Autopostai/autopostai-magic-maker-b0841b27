
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Layout, Type, Shapes, Image, Upload, Palette, 
  BarChart3, Folder, Circle, Square, Triangle, 
  Star, Heart, Hexagon
} from "lucide-react";
import { DesignElement } from "@/types/editor";
import { toast } from "sonner";

interface ToolsSidebarProps {
  onAddElement: (element: Partial<DesignElement>) => void;
}

const sidebarItems = [
  { id: 'templates', icon: Layout, label: 'Modelos' },
  { id: 'elements', icon: Shapes, label: 'Elementos' },
  { id: 'text', icon: Type, label: 'Texto' },
  { id: 'photos', icon: Image, label: 'Fotos' },
  { id: 'uploads', icon: Upload, label: 'Uploads' },
  { id: 'brand', icon: Palette, label: 'Estilos' },
  { id: 'graphics', icon: BarChart3, label: 'Gráficos' },
  { id: 'projects', icon: Folder, label: 'Projetos' },
];

const shapes = [
  { name: 'Retângulo', icon: Square, type: 'rectangle' },
  { name: 'Círculo', icon: Circle, type: 'circle' },
  { name: 'Triângulo', icon: Triangle, type: 'triangle' },
  { name: 'Estrela', icon: Star, type: 'star' },
  { name: 'Coração', icon: Heart, type: 'heart' },
  { name: 'Hexágono', icon: Hexagon, type: 'polygon' }
];

export function ToolsSidebar({ onAddElement }: ToolsSidebarProps) {
  const [activeTab, setActiveTab] = useState('templates');
  const [searchTerm, setSearchTerm] = useState("");

  const addTextElement = (textType: 'title' | 'subtitle' | 'body') => {
    const textSizes = {
      title: { fontSize: 48, content: 'Adicione um título' },
      subtitle: { fontSize: 32, content: 'Adicione um subtítulo' },
      body: { fontSize: 16, content: 'Adicione um corpo de texto' }
    };

    const config = textSizes[textType];
    
    const newElement: Partial<DesignElement> = {
      type: 'text',
      x: 100,
      y: 100,
      width: 300,
      height: config.fontSize * 1.2,
      content: config.content,
      style: {
        fontFamily: 'Inter',
        fontSize: config.fontSize,
        color: '#000000',
        fontWeight: textType === 'title' ? 'bold' : 'normal',
        textAlign: 'left'
      },
      visible: true,
      locked: false,
      opacity: 100,
      name: `Texto ${textType}`
    };
    
    onAddElement(newElement);
    toast.success(`${textType} adicionado!`);
  };

  const addShapeElement = (shapeType: string) => {
    const newElement: Partial<DesignElement> = {
      type: 'shape',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      style: {
        shapeType: shapeType as any,
        fill: '#8B5CF6',
        stroke: 'transparent',
        strokeWidth: 0,
        borderRadius: shapeType === 'rectangle' ? 0 : undefined
      },
      visible: true,
      locked: false,
      opacity: 100,
      name: `Forma ${shapeType}`
    };
    
    onAddElement(newElement);
    toast.success(`Forma ${shapeType} adicionada!`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'templates':
        return (
          <div className="space-y-4">
            <Input
              placeholder="Buscar modelos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-3">
                    <div className="aspect-[4/5] bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mb-2 flex items-center justify-center">
                      <Layout className="h-8 w-8 text-purple-600" />
                    </div>
                    <p className="text-xs font-medium truncate">Modelo {i}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'elements':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Formas Básicas</h3>
            <div className="grid grid-cols-3 gap-2">
              {shapes.map(shape => (
                <Button
                  key={shape.type}
                  variant="outline"
                  size="sm"
                  className="aspect-square flex-col gap-1 p-2"
                  onClick={() => addShapeElement(shape.type)}
                >
                  <shape.icon className="h-4 w-4" />
                  <span className="text-xs">{shape.name}</span>
                </Button>
              ))}
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Adicionar Texto</h3>
            <div className="space-y-2">
              <Button 
                onClick={() => addTextElement('title')} 
                className="w-full justify-start"
                variant="outline"
              >
                <Type className="h-4 w-4 mr-2" />
                Adicionar Título
              </Button>
              <Button 
                onClick={() => addTextElement('subtitle')} 
                className="w-full justify-start"
                variant="outline"
              >
                <Type className="h-4 w-4 mr-2" />
                Adicionar Subtítulo
              </Button>
              <Button 
                onClick={() => addTextElement('body')} 
                className="w-full justify-start"
                variant="outline"
              >
                <Type className="h-4 w-4 mr-2" />
                Adicionar Corpo
              </Button>
            </div>
          </div>
        );

      case 'photos':
        return (
          <div className="space-y-4">
            <Input placeholder="Buscar fotos..." />
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div 
                  key={i}
                  className="aspect-square bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <Image className="h-6 w-6 text-gray-600" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'uploads':
        return (
          <div className="space-y-4">
            <Button className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Fazer Upload
            </Button>
            <p className="text-sm text-gray-600 text-center">
              Arraste arquivos aqui ou clique para enviar
            </p>
          </div>
        );

      case 'brand':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Kit da Marca</h3>
            <p className="text-sm text-gray-600">
              Configure suas cores, fontes e logos para manter consistência visual.
            </p>
            <Button variant="outline" className="w-full">
              <Palette className="h-4 w-4 mr-2" />
              Configurar Marca
            </Button>
          </div>
        );

      case 'graphics':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Gráficos</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Barras', 'Linhas', 'Pizza', 'Radar'].map(type => (
                <Button
                  key={type}
                  variant="outline"
                  size="sm"
                  className="aspect-square flex-col gap-1"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span className="text-xs">{type}</span>
                </Button>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Seus Projetos</h3>
            <p className="text-sm text-gray-600">
              Acesse seus designs salvos e trabalhos em andamento.
            </p>
            <Button variant="outline" className="w-full">
              <Folder className="h-4 w-4 mr-2" />
              Ver Todos os Projetos
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-80 bg-white border-r flex">
      {/* Icon Bar */}
      <div className="w-16 bg-gray-50 border-r flex flex-col py-4">
        {sidebarItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            size="sm"
            className="mx-2 mb-2 h-12 w-12 flex-col gap-1 p-1"
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs truncate">{item.label}</span>
          </Button>
        ))}
      </div>

      {/* Content Panel */}
      <div className="flex-1 p-4">
        <ScrollArea className="h-full">
          {renderTabContent()}
        </ScrollArea>
      </div>
    </div>
  );
}
