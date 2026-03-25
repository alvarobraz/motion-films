import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { cn } from '@/lib/utils';
import { Header } from './components/layout/header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Motin Films | Transformamos histórias em impacto visual',
  description:
    'Produtora de vídeo especializada em conteúdo institucional, social media e produções de alto impacto. Transforme sua marca com a Motin Films.',
  keywords: [
    'Produtora de vídeo',
    'Motin Films',
    'Vídeo Institucional',
    'Curitiba',
    'Filmmaking',
  ],
  authors: [{ name: 'Motin Films' }],
  openGraph: {
    title: 'Motin Films | Impacto Visual que Conecta',
    description:
      'Conheça nosso portfólio e transforme a comunicação da sua empresa.',
    url: 'https://motinfilms.com.br',
    siteName: 'Motin Films',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Motin Films Portfolio',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={cn(
          'min-h-screen bg-black font-sans text-white antialiased',
          inter.variable
        )}
      >
        <main>
          <Header />
          {children}
          <Toaster richColors position="top-right" theme="dark" />
        </main>
      </body>
    </html>
  );
}
