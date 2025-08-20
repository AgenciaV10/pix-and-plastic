import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, GripVertical, Clock, Video, Star } from 'lucide-react';
import { useDrop } from 'react-dnd';
import { DraggableComponent } from './DraggableComponent';
import { EditableComponent } from './EditableComponent';

interface ColumnComponent {
  id: string;
  type: 'text' | 'image' | 'advantages' | 'testimonial' | 'countdown' | 'video' | 'social';
  content: string;
  props?: Record<string, any>;
}

interface Column {
  id: string;
  position: 'top' | 'left' | 'right' | 'bottom';
  components: ColumnComponent[];
  width?: string;
}

interface ColumnManagerProps {
  columns: Column[];
  onColumnAdd: (position: 'top' | 'left' | 'right' | 'bottom') => void;
  onColumnDelete: (columnId: string) => void;
  onComponentAdd: (columnId: string, component: ColumnComponent) => void;
  onComponentDelete: (columnId: string, componentId: string) => void;
  onComponentMove: (fromColumnId: string, toColumnId: string, componentId: string) => void;
  onComponentUpdate: (columnId: string, componentId: string, updates: Partial<ColumnComponent>) => void;
  onComponentDuplicate: (columnId: string, componentId: string) => void;
  selectedComponentId: string | null;
  onComponentSelect: (componentId: string | null) => void;
}

interface DroppableColumnProps {
  column: Column;
  onComponentAdd: (component: ColumnComponent) => void;
  onComponentDelete: (componentId: string) => void;
  onComponentUpdate: (componentId: string, updates: Partial<ColumnComponent>) => void;
  onComponentDuplicate: (componentId: string) => void;
  onColumnDelete: () => void;
  selectedComponentId: string | null;
  onComponentSelect: (componentId: string | null) => void;
}

