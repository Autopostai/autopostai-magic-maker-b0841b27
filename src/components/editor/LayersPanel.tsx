
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Eye, EyeOff, Lock, Unlock, Type, Square, 
  Image as ImageIcon, Trash2, MoreVertical
} from "lucide-react";
import { DesignElement } from "@/types/editor";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface LayersPanelProps {
  elements: DesignElement[];
  selectedElement: DesignElement | null;
  onElementSelect: (element: DesignElement) => void;
  onElementUpdate: (id: string, updates: Partial<DesignElement>) => void;
  onElementDelete: (id: string) => void;
  onElementsReorder: (elements: DesignElement[]) => void;
}

export function LayersPanel({
  elements,
  selectedElement,
  onElementSelect,
  onElementUpdate,
  onElementDelete,
  onElementsReorder
}: LayersPanelProps) {
  const getElementIcon = (type: string) => {
    switch (type) {
      case 'text':
        return Type;
      case 'shape':
        return Square;
      case 'image':
        return ImageIcon;
      default:
        return Square;
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedElements = Array.from(elements);
    const [removed] = reorderedElements.splice(result.source.index, 1);
    reorderedElements.splice(result.destination.index, 0, removed);

    // Update z-index based on new order
    const updatedElements = reorderedElements.map((element, index) => ({
      ...element,
      zIndex: index
    }));

    onElementsReorder(updatedElements);
  };

  return (
    <div className="w-80 bg-white border-l flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-medium">Camadas</h3>
      </div>

      <ScrollArea className="flex-1">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="layers">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="p-2">
                {elements.map((element, index) => {
                  const Icon = getElementIcon(element.type);
                  
                  return (
                    <Draggable key={element.id} draggableId={element.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`
                            flex items-center gap-3 p-2 rounded-lg mb-1 cursor-pointer transition-colors
                            ${selectedElement?.id === element.id 
                              ? 'bg-blue-50 border border-blue-200' 
                              : 'hover:bg-gray-50'
                            }
                            ${snapshot.isDragging ? 'shadow-lg' : ''}
                          `}
                          onClick={() => onElementSelect(element)}
                        >
                          {/* Element Icon */}
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <Icon className="h-4 w-4 text-gray-600" />
                          </div>

                          {/* Element Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {element.name || `${element.type} ${index + 1}`}
                            </p>
                            <p className="text-xs text-gray-500">
                              {element.type}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                onElementUpdate(element.id, { visible: !element.visible });
                              }}
                            >
                              {element.visible !== false ? (
                                <Eye className="h-3 w-3" />
                              ) : (
                                <EyeOff className="h-3 w-3 text-gray-400" />
                              )}
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                onElementUpdate(element.id, { locked: !element.locked });
                              }}
                            >
                              {element.locked ? (
                                <Lock className="h-3 w-3 text-gray-400" />
                              ) : (
                                <Unlock className="h-3 w-3" />
                              )}
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                onElementDelete(element.id);
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ScrollArea>
    </div>
  );
}
