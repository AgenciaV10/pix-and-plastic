import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uvbvmpsqehzldpajdnfd.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export interface CheckoutData {
  id?: string;
  name: string;
  components: any[];
  created_at?: string;
  updated_at?: string;
}

export class CheckoutService {
  static async saveCheckout(checkoutData: CheckoutData): Promise<{ success: boolean; data?: CheckoutData; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('checkouts')
        .upsert({
          id: checkoutData.id,
          name: checkoutData.name,
          components: checkoutData.components
        })
        .select()
        .single();

      if (error) {
        console.error('Erro ao salvar checkout:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Erro ao salvar checkout:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  static async loadCheckout(id: string): Promise<{ success: boolean; data?: CheckoutData; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('checkouts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao carregar checkout:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Erro ao carregar checkout:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  static async listCheckouts(): Promise<{ success: boolean; data?: CheckoutData[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('checkouts')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Erro ao listar checkouts:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Erro ao listar checkouts:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  static async deleteCheckout(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('checkouts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar checkout:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Erro ao deletar checkout:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }
}