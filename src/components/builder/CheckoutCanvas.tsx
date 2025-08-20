import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit, Trash2, Type, Image, Award, Plus, Minus } from 'lucide-react';
import { CheckoutComponent } from '../checkout/CheckoutComponent';
import { ColumnManager } from './ColumnManager';
import { ComponentSettingsPanel } from './ComponentSettingsPanel';

interface CanvasComponent {
  id: string;
  type: 'text' | 'image' | 'advantages' | 'testimonial' | 'countdown' | 'video' | 'social';
  content: string;
  position: { x: number; y: number };
}

interface CheckoutCanvasProps {
  components: CanvasComponent[];
  onComponentUpdate: (id: string, updates: Partial<CanvasComponent>) => void;
  onComponentDelete: (id: string) => void;
}

type ColumnPosition = 'top' | 'left' | 'right' | 'bottom';

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

export function CheckoutCanvas({ components, onComponentUpdate, onComponentDelete }: CheckoutCanvasProps) {
  const [columns, setColumns] = useState<Column[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  const handleColumnAdd = (position: ColumnPosition) => {
    const newColumn: Column = {
      id: `column-${position}-${Date.now()}`,
      position,
      components: []
    };
    setColumns(prev => [...prev, newColumn]);
  };

  const handleColumnDelete = (columnId: string) => {
    setColumns(prev => prev.filter(col => col.id !== columnId));
  };

  const handleComponentAdd = (columnId: string, component: ColumnComponent) => {
    setColumns(prev => prev.map(col => 
      col.id === columnId 
        ? { ...col, components: [...col.components, component] }
        : col
    ));
  };

  const handleComponentDelete = (columnId: string, componentId: string) => {
    setColumns(prev => prev.map(col => 
      col.id === columnId 
        ? { ...col, components: col.components.filter(comp => comp.id !== componentId) }
        : col
    ));
    // Clear selection if deleted component was selected
    if (selectedComponentId === componentId) {
      setSelectedComponentId(null);
    }
  };

  const handleComponentUpdate = (columnId: string, componentId: string, updates: Partial<ColumnComponent>) => {
    setColumns(prev => prev.map(col => 
      col.id === columnId 
        ? {
            ...col, 
            components: col.components.map(comp => 
              comp.id === componentId ? { ...comp, ...updates } : comp
            )
          }
        : col
    ));
  };

  const handleComponentDuplicate = (columnId: string, componentId: string) => {
    setColumns(prev => prev.map(col => 
      col.id === columnId 
        ? {
            ...col,
            components: [
              ...col.components,
              {
                ...col.components.find(comp => comp.id === componentId)!,
                id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
              }
            ]
          }
        : col
    ));
  };

  const handleComponentMove = (fromColumnId: string, toColumnId: string, componentId: string) => {
    setColumns(prevColumns => {
      const fromColumn = prevColumns.find(col => col.id === fromColumnId);
      const componentToMove = fromColumn?.components.find(c => c.id === componentId);
      
      if (!componentToMove) return prevColumns;
      
      return prevColumns.map(column => {
        if (column.id === fromColumnId) {
          return {
            ...column,
            components: column.components.filter(c => c.id !== componentId)
          };
        }
        if (column.id === toColumnId) {
          return {
            ...column,
            components: [...column.components, componentToMove]
          };
        }
        return column;
      });
    });
  };

  const handleComponentSelect = (componentId: string | null) => {
    setSelectedComponentId(componentId);
  };

  const getSelectedComponent = () => {
    if (!selectedComponentId) return null;
    for (const column of columns) {
      const component = column.components.find(comp => comp.id === selectedComponentId);
      if (component) {
        return { component, columnId: column.id };
      }
    }
    return null;
  };

  const selectedData = getSelectedComponent();

  const topColumns = columns.filter(col => col.position === 'top');
  const leftColumns = columns.filter(col => col.position === 'left');
  const rightColumns = columns.filter(col => col.position === 'right');
  const bottomColumns = columns.filter(col => col.position === 'bottom');

  return (
    <div className="flex">
      <div className="flex-1 bg-gray-50 p-6 relative overflow-auto">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Top Columns */}
          {topColumns.length > 0 && (
            <div className="flex gap-2">
               {topColumns.map((column) => (
                 <ColumnManager
                   key={column.id}
                   columns={[column]}
                   onColumnAdd={handleColumnAdd}
                   onColumnDelete={handleColumnDelete}
                   onComponentAdd={handleComponentAdd}
                   onComponentDelete={handleComponentDelete}
                   onComponentMove={handleComponentMove}
                   onComponentUpdate={handleComponentUpdate}
                   onComponentDuplicate={handleComponentDuplicate}
                   selectedComponentId={selectedComponentId}
                   onComponentSelect={handleComponentSelect}
                 />
               ))}
             </div>
          )}

        {/* Column Management Buttons */}
        <div className="flex gap-2 mb-4 p-2 bg-white rounded-lg shadow-sm">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleColumnAdd('top')}
            className="text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Coluna Superior
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleColumnAdd('left')}
            className="text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Coluna Esquerda
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleColumnAdd('right')}
            className="text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Coluna Direita
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleColumnAdd('bottom')}
            className="text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Coluna Inferior
          </Button>
        </div>

        {/* Middle Section with Left, Checkout, Right */}
        <div className="flex gap-4">
          {/* Left Columns */}
          {leftColumns.length > 0 && (
            <div className="flex flex-col gap-2">
               {leftColumns.map((column) => (
                 <ColumnManager
                   key={column.id}
                   columns={[column]}
                   onColumnAdd={handleColumnAdd}
                   onColumnDelete={handleColumnDelete}
                   onComponentAdd={handleComponentAdd}
                   onComponentDelete={handleComponentDelete}
                   onComponentMove={handleComponentMove}
                   onComponentUpdate={handleComponentUpdate}
                   onComponentDuplicate={handleComponentDuplicate}
                   selectedComponentId={selectedComponentId}
                   onComponentSelect={handleComponentSelect}
                 />
               ))}
             </div>
          )}

          {/* Checkout Preview - Central */}
          <div className="flex-1">
            <Card className="border-2 border-dashed border-blue-300 bg-blue-50/30">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-700">Preview do Checkout</h3>
                <CheckoutComponent
                  onPayment={(data) => console.log('Payment data:', data)}
                  showFooter={false}
                />
              </div>
            </Card>
          </div>

          {/* Right Columns */}
          {rightColumns.length > 0 && (
            <div className="flex flex-col gap-2">
              {rightColumns.map((column) => (
                <ColumnManager
                  key={column.id}
                  columns={[column]}
                  onColumnAdd={handleColumnAdd}
                  onColumnDelete={handleColumnDelete}
                  onComponentAdd={handleComponentAdd}
                  onComponentDelete={handleComponentDelete}
                  onComponentMove={handleComponentMove}
                  onComponentUpdate={handleComponentUpdate}
                  onComponentDuplicate={handleComponentDuplicate}
                  selectedComponentId={selectedComponentId}
                  onComponentSelect={handleComponentSelect}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom Columns */}
        {bottomColumns.length > 0 && (
          <div className="flex gap-2">
             {bottomColumns.map((column) => (
               <ColumnManager
                 key={column.id}
                 columns={[column]}
                 onColumnAdd={handleColumnAdd}
                 onColumnDelete={handleColumnDelete}
                 onComponentAdd={handleComponentAdd}
                 onComponentDelete={handleComponentDelete}
                 onComponentMove={handleComponentMove}
                 onComponentUpdate={handleComponentUpdate}
                 onComponentDuplicate={handleComponentDuplicate}
                 selectedComponentId={selectedComponentId}
                 onComponentSelect={handleComponentSelect}
               />
             ))}
           </div>
        )}
        </div>
      </div>
      
      {/* Settings Panel */}
      {selectedData && (
        <ComponentSettingsPanel
          component={selectedData.component}
          style={{
            backgroundColor: selectedData.component.props?.backgroundColor || '#ffffff',
            borderColor: selectedData.component.props?.borderColor || '#e5e7eb',
            borderWidth: selectedData.component.props?.borderWidth || 1,
            borderRadius: selectedData.component.props?.borderRadius || 4,
            textAlign: selectedData.component.props?.textAlign || 'left',
            fontSize: selectedData.component.props?.fontSize || 'medium',
            fontWeight: selectedData.component.props?.fontWeight || 'normal',
            fontStyle: selectedData.component.props?.fontStyle || 'normal',
            textDecoration: selectedData.component.props?.textDecoration || 'none',
            color: selectedData.component.props?.color || '#000000'
          }}
          onStyleChange={(styleUpdates) => {
            handleComponentUpdate(selectedData.columnId, selectedData.component.id, {
              props: { ...selectedData.component.props, ...styleUpdates }
            });
          }}
          onDelete={() => handleComponentDelete(selectedData.columnId, selectedData.component.id)}
          onDuplicate={() => handleComponentDuplicate(selectedData.columnId, selectedData.component.id)}
          onClose={() => setSelectedComponentId(null)}
          onContentChange={(content) => {
            handleComponentUpdate(selectedData.columnId, selectedData.component.id, { content });
          }}
        />
      )}
    </div>
  );
}