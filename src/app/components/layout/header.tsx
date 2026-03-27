'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha o menu ao clicar em um link (âncora)
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 px-6 py-4 transition-all duration-300',
        isScrolled || isMobileMenuOpen
          ? 'bg-background/80 border-border-subtle border-b py-3 backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-foreground text-2xl font-bold tracking-tighter"
        >
          MOTIN<span className="text-primary">FILMS</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-text-body hover:text-foreground text-sm font-medium transition-colors"
          >
            Início
          </Link>
          <Link
            href="#portfolio"
            className="text-text-body hover:text-foreground text-sm font-medium transition-colors"
          >
            Portfólio
          </Link>
          <Link
            href="/login"
            className="group text-text-body hover:border-primary/50 hover:bg-primary/10 hover:text-primary border-border-subtle bg-surface-subtle flex items-center justify-center rounded-full border p-2 transition-all"
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
        <button
          className="text-foreground focus:outline-none md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-background/95 border-border-subtle absolute top-full left-0 w-full overflow-hidden border-b backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col space-y-4 px-6 py-8">
              <Link
                href="/"
                onClick={closeMenu}
                className="text-text-body hover:text-primary text-lg font-medium transition-colors"
              >
                Início
              </Link>
              <Link
                href="#portfolio"
                onClick={closeMenu}
                className="text-text-body hover:text-primary text-lg font-medium transition-colors"
              >
                Portfólio
              </Link>
              <Link
                href="/login"
                onClick={closeMenu}
                className="text-text-body hover:text-primary flex items-center gap-2 text-lg font-medium transition-colors"
              >
                <Lock size={18} /> Área Restrita
              </Link>
              <hr className="border-border-subtle" />
              <Button variant="brand" size="lg" asChild className="w-full">
                <Link href="#contato" onClick={closeMenu}>
                  Solicitar Orçamento
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
