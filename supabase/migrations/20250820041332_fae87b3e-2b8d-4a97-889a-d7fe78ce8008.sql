-- Corrigir avisos de segurança - definir search_path nas funções

-- Recriar função de autenticação com search_path seguro
CREATE OR REPLACE FUNCTION public.authenticate_admin(email_input VARCHAR, password_input VARCHAR)
RETURNS TABLE(id UUID, email VARCHAR, role VARCHAR) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT a.id, a.email, a.role
  FROM public.admins a
  WHERE a.email = email_input 
    AND a.password_hash = crypt(password_input, a.password_hash)
    AND a.is_active = true;
END;
$$;

-- Recriar função de hash com search_path seguro
CREATE OR REPLACE FUNCTION public.hash_password(password_input VARCHAR)
RETURNS VARCHAR
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN crypt(password_input, gen_salt('bf'));
END;
$$;

-- Recriar função de update timestamp com search_path seguro
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;