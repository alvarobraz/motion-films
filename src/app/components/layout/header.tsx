'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 px-6 py-4 transition-all duration-300',
        isScrolled
          ? 'border-b border-white/10 bg-black/80 py-3 backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter text-white"
        >
          MOTIN<span className="text-primary">FILMS</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
          >
            Início
          </Link>
          <Link
            href="#portfolio"
            className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
          >
            Portfólio
          </Link>
          <Link
            href="/login"
            className="group hover:border-primary/50 hover:bg-primary/10 hover:text-primary flex items-center justify-center rounded-full border border-white/5 bg-white/5 p-2 text-gray-300 transition-all"
            title="Acesso Restrito"
            aria-label="Login"
          >
            <Lock
              size={18}
              className="transition-transform group-hover:scale-110"
            />
          </Link>

          <Button variant="brand" size="sm" asChild>
            <Link href="#contato">Orçamento</Link>
          </Button>
        </nav>

        {/* Mobile Menu Icon */}
        <button className="text-white md:hidden">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
