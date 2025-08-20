import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Monitor, Smartphone, Eye, Save, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckoutHeaderProps {
  checkoutName: string;
  onCheckoutNameChange: (name: string) => void;
  viewMode: 'desktop' | 'mobile';
  onViewModeChange: (mode: 'desktop' | 'mobile') => void;
  hasUnsavedChanges: boolean;
  onSave: () => Promise<void> | void;
  onPreview: () => void;
  isSaving?: boolean;
}

export function CheckoutHeader({
  checkoutName,
  onCheckoutNameChange,
  viewMode,
  onViewModeChange,
  hasUnsavedChanges,
  onSave,
  onPreview,
  isSaving = false
}: CheckoutHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(checkoutName);

  const handleNameSubmit = () => {
    onCheckoutNameChange(tempName);
    setIsEditing(false);
  };

  const handleNameCancel = () => {
    setTempName(checkoutName);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      handleNameCancel();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Checkout Name */}
        <div className="flex items-center gap-4">
          {isEditing ? (
            <Input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={handleKeyPress}
              className="text-lg font-semibold border-none shadow-none p-0 h-auto focus-visible:ring-0 max-w-xs"
              autoFocus
            />
          ) : (
            <h1 
              className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-gray-700 transition-colors"
              onClick={() => setIsEditing(true)}
              title="Clique para editar o nome"
            >
              {checkoutName || 'Checkout sem nome'}
            </h1>
          )}
        </div>

        {/* Center Section - View Mode Toggle */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <Button
            variant={viewMode === 'desktop' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('desktop')}
            className={cn(
              "gap-2 h-8",
              viewMode === 'desktop' 
                ? "bg-white shadow-sm" 
                : "hover:bg-gray-200"
            )}
          >
            <Monitor className="w-4 h-4" />
            Desktop
          </Button>
          <Button
            variant={viewMode === 'mobile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('mobile')}
            className={cn(
              "gap-2 h-8",
              viewMode === 'mobile' 
                ? "bg-white shadow-sm" 
                : "hover:bg-gray-200"
            )}
          >
            <Smartphone className="w-4 h-4" />
            Mobile
          </Button>
        </div>

        {/* Right Section - Status and Actions */}
        <div className="flex items-center gap-4">
          {/* Unsaved Changes Indicator */}
          {hasUnsavedChanges && (
            <div className="flex items-center gap-2 text-orange-600">
              <Circle className="w-2 h-2 fill-current" />
              <span className="text-sm font-medium">Existem alterações não salvas</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPreview}
              className="gap-2 text-gray-600 hover:text-gray-900"
            >
              <Eye className="w-4 h-4" />
              Pré-visualizar
            </Button>
            
            <Button
              onClick={onSave}
              disabled={isSaving || !hasUnsavedChanges}
              className="gap-2 bg-purple-600 hover:bg-purple-700 text-white"
              size="sm"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Salvar checkout
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}