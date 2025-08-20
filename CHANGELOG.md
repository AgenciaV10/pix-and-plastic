# Changelog do Projeto - Pix and Plastic Checkout

Este arquivo documenta todas as alterações realizadas no projeto de checkout.

## [2025-01-20] - Migração de Emojis para SVG Flags

### Adicionado
- **27 arquivos SVG de bandeiras** criados em `public/flags/`:
  - América Latina: br.svg, mx.svg, co.svg, ar.svg, pe.svg, cl.svg, ec.svg, uy.svg, py.svg, bo.svg, ve.svg, gt.svg, cr.svg, pa.svg
  - Europa: es.svg, pt.svg, fr.svg, it.svg, de.svg, gb.svg
  - América do Norte: us.svg, ca.svg
  - Ásia-Pacífico: au.svg, jp.svg, kr.svg, cn.svg, in.svg
  - Outros: ru.svg

### Modificado
- **CustomerForm.tsx**: 
  - Substituição de emojis de bandeiras por caminhos SVG
  - Atualização da exibição de bandeiras para usar tags `<img>` com dimensões `w-4 h-3 object-cover`
  - Adição de países GT, CR e PA à lista

- **Checkout.tsx**:
  - Substituição de emojis de bandeiras por caminhos SVG no array `countries`
  - Mantida consistência com outros componentes

- **CountrySelector.tsx**:
  - Substituição de emojis de bandeiras por caminhos SVG
  - Atualização da exibição de bandeiras para usar tags `<img>` com dimensões `w-4 h-3 object-cover`
  - Aplicação consistente em trigger e dropdown items

### Detalhes Técnicos
- Todas as bandeiras SVG são otimizadas para web
- Dimensionamento consistente: `w-4 h-3 object-cover`
- Caminhos absolutos: `/flags/{country-code}.svg`
- Manutenção da funcionalidade existente

### Benefícios
- Exibição consistente em todos os navegadores
- Imagens escaláveis e nítidas
- Melhor performance comparado a emojis
- Aparência mais profissional

---

## [2025-01-20] - Ajuste de Largura do Container Principal

### Modificado
- **Checkout.tsx**: Ajustada largura do container principal para 672px
  - Elemento: `div` do CardContent principal
  - Alteração: Aplicada largura fixa de 672px
  - Localização: Container das informações pessoais e método de pagamento

### Detalhes da Alteração
- Largura anterior: 652px fixo
- Nova largura: 672px fixo
- Impacto: Layout mais amplo e melhor aproveitamento do espaço
- Elemento modificado: Container principal com classes `container mx-auto px-4 py-8`

---

## Alterações Recentes

### Ajustes de UI para Desktop (Versão Desktop)

- **Container Principal**: Ajustado a largura do container principal em `Checkout.tsx` de 652px para 672px

#### CustomerForm.tsx
- **Inputs Pessoais**: Ajustados inputs de nome, email e confirmar email para 622x48px no desktop
- **Layout CNPJ/Telefone**: Reorganizados campos CNPJ e telefone na mesma linha (307x48px cada) no desktop, mantendo linhas separadas no mobile
- **Responsividade**: Mantida compatibilidade com mobile sem alterações

#### PaymentTabs.tsx
- **Botões de Pagamento**: Ajustados botões (Cartão, Pix, Cartão + Pix) para 200x64px no desktop

#### CardForm.tsx
- **Container Modular**: Criado container específico para formulário de cartão (622x94px)
- **Estilização**: Aplicada borda rgba(203,213,224) e background #FAFAFA
- **Input Número do Cartão**: Ajustado para 588x48px
- **Layout Campos**: Reorganizados Mês (147x46px), Ano (155x46px) e Código de segurança (264x48px) na mesma linha no desktop
- **Campo Parcelas**: Ajustado para 586x46px
- **Responsividade**: Mantida compatibilidade com mobile

#### Estilos Globais dos Inputs
- **Background**: Aplicado background branco (#fff) em todos os campos de input
- **Bordas**: Padronizada cor da borda para #cfcfcf em todos os inputs e selects
- **Border Radius**: Aplicado border-radius de 4px (rounded) em todos os campos
- **Border Width**: Definido border-width de 1px em todos os elementos de formulário
- **Componentes Afetados**: CustomerForm.tsx, CardForm.tsx, CountrySelector.tsx

---

## [2025-01-21] - Estilos de Texto e Ajuste de Container

### Alterado
- Aplicados estilos CSS aos textos do formulário (color: #333, font-size: 16px, font-weight: 500)
- Labels de formulário em `CustomerForm.tsx` e `CardForm.tsx` com nova tipografia
- Títulos das seções "Informações pessoais" e "Método de pagamento" em `Checkout.tsx`
- Largura do container principal aumentada de 672px para 750px para melhor acomodação dos campos
- **Alinhamento de Labels**: Aplicada largura fixa (w-32) a todos os labels para garantir alinhamento vertical consistente
  - Corrigido desalinhamento entre labels "CNPJ" e "Confirmar e-mail"
  - Padronização visual em todos os formulários de checkout

---

## [Unreleased]

### Added
- Global input styles applied to all checkout form fields
  - White background (#fff)
  - Border color #cfcfcf
  - Border radius 4px
  - Border width 1px
- Updated `CustomerForm.tsx` with new input styling
- Updated `CardForm.tsx` with new input styling
- Updated `CountrySelector.tsx` with new styling

---

*Nota: Este arquivo será atualizado continuamente com todas as modificações do projeto.*