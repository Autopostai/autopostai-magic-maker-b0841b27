
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Menu, Share, Save, Download, Undo, Redo, ZoomIn, ZoomOut, 
  Grid, Layers, Plus, Maximize, Settings, Eye, Sparkles,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DesignElement, CanvasSettings } from "@/types/editor";
import { ToolsSidebar } from "./ToolsSidebar";
import { InfiniteCanvas } from "./InfiniteCanvas";
import { FloatingToolbar } from "./FloatingToolbar";
import { LayersPanel } from "./LayersPanel";

export function CanvaEditor() {
  // Core state
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<DesignElement | null>(null);
  const [canvasSettings, setCanvasSettings] = useState<CanvasSettings>({
    width: 1080,
    height: 1350,
    backgroundColor: '#ffffff'
  });
  
  // UI state
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [projectName, setProjectName] = useState("Projeto sem título");
  const [showGrid, setShowGrid] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // History
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Preset sizes
  const presetSizes = [
    { name: 'Instagram Post (Feed)', width: 1080, height: 1350 },
    { name: 'Instagram Square', width: 1080, height: 1080 },
    { name: 'Instagram Story', width: 1080, height: 1920 },
    { name: 'YouTube Thumbnail', width: 1280, height: 720 },
    { name: 'Facebook Post', width: 1200, height: 630 },
    { name: 'LinkedIn Post', width: 1200, height: 627 },
    { name: 'Twitter Post', width: 1200, height: 675 },
    { name: 'Apresentação 16:9', width: 1920, height: 1080 },
    { name: 'A4 Retrato', width: 2480, height: 3508 },
  ];

  // Auto-save functionality
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      saveProject();
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [elements, canvasSettings, projectName]);

  // Add element function
  const addElement = (elementData: Partial<DesignElement>) => {
    const newElement: DesignElement = {
      id: `${elementData.type}-${Date.now()}`,
      type: elementData.type!,
      x: elementData.x || 100,
      y: elementData.y || 100,
      width: elementData.width || 200,
      height: elementData.height || 50,
      content: elementData.content,
      style: elementData.style,
      visible: true,
      locked: false,
      opacity: 100,
      zIndex: elements.length,
      name: elementData.name || `${elementData.type} ${elements.length + 1}`,
      ...elementData
    };
    
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement);
    saveToHistory();
    toast.success("Elemento adicionado!");
  };

  // Update element function
  const updateElement = (id: string, updates: Partial<DesignElement>) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
    
    if (selectedElement?.id === id) {
      setSelectedElement(prev => prev ? { ...prev, ...updates } : null);
    }
    
    saveToHistory();
  };

  // Delete element function
  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement?.id === id) {
      setSelectedElement(null);
    }
    toast.success("Elemento removido!");
    saveToHistory();
  };

  // Duplicate element function
  const duplicateElement = (id: string) => {
    const element = elements.find(el => el.id === id);
    if (!element) return;
    
    const newElement = {
      ...element,
      id: `${element.type}-${Date.now()}`,
      x: element.x + 20,
      y: element.y + 20,
      name: `${element.name} - Cópia`,
      selected: false
    };
    
    setElements(prev => [...prev, newElement]);
    toast.success("Elemento duplicado!");
    saveToHistory();
  };

  // History management
  const saveToHistory = () => {
    const newHistoryItem = {
      elements: [...elements],
      canvasSettings: { ...canvasSettings },
      timestamp: Date.now()
    };
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newHistoryItem);
    
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      const prevState = history[historyIndex - 1];
      setElements(prevState.elements);
      setCanvasSettings(prevState.canvasSettings);
      setSelectedElement(null);
      toast.success("Ação desfeita!");
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      const nextState = history[historyIndex + 1];
      setElements(nextState.elements);
      setCanvasSettings(nextState.canvasSettings);
      setSelectedElement(null);
      toast.success("Ação refeita!");
    }
  };

  // Canvas resize function
  const handleResize = (size: { width: number; height: number }) => {
    setCanvasSettings(prev => ({ ...prev, ...size }));
    saveToHistory();
    toast.success(`Canvas redimensionado para ${size.width}x${size.height}`);
  };

  // Zoom functions
  const zoomIn = () => setZoom(prev => Math.min(500, prev + 25));
  const zoomOut = () => setZoom(prev => Math.max(25, prev - 25));
  const resetZoom = () => setZoom(100);

  // Save project
  const saveProject = () => {
    const projectData = {
      name: projectName,
      elements,
      canvasSettings,
      currentPage,
      totalPages,
      timestamp: Date.now()
    };
    
    localStorage.setItem('current-project', JSON.stringify(projectData));
  };

  // Export project
  const exportProject = (format: string) => {
    toast.success(`Exportando como ${format}...`);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b h-16 flex items-center justify-between px-4 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Logo and Menu */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 p-1.5 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent font-bold text-xl">
                AutoPostAI
              </span>
            </div>
          </div>

          {/* Project Name */}
          <Input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-64 border-none bg-transparent text-lg font-medium focus-visible:ring-0"
            placeholder="Nome do projeto"
          />

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  Redimensionar
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Redimensionar Canvas</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  {presetSizes.map(preset => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleResize({ width: preset.width, height: preset.height })}
                    >
                      {preset.name} ({preset.width}x{preset.height})
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              variant="ghost" 
              size="sm"
              onClick={undo}
              disabled={historyIndex <= 0}
            >
              <Undo className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4 mr-2" />
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
          
          <Button onClick={saveProject} variant="ghost" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
          
          <Select onValueChange={exportProject}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Baixar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PNG">PNG</SelectItem>
              <SelectItem value="JPG">JPG</SelectItem>
              <SelectItem value="PDF">PDF</SelectItem>
              <SelectItem value="SVG">SVG</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Tools Sidebar */}
        {!sidebarCollapsed && (
          <ToolsSidebar onAddElement={addElement} />
        )}

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col relative">
          <InfiniteCanvas
            ref={canvasRef}
            elements={elements}
            selectedElement={selectedElement}
            canvasSettings={canvasSettings}
            zoom={zoom}
            showGrid={showGrid}
            onElementSelect={setSelectedElement}
            onElementUpdate={updateElement}
            onElementMove={(id, x, y) => updateElement(id, { x, y })}
            onElementDelete={deleteElement}
          />

          {/* Floating Toolbar */}
          {selectedElement && (
            <FloatingToolbar
              element={selectedElement}
              onUpdate={(updates) => updateElement(selectedElement.id, updates)}
              onDelete={() => deleteElement(selectedElement.id)}
              onDuplicate={() => duplicateElement(selectedElement.id)}
            />
          )}

          {/* Page Navigation */}
          {totalPages > 1 && (
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 flex items-center gap-2">
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

        {/* Layers Panel */}
        {showLayers && (
          <LayersPanel
            elements={elements}
            selectedElement={selectedElement}
            onElementSelect={setSelectedElement}
            onElementUpdate={updateElement}
            onElementDelete={deleteElement}
            onElementsReorder={setElements}
          />
        )}
      </div>

      {/* Footer Controls */}
      <div className="bg-white border-t h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* Zoom Controls */}
          <Button variant="outline" size="sm" onClick={zoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Slider
            value={[zoom]}
            onValueChange={(value) => setZoom(value[0])}
            min={25}
            max={500}
            step={25}
            className="w-32"
          />
          <span className="text-sm font-medium w-16">{zoom}%</span>
          <Button variant="outline" size="sm" onClick={zoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={resetZoom}>
            <Maximize className="h-4 w-4 mr-1" />
            Ajustar
          </Button>
        </div>

        <div className="flex items-center gap-4">
          {/* Page Controls */}
          <span className="text-sm text-gray-600">
            Página {currentPage} de {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setTotalPages(prev => prev + 1);
              setCurrentPage(totalPages + 1);
              toast.success("Nova página adicionada!");
            }}
          >
            <Plus className="h-4 w-4 mr-1" />
            Página
          </Button>

          {/* View Controls */}
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
        </div>
      </div>
    </div>
  );
}
