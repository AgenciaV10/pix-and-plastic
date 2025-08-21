import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Trash2, 
  Copy, 
  Maximize2, 
  Bold, 
  Italic, 
  Underline, 
  Link, 
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify
} from 'lucide-react';
import { ColumnComponent } from './ColumnManager';
import { CountdownTimer } from '@/components/countdown/CountdownTimer';

interface EditableComponentProps {
  component: ColumnComponent;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onUpdate: (updates: Partial<ColumnComponent>) => void;
  onOpenSettings: () => void;
}

interface ComponentStyle {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  fontSize?: 'small' | 'medium' | 'large' | 'huge';
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline';
  color?: string;
}

export function EditableComponent({
  component,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
  onUpdate,
  onOpenSettings
}: EditableComponentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(component.content);
  const [style, setStyle] = useState<ComponentStyle>({
    backgroundColor: component.props?.backgroundColor || '#ffffff',
    borderColor: component.props?.borderColor || '#e5e7eb',
    borderWidth: component.props?.borderWidth || 2,
    borderRadius: component.props?.borderRadius || 8,
    textAlign: component.props?.textAlign || 'left',
    fontSize: component.props?.fontSize || 'medium',
    fontWeight: component.props?.fontWeight || 'normal',
    fontStyle: component.props?.fontStyle || 'normal',
    textDecoration: component.props?.textDecoration || 'none',
    color: component.props?.color || '#000000'
  });
  const contentRef = useRef<HTMLDivElement>(null);

  // Sincronizar conteúdo quando o componente for atualizado externamente
  useEffect(() => {
    setContent(component.content);
  }, [component.content]);

  // Sincronizar estilo quando as props do componente forem atualizadas externamente
  useEffect(() => {
    setStyle({
      backgroundColor: component.props?.backgroundColor || '#ffffff',
      borderColor: component.props?.borderColor || '#e5e7eb',
      borderWidth: component.props?.borderWidth || 2,
      borderRadius: component.props?.borderRadius || 8,
      textAlign: component.props?.textAlign || 'left',
      fontSize: component.props?.fontSize || 'medium',
      fontWeight: component.props?.fontWeight || 'normal',
      fontStyle: component.props?.fontStyle || 'normal',
      textDecoration: component.props?.textDecoration || 'none',
      color: component.props?.color || '#000000'
    });
  }, [component.props]);

  useEffect(() => {
    if (isEditing && contentRef.current) {
      contentRef.current.focus();
    }
  }, [isEditing]);

  const handleContentChange = () => {
    if (contentRef.current) {
      const newContent = contentRef.current.textContent || '';
      setContent(newContent);
      onUpdate({ content: newContent });
    }
  };

  const handleStyleChange = (newStyle: Partial<ComponentStyle>) => {
    setStyle(prev => ({ ...prev, ...newStyle }));
  };

  const applyTextFormat = (format: string) => {
    document.execCommand(format, false);
    handleContentChange();
  };

  const getFontSizeClass = (size: string) => {
    switch (size) {
      case 'small': return 'text-sm';
      case 'medium': return 'text-base';
      case 'large': return 'text-lg';
      case 'huge': return 'text-2xl';
      default: return 'text-base';
    }
  };

  const getAlignmentClass = (align: string) => {
    switch (align) {
      case 'left': return 'text-left';
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      case 'justify': return 'text-justify';
      default: return 'text-left';
    }
  };

  const renderComponent = () => {
    const baseStyle = {
      backgroundColor: style.backgroundColor,
      borderColor: style.borderColor,
      borderWidth: `${style.borderWidth}px`,
      borderRadius: `${style.borderRadius}px`,
      color: style.color
    };

    const textClasses = `
      ${getFontSizeClass(style.fontSize || 'medium')}
      ${getAlignmentClass(style.textAlign || 'left')}
      ${style.fontWeight === 'bold' ? 'font-bold' : 'font-normal'}
      ${style.fontStyle === 'italic' ? 'italic' : 'not-italic'}
      ${style.textDecoration === 'underline' ? 'underline' : 'no-underline'}
    `;

    switch (component.type) {
      case 'text':
        return (
          <div 
            className={`p-3 border ${textClasses} cursor-text`}
            style={baseStyle}
            onClick={() => {
              setIsEditing(true);
              onSelect();
            }}
          >
            {isEditing ? (
              <div
                ref={contentRef}
                contentEditable
                suppressContentEditableWarning
                onBlur={() => {
                  setIsEditing(false);
                  handleContentChange();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    setIsEditing(false);
                    handleContentChange();
                  }
                }}
                className="outline-none"
              >
                {content}
              </div>
            ) : (
              <div>{content}</div>
            )}
          </div>
        );
      
      case 'image':
        return (
          <div className="border overflow-hidden" style={baseStyle}>
            {content ? (
              <img 
                src={content} 
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
        const advantages = JSON.parse(content || '[]');
        return (
          <div className="p-3 border" style={baseStyle}>
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
              stickyTop={false}
              className="text-sm"
            />
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
      
      default:
        return (
          <div className="p-3 border" style={baseStyle}>
            <span className="text-xs text-gray-600">{component.type}</span>
          </div>
        );
    }
  };

  return (
    <div className="relative group">
      {/* Floating Toolbar - Only for text components when selected */}
      {isSelected && component.type === 'text' && (
        <div className="absolute -top-12 left-0 z-10 flex items-center gap-1 bg-white border rounded-lg shadow-lg p-1">
          <Button
            size="sm"
            variant={style.fontWeight === 'bold' ? 'default' : 'ghost'}
            onClick={() => {
              handleStyleChange({ fontWeight: style.fontWeight === 'bold' ? 'normal' : 'bold' });
              applyTextFormat('bold');
            }}
            className="h-7 w-7 p-0"
          >
            <Bold className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant={style.fontStyle === 'italic' ? 'default' : 'ghost'}
            onClick={() => {
              handleStyleChange({ fontStyle: style.fontStyle === 'italic' ? 'normal' : 'italic' });
              applyTextFormat('italic');
            }}
            className="h-7 w-7 p-0"
          >
            <Italic className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant={style.textDecoration === 'underline' ? 'default' : 'ghost'}
            onClick={() => {
              handleStyleChange({ textDecoration: style.textDecoration === 'underline' ? 'none' : 'underline' });
              applyTextFormat('underline');
            }}
            className="h-7 w-7 p-0"
          >
            <Underline className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              const url = prompt('Digite a URL do link:');
              if (url) {
                document.execCommand('createLink', false, url);
              }
            }}
            className="h-7 w-7 p-0"
          >
            <Link className="w-3 h-3" />
          </Button>
          <select
            value={style.fontSize}
            onChange={(e) => handleStyleChange({ fontSize: e.target.value as any })}
            className="h-7 text-xs border rounded px-1"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="huge">Huge</option>
          </select>
          <input
            type="color"
            value={style.color}
            onChange={(e) => handleStyleChange({ color: e.target.value })}
            className="h-7 w-7 border rounded cursor-pointer"
            title="Cor do texto"
          />
          <div className="flex">
            <Button
              size="sm"
              variant={style.textAlign === 'left' ? 'default' : 'ghost'}
              onClick={() => handleStyleChange({ textAlign: 'left' })}
              className="h-7 w-7 p-0"
            >
              <AlignLeft className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant={style.textAlign === 'center' ? 'default' : 'ghost'}
              onClick={() => handleStyleChange({ textAlign: 'center' })}
              className="h-7 w-7 p-0"
            >
              <AlignCenter className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant={style.textAlign === 'right' ? 'default' : 'ghost'}
              onClick={() => handleStyleChange({ textAlign: 'right' })}
              className="h-7 w-7 p-0"
            >
              <AlignRight className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant={style.textAlign === 'justify' ? 'default' : 'ghost'}
              onClick={() => handleStyleChange({ textAlign: 'justify' })}
              className="h-7 w-7 p-0"
            >
              <AlignJustify className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Component Content */}
      <div 
        className={`cursor-pointer transition-all ${
          isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
        }`}
        onClick={onSelect}
      >
        {renderComponent()}
      </div>

      {/* Block Actions - Top Right */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            onClick={onDuplicate}
            className="h-6 w-6 p-0 bg-white border shadow-sm"
            title="Duplicar"
          >
            <Copy className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {}}
            className="h-6 w-6 p-0 bg-white border shadow-sm"
            title="Expandir"
          >
            <Maximize2 className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={onDelete}
            className="h-6 w-6 p-0"
            title="Excluir"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      )}
    </div>
  );
}

export { type ComponentStyle };