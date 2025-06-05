
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Menu, Share, Save, Download, Undo, Redo, ZoomIn, ZoomOut, 
  Grid, Layers, ChevronLeft, ChevronRight, Plus, Maximize,
  Settings, Eye, Sparkles
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
import { SimpleNavMenu } from "@/components/SimpleNavMenu";
import { EditorCanvas } from "@/components/editor/EditorCanvas";
import { ElementsSidebar } from "@/components/editor/ElementsSidebar";
import { PropertiesPanel } from "@/components/editor/PropertiesPanel";
import { DesignElement, Layer } from "@/types/editor";

export default function DesignEditor() {
  // State management
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
  const [layers, setLayers] = useState<Layer[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

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
    
    // Add to history
    saveToHistory();
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

  // Move element function
  const moveElement = (id: string, x: number, y: number) => {
    updateElement(id, { x, y });
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
      setElements(history[historyIndex - 1].elements);
      setSelectedElement(null);
      toast.success("Ação desfeita!");
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setElements(history[historyIndex + 1].elements);
      setSelectedElement(null);
      toast.success("Ação refeita!");
    }
  };

  // Canvas resize function
  const handleResize = (size: { width: number; height: number }) => {
    setCanvasSize(size);
    saveToHistory();
  };

  // Layer management
  const toggleLayerVisibility = (layerId: string) => {
    updateElement(layerId, { visible: !elements.find(el => el.id === layerId)?.visible });
  };

  const toggleLayerLock = (layerId: string) => {
    updateElement(layerId, { locked: !elements.find(el => el.id === layerId)?.locked });
  };

  // Zoom functions
  const zoomIn = () => setZoom(prev => Math.min(500, prev + 25));
  const zoomOut = () => setZoom(prev => Math.max(25, prev - 25));
  const resetZoom = () => setZoom(100);

  // Save and export functions
  const saveProject = () => {
    const projectData = {
      name: projectName,
      elements,
      canvasSize,
      currentPage,
      totalPages,
      timestamp: Date.now()
    };
    
    // Here you would typically save to a backend or local storage
    localStorage.setItem('current-project', JSON.stringify(projectData));
    toast.success("Projeto salvo!");
  };

  const exportProject = (format: string) => {
    // Implementation for exporting in different formats
    toast.success(`Exportando como ${format}...`);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b p-3 flex items-center justify-between z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-gray-100"
              onClick={() => setMainMenuCollapsed(!mainMenuCollapsed)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-gray-100"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Layers className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-purple-100 p-1 rounded-full">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent font-bold text-xl">
              AutoPostAI
            </span>
          </div>
          
          <Menubar className="bg-transparent border-none">
            <MenubarMenu>
              <MenubarTrigger className="hover:bg-gray-100 px-3 py-1 rounded">
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
              <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                Redimensionar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Redimensionar Canvas</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
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
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-gray-100"
              onClick={undo}
              disabled={historyIndex <= 0}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-gray-100"
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>

          <Input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-48"
            placeholder="Nome do projeto"
          />
        </div>

        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100">
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
          
          <Button onClick={saveProject} variant="ghost" size="sm" className="hover:bg-gray-100">
            <Save className="h-4 w-4 mr-1" />
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

      <div className="flex flex-1 overflow-hidden">
        {/* Main Menu */}
        {!mainMenuCollapsed && (
          <div className="w-64 bg-white border-r">
            <SimpleNavMenu />
          </div>
        )}

        {/* Elements Sidebar */}
        {!sidebarCollapsed && (
          <ElementsSidebar onAddElement={addElement} />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Canvas */}
          <div className="flex-1 flex">
            <EditorCanvas
              elements={elements}
              selectedElement={selectedElement}
              canvasSize={canvasSize}
              zoom={zoom}
              showGrid={showGrid}
              onElementSelect={setSelectedElement}
              onElementUpdate={updateElement}
              onElementMove={moveElement}
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
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
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

          {/* Bottom Controls */}
          <div className="bg-white border-t p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
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
              <span className="text-sm font-medium w-12">{zoom}%</span>
              <Button variant="outline" size="sm" onClick={zoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={resetZoom}>
                <Maximize className="h-4 w-4 mr-1" />
                Ajustar
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
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        <PropertiesPanel
          selectedElement={selectedElement}
          onUpdateElement={updateElement}
          onDeleteElement={deleteElement}
          onDuplicateElement={duplicateElement}
        />
      </div>
    </div>
  );
}
