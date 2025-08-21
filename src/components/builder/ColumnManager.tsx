import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, GripVertical, Clock, Video, Star } from 'lucide-react';
import { useDrop } from 'react-dnd';
import { DraggableComponent } from './DraggableComponent';
import { EditableComponent } from './EditableComponent';
import { CountdownTimer } from '@/components/countdown/CountdownTimer';

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
        return JSON.stringify({
          type: 'minutes',
          backgroundColor: '#ef4444',
          textColor: '#ffffff',
          duration: '00:15:00',
          activeText: 'Oferta por tempo limitado',
          finishedText: 'O tempo acabou!',
          stickyTop: false
        });
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
            {component.content ? (
              <img 
                src={component.content} 
                alt="Componente" 
                className="w-full h-32 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Imagem';
                }}
              />
            ) : (
              <div className="w-full h-32 bg-gray-100 flex flex-col items-center justify-center text-gray-500">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs">Adicionar Imagem</span>
              </div>
            )}
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
                  <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>{advantage}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'testimonial':
        const testimonial = JSON.parse(component.content || '{}');
        return (
          <div 
            className="p-3 border rounded-lg shadow-sm"
            style={{
              backgroundColor: testimonial.backgroundColor || '#ffffff',
              color: testimonial.textColor || '#000000'
            }}
          >
            <div className={`${testimonial.horizontalMode ? 'flex items-start gap-3' : 'text-center'}`}>
              {testimonial.image && (
                <div className={`${testimonial.horizontalMode ? 'flex-shrink-0' : 'mb-2'}`}>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name || 'Cliente'}
                    className={`rounded-full object-cover ${
                      testimonial.horizontalMode ? 'w-12 h-12' : 'w-16 h-16 mx-auto'
                    }`}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/64x64?text=👤';
                    }}
                  />
                </div>
              )}
              <div className={testimonial.horizontalMode ? 'flex-1' : ''}>
                <div className={`flex items-center gap-1 mb-1 ${
                  testimonial.horizontalMode ? '' : 'justify-center'
                }`}>
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
                <p className="text-xs mb-1">"{testimonial.text || 'Depoimento do cliente'}"</p>
                <p className="text-xs font-semibold opacity-75">- {testimonial.name || 'Nome do Cliente'}</p>
              </div>
            </div>
          </div>
        );
      case 'countdown':
        const countdownData = JSON.parse(component.content || '{}');
        
        return (
          <div className="border rounded-lg shadow-sm overflow-hidden">
            <CountdownTimer
              type={countdownData.type || 'minutes'}
              backgroundColor={countdownData.backgroundColor || '#ef4444'}
              textColor={countdownData.textColor || '#ffffff'}
              duration={countdownData.duration || '00:15:00'}
              activeText={countdownData.activeText || 'Oferta por tempo limitado'}
              finishedText={countdownData.finishedText || 'O tempo acabou!'}
              stickyTop={false} // No builder preview, don't use sticky
              className="text-sm"
            />
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