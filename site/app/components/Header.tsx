'use client';

import React, { useState, useEffect } from 'react';
import type { FC } from 'react';

type Theme = 'light' | 'dark';

interface HeaderProps {
    title: string;
    links: { name: string; url: string }[];
}

const useTheme = () => {
    const [theme, setTheme] = useState<Theme>('light'); 
    
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        let initialTheme: Theme = 'light';

        if (savedTheme) {
            initialTheme = savedTheme;
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            initialTheme = 'dark';
        }

        setTheme(initialTheme);
        
        const root = document.documentElement;
        if (initialTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', initialTheme);

    }, []); 

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

interface ThemeTogglerButtonProps {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeTogglerButton: FC<ThemeTogglerButtonProps> = ({ theme, toggleTheme }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="p-2 w-10 h-10" aria-hidden="true" />
        );
    }

    const isDark = theme === 'dark';
    const ariaLabel = isDark ? 'Mudar para modo Claro' : 'Mudar para modo Escuro';

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-700 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={ariaLabel}
        >
            {isDark ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            )}
        </button>
    );
};

// --- COMPONENTE PRINCIPAL HEADER ---
const Header: React.FC<HeaderProps> = ({ title, links }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white dark:bg-black shadow-md shadow-black/15 dark:shadow-white/15">
            <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
                <a href="/" className="text-xl font-bold text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                    {title}
                </a>
                
                <div className="flex items-center">
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

                    <div className="flex items-center space-x-3 ml-4 sm:ml-6">
                        <ThemeTogglerButton theme={theme} toggleTheme={toggleTheme} />
                        
                        <button 
                            onClick={toggleMenu} 
                            className="sm:hidden p-2 rounded-md text-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Abrir Menu"
                        >
                            {isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

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