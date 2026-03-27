import { HeroContent } from './hero-content';

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
          poster="/hero-bg.webp"
          className="hero-video-overlay h-full w-full"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
      </div>

      {/* Conteúdo da Hero */}
      <div className="relative z-10 container px-4 text-center">
        <HeroContent />
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
