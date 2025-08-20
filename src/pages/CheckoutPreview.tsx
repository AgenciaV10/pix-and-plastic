import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckoutComponent } from '@/components/checkout/CheckoutComponent';

interface PreviewData {
  name: string;
  components: any[];
  viewMode: 'desktop' | 'mobile';
}

export default function CheckoutPreview() {
  const [searchParams] = useSearchParams();
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const mode = searchParams.get('mode') as 'desktop' | 'mobile' || 'desktop';

  useEffect(() => {
    // Recuperar dados do localStorage
    const storedData = localStorage.getItem('checkout-preview');
    
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setPreviewData(data);
      } catch (error) {
        console.error('Erro ao carregar dados de pré-visualização:', error);
      }
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando pré-visualização...</p>
        </div>
      </div>
    );
  }

  if (!previewData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Pré-visualização não encontrada</h1>
          <p className="text-gray-600 mb-6">Não foi possível carregar os dados da pré-visualização.</p>
          <button 
            onClick={() => window.close()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header da pré-visualização */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-800">
              Pré-visualização: {previewData.name}
            </h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {mode === 'desktop' ? '🖥️ Desktop' : '📱 Mobile'}
            </span>
          </div>
          <button 
            onClick={() => window.close()}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>

      {/* Área de pré-visualização */}
      <div className="p-6">
        <div className={`mx-auto bg-white rounded-lg shadow-lg overflow-hidden ${
          mode === 'mobile' 
            ? 'max-w-sm' 
            : 'max-w-4xl'
        }`}>
          <div className={`${
            mode === 'mobile' 
              ? 'w-full' 
              : 'w-full'
          }`}>
            <CheckoutComponent 
              components={previewData.components}
              viewMode={mode}
              isPreview={true}
            />
          </div>
        </div>
      </div>

      {/* Informações adicionais */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
        <h3 className="font-semibold text-gray-800 mb-2">Informações</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Nome:</strong> {previewData.name}</p>
          <p><strong>Componentes:</strong> {previewData.components.length}</p>
          <p><strong>Modo:</strong> {mode === 'desktop' ? 'Desktop' : 'Mobile'}</p>
        </div>
      </div>
    </div>
  );
}