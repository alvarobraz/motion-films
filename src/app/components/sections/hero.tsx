'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/utils';

export function Hero() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Container do Vídeo */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-bg.jpg"
          className="hero-video-overlay h-full w-full"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
      </div>

      {/* Conteúdo da Hero */}
      <div className="relative z-10 container px-4 text-center">
        <motion.div {...fadeInUp}>
          <h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-7xl">
            Filmes de alto impacto <br />
            <span className="text-primary">com qualidade</span>
            <br />
            <span className="text-primary">cinematográfica</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300 md:text-xl">
            Criamos conteúdos que conectam marcas e pessoas através de histórias
            memoráveis
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="brand" asChild>
              <Link href="#contato">Orçamento</Link>
            </Button>
            <Button variant="outline">Ver Portfólio</Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="border-border-muted flex h-10 w-6 justify-center rounded-full border-2 pt-2">
          <div className="h-2 w-1 rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
}
