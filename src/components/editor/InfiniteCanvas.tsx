
import React, { useRef, useEffect, useState, forwardRef } from "react";
import { DesignElement, CanvasSettings } from "@/types/editor";

interface InfiniteCanvasProps {
  elements: DesignElement[];
  selectedElement: DesignElement | null;
  canvasSettings: CanvasSettings;
  zoom: number;
  showGrid: boolean;
  onElementSelect: (element: DesignElement | null) => void;
  onElementUpdate: (id: string, updates: Partial<DesignElement>) => void;
  onElementMove: (id: string, x: number, y: number) => void;
  onElementDelete: (id: string) => void;
}

export const InfiniteCanvas = forwardRef<HTMLDivElement, InfiniteCanvasProps>(({
  elements,
  selectedElement,
  canvasSettings,
  zoom,
  showGrid,
  onElementSelect,
  onElementUpdate,
  onElementMove,
  onElementDelete
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  useEffect(() => {
    drawCanvas();
  }, [elements, zoom, canvasSettings, showGrid, selectedElement]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedElement) return;

      switch (e.key) {
        case 'Delete':
        case 'Backspace':
          onElementDelete(selectedElement.id);
          break;
        case 'ArrowUp':
          e.preventDefault();
          onElementMove(selectedElement.id, selectedElement.x, selectedElement.y - (e.shiftKey ? 10 : 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          onElementMove(selectedElement.id, selectedElement.x, selectedElement.y + (e.shiftKey ? 10 : 1));
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onElementMove(selectedElement.id, selectedElement.x - (e.shiftKey ? 10 : 1), selectedElement.y);
          break;
        case 'ArrowRight':
          e.preventDefault();
          onElementMove(selectedElement.id, selectedElement.x + (e.shiftKey ? 10 : 1), selectedElement.y);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement, onElementMove, onElementDelete]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate canvas position (centered)
    const canvasX = (canvas.width - canvasSettings.width * (zoom / 100)) / 2 + canvasOffset.x;
    const canvasY = (canvas.height - canvasSettings.height * (zoom / 100)) / 2 + canvasOffset.y;

    // Draw canvas background
    ctx.fillStyle = canvasSettings.backgroundColor;
    ctx.fillRect(
      canvasX, 
      canvasY, 
      canvasSettings.width * (zoom / 100), 
      canvasSettings.height * (zoom / 100)
    );

    // Draw canvas border
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.strokeRect(
      canvasX, 
      canvasY, 
      canvasSettings.width * (zoom / 100), 
      canvasSettings.height * (zoom / 100)
    );

    // Draw grid if enabled
    if (showGrid) {
      drawGrid(ctx, canvasX, canvasY);
    }

    // Draw elements
    const sortedElements = [...elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
    
    sortedElements.forEach(element => {
      if (element.visible === false) return;
      
      ctx.save();
      ctx.globalAlpha = (element.opacity || 100) / 100;
      
      const elementX = canvasX + element.x * (zoom / 100);
      const elementY = canvasY + element.y * (zoom / 100);
      const elementWidth = element.width * (zoom / 100);
      const elementHeight = element.height * (zoom / 100);
      
      switch (element.type) {
        case 'text':
          drawTextElement(ctx, element, elementX, elementY, elementWidth, elementHeight);
          break;
        case 'shape':
          drawShapeElement(ctx, element, elementX, elementY, elementWidth, elementHeight);
          break;
        case 'image':
          drawImageElement(ctx, element, elementX, elementY, elementWidth, elementHeight);
          break;
      }
      
      // Draw selection border
      if (element.id === selectedElement?.id) {
        drawSelectionBorder(ctx, elementX, elementY, elementWidth, elementHeight);
      }
      
      ctx.restore();
    });
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, canvasX: number, canvasY: number) => {
    const gridSize = 20 * (zoom / 100);
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 0.5;
    
    const canvasWidth = canvasSettings.width * (zoom / 100);
    const canvasHeight = canvasSettings.height * (zoom / 100);
    
    for (let x = 0; x <= canvasWidth; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(canvasX + x, canvasY);
      ctx.lineTo(canvasX + x, canvasY + canvasHeight);
      ctx.stroke();
    }
    
    for (let y = 0; y <= canvasHeight; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(canvasX, canvasY + y);
      ctx.lineTo(canvasX + canvasWidth, canvasY + y);
      ctx.stroke();
    }
  };

  const drawTextElement = (
    ctx: CanvasRenderingContext2D, 
    element: DesignElement, 
    x: number, 
    y: number, 
    width: number, 
    height: number
  ) => {
    if (!element.content) return;
    
    const style = element.style || {};
    const fontSize = (style.fontSize || 16) * (zoom / 100);
    const fontFamily = style.fontFamily || 'Inter';
    const fontWeight = style.fontWeight || 'normal';
    
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = style.color || '#000000';
    ctx.textAlign = (style.textAlign as CanvasTextAlign) || 'left';
    
    const lines = element.content.split('\n');
    const lineHeight = fontSize * 1.2;
    
    lines.forEach((line, index) => {
      let textX = x;
      if (style.textAlign === 'center') {
        textX = x + width / 2;
      } else if (style.textAlign === 'right') {
        textX = x + width;
      }
      
      ctx.fillText(line, textX, y + (index * lineHeight) + fontSize);
    });
  };

  const drawShapeElement = (
    ctx: CanvasRenderingContext2D, 
    element: DesignElement, 
    x: number, 
    y: number, 
    width: number, 
    height: number
  ) => {
    const style = element.style || {};
    
    ctx.fillStyle = style.fill || '#8B5CF6';
    ctx.strokeStyle = style.stroke || 'transparent';
    ctx.lineWidth = (style.strokeWidth || 0) * (zoom / 100);
    
    switch (style.shapeType) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(x + width/2, y + height/2, Math.min(width, height)/2, 0, 2 * Math.PI);
        ctx.fill();
        if (style.strokeWidth && style.strokeWidth > 0) ctx.stroke();
        break;
      case 'rectangle':
        if (style.borderRadius) {
          drawRoundedRect(ctx, x, y, width, height, style.borderRadius * (zoom / 100));
        } else {
          ctx.fillRect(x, y, width, height);
        }
        if (style.strokeWidth && style.strokeWidth > 0) ctx.strokeRect(x, y, width, height);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(x + width/2, y);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x + width, y + height);
        ctx.closePath();
        ctx.fill();
        if (style.strokeWidth && style.strokeWidth > 0) ctx.stroke();
        break;
    }
  };

  const drawImageElement = (
    ctx: CanvasRenderingContext2D, 
    element: DesignElement, 
    x: number, 
    y: number, 
    width: number, 
    height: number
  ) => {
    if (element.imageData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, x, y, width, height);
      };
      img.src = element.imageData;
    }
  };

  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    radius: number
  ) => {
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

  const drawSelectionBorder = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    width: number, 
    height: number
  ) => {
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.strokeRect(x - 2, y - 2, width + 4, height + 4);
    
    // Draw resize handles
    const handleSize = 8;
    ctx.fillStyle = '#3b82f6';
    const handles = [
      { x: x - handleSize/2, y: y - handleSize/2 },
      { x: x + width/2 - handleSize/2, y: y - handleSize/2 },
      { x: x + width - handleSize/2, y: y - handleSize/2 },
      { x: x + width - handleSize/2, y: y + height/2 - handleSize/2 },
      { x: x + width - handleSize/2, y: y + height - handleSize/2 },
      { x: x + width/2 - handleSize/2, y: y + height - handleSize/2 },
      { x: x - handleSize/2, y: y + height - handleSize/2 },
      { x: x - handleSize/2, y: y + height/2 - handleSize/2 }
    ];
    
    handles.forEach(handle => {
      ctx.fillRect(handle.x, handle.y, handleSize, handleSize);
    });
  };

  const getCanvasCoordinates = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const canvasX = (canvas.width - canvasSettings.width * (zoom / 100)) / 2 + canvasOffset.x;
    const canvasY = (canvas.height - canvasSettings.height * (zoom / 100)) / 2 + canvasOffset.y;
    
    const x = ((clientX - rect.left - canvasX) / (zoom / 100));
    const y = ((clientY - rect.top - canvasY) / (zoom / 100));
    
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoordinates(e.clientX, e.clientY);

    // Check if space key is pressed for panning
    if (e.button === 1 || (e.button === 0 && e.ctrlKey)) {
      setIsPanning(true);
      setDragStart({ x: e.clientX - canvasOffset.x, y: e.clientY - canvasOffset.y });
      return;
    }

    const clickedElement = elements
      .filter(el => el.visible !== false && !el.locked)
      .reverse()
      .find(element => 
        x >= element.x && x <= element.x + element.width &&
        y >= element.y && y <= element.y + element.height
      );

    if (clickedElement) {
      onElementSelect(clickedElement);
      setIsDragging(true);
      setDragStart({ x: x - clickedElement.x, y: y - clickedElement.y });
    } else {
      onElementSelect(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPanning) {
      setCanvasOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
      return;
    }

    if (!isDragging || !selectedElement) return;
    
    const { x, y } = getCanvasCoordinates(e.clientX, e.clientY);
    const newX = x - dragStart.x;
    const newY = y - dragStart.y;
    
    onElementMove(selectedElement.id, newX, newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      // Zoom handled by parent component
    } else if (e.shiftKey) {
      e.preventDefault();
      setCanvasOffset(prev => ({ 
        ...prev, 
        x: prev.x - e.deltaY 
      }));
    } else {
      setCanvasOffset(prev => ({ 
        ...prev, 
        y: prev.y - e.deltaY 
      }));
    }
  };

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-hidden relative bg-gray-100"
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        className="w-full h-full cursor-crosshair"
        style={{ cursor: isPanning ? 'grabbing' : 'crosshair' }}
      />
      
      {/* Minimap */}
      <div className="absolute bottom-4 right-4 w-32 h-24 bg-white border rounded shadow-lg">
        <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
          <span className="text-xs text-gray-500">Minimap</span>
        </div>
      </div>
    </div>
  );
});

InfiniteCanvas.displayName = 'InfiniteCanvas';
