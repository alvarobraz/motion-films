import { ContactFormClient } from './contact-form-client';

export function ContactForm() {
  return (
    <section id="contato" className="bg-background px-4 py-24">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-foreground mb-6 text-4xl font-bold">
              Pronto para o{' '}
              <span className="text-primary italic">próximo nível?</span>
            </h2>
            <p className="text-text-body mb-8 text-lg">
              Deixe seus dados e vamos transformar sua visão em cinema. Nossa
              equipe entrará em contato para entender as necessidades do seu
              projeto.
            </p>

            <div className="space-y-4">
              <p className="text-text-muted text-sm font-bold tracking-widest uppercase">
                Contato Direto
              </p>
              <p className="text-foreground font-medium">
                contato@motinfilms.com.br
              </p>
            </div>
          </div>

          {/* Lado Direito: Formulário (Client Side) */}
          <ContactFormClient />
        </div>
      </div>
    </section>
  );
}
