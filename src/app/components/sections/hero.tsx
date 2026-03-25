import Link from 'next/link';
import { Button } from '../ui/button';

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
          className="h-full w-full object-cover brightness-[0.4]"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
      </div>

      {/* Conteúdo da Hero */}
      <div className="relative z-10 container px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-7xl">
          Impacto visual que <br />
          <span className="text-primary">transforma histórias</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300 md:text-xl">
          Produção cinematográfica para marcas que não aceitam o comum.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="brand" asChild>
            <Link href="#contato">Orçamento</Link>
          </Button>
          <Button variant="outline">Ver Portfólio</Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30 pt-2">
          <div className="h-2 w-1 rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
}
