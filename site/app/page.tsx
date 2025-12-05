import { getMarkdownContent } from '../lib/markdown';
import { MDXComponentRenderer } from './components/MDXComponentRenderer';
// Importamos o tipo MDXRemoteSerializeResult para tipagem correta, como fizemos no lib/markdown.ts
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'; 
import { notFound } from 'next/navigation';

// Definindo a interface de dados que esperamos do nosso utilitário de Markdown
interface PostData {
    title: string;
    date?: string;
    excerpt?: string;
    // ✅ CHAVE DA CORREÇÃO: Usamos 'source' em vez de 'contentHtml'
    source: MDXRemoteSerializeResult; 
}


export default async function Home() {
  const homepageFile = 'home.md';

  let postData: PostData;
  try {
    // 2. Chame a função de leitura (que agora serializa para MDX)
    const rawData = await getMarkdownContent('pages', homepageFile);

    // O objeto retornado deve conter o conteúdo serializado (source)
    postData = rawData as PostData; 

  } catch (error) {
    console.error("Erro ao carregar o MDX da página inicial:", error);
    // Em caso de falha, usamos o notFound() do Next.js.
    notFound(); 
  }

  // Se o postData não foi carregado corretamente (embora o try/catch já ajude)
  if (!postData || !postData.source) {
     notFound(); 
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="body">
        {postData.title}
      </h1>
      
      <div className="body">
        <MDXComponentRenderer source={postData.source} />
      </div>

      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
        {postData.date && (
          <p className="text-gray-500">
            Última atualização: {new Date(postData.date).toLocaleDateString('pt-BR')}
          </p>
        )}
      </div>
    </div>
  );
}