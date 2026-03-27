'use client';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';

export function HeroContent() {
  return (
    <div className="relative z-10 container mx-auto px-6 text-center">
      <motion.div initial="initial" animate="whileInView" variants={fadeInUp}>
        <h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-7xl">
          Filmes de alto impacto <br />
          <span className="text-primary">com qualidade</span>
          <br />
          <span className="text-primary italic">cinematográfica</span>
        </h1>
        <p className="text-text-body mx-auto mb-10 max-w-2xl text-lg md:text-xl">
          Criamos conteúdos que conectam marcas e pessoas através de histórias
          memoráveis.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="brand" size="lg" asChild>
            <Link href="#contato">Orçamento</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-border-subtle hover:bg-white/5"
          >
            <Link href="#portfolio">Ver Portfólio</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
