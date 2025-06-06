
import React, { useRef, useEffect, useState } from "react";
import { DesignElement } from "@/types/editor";

interface EditorCanvasProps {
  elements: DesignElement[];
  selectedElement: DesignElement | null;
  canvasSize: { width: number; height: number };
  zoom: number;
  showGrid: boolean;
  onElementSelect: (element: DesignElement | null) => void;
  onElementUpdate: (id: string, updates: Partial<DesignElement>) => void;
  onElementMove: (id: string, x: number, y: number) => void;
}

export function EditorCanvas({
  elements,
  selectedElement,
  canvasSize,
  zoom,
  showGrid,
  onElementSelect,
  onElementUpdate,
  onElementMove
}: EditorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    drawCanvas();
  }, [elements, zoom, canvasSize, showGrid, selectedElement]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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
      ctx.globalAlpha = (element.opacity || 100) / 100;
      
      switch (element.type) {
        case 'text':
          drawTextElement(ctx, element);
          break;
        case 'shape':
          drawShapeElement(ctx, element);
          break;
        case 'image':
          drawImageElement(ctx, element);
          break;
      }
      
      // Draw selection border
      if (element.id === selectedElement?.id) {
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
    if (!element.content) return;
    
    const style = element.style || {};
    let fontSize = style.fontSize || 16;
    let fontFamily = style.fontFamily || 'Inter';
    let fontWeight = style.fontWeight || 'normal';
    
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = style.color || '#000000';
    ctx.textAlign = (style.textAlign as CanvasTextAlign) || 'left';
    
    // Apply text effects
    if (style.shadow) {
      ctx.shadowColor = style.shadowColor || '#000000';
      ctx.shadowBlur = style.shadowBlur || 4;
      ctx.shadowOffsetX = style.shadowOffsetX || 2;
      ctx.shadowOffsetY = style.shadowOffsetY || 2;
    }
    
    const lines = element.content.split('\n');
    const lineHeight = fontSize * 1.2;
    
    lines.forEach((line, index) => {
      let x = element.x;
      if (style.textAlign === 'center') {
        x = element.x + element.width / 2;
      } else if (style.textAlign === 'right') {
        x = element.x + element.width;
      }
      
      ctx.fillText(line, x, element.y + (index * lineHeight) + fontSize);
    });
  };

  const drawShapeElement = (ctx: CanvasRenderingContext2D, element: DesignElement) => {
    const style = element.style || {};
    
    // Apply filters including blur
    if (style.blur) {
      ctx.filter = `blur(${style.blur}px)`;
    }
    
    ctx.fillStyle = style.fill || '#8B5CF6';
    ctx.strokeStyle = style.stroke || 'transparent';
    ctx.lineWidth = style.strokeWidth || 0;
    
    const { x, y, width, height } = element;
    
    // Apply shadow
    if (style.shadow) {
      ctx.shadowColor = style.shadowColor || '#000000';
      ctx.shadowBlur = style.shadowBlur || 4;
      ctx.shadowOffsetX = style.shadowOffsetX || 2;
      ctx.shadowOffsetY = style.shadowOffsetY || 2;
    }
    
    switch (style.shapeType) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(x + width/2, y + height/2, Math.min(width, height)/2, 0, 2 * Math.PI);
        ctx.fill();
        if (style.strokeWidth && style.strokeWidth > 0) ctx.stroke();
        break;
      case 'rectangle':
        if (style.borderRadius) {
          drawRoundedRect(ctx, x, y, width, height, style.borderRadius);
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
    
    ctx.filter = 'none';
  };

  const drawImageElement = (ctx: CanvasRenderingContext2D, element: DesignElement) => {
    // Implementation for image rendering
    if (element.imageData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, element.x, element.y, element.width, element.height);
      };
      img.src = element.imageData;
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
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.strokeRect(element.x - 2, element.y - 2, element.width + 4, element.height + 4);
    
    // Draw resize handles
    const handleSize = 8;
    ctx.fillStyle = '#00d4ff';
    const handles = [
      { x: element.x - handleSize/2, y: element.y - handleSize/2 },
      { x: element.x + element.width/2 - handleSize/2, y: element.y - handleSize/2 },
      { x: element.x + element.width - handleSize/2, y: element.y - handleSize/2 },
      { x: element.x + element.width - handleSize/2, y: element.y + element.height/2 - handleSize/2 },
      { x: element.x + element.width - handleSize/2, y: element.y + element.height - handleSize/2 },
      { x: element.x + element.width/2 - handleSize/2, y: element.y + element.height - handleSize/2 },
      { x: element.x - handleSize/2, y: element.y + element.height - handleSize/2 },
      { x: element.x - handleSize/2, y: element.y + element.height/2 - handleSize/2 }
    ];
    
    handles.forEach(handle => {
      ctx.fillRect(handle.x, handle.y, handleSize, handleSize);
    });
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (zoom / 100) - canvasOffset.x;
    const y = (e.clientY - rect.top) / (zoom / 100) - canvasOffset.y;

    const clickedElement = elements
      .filter(el => el.visible !== false)
      .reverse()
      .find(element => 
        x >= element.x && x <= element.x + element.width &&
        y >= element.y && y <= element.y + element.height
      );

    if (clickedElement && !clickedElement.locked) {
      onElementSelect(clickedElement);
      setIsDragging(true);
      setDragStart({ x: x - clickedElement.x, y: y - clickedElement.y });
    } else {
      onElementSelect(null);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedElement) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (zoom / 100) - canvasOffset.x;
    const y = (e.clientY - rect.top) / (zoom / 100) - canvasOffset.y;

    const newX = x - dragStart.x;
    const newY = y - dragStart.y;
    
    onElementMove(selectedElement.id, newX, newY);
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      // Zoom handled by parent component
    } else if (e.shiftKey) {
      e.preventDefault();
      // Pan horizontally
      setCanvasOffset(prev => ({ 
        ...prev, 
        x: prev.x - e.deltaY 
      }));
    } else {
      // Pan vertically
      setCanvasOffset(prev => ({ 
        ...prev, 
        y: prev.y - e.deltaY 
      }));
    }
  };

  return (
    <div 
      ref={containerRef}
      className="flex-1 flex items-center justify-center bg-gray-100 overflow-hidden"
      style={{ transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px)` }}
    >
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
    </div>
  );
}
