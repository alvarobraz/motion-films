'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/utils';

const projects = [
  {
    id: 1,
    title: 'Unifateb',
    category: 'Institucional',
    description:
      'Filme Institucional produzido para a Unifateb e o Colégio Dom Bosco...',
    image: '/projects/unifateb.jpg',
  },
  {
    id: 2,
    title: 'LJ Santos | Linha de Cromagem',
    category: 'Produto',
    description:
      'Filme produzido para a LJ Santos, destacando sua linha de cromagem...',
    image: '/projects/lj-santos-a.jpg',
  },
  {
    id: 3,
    title: 'BioBio Cosméticos - Only One',
    category: 'Produto',
    description: 'Lançamento do produto Only One da BioBio Cosméticos...',
    image: '/projects/biobio.jpg',
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="bg-background-alt px-4 py-24">
      <div className="container mx-auto">
        {/* Header da Section */}
        <motion.div {...fadeInUp} className="mb-16 text-center">
          <span className="border-primary/20 bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
            <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
            Portfólio
          </span>
          <h2 className="text-foreground mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Nossos <span className="text-primary italic">Trabalhos</span>
          </h2>
          <p className="text-text-muted mx-auto max-w-2xl">
            Confira alguns dos nossos projetos recentes e sinta a qualidade
            cinematográfica em cada frame.
          </p>
        </motion.div>

        {/* Grid de Projetos */}
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={{
            initial: {},
            whileInView: { transition: { staggerChildren: 0.2 } },
          }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              className="group hover:border-primary/30 bg-surface/50 border-border-subtle flex flex-col overflow-hidden rounded-2xl border transition-all"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover brightness-75 transition-transform duration-500 group-hover:scale-110 group-hover:brightness-100"
                />
                <div className="from-background-alt/80 absolute inset-0 bg-linear-to-t to-transparent" />
              </div>

              {/* Conteúdo inferior */}
              <div className="flex flex-col gap-3 p-6">
                <span className="bg-primary/10 text-primary w-fit rounded-lg px-3 py-1 text-[10px] font-bold tracking-wider uppercase">
                  {project.category}
                </span>
                <h3 className="text-text-title text-lg font-bold">
                  {project.title}
                </h3>
                <p className="text-text-muted line-clamp-2 text-sm leading-relaxed italic">
                  &quot;{project.description}&quot;
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
