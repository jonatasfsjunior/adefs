// declarations.d.ts

/**
 * Declaração de módulo para arquivos .css.
 * * Isso informa ao TypeScript que, ao encontrar uma importação de um arquivo
 * que termine em '.css', ele deve tratá-lo como um módulo, geralmente
 * resolvendo para 'any' ou um tipo de string (como em sistemas que 
 * injetam o CSS no DOM ou retornam o caminho do arquivo).
 * * Em muitos setups de bundler (como Webpack com css-loader/style-loader 
 * ou Vite), importar um arquivo CSS simplesmente o processa sem 
 * retornar um valor significativo para o código JavaScript.
 */
declare module '*.css' {
  // O tipo 'any' é o mais comum para evitar erros de compilação, 
  // especialmente quando o CSS é tratado puramente por um bundler.
  const content: any;
  export default content;

  // Se estiver usando Módulos CSS (CSS Modules), onde as classes 
  // são exportadas como um objeto, você usaria algo como:
  // const classes: { [key: string]: string };
  // export default classes;
}
declare module '*.scss' {
    const content: any;
    export default content;
}

declare module '*.less' {
    const content: any;
    export default content;
}