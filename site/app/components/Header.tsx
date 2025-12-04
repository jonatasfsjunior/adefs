"use client";
import React, { useState } from 'react';

interface HeaderProps {
    title: string;
    links: { name: string; url: string }[];
}

const Header: React.FC<HeaderProps> = ({ title, links }) => {
    // 1. Estado para controlar a abertura/fechamento do menu
    const [isOpen, setIsOpen] = useState(false);

    // Função para alternar o estado do menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white dark:bg-black shadow-md">
            <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
                
                <a href="/" className="text-xl font-bold text-zinc-950 dark:text-white">
                    {title}
                </a>
                
                {/* 3. Botão Hamburger - VISÍVEL APENAS em telas pequenas */}
                <button 
                    onClick={toggleMenu} 
                    className="sm:hidden p-2 rounded-md text-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Abrir Menu"
                >
                    {/* Ícone Hamburger (pode ser um SVG) */}
                    {isOpen ? (
                        // Ícone X (quando aberto)
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        // Ícone Hamburger (quando fechado)
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                <nav className="hidden sm:flex space-x-6">
                    {links.map((link, index) => (
                        <a 
                            key={index} 
                            href={link.url} 
                            className="text-zinc-950 dark:text-white hover:text-blue-600 transition duration-150 ease-in-out"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>
            </div>

            <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            className="block w-full text-base font-medium text-zinc-950 dark:text-white hover:bg-blue-500 hover:text-white rounded-md p-2"
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