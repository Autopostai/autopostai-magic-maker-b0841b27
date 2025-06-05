import { useState, useRef, useEffect } from "react";
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
  FlipVertical, Sliders, Sparkles, Settings, FolderOpen, Grid3X3,
  Wand2, Sun, Strikethrough, List, AlignJustify, Plus, Minus,
  Search, Circle, Square, Triangle, Star, Heart, Zap
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SimpleNavMenu } from "@/components/SimpleNavMenu";

interface DesignElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'sticker' | 'graphic';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  style?: any;
  selected?: boolean;
  locked?: boolean;
  visible?: boolean;
  name?: string;
  zIndex?: number;
}

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  element: DesignElement;
}

export default function DesignEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<DesignElement | null>(null);
  const [zoom, setZoom] = useState(100);
  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1350 });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mainMenuCollapsed, setMainMenuCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [projectName, setProjectName] = useState("Projeto sem título");
  const [showLayers, setShowLayers] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [layers, setLayers] = useState<Layer[]>([]);
  
  // Text editing states
  const [textFont, setTextFont] = useState('Inter');
  const [textSize, setTextSize] = useState(16);
  const [textColor, setTextColor] = useState('#000000');
  const [textBold, setTextBold] = useState(false);
  const [textItalic, setTextItalic] = useState(false);
  const [textUnderline, setTextUnderline] = useState(false);
  const [textStrikethrough, setTextStrikethrough] = useState(false);
  const [textAlign, setTextAlign] = useState('left');
  const [textOpacity, setTextOpacity] = useState(100);

  const fonts = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 
    'Nunito', 'Arial', 'Helvetica', 'Georgia', 'Times New Roman', 
    'Verdana', 'Trebuchet MS', 'Impact', 'Comic Sans MS', 'Courier New'
  ];

  const resizeOptions = [
    { name: 'Instagram Post (Feed)', width: 1080, height: 1350 },
    { name: 'Instagram Square', width: 1080, height: 1080 },
    { name: 'Instagram Story', width: 1080, height: 1920 },
    { name: 'YouTube Thumbnail', width: 1280, height: 720 },
    { name: 'Facebook Post', width: 1200, height: 630 },
    { name: 'Carrossel Instagram', width: 1080, height: 1350 },
    { name: 'LinkedIn Post', width: 1200, height: 627 },
    { name: 'Twitter Post', width: 1200, height: 675 },
    { name: 'Apresentação 16:9', width: 1920, height: 1080 },
    { name: 'A4 Retrato', width: 2480, height: 3508 },
    { name: 'Tamanho Personalizado', width: 0, height: 0 }
  ];

  const shapes = [
    { name: 'Círculo', icon: Circle, type: 'circle' },
    { name: 'Quadrado', icon: Square, type: 'rectangle' },
    { name: 'Triângulo', icon: Triangle, type: 'triangle' },
    { name: 'Estrela', icon: Star, type: 'star' },
    { name: 'Coração', icon: Heart, type: 'heart' }
  ];

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawCanvas(ctx);
      }
    }
  }, [elements, zoom, canvasSize, canvasOffset, showGrid]);

  useEffect(() => {
    // Update layers when elements change
    const newLayers: Layer[] = elements.map((element, index) => ({
      id: element.id,
      name: element.name || `${element.type} ${index + 1}`,
      visible: element.visible !== false,
      locked: element.locked || false,
      element
    }));
    setLayers(newLayers);
  }, [elements]);

  const drawCanvas = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fill background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // Draw grid if enabled
    if (showGrid) {
      drawGrid(ctx);
    }

    // Draw elements sorted by zIndex
    const sortedElements = [...elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
    
    sortedElements.forEach(element => {
      if (element.visible === false) return;
      
      ctx.save();
      ctx.globalAlpha = (element.style?.opacity || 100) / 100;
      
      if (element.type === 'text' && element.content) {
        drawTextElement(ctx, element);
      } else if (element.type === 'shape') {
        drawShapeElement(ctx, element);
      }
      
      // Draw selection border
      if (element.selected) {
        drawSelectionBorder(ctx, element);
      }
      
      ctx.restore();
    });
  };

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const gridSize = 20;
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    
    for (let x = 0; x <= canvasSize.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasSize.height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= canvasSize.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasSize.width, y);
      ctx.stroke();
    }
  };

  const drawTextElement = (ctx: CanvasRenderingContext2D, element: DesignElement) => {
    const style = element.style || {};
    let fontSize = style.size || 16;
    let fontFamily = style.font || 'Inter';
    
    ctx.font = `${style.bold ? 'bold' : 'normal'} ${style.italic ? 'italic' : 'normal'} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = style.color || '#000000';
    ctx.textAlign = style.align || 'left';
    
    const lines = (element.content || '').split('\n');
    const lineHeight = fontSize * 1.2;
    
    lines.forEach((line, index) => {
      ctx.fillText(line, element.x, element.y + (index * lineHeight) + fontSize);
    });
  };

  const drawShapeElement = (ctx: CanvasRenderingContext2D, element: DesignElement) => {
    const style = element.style || {};
    ctx.fillStyle = style.fill || '#8B5CF6';
    ctx.strokeStyle = style.stroke || 'transparent';
    ctx.lineWidth = style.strokeWidth || 0;
    
    const { x, y, width, height } = element;
    
    switch (style.shapeType) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(x + width/2, y + height/2, Math.min(width, height)/2, 0, 2 * Math.PI);
        ctx.fill();
        if (style.strokeWidth > 0) ctx.stroke();
        break;
      case 'rectangle':
        if (style.borderRadius) {
          drawRoundedRect(ctx, x, y, width, height, style.borderRadius);
        } else {
          ctx.fillRect(x, y, width, height);
        }
        if (style.strokeWidth > 0) ctx.strokeRect(x, y, width, height);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(x + width/2, y);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x + width, y + height);
        ctx.closePath();
        ctx.fill();
        if (style.strokeWidth > 0) ctx.stroke();
        break;
    }
  };

  const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  };

  const drawSelectionBorder = (ctx: CanvasRenderingContext2D, element: DesignElement) => {
    ctx.strokeStyle = '#8B5CF6';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(element.x - 5, element.y - 5, element.width + 10, element.height + 10);
    ctx.setLineDash([]);
    
    // Draw resize handles
    const handleSize = 8;
    ctx.fillStyle = '#8B5CF6';
    const handles = [
      { x: element.x - handleSize/2, y: element.y - handleSize/2 },
      { x: element.x + element.width - handleSize/2, y: element.y - handleSize/2 },
      { x: element.x - handleSize/2, y: element.y + element.height - handleSize/2 },
      { x: element.x + element.width - handleSize/2, y: element.y + element.height - handleSize/2 }
    ];
    
    handles.forEach(handle => {
      ctx.fillRect(handle.x, handle.y, handleSize, handleSize);
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
        align: textAlign,
        opacity: textOpacity
      },
      visible: true,
      locked: false,
      zIndex: elements.length,
      name: `Texto ${elements.length + 1}`
    };
    
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement);
    toast.success("Elemento de texto adicionado!");
  };

  const addShapeElement = (shapeType: string) => {
    const newElement: DesignElement = {
      id: `shape-${Date.now()}`,
      type: 'shape',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      style: {
        shapeType,
        fill: '#8B5CF6',
        opacity: 100,
        borderRadius: shapeType === 'rectangle' ? 0 : undefined
      },
      visible: true,
      locked: false,
      zIndex: elements.length,
      name: `${shapeType} ${elements.length + 1}`
    };
    
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement);
    toast.success(`${shapeType} adicionado!`);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (zoom / 100) - canvasOffset.x;
    const y = (e.clientY - rect.top) / (zoom / 100) - canvasOffset.y;

    const clickedElement = elements.find(element => 
      x >= element.x && x <= element.x + element.width &&
      y >= element.y && y <= element.y + element.height && 
      element.visible !== false
    );

    if (clickedElement && !clickedElement.locked) {
      setElements(prev => prev.map(el => ({ ...el, selected: el.id === clickedElement.id })));
      setSelectedElement(clickedElement);
      setIsDragging(true);
      setDragStart({ x: x - clickedElement.x, y: y - clickedElement.y });
    } else {
      setElements(prev => prev.map(el => ({ ...el, selected: false })));
      setSelectedElement(null);
      setIsDragging(true);
      setDragStart({ x, y });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (zoom / 100) - canvasOffset.x;
    const y = (e.clientY - rect.top) / (zoom / 100) - canvasOffset.y;

    if (selectedElement) {
      // Move selected element
      const newX = x - dragStart.x;
      const newY = y - dragStart.y;
      
      updateSelectedElement({ x: newX, y: newY });
    } else {
      // Pan canvas
      const deltaX = x - dragStart.x;
      const deltaY = y - dragStart.y;
      setCanvasOffset(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (e.shiftKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -10 : 10;
      setZoom(prev => Math.max(25, Math.min(200, prev + delta)));
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

  const toggleLayerVisibility = (layerId: string) => {
    setElements(prev => prev.map(el => 
      el.id === layerId ? { ...el, visible: !el.visible } : el
    ));
  };

  const toggleLayerLock = (layerId: string) => {
    setElements(prev => prev.map(el => 
      el.id === layerId ? { ...el, locked: !el.locked } : el
    ));
  };

  const deleteSelectedElement = () => {
    if (!selectedElement) return;
    
    setElements(prev => prev.filter(el => el.id !== selectedElement.id));
    setSelectedElement(null);
    toast.success("Elemento removido!");
  };

  const duplicateSelectedElement = () => {
    if (!selectedElement) return;
    
    const newElement = {
      ...selectedElement,
      id: `${selectedElement.type}-${Date.now()}`,
      x: selectedElement.x + 20,
      y: selectedElement.y + 20,
      selected: false,
      name: `${selectedElement.name} - Cópia`
    };
    
    setElements(prev => [...prev, newElement]);
    toast.success("Elemento duplicado!");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-purple-600 text-white p-3 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-purple-700"
              onClick={() => setMainMenuCollapsed(!mainMenuCollapsed)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-purple-700"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Layers className="h-4 w-4" />
            </Button>
          </div>
          
          <Menubar className="bg-transparent border-none">
            <MenubarMenu>
              <MenubarTrigger className="text-white hover:bg-purple-700 px-3 py-1 rounded">
                Arquivo
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

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700">
                Redimensionar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Redimensionar Canvas</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {resizeOptions.map(option => (
                  <Button
                    key={option.name}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      if (option.width > 0) {
                        handleResize({ width: option.width, height: option.height });
                        toast.success(`Canvas redimensionado para ${option.name}`);
                      }
                    }}
                  >
                    {option.name} {option.width > 0 && `(${option.width}x${option.height})`}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>

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
        {/* Main Menu */}
        {!mainMenuCollapsed && (
          <div className="w-64 bg-white border-r">
            <SimpleNavMenu />
          </div>
        )}

        {/* Sidebar */}
        {!sidebarCollapsed && (
          <div className="w-80 bg-white border-r overflow-y-auto">
            <Tabs defaultValue="elementos" className="p-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="design" className="text-xs">Design</TabsTrigger>
                <TabsTrigger value="elementos" className="text-xs">Elementos</TabsTrigger>
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

              <TabsContent value="elementos" className="space-y-4 mt-4">
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
                    </CardContent>
                  </Card>

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

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-4 flex items-center">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Graphics
                      </h3>
                      <div className="space-y-2">
                        <Input placeholder="Buscar gráficos..." className="mb-3" />
                        <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="aspect-square bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors">
                              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                                Icon {i}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-4 flex items-center">
                        <Zap className="h-4 w-4 mr-2" />
                        Stickers
                      </h3>
                      <div className="space-y-2">
                        <Input placeholder="Buscar stickers..." className="mb-3" />
                        <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="aspect-square bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors">
                              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                                Sticker {i}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-4 flex items-center">
                        <Image className="h-4 w-4 mr-2" />
                        Photos
                      </h3>
                      <div className="space-y-2">
                        <Input placeholder="Buscar fotos..." className="mb-3" />
                        <Button variant="outline" className="w-full mb-3">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload de fotos
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-square bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors">
                              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                                Foto {i}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-4 flex items-center">
                        <Grid className="h-4 w-4 mr-2" />
                        Frames & Grids
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                          <div key={i} className="aspect-square bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300">
                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                              Grid {i}
                            </div>
                          </div>
                        ))}
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
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm">Opacidade:</Label>
                <Slider
                  value={[textOpacity]}
                  onValueChange={(value) => {
                    setTextOpacity(value[0]);
                    updateSelectedElement({ style: { ...selectedElement.style, opacity: value[0] } });
                  }}
                  max={100}
                  step={1}
                  className="w-20"
                />
                <span className="text-sm">{textOpacity}%</span>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={deleteSelectedElement}
                className="text-red-600 hover:text-red-700"
              >
                Excluir
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={duplicateSelectedElement}
              >
                Duplicar
              </Button>
            </div>
          )}

          {/* Shape Editing Toolbar */}
          {selectedElement?.type === 'shape' && (
            <div className="bg-white border-b p-4 flex items-center gap-4 flex-wrap">
              <Input
                type="color"
                value={selectedElement.style?.fill || '#8B5CF6'}
                onChange={(e) => {
                  updateSelectedElement({ 
                    style: { ...selectedElement.style, fill: e.target.value } 
                  });
                }}
                className="w-12 h-8"
              />

              <div className="flex items-center gap-2">
                <Label className="text-sm">Opacidade:</Label>
                <Slider
                  value={[selectedElement.style?.opacity || 100]}
                  onValueChange={(value) => {
                    updateSelectedElement({ 
                      style: { ...selectedElement.style, opacity: value[0] } 
                    });
                  }}
                  max={100}
                  step={1}
                  className="w-20"
                />
                <span className="text-sm">{selectedElement.style?.opacity || 100}%</span>
              </div>

              {selectedElement.style?.shapeType === 'rectangle' && (
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Arredondamento:</Label>
                  <Slider
                    value={[selectedElement.style?.borderRadius || 0]}
                    onValueChange={(value) => {
                      updateSelectedElement({ 
                        style: { ...selectedElement.style, borderRadius: value[0] } 
                      });
                    }}
                    max={50}
                    step={1}
                    className="w-20"
                  />
                  <span className="text-sm">{selectedElement.style?.borderRadius || 0}px</span>
                </div>
              )}

              <Button 
                variant="outline" 
                size="sm" 
                onClick={deleteSelectedElement}
                className="text-red-600 hover:text-red-700"
              >
                Excluir
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={duplicateSelectedElement}
              >
                Duplicar
              </Button>
            </div>
          )}

          {/* Canvas Container */}
          <div className="flex-1 flex bg-gray-200 overflow-hidden relative">
            {/* Canvas */}
            <div 
              ref={containerRef}
              className="flex-1 flex items-center justify-center p-8 overflow-auto"
              style={{ transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px)` }}
            >
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={canvasSize.width}
                  height={canvasSize.height}
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  onWheel={handleWheel}
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

                {/* Add Page Button */}
                <Button
                  className="absolute -right-16 top-1/2 transform -translate-y-1/2"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setTotalPages(prev => prev + 1);
                    setCurrentPage(totalPages + 1);
                    toast.success("Nova página adicionada!");
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Layers Panel */}
            {showLayers && (
              <div className="w-80 bg-white border-l overflow-y-auto">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Camadas</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowLayers(false)}
                    >
                      ✕
                    </Button>
                  </div>
                  <ScrollArea className="h-96">
                    <div className="space-y-2">
                      {layers.reverse().map((layer) => (
                        <div 
                          key={layer.id}
                          className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-50 ${
                            layer.element.selected ? 'bg-purple-50 border border-purple-200' : ''
                          }`}
                          onClick={() => {
                            setElements(prev => prev.map(el => ({ ...el, selected: el.id === layer.id })));
                            setSelectedElement(layer.element);
                          }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLayerVisibility(layer.id);
                            }}
                          >
                            {layer.visible ? <Eye className="h-3 w-3" /> : <Eye className="h-3 w-3 opacity-50" />}
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLayerLock(layer.id);
                            }}
                          >
                            {layer.locked ? "🔒" : "🔓"}
                          </Button>
                          
                          <span className="text-sm flex-1 truncate">{layer.name}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}
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
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setZoom(100);
                  setCanvasOffset({ x: 0, y: 0 });
                }}
              >
                <Maximize className="h-4 w-4 mr-1" />
                Ajustar tela
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Página {currentPage} de {totalPages}
              </span>
              
              <div className="flex gap-2">
                <Button 
                  variant={showGrid ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setShowGrid(!showGrid)}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={showLayers ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setShowLayers(!showLayers)}
                >
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
