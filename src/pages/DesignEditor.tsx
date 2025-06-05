
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
  AlignRight, Bold, Italic, Underline, Palette, Eye, Layers
} from "lucide-react";
import { toast } from "sonner";

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
  const [selectedTool, setSelectedTool] = useState<string>('select');
  
  // Text editing states
  const [textFont, setTextFont] = useState('Arial');
  const [textSize, setTextSize] = useState(16);
  const [textColor, setTextColor] = useState('#000000');
  const [textBold, setTextBold] = useState(false);
  const [textItalic, setTextItalic] = useState(false);
  const [textUnderline, setTextUnderline] = useState(false);
  const [textAlign, setTextAlign] = useState('left');

  const fonts = [
    'Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Verdana', 
    'Trebuchet MS', 'Impact', 'Comic Sans MS', 'Courier New'
  ];

  const resizeOptions = [
    { name: 'Instagram Post', width: 1080, height: 1080 },
    { name: 'Instagram Story', width: 1080, height: 1920 },
    { name: 'YouTube Thumbnail', width: 1280, height: 720 },
    { name: 'Facebook Post', width: 1200, height: 630 },
    { name: 'LinkedIn Post', width: 1200, height: 627 },
    { name: 'Twitter Post', width: 1200, height: 675 }
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

    // Find clicked element
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

  const handleSave = () => {
    toast.success("Projeto salvo com sucesso!");
  };

  const handleExport = (format: 'PNG' | 'JPG' | 'PDF') => {
    toast.success(`Exportando como ${format}...`);
  };

  return (
    <DashboardLayout>
      <div className="flex h-screen">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-purple-600 text-white p-2 flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700">
            <Menu className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700">
            File
          </Button>
          
          <Select onValueChange={(value) => {
            const size = resizeOptions.find(opt => opt.name === value);
            if (size) handleResize({ width: size.width, height: size.height });
          }}>
            <SelectTrigger className="w-40 bg-purple-700 border-purple-500">
              <SelectValue placeholder="Resize" />
            </SelectTrigger>
            <SelectContent>
              {resizeOptions.map(option => (
                <SelectItem key={option.name} value={option.name}>
                  {option.name}
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

          <div className="flex-1" />

          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700">
              <Share className="h-4 w-4 mr-1" />
              Compartilhar
            </Button>
            
            <Select onValueChange={(format) => handleExport(format as any)}>
              <SelectTrigger className="w-32 bg-purple-700 border-purple-500">
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

        {/* Sidebar */}
        <div className="w-80 bg-gray-50 border-r mt-16 overflow-y-auto">
          <Tabs defaultValue="designs" className="p-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="designs">Design</TabsTrigger>
              <TabsTrigger value="elements">Elementos</TabsTrigger>
              <TabsTrigger value="text">Texto</TabsTrigger>
            </TabsList>

            <TabsContent value="designs" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4">Templates Prontos</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="aspect-square bg-gray-200 rounded cursor-pointer hover:bg-gray-300">
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                          Template {i}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="elements" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4">Formas e Elementos</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">
                      <Shapes className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4">Adicionar Texto</h3>
                  <Button onClick={addTextElement} className="w-full mb-4">
                    <Type className="h-4 w-4 mr-2" />
                    Adicionar Texto
                  </Button>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Fonte</Label>
                      <Select value={textFont} onValueChange={setTextFont}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fonts.map(font => (
                            <SelectItem key={font} value={font}>{font}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Combinações de Fontes</Label>
                      <div className="space-y-2 mt-2">
                        <div className="p-2 border rounded cursor-pointer hover:bg-gray-50">
                          <div className="font-bold">Arial + Georgia</div>
                          <div className="text-sm text-gray-600">Clássica e elegante</div>
                        </div>
                        <div className="p-2 border rounded cursor-pointer hover:bg-gray-50">
                          <div className="font-bold">Impact + Helvetica</div>
                          <div className="text-sm text-gray-600">Moderna e impactante</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col mt-16">
          {/* Text Editing Toolbar */}
          {selectedElement?.type === 'text' && (
            <div className="bg-white border-b p-4 flex items-center gap-4 flex-wrap">
              <Select value={textFont} onValueChange={(value) => {
                setTextFont(value);
                updateSelectedElement({ style: { ...selectedElement.style, font: value } });
              }}>
                <SelectTrigger className="w-32">
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
            </div>
          )}

          {/* Canvas Container */}
          <div className="flex-1 flex items-center justify-center p-8 bg-gray-100 overflow-auto">
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                onClick={handleCanvasClick}
                className="border border-gray-300 bg-white shadow-lg cursor-crosshair"
                style={{ transform: `scale(${zoom / 100})` }}
              />
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="bg-white border-t p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
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
              <span className="text-sm font-medium">{zoom}%</span>
              <Button variant="outline" size="sm">
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Layers className="h-4 w-4" />
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