function DroppableColumn({ 
  column, 
  onComponentAdd, 
  onComponentDelete, 
  onComponentUpdate,
  onComponentDuplicate,
  onColumnDelete,
  selectedComponentId,
  onComponentSelect
}: DroppableColumnProps) {
  const [{ isOver }, drop] = useDrop({
    accept: 'component',
    drop: (item: { type: string; id?: string }) => {
      if (!item.id) {
        // New component from palette
        const newComponent: ColumnComponent = {
          id: `${item.type}-${Date.now()}`,
          type: item.type as 'text' | 'image' | 'advantages' | 'testimonial' | 'countdown' | 'video' | 'social',
          content: getDefaultContent(item.type)
        };
        onComponentAdd(newComponent);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  const getDefaultContent = (type: string): string => {
    switch (type) {
      case 'text':
        return 'Texto personalizado';
      case 'image':
        return 'https://via.placeholder.com/300x200';
      case 'advantages':
        return JSON.stringify(['Vantagem 1', 'Vantagem 2', 'Vantagem 3']);
      case 'testimonial':
        return JSON.stringify({ name: 'Cliente', text: 'Excelente produto!', rating: 5 });
      case 'countdown':
        return JSON.stringify({ hours: 0, minutes: 0, seconds: 0 });
      case 'video':
        return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
      case 'social':
        return JSON.stringify(['facebook', 'instagram', 'whatsapp']);
      default:
        return `Conteúdo do ${type}`;
    }
  };

  const renderComponent = (component: ColumnComponent) => {
    switch (component.type) {
      case 'text':
        return (
          <div className="p-3 bg-white border rounded-lg shadow-sm">
            <p className="text-sm">{component.content}</p>
          </div>
        );
      case 'image':
        return (
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <img 
              src={component.content} 
              alt="Componente" 
              className="w-full h-32 object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Imagem';
              }}
            />
          </div>
        );
      case 'advantages':
        const advantages = JSON.parse(component.content || '[]');
        return (
          <div className="p-3 bg-white border rounded-lg shadow-sm">
            <h4 className="font-semibold text-sm mb-2">Vantagens</h4>
            <ul className="space-y-1">
              {advantages.map((advantage: string, index: number) => (
                <li key={index} className="flex items-center gap-2 text-xs">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span>{advantage}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'testimonial':
        const testimonial = JSON.parse(component.content || '{}');
        return (
          <div className="p-3 bg-white border rounded-lg shadow-sm">
            <div className="flex items-center gap-1 mb-1">
              {[...Array(testimonial.rating || 5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xs">★</span>
              ))}
            </div>
            <p className="text-xs mb-1">"{testimonial.text}"</p>
            <p className="text-xs font-semibold text-gray-600">- {testimonial.name}</p>
          </div>
        );
      case 'countdown':
        return (
          <div className="p-3 bg-white border rounded-lg shadow-sm">
            <h4 className="font-semibold text-sm mb-2">Contador</h4>
            <div className="flex gap-2 text-sm justify-center">
              <span className="bg-red-500 text-white px-2 py-1 rounded">00</span>
              <span>:</span>
              <span className="bg-red-500 text-white px-2 py-1 rounded">00</span>
              <span>:</span>
              <span className="bg-red-500 text-white px-2 py-1 rounded">00</span>
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="p-3 bg-gray-100 border rounded-lg shadow-sm flex items-center justify-center h-24">
            <div className="text-center">
              <Video className="w-6 h-6 mx-auto mb-1 text-gray-500" />
              <p className="text-xs text-gray-500">Vídeo</p>
            </div>
          </div>
        );
      case 'social':
        return (
          <div className="p-3 bg-white border rounded-lg shadow-sm">
            <h4 className="font-semibold text-sm mb-2">Redes Sociais</h4>
            <div className="flex gap-2 justify-center">
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
              <div className="w-6 h-6 bg-pink-500 rounded"></div>
              <div className="w-6 h-6 bg-green-500 rounded"></div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-3 bg-white border rounded-lg shadow-sm">
            <span className="text-xs text-gray-600">{component.type}</span>
          </div>
        );
    }
  };

  const getColumnClasses = () => {
    const baseClasses = "relative border-2 border-dashed rounded-lg p-2 min-h-[100px] transition-colors";
    const overClasses = isOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50";
    
    switch (column.position) {
      case 'top':
      case 'bottom':
        return `${baseClasses} ${overClasses} w-full`;
      case 'left':
      case 'right':
        return `${baseClasses} ${overClasses} w-64 h-full`;
      default:
        return `${baseClasses} ${overClasses}`;
    }
  };

  return (
    <div ref={drop} className={getColumnClasses()}>
      {/* Column Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <GripVertical className="w-3 h-3 text-gray-400" />
          <span className="text-xs font-medium text-gray-600 capitalize">
            {column.position}
          </span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={onColumnDelete}
          className="h-5 w-5 p-0 text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>

      {/* Drop Zone */}
      {column.components.length === 0 ? (
        <div className="flex items-center justify-center h-20 text-xs text-gray-500">
          Arraste componentes aqui
        </div>
      ) : (
        <div className="space-y-2">
          {column.components.map((component) => (
            <EditableComponent
              key={component.id}
              component={component}
              isSelected={selectedComponentId === component.id}
              onSelect={() => onComponentSelect(component.id)}
              onUpdate={(updates) => onComponentUpdate(component.id, updates)}
              onDelete={() => onComponentDelete(component.id)}
              onDuplicate={() => onComponentDuplicate(component.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ColumnManager({ 
  columns, 
  onColumnAdd, 
  onColumnDelete, 
  onComponentAdd, 
  onComponentDelete,
  onComponentUpdate,
  onComponentDuplicate,
  selectedComponentId,
  onComponentSelect
}: ColumnManagerProps) {
  // Since we're passing only one column at a time, just render that column
  const column = columns[0];
  
  if (!column) {
    return null;
  }

  return (
    <DroppableColumn
      column={column}
      onComponentAdd={(component) => onComponentAdd(column.id, component)}
      onComponentDelete={(componentId) => onComponentDelete(column.id, componentId)}
      onComponentUpdate={(componentId, updates) => onComponentUpdate(column.id, componentId, updates)}
      onComponentDuplicate={(componentId) => onComponentDuplicate(column.id, componentId)}
      onColumnDelete={() => onColumnDelete(column.id)}
      selectedComponentId={selectedComponentId}
      onComponentSelect={onComponentSelect}
    />
  );
}