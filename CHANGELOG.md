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

*Nota: Este arquivo será atualizado continuamente com todas as modificações do projeto.*