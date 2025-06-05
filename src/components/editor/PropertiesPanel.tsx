
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  AlignJustify, Palette, Shadow, Sparkles, Play, Copy, Trash2,
  RotateCcw, FlipHorizontal, FlipVertical, Move, Lock, Eye,
  EyeOff, ChevronUp, ChevronDown
} from "lucide-react";
import { DesignElement } from "@/types/editor";

interface PropertiesPanelProps {
  selectedElement: DesignElement | null;
  onUpdateElement: (id: string, updates: Partial<DesignElement>) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement: (id: string) => void;
}

export function PropertiesPanel({ 
  selectedElement, 
  onUpdateElement, 
  onDeleteElement, 
  onDuplicateElement 
}: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState("style");

  if (!selectedElement) {
    return (
      <div className="w-80 bg-white border-l p-4 flex items-center justify-center text-gray-500">
        Selecione um elemento para editar suas propriedades
      </div>
    );
  }

  const updateStyle = (styleUpdates: any) => {
    onUpdateElement(selectedElement.id, {
      style: { ...selectedElement.style, ...styleUpdates }
    });
  };

  const updateFilters = (filterUpdates: any) => {
    onUpdateElement(selectedElement.id, {
      filters: { ...selectedElement.filters, ...filterUpdates }
    });
  };

  const fonts = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins',
    'Nunito', 'Arial', 'Helvetica', 'Georgia', 'Times New Roman',
    'Verdana', 'Trebuchet MS', 'Impact', 'Comic Sans MS', 'Courier New'
  ];

  return (
    <div className="w-80 bg-white border-l overflow-y-auto">
      <div className="p-4">
        {/* Element Info */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span>{selectedElement.name || selectedElement.type}</span>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onUpdateElement(selectedElement.id, { visible: !selectedElement.visible })}
                >
                  {selectedElement.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onUpdateElement(selectedElement.id, { locked: !selectedElement.locked })}
                >
                  <Lock className="h-3 w-3" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => onDuplicateElement(selectedElement.id)}
              >
                <Copy className="h-3 w-3 mr-1" />
                Duplicar
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600 hover:text-red-700"
                onClick={() => onDeleteElement(selectedElement.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Properties Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="style" className="text-xs">Estilo</TabsTrigger>
            <TabsTrigger value="effects" className="text-xs">Efeitos</TabsTrigger>
            <TabsTrigger value="position" className="text-xs">Posição</TabsTrigger>
            <TabsTrigger value="animate" className="text-xs">Animar</TabsTrigger>
          </TabsList>

          <TabsContent value="style" className="space-y-4 mt-4">
            {selectedElement.type === 'text' && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Texto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-xs">Fonte</Label>
                    <Select 
                      value={selectedElement.style?.fontFamily || 'Inter'}
                      onValueChange={(value) => updateStyle({ fontFamily: value })}
                    >
                      <SelectTrigger className="w-full">
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
                    <Label className="text-xs">Tamanho</Label>
                    <Input
                      type="number"
                      value={selectedElement.style?.fontSize || 16}
                      onChange={(e) => updateStyle({ fontSize: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Cor</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={selectedElement.style?.color || '#000000'}
                        onChange={(e) => updateStyle({ color: e.target.value })}
                        className="w-12 h-8"
                      />
                      <Input
                        value={selectedElement.style?.color || '#000000'}
                        onChange={(e) => updateStyle({ color: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <Button
                      variant={selectedElement.style?.fontWeight === 'bold' ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStyle({ 
                        fontWeight: selectedElement.style?.fontWeight === 'bold' ? 'normal' : 'bold' 
                      })}
                    >
                      <Bold className="h-3 w-3" />
                    </Button>
                    <Button
                      variant={selectedElement.style?.fontStyle === 'italic' ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStyle({ 
                        fontStyle: selectedElement.style?.fontStyle === 'italic' ? 'normal' : 'italic' 
                      })}
                    >
                      <Italic className="h-3 w-3" />
                    </Button>
                    <Button
                      variant={selectedElement.style?.textDecoration === 'underline' ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStyle({ 
                        textDecoration: selectedElement.style?.textDecoration === 'underline' ? 'none' : 'underline' 
                      })}
                    >
                      <Underline className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex gap-1">
                    <Button
                      variant={selectedElement.style?.textAlign === 'left' ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStyle({ textAlign: 'left' })}
                    >
                      <AlignLeft className="h-3 w-3" />
                    </Button>
                    <Button
                      variant={selectedElement.style?.textAlign === 'center' ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStyle({ textAlign: 'center' })}
                    >
                      <AlignCenter className="h-3 w-3" />
                    </Button>
                    <Button
                      variant={selectedElement.style?.textAlign === 'right' ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStyle({ textAlign: 'right' })}
                    >
                      <AlignRight className="h-3 w-3" />
                    </Button>
                    <Button
                      variant={selectedElement.style?.textAlign === 'justify' ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStyle({ textAlign: 'justify' })}
                    >
                      <AlignJustify className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedElement.type === 'shape' && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Forma</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-xs">Cor de Preenchimento</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={selectedElement.style?.fill || '#8B5CF6'}
                        onChange={(e) => updateStyle({ fill: e.target.value })}
                        className="w-12 h-8"
                      />
                      <Input
                        value={selectedElement.style?.fill || '#8B5CF6'}
                        onChange={(e) => updateStyle({ fill: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs">Cor da Borda</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={selectedElement.style?.stroke || '#000000'}
                        onChange={(e) => updateStyle({ stroke: e.target.value })}
                        className="w-12 h-8"
                      />
                      <Input
                        value={selectedElement.style?.stroke || '#000000'}
                        onChange={(e) => updateStyle({ stroke: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs">Espessura da Borda</Label>
                    <Slider
                      value={[selectedElement.style?.strokeWidth || 0]}
                      onValueChange={(value) => updateStyle({ strokeWidth: value[0] })}
                      max={20}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {selectedElement.style?.shapeType === 'rectangle' && (
                    <div>
                      <Label className="text-xs">Arredondamento</Label>
                      <Slider
                        value={[selectedElement.style?.borderRadius || 0]}
                        onValueChange={(value) => updateStyle({ borderRadius: value[0] })}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Transparência</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label className="text-xs">Opacidade: {selectedElement.opacity || 100}%</Label>
                  <Slider
                    value={[selectedElement.opacity || 100]}
                    onValueChange={(value) => onUpdateElement(selectedElement.id, { opacity: value[0] })}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="effects" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Shadow className="h-4 w-4 mr-2" />
                  Sombra
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={selectedElement.style?.shadow || false}
                    onCheckedChange={(checked) => updateStyle({ shadow: checked })}
                  />
                  <Label className="text-xs">Ativar sombra</Label>
                </div>

                {selectedElement.style?.shadow && (
                  <>
                    <div>
                      <Label className="text-xs">Cor da Sombra</Label>
                      <Input
                        type="color"
                        value={selectedElement.style?.shadowColor || '#000000'}
                        onChange={(e) => updateStyle({ shadowColor: e.target.value })}
                        className="w-full h-8"
                      />
                    </div>

                    <div>
                      <Label className="text-xs">Desfoque: {selectedElement.style?.shadowBlur || 4}px</Label>
                      <Slider
                        value={[selectedElement.style?.shadowBlur || 4]}
                        onValueChange={(value) => updateStyle({ shadowBlur: value[0] })}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label className="text-xs">Offset X: {selectedElement.style?.shadowOffsetX || 2}px</Label>
                      <Slider
                        value={[selectedElement.style?.shadowOffsetX || 2]}
                        onValueChange={(value) => updateStyle({ shadowOffsetX: value[0] })}
                        min={-50}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label className="text-xs">Offset Y: {selectedElement.style?.shadowOffsetY || 2}px</Label>
                      <Slider
                        value={[selectedElement.style?.shadowOffsetY || 2]}
                        onValueChange={(value) => updateStyle({ shadowOffsetY: value[0] })}
                        min={-50}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs">Desfoque: {selectedElement.filters?.blur || 0}px</Label>
                  <Slider
                    value={[selectedElement.filters?.blur || 0]}
                    onValueChange={(value) => updateFilters({ blur: value[0] })}
                    max={20}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-xs">Brilho: {selectedElement.filters?.brightness || 100}%</Label>
                  <Slider
                    value={[selectedElement.filters?.brightness || 100]}
                    onValueChange={(value) => updateFilters({ brightness: value[0] })}
                    min={0}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-xs">Contraste: {selectedElement.filters?.contrast || 100}%</Label>
                  <Slider
                    value={[selectedElement.filters?.contrast || 100]}
                    onValueChange={(value) => updateFilters({ contrast: value[0] })}
                    min={0}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-xs">Saturação: {selectedElement.filters?.saturate || 100}%</Label>
                  <Slider
                    value={[selectedElement.filters?.saturate || 100]}
                    onValueChange={(value) => updateFilters({ saturate: value[0] })}
                    min={0}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="position" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Move className="h-4 w-4 mr-2" />
                  Posição e Tamanho
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">X</Label>
                    <Input
                      type="number"
                      value={Math.round(selectedElement.x)}
                      onChange={(e) => onUpdateElement(selectedElement.id, { x: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Y</Label>
                    <Input
                      type="number"
                      value={Math.round(selectedElement.y)}
                      onChange={(e) => onUpdateElement(selectedElement.id, { y: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Largura</Label>
                    <Input
                      type="number"
                      value={Math.round(selectedElement.width)}
                      onChange={(e) => onUpdateElement(selectedElement.id, { width: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Altura</Label>
                    <Input
                      type="number"
                      value={Math.round(selectedElement.height)}
                      onChange={(e) => onUpdateElement(selectedElement.id, { height: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Rotação: {selectedElement.rotation || 0}°</Label>
                  <Slider
                    value={[selectedElement.rotation || 0]}
                    onValueChange={(value) => onUpdateElement(selectedElement.id, { rotation: value[0] })}
                    min={-180}
                    max={180}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <FlipHorizontal className="h-3 w-3 mr-1" />
                    Espelhar H
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <FlipVertical className="h-3 w-3 mr-1" />
                    Espelhar V
                  </Button>
                </div>

                <div>
                  <Label className="text-xs">Camada</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ChevronUp className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="animate" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Play className="h-4 w-4 mr-2" />
                  Animação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs">Tipo de Animação</Label>
                  <Select defaultValue="none">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma animação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhuma</SelectItem>
                      <SelectItem value="fadeIn">Fade In</SelectItem>
                      <SelectItem value="slideIn">Slide In</SelectItem>
                      <SelectItem value="bounce">Bounce</SelectItem>
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="rotate">Rotate</SelectItem>
                      <SelectItem value="pulse">Pulse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs">Duração (segundos)</Label>
                  <Slider
                    defaultValue={[1]}
                    max={5}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-xs">Delay (segundos)</Label>
                  <Slider
                    defaultValue={[0]}
                    max={3}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label className="text-xs">Repetir animação</Label>
                </div>

                <Button className="w-full">
                  <Play className="h-3 w-3 mr-2" />
                  Preview Animação
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
