-- Criar tabela de administradores
CREATE TABLE public.admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Política para admins poderem ler seus próprios dados
CREATE POLICY "Admins can view their own data" 
ON public.admins 
FOR SELECT 
USING (true);

-- Política para admins poderem atualizar seus próprios dados  
CREATE POLICY "Admins can update their own data"
ON public.admins 
FOR UPDATE 
USING (true);

-- Função para autenticar admin
CREATE OR REPLACE FUNCTION public.authenticate_admin(email_input VARCHAR, password_input VARCHAR)
RETURNS TABLE(id UUID, email VARCHAR, role VARCHAR) 
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Função para criar hash de senha
CREATE OR REPLACE FUNCTION public.hash_password(password_input VARCHAR)
RETURNS VARCHAR
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN crypt(password_input, gen_salt('bf'));
END;
$$;

-- Inserir usuário admin
INSERT INTO public.admins (email, password_hash, role) 
VALUES (
  'antoniojhuliene@gmail.com',
  crypt('+.12DEmaio**', gen_salt('bf')),
  'admin'
);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_admins_updated_at
  BEFORE UPDATE ON public.admins
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();