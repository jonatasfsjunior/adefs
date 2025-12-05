import { getMarkdownContent, getAllSlugs } from '../../../lib/markdown';

// Componente para renderizar conteúdo Markdown (reutilizado)
function MarkdownRenderer({ pageData }: any) {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{pageData.title}</h1>
            
            <article 
                className="prose dark:prose-invert prose-lg max-w-none" 
                dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} 
            />
        </div>
    );
}

// 1. Geração de Parâmetros Estáticos para Build Time
export async function generateStaticParams() {
  // Busca todos os slugs da pasta 'pages'
  const slugs = getAllSlugs('pages');
  // Formato esperado: [{ slug: 'sobre' }, { slug: 'contato' }]
  return slugs.map(page => ({
    slug: page.slug,
  }));
}

// 2. Componente de Página Principal para Páginas Estáticas
export default async function StaticPage({ params }: { params: { slug: string } }) {
  const markdownFile = `${params.slug}.md`;
  
  try {
    // CHAVE: Usamos o tipo 'pages'
    const pageData = await getMarkdownContent('pages', markdownFile);
    return <MarkdownRenderer pageData={pageData} />;
    
  } catch (error) {
    console.error(error);
    // Em caso de erro (arquivo não encontrado), exibe um erro simples.
    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-bold text-red-600">Página Estática não Encontrada (404)</h1>
            <p className="text-gray-600 dark:text-gray-400">Verifique o arquivo: {markdownFile} na pasta 'content/pages'.</p>
        </div>
    );
  }
}