import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";

interface CanvasComponent {
  id: string;
  type: string;
  content: string;
  position: { x: number; y: number };
}

interface CheckoutCanvasProps {
  components: CanvasComponent[];
  onComponentUpdate: (componentId: string, updates: Partial<CanvasComponent>) => void;
  onComponentDelete: (componentId: string) => void;
}

export function CheckoutCanvas({ components, onComponentUpdate, onComponentDelete }: CheckoutCanvasProps) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const renderComponent = (component: CanvasComponent) => {
    switch (component.type) {
      case "text":
        return (
          <div className="p-4 border-2 border-dashed border-blue-300 bg-blue-50 rounded">
            <p className="text-center text-blue-600">Arraste componentes aqui</p>
          </div>
        );
      case "image":
        return (
          <div className="w-full h-32 bg-gray-200 border rounded flex items-center justify-center">
            <span className="text-gray-500">Imagem</span>
          </div>
        );
      case "advantages":
        return (
          <div className="space-y-2">
            <h3 className="font-semibold">Vantagens</h3>
            <ul className="space-y-1">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Vantagem 1</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Vantagem 2</span>
              </li>
            </ul>
          </div>
        );
      default:
        return (
          <div className="p-4 bg-gray-100 border rounded">
            <span className="text-gray-600">{component.type}</span>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-gray-100 p-4 overflow-auto">
      {/* Canvas Header */}
      <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Checkout Builder</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Pré-visualizar</Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Salvar checkout</Button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="bg-white rounded-lg shadow-sm min-h-[600px] relative">
        {/* Drop Zone */}
        {components.length === 0 ? (
          <div className="absolute inset-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Arraste componentes aqui</p>
              <p className="text-sm text-gray-400">Comece criando seu checkout personalizado</p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {components.map((component) => (
              <div
                key={component.id}
                className={`relative group border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedComponent === component.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => setSelectedComponent(component.id)}
              >
                {renderComponent(component)}
                
                {/* Component Controls */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle edit
                      }}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        onComponentDelete(component.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}