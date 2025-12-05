"use client";

import React, { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

const ThemeToggler: React.FC = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') as Theme;
            if (savedTheme) return savedTheme;
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'light';
    });

    useEffect(() => {
        const root = document.documentElement; // O elemento <html>
        
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Salva a preferência do usuário no armazenamento local
        localStorage.setItem('theme', theme);

    }, [theme]); // Roda sempre que o estado 'theme' mudar

    // 3. Função de alternância
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Mudar para modo ${isDark ? 'Claro' : 'Escuro'}`}
        >
            {/* Ícone: Sol (se estiver no modo claro) ou Lua (se estiver no modo escuro) */}
            {isDark ? (
                // Ícone do Sol (para mudar para o modo CLARO)
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ) : (
                // Ícone da Lua (para mudar para o modo ESCURO)
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            )}
        </button>
    );
};

export default ThemeToggler;