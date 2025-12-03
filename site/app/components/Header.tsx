import React from 'react';

interface HeaderProps {
    title: string;
    links: { name: string; url: string }[];
}

const Header: React.FC<HeaderProps> = ({ title, links }) => {
    return (
        <header className="navbar">
            <div className="container">
                <a href="/" className="navbar-brand">{title}</a>
                
                <nav className="navbar-menu">
                    {links.map((link, index) => (
                        <a key={index} href={link.url} className="navbar-item">
                            {link.name}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;