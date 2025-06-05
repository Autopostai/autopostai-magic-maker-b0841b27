
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Type, Image, Shapes, Upload, Sparkles, Zap, Grid, 
  Circle, Square, Triangle, Star, Heart, Polygon,
  Camera, Frame, Layout, Palette, Brush, Stickers
} from "lucide-react";
import { DesignElement } from "@/types/editor";
import { toast } from "sonner";

interface ElementsSidebarProps {
  onAddElement: (element: Partial<DesignElement>) => void;
}

export function ElementsSidebar({ onAddElement }: ElementsSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const shapes = [
    { name: 'Retângulo', icon: Square, type: 'rectangle' },
    { name: 'Círculo', icon: Circle, type: 'circle' },
    { name: 'Triângulo', icon: Triangle, type: 'triangle' },
    { name: 'Estrela', icon: Star, type: 'star' },
    { name: 'Coração', icon: Heart, type: 'heart' },
    { name: 'Polígono', icon: Polygon, type: 'polygon' }
  ];

  const templates = [
    { id: 1, name: 'Post Moderno', category: 'social' },
    { id: 2, name: 'Apresentação', category: 'business' },
    { id: 3, name: 'Story Criativo', category: 'social' },
    { id: 4, name: 'Thumbnail', category: 'youtube' },
    { id: 5, name: 'Flyer Evento', category: 'marketing' },
    { id: 6, name: 'Logo Design', category: 'branding' }
  ];

  const graphics = [
    { id: 1, name: 'Ícone Seta', category: 'arrows' },
    { id: 2, name: 'Ícone Coração', category: 'emotions' },
    { id: 3, name: 'Ícone Estrela', category: 'ratings' },
    { id: 4, name: 'Ícone Check', category: 'actions' },
    { id: 5, name: 'Linha Decorativa', category: 'decorations' },
    { id: 6, name: 'Moldura Vintage', category: 'frames' }
  ];

  const stickers = [
    { id: 1, name: 'Emoji Feliz', category: 'emotions' },
    { id: 2, name: 'Balão de Fala', category: 'speech' },
    { id: 3, name: 'Badge Premium', category: 'badges' },
    { id: 4, name: 'Selo Garantia', category: 'seals' },
    { id: 5, name: 'Banner Sale', category: 'promotions' },
    { id: 6, name: 'Ribbon New', category: 'ribbons' }
  ];

  const photos = [
    { id: 1, name: 'Pessoa Sorrindo', category: 'people' },
    { id: 2, name: 'Paisagem Natureza', category: 'nature' },
    { id: 3, name: 'Escritório Moderno', category: 'business' },
    { id: 4, name: 'Comida Deliciosa', category: 'food' },
    { id: 5, name: 'Tecnologia', category: 'tech' },
    { id: 6, name: 'Viagem', category: 'travel' }
  ];

  const frames = [
    { id: 1, name: 'Moldura Circular', type: 'circle' },
    { id: 2, name: 'Moldura Quadrada', type: 'square' },
    { id: 3, name: 'Moldura Hexagonal', type: 'hexagon' },
    { id: 4, name: 'Moldura Estrela', type: 'star' },
    { id: 5, name: 'Moldura Coração', type: 'heart' },
    { id: 6, name: 'Moldura Irregular', type: 'irregular' }
  ];

  const grids = [
    { id: 1, name: 'Grid 2x2', cols: 2, rows: 2 },
    { id: 2, name: 'Grid 3x3', cols: 3, rows: 3 },
    { id: 3, name: 'Grid 2x3', cols: 2, rows: 3 },
    { id: 4, name: 'Grid Masonry', cols: 0, rows: 0 },
    { id: 5, name: 'Grid Magazine', cols: 0, rows: 0 },
    { id: 6, name: 'Grid Personalizado', cols: 0, rows: 0 }
  ];

  const addTextElement = () => {
    const newElement: Partial<DesignElement> = {
      type: 'text',
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      content: 'Adicione seu texto',
      style: {
        fontFamily: 'Inter',
        fontSize: 24,
        color: '#000000',
        fontWeight: 'normal',
        textAlign: 'left'
      },
      visible: true,
      locked: false,
      opacity: 100,
      name: 'Texto'
    };
    
    onAddElement(newElement);
    toast.success("Texto adicionado!");
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

  return (
    <div className="w-80 bg-white border-r overflow-y-auto">
      <Tabs defaultValue="templates" className="p-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="templates" className="text-xs">Templates</TabsTrigger>
          <TabsTrigger value="elementos" className="text-xs">Elementos</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4 mt-4">
          <div className="space-y-4">
            <Input
              placeholder="Buscar templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            
            <div className="grid grid-cols-2 gap-3">
              {templates.map(template => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-3">
                    <div className="aspect-[4/5] bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mb-2 flex items-center justify-center">
                      <Layout className="h-8 w-8 text-purple-600" />
                    </div>
                    <p className="text-xs font-medium truncate">{template.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{template.category}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="elementos" className="space-y-4 mt-4">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-6">
              {/* Texto */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4 flex items-center">
                    <Type className="h-4 w-4 mr-2" />
                    Texto
                  </h3>
                  <Button onClick={addTextElement} className="w-full mb-2">
                    Adicionar Texto
                  </Button>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" size="sm">Título</Button>
                    <Button variant="outline" size="sm">Subtítulo</Button>
                    <Button variant="outline" size="sm">Parágrafo</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Formas */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4 flex items-center">
                    <Shapes className="h-4 w-4 mr-2" />
                    Formas
                  </h3>
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
                </CardContent>
              </Card>

              {/* Graphics */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4 flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Graphics
                  </h3>
                  <Input placeholder="Buscar gráficos..." className="mb-3" />
                  <div className="grid grid-cols-3 gap-2">
                    {graphics.map(graphic => (
                      <div 
                        key={graphic.id} 
                        className="aspect-square bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-center"
                      >
                        <Brush className="h-4 w-4 text-gray-600" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Stickers */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4 flex items-center">
                    <Stickers className="h-4 w-4 mr-2" />
                    Stickers
                  </h3>
                  <Input placeholder="Buscar stickers..." className="mb-3" />
                  <div className="grid grid-cols-3 gap-2">
                    {stickers.map(sticker => (
                      <div 
                        key={sticker.id} 
                        className="aspect-square bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-center"
                      >
                        <Zap className="h-4 w-4 text-gray-600" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Photos */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4 flex items-center">
                    <Image className="h-4 w-4 mr-2" />
                    Photos
                  </h3>
                  <Button variant="outline" className="w-full mb-3">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload de fotos
                  </Button>
                  <Input placeholder="Buscar fotos..." className="mb-3" />
                  <div className="grid grid-cols-2 gap-2">
                    {photos.map(photo => (
                      <div 
                        key={photo.id} 
                        className="aspect-square bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-center"
                      >
                        <Camera className="h-4 w-4 text-gray-600" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Frames */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4 flex items-center">
                    <Frame className="h-4 w-4 mr-2" />
                    Frames
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {frames.map(frame => (
                      <div 
                        key={frame.id} 
                        className="aspect-square bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300 flex items-center justify-center"
                      >
                        <Frame className="h-4 w-4 text-gray-600" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Grids */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4 flex items-center">
                    <Grid className="h-4 w-4 mr-2" />
                    Grids
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {grids.map(grid => (
                      <div 
                        key={grid.id} 
                        className="aspect-square bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300 flex items-center justify-center"
                      >
                        <Grid className="h-4 w-4 text-gray-600" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Uploads */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4 flex items-center">
                    <Upload className="h-4 w-4 mr-2" />
                    Uploads
                  </h3>
                  <Tabs defaultValue="images">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="images" className="text-xs">Imagens</TabsTrigger>
                      <TabsTrigger value="videos" className="text-xs">Vídeos</TabsTrigger>
                      <TabsTrigger value="audio" className="text-xs">Áudios</TabsTrigger>
                    </TabsList>
                    <TabsContent value="images" className="mt-4">
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Enviar imagens
                      </Button>
                    </TabsContent>
                    <TabsContent value="videos" className="mt-4">
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Enviar vídeos
                      </Button>
                    </TabsContent>
                    <TabsContent value="audio" className="mt-4">
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Enviar áudios
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
