
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Download, Share, Image as ImageIcon, Text, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { ContentGenerationData } from "@/pages/CreateContent";
import { toast } from "sonner";

interface VisualEditorProps {
  content: ContentGenerationData | null;
  contentType: string;
}

export function VisualEditor({ content, contentType }: VisualEditorProps) {
  const [activeTab, setActiveTab] = useState("background");
  const [background, setBackground] = useState<{
    type: "color" | "gradient" | "image";
    color: string;
    gradient: {
      colorStart: string;
      colorEnd: string;
      direction: "to-t" | "to-b" | "to-l" | "to-r" | "to-tr" | "to-tl" | "to-br" | "to-bl";
    };
    overlay: {
      enabled: boolean;
      color: string;
      opacity: number;
    };
  }>({
    type: "gradient",
    color: "#ffffff",
    gradient: {
      colorStart: "#9b87f5",
      colorEnd: "#ffffff",
      direction: "to-b",
    },
    overlay: {
      enabled: true,
      color: "#000000",
      opacity: 0.2,
    },
  });

  const [textElements, setTextElements] = useState<Array<{
    id: string;
    content: string;
    fontSize: number;
    fontWeight: "normal" | "bold";
    fontStyle: "normal" | "italic";
    textDecoration: "none" | "underline";
    color: string;
    alignment: "left" | "center" | "right";
    position: { x: number; y: number };
  }>>([
    {
      id: "title",
      content: content?.title || "Título do Conteúdo",
      fontSize: 24,
      fontWeight: "bold",
      fontStyle: "normal",
      textDecoration: "none",
      color: "#ffffff",
      alignment: "center",
      position: { x: 0, y: 0 },
    },
    ...((content?.slides || []).map((slide, index) => ({
      id: `slide-${index}`,
      content: slide,
      fontSize: 18,
      fontWeight: "normal" as const,
      fontStyle: "normal" as const,
      textDecoration: "none" as const,
      color: "#ffffff",
      alignment: "left" as const,
      position: { x: 0, y: 50 + index * 60 },
    })) || []),
  ]);
  
  const [selectedTextId, setSelectedTextId] = useState<string | null>("title");

  const gradientDirections = {
    "to-b": "De cima para baixo",
    "to-t": "De baixo para cima",
    "to-r": "Da esquerda para a direita",
    "to-l": "Da direita para a esquerda",
    "to-tr": "Diagonal (Esq. inferior para Dir. superior)",
    "to-tl": "Diagonal (Dir. inferior para Esq. superior)",
    "to-br": "Diagonal (Esq. superior para Dir. inferior)",
    "to-bl": "Diagonal (Dir. superior para Esq. inferior)",
  };

  const handleGradientChange = (field: keyof typeof background.gradient, value: any) => {
    setBackground({
      ...background,
      gradient: {
        ...background.gradient,
        [field]: value,
      },
    });
  };

  const handleOverlayChange = (field: keyof typeof background.overlay, value: any) => {
    setBackground({
      ...background,
      overlay: {
        ...background.overlay,
        [field]: value,
      },
    });
  };

  const handleTextElementChange = (id: string, field: keyof (typeof textElements)[0], value: any) => {
    setTextElements(textElements.map(el => 
      el.id === id ? { ...el, [field]: value } : el
    ));
  };

  const handleExport = () => {
    // In a real implementation, this would generate and download the image/PDF
    toast.success("Conteúdo exportado com sucesso!", {
      description: "O download deve começar automaticamente.",
    });
  };
  
  const selectedText = textElements.find(el => el.id === selectedTextId) || null;

  const getEditorStyles = () => {
    let bgStyle: React.CSSProperties = {};
    
    if (background.type === "color") {
      bgStyle.backgroundColor = background.color;
    } else if (background.type === "gradient") {
      bgStyle.backgroundImage = `linear-gradient(${background.gradient.direction.replace('to-', '')}, ${background.gradient.colorStart}, ${background.gradient.colorEnd})`;
    }
    
    if (background.overlay.enabled) {
      bgStyle.position = "relative";
    }
    
    return bgStyle;
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="background">Background</TabsTrigger>
                <TabsTrigger value="text">Texto</TabsTrigger>
              </TabsList>
              
              <TabsContent value="background" className="space-y-4">
                <div className="space-y-2">
                  <Label>Tipo de Fundo</Label>
                  <Select value={background.type} onValueChange={(value) => setBackground({ ...background, type: value as any })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="color">Cor Sólida</SelectItem>
                      <SelectItem value="gradient">Degradê</SelectItem>
                      <SelectItem value="image">Imagem (em breve)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {background.type === "color" && (
                  <div className="space-y-2">
                    <Label htmlFor="bgcolor">Cor de Fundo</Label>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded border" style={{ backgroundColor: background.color }}></div>
                      <Input 
                        id="bgcolor" 
                        type="color" 
                        value={background.color} 
                        onChange={(e) => setBackground({ ...background, color: e.target.value })} 
                      />
                    </div>
                  </div>
                )}
                
                {background.type === "gradient" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="gradientStart">Cor Inicial</Label>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded border" style={{ backgroundColor: background.gradient.colorStart }}></div>
                        <Input 
                          id="gradientStart" 
                          type="color" 
                          value={background.gradient.colorStart} 
                          onChange={(e) => handleGradientChange("colorStart", e.target.value)} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gradientEnd">Cor Final</Label>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded border" style={{ backgroundColor: background.gradient.colorEnd }}></div>
                        <Input 
                          id="gradientEnd" 
                          type="color" 
                          value={background.gradient.colorEnd} 
                          onChange={(e) => handleGradientChange("colorEnd", e.target.value)} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gradientDirection">Direção</Label>
                      <Select 
                        value={background.gradient.direction} 
                        onValueChange={(value) => handleGradientChange("direction", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(gradientDirections).map(([value, label]) => (
                            <SelectItem key={value} value={value}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="overlay-toggle">Overlay (Filtro)</Label>
                    <input 
                      id="overlay-toggle" 
                      type="checkbox" 
                      checked={background.overlay.enabled} 
                      onChange={(e) => handleOverlayChange("enabled", e.target.checked)}
                      className="h-4 w-4"
                    />
                  </div>
                  
                  {background.overlay.enabled && (
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <Label htmlFor="overlayColor">Cor do Overlay</Label>
                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded border" style={{ backgroundColor: background.overlay.color }}></div>
                          <Input 
                            id="overlayColor" 
                            type="color" 
                            value={background.overlay.color} 
                            onChange={(e) => handleOverlayChange("color", e.target.value)} 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="overlayOpacity">Opacidade</Label>
                          <span>{Math.round(background.overlay.opacity * 100)}%</span>
                        </div>
                        <Slider 
                          id="overlayOpacity" 
                          min={0} 
                          max={1} 
                          step={0.01} 
                          value={[background.overlay.opacity]} 
                          onValueChange={(values) => handleOverlayChange("opacity", values[0])} 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Label>Selecionar Texto</Label>
                  <Select value={selectedTextId || ""} onValueChange={setSelectedTextId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha um elemento de texto" />
                    </SelectTrigger>
                    <SelectContent>
                      {textElements.map((element) => (
                        <SelectItem key={element.id} value={element.id}>
                          {element.content.length > 20 ? `${element.content.substring(0, 20)}...` : element.content}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedText && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="textContent">Conteúdo</Label>
                      <Textarea 
                        id="textContent" 
                        value={selectedText.content} 
                        onChange={(e) => handleTextElementChange(selectedText.id, "content", e.target.value)} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fontSize">Tamanho da Fonte</Label>
                      <div className="flex items-center gap-2">
                        <Slider 
                          id="fontSize" 
                          min={10} 
                          max={48} 
                          step={1} 
                          value={[selectedText.fontSize]} 
                          onValueChange={(values) => handleTextElementChange(selectedText.id, "fontSize", values[0])} 
                        />
                        <span className="w-10 text-right">{selectedText.fontSize}px</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="textColor">Cor do Texto</Label>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded border" style={{ backgroundColor: selectedText.color }}></div>
                        <Input 
                          id="textColor" 
                          type="color" 
                          value={selectedText.color} 
                          onChange={(e) => handleTextElementChange(selectedText.id, "color", e.target.value)} 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="block mb-2">Estilo</Label>
                        <div className="flex gap-1">
                          <Button 
                            type="button"
                            size="sm"
                            variant={selectedText.fontWeight === "bold" ? "default" : "outline"}
                            onClick={() => handleTextElementChange(
                              selectedText.id, 
                              "fontWeight", 
                              selectedText.fontWeight === "bold" ? "normal" : "bold"
                            )}
                          >
                            <Bold className="h-4 w-4" />
                          </Button>
                          <Button 
                            type="button"
                            size="sm"
                            variant={selectedText.fontStyle === "italic" ? "default" : "outline"}
                            onClick={() => handleTextElementChange(
                              selectedText.id, 
                              "fontStyle", 
                              selectedText.fontStyle === "italic" ? "normal" : "italic"
                            )}
                          >
                            <Italic className="h-4 w-4" />
                          </Button>
                          <Button 
                            type="button"
                            size="sm"
                            variant={selectedText.textDecoration === "underline" ? "default" : "outline"}
                            onClick={() => handleTextElementChange(
                              selectedText.id, 
                              "textDecoration", 
                              selectedText.textDecoration === "underline" ? "none" : "underline"
                            )}
                          >
                            <Underline className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="block mb-2">Alinhamento</Label>
                        <div className="flex gap-1">
                          <Button 
                            type="button"
                            size="sm"
                            variant={selectedText.alignment === "left" ? "default" : "outline"}
                            onClick={() => handleTextElementChange(selectedText.id, "alignment", "left")}
                          >
                            <AlignLeft className="h-4 w-4" />
                          </Button>
                          <Button 
                            type="button"
                            size="sm"
                            variant={selectedText.alignment === "center" ? "default" : "outline"}
                            onClick={() => handleTextElementChange(selectedText.id, "alignment", "center")}
                          >
                            <AlignCenter className="h-4 w-4" />
                          </Button>
                          <Button 
                            type="button"
                            size="sm"
                            variant={selectedText.alignment === "right" ? "default" : "outline"}
                            onClick={() => handleTextElementChange(selectedText.id, "alignment", "right")}
                          >
                            <AlignRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      const newId = `text-${textElements.length}`;
                      setTextElements([
                        ...textElements, 
                        {
                          id: newId,
                          content: "Novo texto",
                          fontSize: 16,
                          fontWeight: "normal",
                          fontStyle: "normal",
                          textDecoration: "none",
                          color: "#ffffff",
                          alignment: "left",
                          position: { x: 10, y: 10 + textElements.length * 30 },
                        }
                      ]);
                      setSelectedTextId(newId);
                    }}
                  >
                    <Text className="h-4 w-4 mr-2" />
                    Adicionar Texto
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="flex flex-col gap-3">
          <Button onClick={handleExport} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Exportar Conteúdo
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Share className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Compartilhar Conteúdo</DialogTitle>
                <DialogDescription>
                  Compartilhe seu conteúdo nas redes sociais ou copie o link.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p className="text-sm text-muted-foreground">
                  Essa funcionalidade estará disponível em breve.
                </p>
                <Input readOnly value="https://autopostai.app/content/exemplo" />
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  navigator.clipboard.writeText("https://autopostai.app/content/exemplo");
                  toast.success("Link copiado para a área de transferência!");
                }}>
                  Copiar Link
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <p className="text-xs text-center text-gray-500 mt-2">
            Plano gratuito: conteúdo exportado terá marca d'água.{" "}
            <a href="/pricing" className="text-purple-600 hover:underline">Upgrade</a>
          </p>
        </div>
      </div>
      
      <div className="lg:col-span-2">
        <Card className="bg-white overflow-hidden">
          <CardContent className="p-0">
            <div className="w-full flex justify-center">
              <div className="w-full max-w-lg aspect-[9/16] sm:aspect-video overflow-hidden relative">
                <div 
                  className="w-full h-full p-6"
                  style={getEditorStyles()}
                >
                  {background.overlay.enabled && (
                    <div 
                      className="absolute inset-0" 
                      style={{ 
                        backgroundColor: background.overlay.color,
                        opacity: background.overlay.opacity,
                      }}
                    ></div>
                  )}
                  
                  <div className="relative z-10">
                    {textElements.map((element) => (
                      <div 
                        key={element.id}
                        className={`mb-4 cursor-pointer ${element.id === selectedTextId ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                        style={{
                          fontWeight: element.fontWeight,
                          fontStyle: element.fontStyle,
                          textDecoration: element.textDecoration,
                          color: element.color,
                          fontSize: `${element.fontSize}px`,
                          textAlign: element.alignment,
                        }}
                        onClick={() => setSelectedTextId(element.id)}
                      >
                        {element.content}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {contentType === "carrossel" && (
          <div className="mt-6 space-y-2">
            <Label>Preview de Slides</Label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <div 
                  key={num}
                  className={`aspect-square rounded-md border overflow-hidden ${num === 1 ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                  style={getEditorStyles()}
                >
                  <div className="w-full h-full p-2 flex items-center justify-center relative">
                    {background.overlay.enabled && (
                      <div 
                        className="absolute inset-0" 
                        style={{ 
                          backgroundColor: background.overlay.color,
                          opacity: background.overlay.opacity,
                        }}
                      ></div>
                    )}
                    
                    <p className="text-[8px] text-center relative z-10" style={{ color: textElements[0]?.color || "#fff" }}>
                      Slide {num}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {content?.caption && (
          <div className="mt-6 space-y-2">
            <Label>Legenda Gerada</Label>
            <div className="bg-white text-sm p-4 rounded-md border">
              {content.caption}
              <div className="mt-2">
                {content.hashtags?.map((tag) => (
                  <span key={tag} className="mr-1 text-blue-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                const text = `${content.caption}\n\n${content.hashtags?.join(' ')}`;
                navigator.clipboard.writeText(text);
                toast.success("Legenda copiada para a área de transferência!");
              }}
            >
              Copiar Legenda
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
