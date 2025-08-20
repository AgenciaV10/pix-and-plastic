import { Type, Image, Award, Shield, Navigation, List, Clock, Star, Video, Facebook, X, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const components = [
  { id: "text", name: "Texto", icon: Type },
  { id: "image", name: "Imagem", icon: Image },
  { id: "advantages", name: "Vantagens", icon: Award },
  { id: "seal", name: "Selo", icon: Shield },
  { id: "header", name: "Header", icon: Navigation },
  { id: "list", name: "Lista", icon: List },
  { id: "timer", name: "Cronômetro", icon: Clock },
  { id: "testimonial", name: "Depoimento", icon: Star },
  { id: "video", name: "Vídeo", icon: Video },
  { id: "facebook", name: "Facebook", icon: Facebook },
];

const extraComponents = [
  { id: "exit-popup", name: "Exit Popup", icon: X },
  { id: "chat", name: "Chat", icon: MessageCircle },
];

interface ComponentPaletteProps {
  onComponentAdd: (componentType: string) => void;
}

export function ComponentPalette({ onComponentAdd }: ComponentPaletteProps) {
  return (
    <div className="w-80 bg-white border-l border-border p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Components */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">COMPONENTES</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {components.map((component) => {
                const Icon = component.icon;
                return (
                  <Button
                    key={component.id}
                    variant="outline"
                    size="sm"
                    onClick={() => onComponentAdd(component.id)}
                    className="flex flex-col items-center gap-1 h-16 text-xs"
                  >
                    <Icon className="w-4 h-4" />
                    {component.name}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Extra Components */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">COMPONENTES EXTRA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {extraComponents.map((component) => {
                const Icon = component.icon;
                return (
                  <Button
                    key={component.id}
                    variant="outline"
                    size="sm"
                    onClick={() => onComponentAdd(component.id)}
                    className="flex flex-col items-center gap-1 h-16 text-xs"
                  >
                    <Icon className="w-4 h-4" />
                    {component.name}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Configuration Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Configurações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Font Family</label>
              <select className="w-full p-2 border rounded-md text-sm">
                <option>Open Sans</option>
                <option>Arial</option>
                <option>Helvetica</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cor de fundo</label>
              <div className="w-full h-8 bg-gray-200 rounded border cursor-pointer"></div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Imagem de fundo</label>
              <Button variant="outline" size="sm" className="w-full text-xs">
                Selecione do computador
                <br />
                ou arraste aqui
              </Button>
              <p className="text-xs text-muted-foreground">PNG, JPG até 10 MB</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="fixBackground" className="rounded" />
                <label htmlFor="fixBackground" className="text-sm">
                  Fixar imagem de fundo ao descer a tela
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="repeatBackground" className="rounded" />
                <label htmlFor="repeatBackground" className="text-sm">
                  Repetir imagem de fundo
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="expandBackground" className="rounded" />
                <label htmlFor="expandBackground" className="text-sm">
                  Expandir / cobrir fundo
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}