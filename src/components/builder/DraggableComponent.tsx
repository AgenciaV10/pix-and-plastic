import React from 'react';
import { useDrag } from 'react-dnd';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface DraggableComponentProps {
  id: string;
  name: string;
  icon: LucideIcon;
  onAdd?: () => void;
}

export function DraggableComponent({ id, name, icon: Icon, onAdd }: DraggableComponentProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: { type: id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <Button
      ref={drag}
      variant="outline"
      size="sm"
      onClick={onAdd}
      className={`flex flex-col items-center gap-1 h-16 text-xs cursor-move transition-opacity ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <Icon className="w-4 h-4" />
      {name}
    </Button>
  );
}

// Hook para criar componentes arrastáveis
export function useDraggableComponent(type: string) {
  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return { isDragging, drag };
}