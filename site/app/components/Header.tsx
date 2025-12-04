"use client"; // Necessário para usar Hooks (useState, useEffect)

import React, { useState, useEffect } from 'react';

// --- DEFINIÇÕES DE TIPOS E TEMA ---
type Theme = 'light' | 'dark';

interface HeaderProps {
    title: string;
    links: { name: string; url: string }[];
}

// --- LÓGICA DO TEMA (useTheme Hook) ---
const useTheme = () => {
    // Inicializa o tema verificando localStorage ou preferência do sistema
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') as Theme;
            if (savedTheme) return savedTheme;
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        }
        return 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return { theme, toggleTheme };
};

// --- COMPONENTE ThemeTogglerButton (Botão de Alternância de Tema) ---
const ThemeTogglerButton: React.FC<{ theme: Theme; toggleTheme: () => void }> = ({ theme, toggleTheme }) => {
    const isDark = theme === 'dark';
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-700 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Mudar para modo ${isDark ? 'Claro' : 'Escuro'}`}
        >
            {isDark ? (
                // Ícone do Sol (para mudar para CLARO)
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ) : (
                // Ícone da Lua (para mudar para ESCURO)
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            )}
        </button>
    );
};

// --- COMPONENTE PRINCIPAL HEADER (COM ALINHAMENTO CORRIGIDO) ---
const Header: React.FC<HeaderProps> = ({ title, links }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white dark:bg-black shadow-md">
            
            <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
                
                {/* 1. Brand/Title (Lado Esquerdo) */}
                <a href="/" className="text-xl font-bold text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                    {title}
                </a>
                
                {/* 2. Todos os elementos do Lado Direito (agora agrupados) */}
                <div className="flex items-center">

                    {/* Menu de Links (VISÍVEL APENAS em telas grandes) */}
                    {/* Note o 'sm:flex' e a ausência do 'space-x' aqui, pois está no contêiner pai */}
                    <nav className="hidden sm:flex space-x-6">
                        {links.map((link, index) => (
                            <a 
                                key={index} 
                                href={link.url} 
                                className="text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-150 ease-in-out"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Botões/Ícones (Sempre visíveis em telas grandes ou pequenas) */}
                    {/* Este contêiner Flex controla o espaçamento entre o último link, o botão de tema e o hamburger */}
                    <div className="flex items-center space-x-3 ml-4 sm:ml-6">
                        
                        {/* Botão de Tema (EXTREMA DIREITA) */}
                        <ThemeTogglerButton theme={theme} toggleTheme={toggleTheme} />
                        
                        {/* Botão Hamburger (VISÍVEL APENAS em telas pequenas) */}
                        <button 
                            onClick={toggleMenu} 
                            className="sm:hidden p-2 rounded-md text-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Abrir Menu"
                        >
                            {/* Ícones X ou Hamburger */}
                            {isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. Menu Dropdown Mobile */}
            <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'} border-t border-gray-200 dark:border-gray-700`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            className="block w-full text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 rounded-md p-2"
                            onClick={toggleMenu}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;