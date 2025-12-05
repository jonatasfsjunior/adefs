import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize'; 
// ✅ CORREÇÃO: Importamos 'MDXRemoteSerializeResult' do módulo raiz do next-mdx-remote
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

type ContentType = 'posts' | 'pages';

// Diretório base para todo o conteúdo Markdown
const contentDirectory = path.join(process.cwd(), 'content');

// Tipagem do objeto que será retornado
interface MarkdownData {
  slug: string;
  source: MDXRemoteSerializeResult;
  title: string;
  date?: string;
  excerpt?: string;
}

/**
 * Retorna o caminho completo para a pasta de conteúdo específica (posts ou pages).
 * @param type O tipo de conteúdo ('posts' ou 'pages').
 */
function getContentDirectory(type: ContentType): string {
  return path.join(contentDirectory, type);
}

/**
 * Lê o arquivo Markdown, extrai os metadados e converte o conteúdo em um objeto serializado MDX.
 * @param type O tipo de conteúdo ('posts' ou 'pages').
 * @param fileName O nome do arquivo (ex: 'meu-post.md').
 * @returns Um objeto com os metadados e o conteúdo MDX serializado (source).
 */
export async function getMarkdownContent(type: ContentType, fileName: string): Promise<MarkdownData> {
  const directory = getContentDirectory(type);
  const fullPath = path.join(directory, fileName);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Markdown file not found: ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // 🛑 IMPORTANTE: gray-matter é essencial para separar metadados (front matter) do conteúdo
  const matterResult = matter(fileContents);
  const slug = fileName.replace(/\.md$/, '');

  // ✅ CHAVE DA MUDANÇA: Substituímos remark/remark-html por next-mdx-remote/serialize
  const mdxSource = await serialize(matterResult.content, {
    // Passamos os dados do front matter já extraídos pelo gray-matter
    scope: matterResult.data, 
    // Usamos plugins aqui se necessário (ex: rehype-prism para sintaxe de código)
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });

  // Retorna o objeto MDX serializado e os metadados
  return {
    slug,
    source: mdxSource,
    // Garantimos que 'title' e outros metadados estejam presentes
    ...(matterResult.data as { date?: string; title: string; excerpt?: string }),
  };
}

/**
 * Retorna uma lista de slugs de todos os arquivos Markdown de um tipo específico.
 * @param type O tipo de conteúdo ('posts' ou 'pages').
 */
export function getAllSlugs(type: ContentType) {
  const directory = getContentDirectory(type);
  
  // Verifica se o diretório existe antes de tentar ler
  if (!fs.existsSync(directory)) {
    return [];
  }

  const fileNames = fs.readdirSync(directory);
  
  return fileNames.map((fileName) => {
    // Remove a extensão '.md' do nome do arquivo para obter o slug
    const slug = fileName.replace(/\.md$/, '');
    return {
      slug,
    };
  });
}

/**
 * Retorna uma lista de todos os posts, incluindo metadados (para listar na página inicial/blog).
 */
export async function getAllPostsMetadata() {
    const directory = getContentDirectory('posts');
    
    if (!fs.existsSync(directory)) {
        return [];
    }

    const fileNames = fs.readdirSync(directory);
    
    const allPosts = fileNames.map((fileName) => {
        const fullPath = path.join(directory, fileName);
        // Não precisamos de async/await aqui, pois não estamos serializando o conteúdo, apenas lendo o front matter
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        const slug = fileName.replace(/\.md$/, '');

        return {
            slug,
            // Apenas retorna os metadados
            ...(matterResult.data as { date: string; title: string; excerpt?: string }),
        };
    });

    // Opcional: Ordenar por data
    allPosts.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });

    return allPosts;
}