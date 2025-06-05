
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
  Type, Image, Shapes, Upload, Save, Download, Undo, Redo, 
  Menu, Share, ZoomIn, ZoomOut, Grid, AlignLeft, AlignCenter, 
  AlignRight, Bold, Italic, Underline, Palette, Eye, Layers,
  ChevronLeft, ChevronRight, Maximize, RotateCcw, FlipHorizontal,
  FlipVertical, Sliders, Sparkles, Settings, FolderOpen, Apps,
  Wand2, Sun, Strikethrough, List, AlignJustify, Plus, Minus
} from "lucide-react";
import { toast } from "sonner";
import { 
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DesignElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  style?: any;
  selected?: boolean;
}

export default function DesignEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<DesignElement | null>(null);
  const [zoom, setZoom] = useState(100);
  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [projectName, setProjectName] = useState("Projeto sem título");
  
  // Text editing states
  const [textFont, setTextFont] = useState('Arial');
  const [textSize, setTextSize] = useState(16);
  const [textColor, setTextColor] = useState('#000000');
  const [textBold, setTextBold] = useState(false);
  const [textItalic, setTextItalic] = useState(false);
  const [textUnderline, setTextUnderline] = useState(false);
  const [textStrikethrough, setTextStrikethrough] = useState(false);
  const [textUppercase, setTextUppercase] = useState(false);
  const [textAlign, setTextAlign] = useState('left');
  const [textOpacity, setTextOpacity] = useState(100);

  const fonts = [
    'Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Verdana', 
    'Trebuchet MS', 'Impact', 'Comic Sans MS', 'Courier New', 'Inter',
    'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Nunito'
  ];

  const resizeOptions = [
    { name: 'Instagram Post', width: 1080, height: 1080 },
    { name: 'Instagram Story', width: 1080, height: 1920 },
    { name: 'YouTube Thumbnail', width: 1280, height: 720 },
    { name: 'Facebook Post', width: 1200, height: 630 },
    { name: 'LinkedIn Post', width: 1200, height: 627 },
    { name: 'Twitter Post', width: 1200, height: 675 },
    { name: 'Apresentação 16:9', width: 1920, height: 1080 },
    { name: 'A4 Retrato', width: 2480, height: 3508 },
    { name: 'Tamanho Personalizado', width: 0, height: 0 }
  ];

  const fontCombinations = [
    { title: 'Montserrat + Open Sans', subtitle: 'Moderna e limpa', heading: 'Montserrat', body: 'Open Sans' },
    { title: 'Playfair + Source Sans', subtitle: 'Elegante e clássica', heading: 'Playfair Display', body: 'Source Sans Pro' },
    { title: 'Poppins + Inter', subtitle: 'Contemporânea', heading: 'Poppins', body: 'Inter' },
    { title: 'Roboto + Lato', subtitle: 'Profissional', heading: 'Roboto', body: 'Lato' }
  ];

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawCanvas(ctx);
      }
    }
  }, [elements, zoom, canvasSize]);

  const drawCanvas = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // Draw elements
    elements.forEach(element => {
      if (element.type === 'text' && element.content) {
        ctx.font = `${element.style?.size || 16}px ${element.style?.font || 'Arial'}`;
        ctx.fillStyle = element.style?.color || '#000000';
        ctx.textAlign = element.style?.align || 'left';
        ctx.fillText(element.content, element.x, element.y);
      }
      
      // Draw selection border
      if (element.selected) {
        ctx.strokeStyle = '#8B5CF6';
        ctx.lineWidth = 2;
        ctx.strokeRect(element.x - 5, element.y - 5, element.width + 10, element.height + 10);
      }
    });
  };

  const addTextElement = () => {
    const newElement: DesignElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      content: 'Clique para editar',
      style: {
        font: textFont,
        size: textSize,
        color: textColor,
        bold: textBold,
        italic: textItalic,
        underline: textUnderline,
        align: textAlign
      }
    };
    
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement);
    toast.success("Elemento de texto adicionado!");
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedElement = elements.find(element => 
      x >= element.x && x <= element.x + element.width &&
      y >= element.y && y <= element.y + element.height
    );

    if (clickedElement) {
      setElements(prev => prev.map(el => ({ ...el, selected: el.id === clickedElement.id })));
      setSelectedElement(clickedElement);
    } else {
      setElements(prev => prev.map(el => ({ ...el, selected: false })));
      setSelectedElement(null);
    }
  };

  const updateSelectedElement = (updates: Partial<DesignElement>) => {
    if (!selectedElement) return;

    setElements(prev => prev.map(el => 
      el.id === selectedElement.id ? { ...el, ...updates } : el
    ));
    
    setSelectedElement(prev => prev ? { ...prev, ...updates } : null);
  };

  const handleResize = (size: { width: number; height: number }) => {
    setCanvasSize(size);
    if (canvasRef.current) {
      canvasRef.current.width = size.width;
      canvasRef.current.height = size.height;
    }
  };

  const fitToScreen = () => {
    setZoom(100);
  };

  const applyFontCombination = (combination: typeof fontCombinations[0]) => {
    setTextFont(combination.heading);
    toast.success(`Combinação ${combination.title} aplicada!`);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header - Purple AutoPost AI */}
      <div className="bg-purple-600 text-white p-3 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-purple-700"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          
          <Menubar className="bg-transparent border-none">
            <MenubarMenu>
              <MenubarTrigger className="text-white hover:bg-purple-700 px-3 py-1 rounded">
                File
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Novo projeto</MenubarItem>
                <MenubarItem>Abrir projeto</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Importar</MenubarItem>
                <MenubarItem>Exportar</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <Select onValueChange={(value) => {
            const size = resizeOptions.find(opt => opt.name === value);
            if (size && size.width > 0) handleResize({ width: size.width, height: size.height });
          }}>
            <SelectTrigger className="w-48 bg-purple-700 border-purple-500 text-white">
              <SelectValue placeholder="Redimensionar" />
            </SelectTrigger>
            <SelectContent>
              {resizeOptions.map(option => (
                <SelectItem key={option.name} value={option.name}>
                  {option.name} {option.width > 0 && `(${option.width}x${option.height})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700">
              <Redo className="h-4 w-4" />
            </Button>
          </div>

          <Input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-purple-700 border-purple-500 text-white placeholder-purple-200 w-48"
            placeholder="Nome do projeto"
          />
        </div>

        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700">
                <Share className="h-4 w-4 mr-1" />
                Compartilhar
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Compartilhar projeto</h4>
                <div className="space-y-2">
                  <Button className="w-full justify-start">
                    <Share className="h-4 w-4 mr-2" />
                    Gerar link público
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Instagram
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Select onValueChange={(format) => toast.success(`Exportando como ${format}...`)}>
            <SelectTrigger className="w-32 bg-purple-700 border-purple-500 text-white">
              <SelectValue placeholder="Baixar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PNG">PNG</SelectItem>
              <SelectItem value="JPG">JPG</SelectItem>
              <SelectItem value="PDF">PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {!sidebarCollapsed && (
          <div className="w-80 bg-white border-r overflow-y-auto">
            <Tabs defaultValue="design" className="p-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="design" className="text-xs">Design</TabsTrigger>
                <TabsTrigger value="elements" className="text-xs">Elementos</TabsTrigger>
              </TabsList>

              <TabsContent value="design" className="space-y-4 mt-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-4">Templates</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="aspect-square bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                            Template {i}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="elements" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-4 flex items-center">
                        <Type className="h-4 w-4 mr-2" />
                        Texto
                      </h3>
                      <Button onClick={addTextElement} className="w-full mb-4">
                        Adicionar Texto
                      </Button>
                      
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">Combinações de fontes</Label>
                          <div className="space-y-2 mt-2">
                            {fontCombinations.map((combo, index) => (
                              <div 
                                key={index}
                                className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => applyFontCombination(combo)}
                              >
                                <div className="font-bold text-sm">{combo.title}</div>
                                <div className="text-xs text-gray-600">{combo.subtitle}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-4 flex items-center">
                        <Shapes className="h-4 w-4 mr-2" />
                        Formas
                      </h3>
                      <div className="grid grid-cols-4 gap-2">
                        <Button variant="outline" size="sm" className="aspect-square">
                          <div className="w-4 h-4 bg-current rounded-full"></div>
                        </Button>
                        <Button variant="outline" size="sm" className="aspect-square">
                          <div className="w-4 h-4 bg-current"></div>
                        </Button>
                        <Button variant="outline" size="sm" className="aspect-square">
                          <div className="w-4 h-3 bg-current" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                        </Button>
                        <Button variant="outline" size="sm" className="aspect-square">
                          <Sparkles className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

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

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-4 flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Tools
                      </h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <Sliders className="h-4 w-4 mr-2" />
                          Filtros
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Wand2 className="h-4 w-4 mr-2" />
                          Efeitos
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-4 flex items-center">
                        <FolderOpen className="h-4 w-4 mr-2" />
                        Projects
                      </h3>
                      <Button variant="outline" className="w-full">
                        Ver projetos salvos
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-4 flex items-center">
                        <Apps className="h-4 w-4 mr-2" />
                        Apps
                      </h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start text-xs">
                          Gerador QR Code
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-xs">
                          IA Visual
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Text Editing Toolbar */}
          {selectedElement?.type === 'text' && (
            <div className="bg-white border-b p-4 flex items-center gap-4 flex-wrap">
              <Select value={textFont} onValueChange={(value) => {
                setTextFont(value);
                updateSelectedElement({ style: { ...selectedElement.style, font: value } });
              }}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map(font => (
                    <SelectItem key={font} value={font}>{font}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="number"
                value={textSize}
                onChange={(e) => {
                  const size = parseInt(e.target.value);
                  setTextSize(size);
                  updateSelectedElement({ style: { ...selectedElement.style, size } });
                }}
                className="w-20"
                placeholder="Tamanho"
              />

              <Input
                type="color"
                value={textColor}
                onChange={(e) => {
                  setTextColor(e.target.value);
                  updateSelectedElement({ style: { ...selectedElement.style, color: e.target.value } });
                }}
                className="w-12 h-8"
              />

              <div className="flex gap-1">
                <Button
                  variant={textBold ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setTextBold(!textBold);
                    updateSelectedElement({ style: { ...selectedElement.style, bold: !textBold } });
                  }}
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant={textItalic ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setTextItalic(!textItalic);
                    updateSelectedElement({ style: { ...selectedElement.style, italic: !textItalic } });
                  }}
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  variant={textUnderline ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setTextUnderline(!textUnderline);
                    updateSelectedElement({ style: { ...selectedElement.style, underline: !textUnderline } });
                  }}
                >
                  <Underline className="h-4 w-4" />
                </Button>
                <Button
                  variant={textStrikethrough ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTextStrikethrough(!textStrikethrough)}
                >
                  <Strikethrough className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-1">
                <Button
                  variant={textAlign === 'left' ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setTextAlign('left');
                    updateSelectedElement({ style: { ...selectedElement.style, align: 'left' } });
                  }}
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant={textAlign === 'center' ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setTextAlign('center');
                    updateSelectedElement({ style: { ...selectedElement.style, align: 'center' } });
                  }}
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  variant={textAlign === 'right' ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setTextAlign('right');
                    updateSelectedElement({ style: { ...selectedElement.style, align: 'right' } });
                  }}
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
                <Button
                  variant={textAlign === 'justify' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTextAlign('justify')}
                >
                  <AlignJustify className="h-4 w-4" />
                </Button>
              </div>

              <Button variant="outline" size="sm">
                <List className="h-4 w-4 mr-1" />
                Lista
              </Button>

              <div className="flex items-center gap-2">
                <Label className="text-sm">Opacidade:</Label>
                <Slider
                  value={[textOpacity]}
                  onValueChange={(value) => setTextOpacity(value[0])}
                  max={100}
                  step={1}
                  className="w-20"
                />
                <span className="text-sm">{textOpacity}%</span>
              </div>

              <Button variant="outline" size="sm">
                <Sparkles className="h-4 w-4 mr-1" />
                Efeitos
              </Button>

              <Button variant="outline" size="sm">
                <Layers className="h-4 w-4 mr-1" />
                Posição
              </Button>
            </div>
          )}

          {/* Canvas Container */}
          <div className="flex-1 flex items-center justify-center p-8 bg-gray-200 overflow-auto">
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                onClick={handleCanvasClick}
                className="border border-gray-300 bg-white shadow-lg cursor-crosshair"
                style={{ transform: `scale(${zoom / 100})` }}
              />
              
              {/* Page Navigation */}
              {totalPages > 1 && (
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2 flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium px-2">
                    {currentPage} / {totalPages}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="bg-white border-t p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setZoom(Math.max(25, zoom - 25))}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Slider
                value={[zoom]}
                onValueChange={(value) => setZoom(value[0])}
                min={25}
                max={200}
                step={25}
                className="w-32"
              />
              <span className="text-sm font-medium w-12">{zoom}%</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setZoom(Math.min(200, zoom + 25))}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={fitToScreen}>
                <Maximize className="h-4 w-4 mr-1" />
                Ajustar tela
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Página {currentPage} de {totalPages}
              </span>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Layers className="h-4 w-4" />
                </Button>
              </div>

              <Button onClick={() => toast.success("Projeto salvo!")}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
