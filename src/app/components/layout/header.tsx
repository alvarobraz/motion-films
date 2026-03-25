'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
          {['Início', 'Portfólio', 'Sobre'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              {item}
            </Link>
          ))}

          <Link
            href="#contato"
            className="hover:bg-primary rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-all hover:text-white"
          >
            Orçamento
          </Link>
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
