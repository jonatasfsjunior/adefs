'use client';
// components/MDXComponentRenderer.tsx
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';

// Exemplo de um componente personalizado para o seu Markdown
const CustomButton = ({ children, link }: { children: React.ReactNode, link: string }) => (
    <a 
        href={link} 
        className="inline-block px-6 py-3 mt-4 text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
    >
        {children}
    </a>
);

// Mapeamento de componentes: O que está no seu Markdown corresponde a este componente React
const components = {
  // Você pode sobrescrever tags HTML padrão (h1, p, a, etc.)
  h1: (props: any) => <h1 className="text-5xl font-extrabold my-6 text-indigo-700 dark:text-indigo-400" {...props} />,
  // E adicionar seus próprios componentes
  CustomButton,
  // Adicione qualquer outro componente que você queira expor (ex: Chart, Carousel)
};

interface MDXRendererProps {
  source: MDXRemoteSerializeResult;
}

// Este componente recebe o MDX serializado (source) e o renderiza
export function MDXComponentRenderer({ source }: MDXRendererProps) {
  // O componente MDXRemote é o coração da renderização de componentes dentro do Markdown
  return (
    <div className="prose dark:prose-invert prose-lg max-w-none">
      <MDXRemote {...source} components={components} />
    </div>
  );
}