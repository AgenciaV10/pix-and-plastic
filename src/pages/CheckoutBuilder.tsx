import { useState } from "react";
import { ComponentPalette } from "@/components/builder/ComponentPalette";
import { CheckoutCanvas } from "@/components/builder/CheckoutCanvas";

interface CanvasComponent {
  id: string;
  type: string;
  content: string;
  position: { x: number; y: number };
}

export default function CheckoutBuilder() {
  const [components, setComponents] = useState<CanvasComponent[]>([]);

  const handleComponentAdd = (componentType: string) => {
    const newComponent: CanvasComponent = {
      id: `${componentType}-${Date.now()}`,
      type: componentType,
      content: "",
      position: { x: 0, y: components.length * 100 },
    };

    setComponents(prev => [...prev, newComponent]);
  };

  const handleComponentUpdate = (componentId: string, updates: Partial<CanvasComponent>) => {
    setComponents(prev =>
      prev.map(comp => comp.id === componentId ? { ...comp, ...updates } : comp)
    );
  };

  const handleComponentDelete = (componentId: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== componentId));
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Main Canvas Area */}
      <CheckoutCanvas
        components={components}
        onComponentUpdate={handleComponentUpdate}
        onComponentDelete={handleComponentDelete}
      />
      
      {/* Right Sidebar - Component Palette */}
      <ComponentPalette onComponentAdd={handleComponentAdd} />
    </div>
  );
}