import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Copy, X } from 'lucide-react';
import { ColumnComponent } from './ColumnManager';
import { ComponentStyle } from './EditableComponent';

interface ComponentSettingsPanelProps {
  component: ColumnComponent | null;
  style: ComponentStyle;
  onStyleChange: (style: Partial<ComponentStyle>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onClose: () => void;
  onContentChange: (content: string) => void;
}

export function ComponentSettingsPanel({
  component,
  style,
  onStyleChange,
  onDelete,
  onDuplicate,
  onClose,
  onContentChange
}: ComponentSettingsPanelProps) {
  if (!component) {
    return null;
  }

  const renderTextSettings = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Conteúdo</label>
        <textarea
          value={component.content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full p-2 border rounded-md text-sm resize-none"
          rows={3}
          placeholder="Digite o texto..."
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Tamanho da Fonte</label>
        <select
          value={style.fontSize}
          onChange={(e) => onStyleChange({ fontSize: e.target.value as any })}
          className="w-full p-2 border rounded-md text-sm"
        >
          <option value="small">Pequeno</option>
          <option value="medium">Médio</option>
          <option value="large">Grande</option>
          <option value="huge">Muito Grande</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Cor do Texto</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={style.color}
            onChange={(e) => onStyleChange({ color: e.target.value })}
            className="w-12 h-8 border rounded cursor-pointer"
          />
          <input
            type="text"
            value={style.color}
            onChange={(e) => onStyleChange({ color: e.target.value })}
            className="flex-1 p-2 border rounded-md text-sm"
            placeholder="#000000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Alinhamento</label>
        <div className="grid grid-cols-4 gap-1">
          {['left', 'center', 'right', 'justify'].map((align) => (
            <Button
              key={align}
              size="sm"
              variant={style.textAlign === align ? 'default' : 'outline'}
              onClick={() => onStyleChange({ textAlign: align as any })}
              className="text-xs"
            >
              {align === 'left' && '←'}
              {align === 'center' && '↔'}
              {align === 'right' && '→'}
              {align === 'justify' && '≡'}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderImageSettings = () => {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">URL da Imagem</label>
          <input
            type="url"
            value={component.content}
            onChange={(e) => onContentChange(e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Upload de Imagem</label>
          <Button variant="outline" size="sm" className="w-full text-xs">
            Selecionar do computador
          </Button>
          <p className="text-xs text-muted-foreground">PNG, JPG até 10 MB</p>
        </div>
      </div>
    );
  };

  const renderAdvantagesSettings = () => {
    const advantages = JSON.parse(component.content || '[]');
    
    const updateAdvantages = (newAdvantages: string[]) => {
      onContentChange(JSON.stringify(newAdvantages));
    };

    const addAdvantage = () => {
      updateAdvantages([...advantages, 'Nova vantagem']);
    };

    const removeAdvantage = (index: number) => {
      updateAdvantages(advantages.filter((_: any, i: number) => i !== index));
    };

    const updateAdvantage = (index: number, value: string) => {
      const newAdvantages = [...advantages];
      newAdvantages[index] = value;
      updateAdvantages(newAdvantages);
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Vantagens</label>
            <Button size="sm" onClick={addAdvantage} className="text-xs">
              + Adicionar
            </Button>
          </div>
          
          <div className="space-y-2">
            {advantages.map((advantage: string, index: number) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={advantage}
                  onChange={(e) => updateAdvantage(index, e.target.value)}
                  className="flex-1 p-2 border rounded-md text-sm"
                  placeholder="Digite a vantagem..."
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeAdvantage(index)}
                  className="px-2"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTestimonialSettings = () => {
    const testimonial = JSON.parse(component.content || '{}');
    
    const updateTestimonial = (updates: any) => {
      onContentChange(JSON.stringify({ ...testimonial, ...updates }));
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nome do Cliente</label>
          <input
            type="text"
            value={testimonial.name || ''}
            onChange={(e) => updateTestimonial({ name: e.target.value })}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="Nome do cliente"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Depoimento</label>
          <textarea
            value={testimonial.text || ''}
            onChange={(e) => updateTestimonial({ text: e.target.value })}
            className="w-full p-2 border rounded-md text-sm resize-none"
            rows={3}
            placeholder="Digite o depoimento..."
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Imagem</label>
          <input
            type="url"
            value={testimonial.image || ''}
            onChange={(e) => updateTestimonial({ image: e.target.value })}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="URL da imagem do cliente"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Estrelas (1-5)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="5"
              value={testimonial.rating || 5}
              onChange={(e) => updateTestimonial({ rating: parseInt(e.target.value) })}
              className="w-20 p-2 border rounded-md text-sm"
            />
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-lg ${
                    star <= (testimonial.rating || 5) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Cor de fundo</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={testimonial.backgroundColor || '#ffffff'}
              onChange={(e) => updateTestimonial({ backgroundColor: e.target.value })}
              className="w-12 h-8 border rounded cursor-pointer"
            />
            <input
              type="text"
              value={testimonial.backgroundColor || '#ffffff'}
              onChange={(e) => updateTestimonial({ backgroundColor: e.target.value })}
              className="flex-1 p-2 border rounded-md text-sm"
              placeholder="#ffffff"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Cor do texto</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={testimonial.textColor || '#000000'}
              onChange={(e) => updateTestimonial({ textColor: e.target.value })}
              className="w-12 h-8 border rounded cursor-pointer"
            />
            <input
              type="text"
              value={testimonial.textColor || '#000000'}
              onChange={(e) => updateTestimonial({ textColor: e.target.value })}
              className="flex-1 p-2 border rounded-md text-sm"
              placeholder="#000000"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <input
              type="checkbox"
              checked={testimonial.horizontalMode || false}
              onChange={(e) => updateTestimonial({ horizontalMode: e.target.checked })}
              className="rounded"
            />
            Modo horizontal
          </label>
          <p className="text-xs text-gray-500">
            Quando ativado, a imagem e o texto ficam lado a lado
          </p>
        </div>
      </div>
    );
  };

  const renderCountdownSettings = () => {
    const countdownData = JSON.parse(component.content || '{}');
    
    const updateCountdownData = (updates: any) => {
      const newData = { ...countdownData, ...updates };
      onContentChange(JSON.stringify(newData));
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Tipo</label>
          <select
            value={countdownData.type || 'minutes'}
            onChange={(e) => updateCountdownData({ type: e.target.value })}
            className="w-full p-2 border rounded-md text-sm"
          >
            <option value="minutes">Tempo em minutos</option>
            <option value="hours">Tempo em horas</option>
            <option value="fixed">Data fixa</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Background</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={countdownData.backgroundColor || '#ef4444'}
              onChange={(e) => updateCountdownData({ backgroundColor: e.target.value })}
              className="w-12 h-8 border rounded cursor-pointer"
            />
            <input
              type="text"
              value={countdownData.backgroundColor || '#ef4444'}
              onChange={(e) => updateCountdownData({ backgroundColor: e.target.value })}
              className="flex-1 p-2 border rounded-md text-sm"
              placeholder="#ef4444"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Texto</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={countdownData.textColor || '#ffffff'}
              onChange={(e) => updateCountdownData({ textColor: e.target.value })}
              className="w-12 h-8 border rounded cursor-pointer"
            />
            <input
              type="text"
              value={countdownData.textColor || '#ffffff'}
              onChange={(e) => updateCountdownData({ textColor: e.target.value })}
              className="flex-1 p-2 border rounded-md text-sm"
              placeholder="#ffffff"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tempo</label>
          <input
            type="text"
            value={countdownData.duration || '00:15:00'}
            onChange={(e) => updateCountdownData({ duration: e.target.value })}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="00:15:00"
            pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
          />
          <p className="text-xs text-gray-500">Formato: HH:MM:SS</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Texto contagem ativa</label>
          <input
            type="text"
            value={countdownData.activeText || 'Oferta por tempo limitado'}
            onChange={(e) => updateCountdownData({ activeText: e.target.value })}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="Oferta por tempo limitado"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Texto contagem finalizada</label>
          <input
            type="text"
            value={countdownData.finishedText || 'O tempo acabou!'}
            onChange={(e) => updateCountdownData({ finishedText: e.target.value })}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="O tempo acabou!"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <input
              type="checkbox"
              checked={countdownData.stickyTop || false}
              onChange={(e) => updateCountdownData({ stickyTop: e.target.checked })}
              className="rounded"
            />
            Fixar no topo
          </label>
          <p className="text-xs text-gray-500">Mantém o cronômetro fixo no topo da tela</p>
        </div>
      </div>
    );
  };

  const renderComponentSpecificSettings = () => {
    switch (component.type) {
      case 'text':
        return renderTextSettings();
      case 'image':
        return renderImageSettings();
      case 'advantages':
        return renderAdvantagesSettings();
      case 'testimonial':
        return renderTestimonialSettings();
      case 'countdown':
        return renderCountdownSettings();
      default:
        return (
          <div className="text-sm text-gray-500">
            Configurações para {component.type} em desenvolvimento...
          </div>
        );
    }
  };

  return (
    <>
      {/* Modal Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-h-[90vh] overflow-y-auto">
        <Card className="w-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium capitalize">
                {component.type === 'text' && 'Texto'}
                {component.type === 'image' && 'Imagem'}
                {component.type === 'advantages' && 'Vantagens'}
                {component.type === 'testimonial' && 'Depoimento'}
                {component.type === 'countdown' && 'Cronômetro'}
                {component.type === 'video' && 'Vídeo'}
                {component.type === 'social' && 'Redes Sociais'}
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onDelete}
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  title="Excluir"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onDuplicate}
                  className="h-6 w-6 p-0"
                  title="Duplicar"
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onClose}
                  className="h-6 w-6 p-0"
                  title="Fechar"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Component-specific settings */}
        {renderComponentSpecificSettings()}
        
        {/* Common style settings */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="text-sm font-medium">Estilo</h4>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Background</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={style.backgroundColor}
                onChange={(e) => onStyleChange({ backgroundColor: e.target.value })}
                className="w-12 h-8 border rounded cursor-pointer"
              />
              <input
                type="text"
                value={style.backgroundColor}
                onChange={(e) => onStyleChange({ backgroundColor: e.target.value })}
                className="flex-1 p-2 border rounded-md text-sm"
                placeholder="#ffffff"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Cor da borda</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={style.borderColor}
                onChange={(e) => onStyleChange({ borderColor: e.target.value })}
                className="w-12 h-8 border rounded cursor-pointer"
              />
              <input
                type="text"
                value={style.borderColor}
                onChange={(e) => onStyleChange({ borderColor: e.target.value })}
                className="flex-1 p-2 border rounded-md text-sm"
                placeholder="#e5e7eb"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Largura da borda (px)</label>
            <input
              type="number"
              min="0"
              max="10"
              value={style.borderWidth}
              onChange={(e) => onStyleChange({ borderWidth: parseInt(e.target.value) })}
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Radius (px)</label>
            <input
              type="number"
              min="0"
              max="50"
              value={style.borderRadius}
              onChange={(e) => onStyleChange({ borderRadius: parseInt(e.target.value) })}
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
      </div>
    </>
  );
}