---
title: Bem-vindo com Componentes!
date: 2025-10-27
slug: quem-somos
---

# Site Principal

Este conteúdo é renderizado pelo MDX. Podemos usar Markdown normal para listas e texto, mas também podemos injetar lógica React.
D
### Exemplo de Uso do Componente
Se quiser saber mais sobre a arquitetura:

<CustomButton link="/pages/sobre">
    Clique Aqui para Saber Mais
</CustomButton>

O MDX combina a simplicidade do Markdown com o poder do React!

## 4. Atualização do `app/page.tsx` (Renderização)

O seu arquivo `app/page.tsx` agora não irá mais usar `dangerouslySetInnerHTML`. Ele precisará receber o objeto serializado do MDX e passá-lo para o `MDXComponentRenderer`.

> **⚠️ NOTA IMPORTANTE:** A função `getMarkdownContent` no `lib/markdown.ts` precisaria ser alterada para usar a função `serialize` do `next-mdx-remote` em vez de `remark().use(html)`. Eu assumirei que você já fez essa atualização para que ela retorne o objeto serializado MDX, e não mais apenas a string `contentHtml`.

Aqui está a implementação do seu `app/page.tsx`:


http://googleusercontent.com/immersive_entry_chip/1

Ao usar o MDX, você ganha o melhor dos dois mundos: a facilidade de escrever Markdown e o poder da interatividade do React.