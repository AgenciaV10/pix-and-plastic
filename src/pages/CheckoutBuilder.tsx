import { useState, useEffect } from "react";
import { ComponentPalette } from "@/components/builder/ComponentPalette";
import { CheckoutCanvas } from "@/components/builder/CheckoutCanvas";
import { CheckoutHeader } from "@/components/builder/CheckoutHeader";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CheckoutService, CheckoutData } from '@/services/checkoutService';

interface CanvasComponent {
  id: string;
  type: string;
  content: string;
  position: { x: number; y: number };
}

export default function CheckoutBuilder() {
  const [components, setComponents] = useState<CanvasComponent[]>([]);
  const [checkoutName, setCheckoutName] = useState('Meu Checkout');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);

  const handleComponentAdd = (componentType: string) => {
    const newComponent: CanvasComponent = {
      id: `${componentType}-${Date.now()}`,
      type: componentType,
      content: "",
      position: { x: 0, y: components.length * 100 },
    };

    setComponents(prev => [...prev, newComponent]);
    setHasUnsavedChanges(true);
  };

  const handleNameChange = (newName: string) => {
    setCheckoutName(newName);
    setHasUnsavedChanges(true);
  };

  // Detectar mudanças nos componentes para marcar como não salvo
  useEffect(() => {
    if (components.length > 0 && checkoutId) {
      setHasUnsavedChanges(true);
    }
  }, [components, checkoutId]);

  const handleComponentUpdate = (componentId: string, updates: Partial<CanvasComponent>) => {
    setComponents(prev =>
      prev.map(comp => comp.id === componentId ? { ...comp, ...updates } : comp)
    );
    setHasUnsavedChanges(true);
  };

  const handleComponentDelete = (componentId: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== componentId));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const checkoutData: CheckoutData = {
        id: checkoutId || undefined,
        name: checkoutName,
        components: components
      };
      
      const result = await CheckoutService.saveCheckout(checkoutData);
      
      if (result.success && result.data) {
        setCheckoutId(result.data.id!);
        setHasUnsavedChanges(false);
        console.log('Checkout salvo com sucesso!');
      } else {
        console.error('Erro ao salvar checkout:', result.error);
        alert('Erro ao salvar checkout: ' + result.error);
      }
    } catch (error) {
      console.error('Erro ao salvar checkout:', error);
      alert('Erro interno ao salvar checkout');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    // Criar uma nova janela/aba para pré-visualização
    const previewData = {
      name: checkoutName,
      components: components,
      viewMode: viewMode
    };
    
    // Armazenar dados temporariamente no localStorage para a pré-visualização
    localStorage.setItem('checkout-preview', JSON.stringify(previewData));
    
    // Abrir nova aba com a pré-visualização
    const previewUrl = `/preview?mode=${viewMode}`;
    window.open(previewUrl, '_blank');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <CheckoutHeader
          checkoutName={checkoutName}
          onCheckoutNameChange={handleNameChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          hasUnsavedChanges={hasUnsavedChanges}
          onSave={handleSave}
          onPreview={handlePreview}
          isSaving={isSaving}
        />
        
        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Canvas Area */}
          <div className="flex-1 overflow-auto">
            <CheckoutCanvas
              components={components}
              onComponentUpdate={handleComponentUpdate}
              onComponentDelete={handleComponentDelete}
              viewMode={viewMode}
            />
          </div>
          
          {/* Right Sidebar - Component Palette */}
          <ComponentPalette onComponentAdd={handleComponentAdd} />
        </div>
      </div>
    </DndProvider>
  );
}