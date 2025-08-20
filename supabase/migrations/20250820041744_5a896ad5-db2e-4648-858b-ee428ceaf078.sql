-- CORREÇÃO CRÍTICA DE SEGURANÇA: Políticas RLS da tabela admins

-- 1. Remover políticas inseguras existentes
DROP POLICY IF EXISTS "Admins can view their own data" ON public.admins;
DROP POLICY IF EXISTS "Admins can update their own data" ON public.admins;

-- 2. Criar função segura para verificar se é admin autenticado
CREATE OR REPLACE FUNCTION public.is_authenticated_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_email VARCHAR;
BEGIN
  -- Verificar se há uma sessão ativa (implementação básica)
  -- Em produção, isso seria baseado em JWT ou session management
  SELECT current_setting('app.current_admin_email', true) INTO admin_email;
  
  IF admin_email IS NULL OR admin_email = '' THEN
    RETURN FALSE;
  END IF;
  
  -- Verificar se o email existe na tabela de admins e está ativo
  RETURN EXISTS (
    SELECT 1 FROM public.admins 
    WHERE email = admin_email AND is_active = true
  );
END;
$$;

-- 3. Criar função para verificar se é o próprio admin
CREATE OR REPLACE FUNCTION public.is_own_admin_record(admin_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_email VARCHAR;
BEGIN
  SELECT current_setting('app.current_admin_email', true) INTO admin_email;
  
  IF admin_email IS NULL OR admin_email = '' THEN
    RETURN FALSE;
  END IF;
  
  RETURN EXISTS (
    SELECT 1 FROM public.admins 
    WHERE id = admin_id AND email = admin_email AND is_active = true
  );
END;
$$;

-- 4. Criar políticas RLS seguras

-- Política para SELECT: Apenas admins autenticados podem ver dados de outros admins
CREATE POLICY "Authenticated admins can view admin data" 
ON public.admins 
FOR SELECT 
USING (public.is_authenticated_admin());

-- Política para UPDATE: Apenas o próprio admin pode atualizar seus dados
CREATE POLICY "Admins can update only their own data"
ON public.admins 
FOR UPDATE 
USING (public.is_own_admin_record(id));

-- Política para INSERT: Nenhuma inserção via API (apenas via função de autenticação)
CREATE POLICY "No public admin creation"
ON public.admins 
FOR INSERT 
WITH CHECK (false);

-- Política para DELETE: Nenhuma exclusão via API
CREATE POLICY "No public admin deletion"
ON public.admins 
FOR DELETE 
USING (false);

-- 5. Atualizar função de autenticação para ser mais segura
CREATE OR REPLACE FUNCTION public.authenticate_admin(email_input VARCHAR, password_input VARCHAR)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_record RECORD;
  result JSON;
BEGIN
  -- Verificar credenciais
  SELECT id, email, role, is_active
  INTO admin_record
  FROM public.admins 
  WHERE email = email_input 
    AND password_hash = crypt(password_input, password_hash)
    AND is_active = true;
    
  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'message', 'Credenciais inválidas'
    );
  END IF;
  
  -- Retornar sucesso com dados não sensíveis
  RETURN json_build_object(
    'success', true,
    'admin', json_build_object(
      'id', admin_record.id,
      'email', admin_record.email,
      'role', admin_record.role
    )
  );
END;
$$;