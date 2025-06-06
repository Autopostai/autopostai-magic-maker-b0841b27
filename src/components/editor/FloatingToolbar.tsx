
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Copy, Trash2, Palette, Type, MoreHorizontal
} from "lucide-react";
import { DesignElement } from "@/types/editor";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface FloatingToolbarProps {
  element: DesignElement;
  onUpdate: (updates: Partial<DesignElement>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const googleFonts = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins',
  'Nunito', 'Arial', 'Helvetica', 'Georgia', 'Times New Roman',
  'Playfair Display', 'Bebas Neue', 'Oswald', 'Raleway', 'Ubuntu'
];

export function FloatingToolbar({ element, onUpdate, onDelete, onDuplicate }: FloatingToolbarProps) {
  const updateStyle = (styleUpdates: any) => {
    onUpdate({
      style: { ...element.style, ...styleUpdates }
    });
  };

  if (element.type === 'text') {
    return (
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border p-2 flex items-center gap-2 z-50">
        {/* Font Family */}
        <Select 
          value={element.style?.fontFamily || 'Inter'}
          onValueChange={(value) => updateStyle({ fontFamily: value })}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {googleFonts.map(font => (
              <SelectItem key={font} value={font}>{font}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Font Size */}
        <Input
          type="number"
          value={element.style?.fontSize || 16}
          onChange={(e) => updateStyle({ fontSize: parseInt(e.target.value) })}
          className="w-16"
          min="1"
          max="200"
        />

        {/* Text Formatting */}
        <Button
          variant={element.style?.fontWeight === 'bold' ? "default" : "outline"}
          size="sm"
          onClick={() => updateStyle({ 
            fontWeight: element.style?.fontWeight === 'bold' ? 'normal' : 'bold' 
          })}
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          variant={element.style?.fontStyle === 'italic' ? "default" : "outline"}
          size="sm"
          onClick={() => updateStyle({ 
            fontStyle: element.style?.fontStyle === 'italic' ? 'normal' : 'italic' 
          })}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          variant={element.style?.textDecoration === 'underline' ? "default" : "outline"}
          size="sm"
          onClick={() => updateStyle({ 
            textDecoration: element.style?.textDecoration === 'underline' ? 'none' : 'underline' 
          })}
        >
          <Underline className="h-4 w-4" />
        </Button>

        {/* Text Alignment */}
        <Button
          variant={element.style?.textAlign === 'left' ? "default" : "outline"}
          size="sm"
          onClick={() => updateStyle({ textAlign: 'left' })}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>

        <Button
          variant={element.style?.textAlign === 'center' ? "default" : "outline"}
          size="sm"
          onClick={() => updateStyle({ textAlign: 'center' })}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>

        <Button
          variant={element.style?.textAlign === 'right' ? "default" : "outline"}
          size="sm"
          onClick={() => updateStyle({ textAlign: 'right' })}
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        {/* Color Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Palette className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cor do Texto</label>
              <Input
                type="color"
                value={element.style?.color || '#000000'}
                onChange={(e) => updateStyle({ color: e.target.value })}
                className="w-full h-10"
              />
            </div>
          </PopoverContent>
        </Popover>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200" />

        {/* Actions */}
        <Button variant="outline" size="sm" onClick={onDuplicate}>
          <Copy className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // Default toolbar for other elements
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border p-2 flex items-center gap-2 z-50">
      {element.type === 'shape' && (
        <>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Palette className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-2">
                <label className="text-sm font-medium">Cor de Preenchimento</label>
                <Input
                  type="color"
                  value={element.style?.fill || '#8B5CF6'}
                  onChange={(e) => updateStyle({ fill: e.target.value })}
                  className="w-full h-10"
                />
              </div>
            </PopoverContent>
          </Popover>

          <div className="w-px h-6 bg-gray-200" />
        </>
      )}

      <Button variant="outline" size="sm" onClick={onDuplicate}>
        <Copy className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="sm" onClick={onDelete}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
