import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Header from './components/Header';

const SITE_TITLE = "ADEFS";
const NAV_LINKS = [
    { name: "Início", url: "/" },
    { name: "Sobre", url: "/about" },
];

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
    title: SITE_TITLE,
    description: "Igreja Evangélica Assembléia de Deus em Feira de Santana - Bahia",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} antialiased`}
            >
                <Header 
                    title={SITE_TITLE} 
                    links={NAV_LINKS} 
                />
                <main>{children}</main>
            </body>
        </html>
    );
}