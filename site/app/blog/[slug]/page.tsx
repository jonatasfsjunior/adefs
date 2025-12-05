import { getMarkdownContent, getAllSlugs } from '../../../lib/markdown';
import { MDXComponentRenderer } from '../../components/MDXComponentRenderer'; 
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { notFound } from 'next/navigation';

// Interface de dados esperada, usando 'source' (MDX)
interface PostData {
    title: string;
    date?: string;
    excerpt?: string;
    source: MDXRemoteSerializeResult;
}

// 1. Geração de Parâmetros Estáticos para Build Time
export async function generateStaticParams() {
  const slugs = getAllSlugs('posts');
  return slugs.map(post => ({
    slug: post.slug,
  }));
}

// 2. Componente de Página Principal para Postagens
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  
  // ✅ CORREÇÃO CHAVE: Desestrutura 'slug' imediatamente.
  // Isso minimiza a chance de acionar o erro de Promise/Proxy do Next.js.
  const { slug } = params; 

  if (!slug) {
      // Esta verificação é redundante, mas mantém a segurança para a rota dinâmica
      // que falhou em fornecer o parâmetro (embora o Next.js devesse resolver isso).
      console.error("Erro: O parâmetro 'slug' está ausente na URL.");
      notFound();
  }

  const markdownFile = `${slug}.md`;
  
  let postData: PostData;
  try {
    // Busca o conteúdo MDX
    const rawData = await getMarkdownContent('posts', markdownFile);
    postData = rawData as PostData;
    
  } catch (error) {
    // O erro 'Markdown file not found' será capturado aqui
    console.error(`Erro ao carregar o post: ${markdownFile}`, error);
    // Se o arquivo não for encontrado, tratamos como 404
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
            {postData.title}
        </h1>
        {postData.date && (
            <p className="text-gray-500 mb-6">
                Publicado em: {new Date(postData.date).toLocaleDateString('pt-BR')}
            </p>
        )}
        
        {/* Renderiza o conteúdo MDX serializado */}
        <MDXComponentRenderer source={postData.source} />
    </div>
  );
}