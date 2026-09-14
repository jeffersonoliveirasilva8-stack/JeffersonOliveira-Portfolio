import FadeIn from "@/components/FadeIn";
import { getProfile } from "@/lib/content";

export const metadata = {
  title: "Contato — Jefferson Oliveira",
};

export default function ContatoPage() {
  const { contato, nome } = getProfile();

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10 pt-16 pb-32">
      <FadeIn>
        <h1 className="font-serif text-4xl md:text-6xl italic mb-16">
          Vamos conversar?
        </h1>
      </FadeIn>

      <FadeIn delay={100}>
        <dl className="space-y-8 max-w-md">
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted mb-1">
              Nome
            </dt>
            <dd className="font-serif text-xl">{nome}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted mb-1">
              E-mail
            </dt>
            <dd>
              <a
                href={`mailto:${contato.email}`}
                className="text-xl border-b border-fg/40 hover:border-accent hover:text-accent transition-colors"
              >
                {contato.email}
              </a>
            </dd>
          </div>
          {contato.telefone && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted mb-1">
                Telefone
              </dt>
              <dd>
                <a
                  href={`https://wa.me/55${contato.telefone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl border-b border-fg/40 hover:border-accent hover:text-accent transition-colors"
                >
                  {contato.telefone}
                </a>
              </dd>
            </div>
          )}
          {contato.behance && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted mb-1">
                Behance
              </dt>
              <dd>
                <a
                  href={`https://${contato.behance}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl border-b border-fg/40 hover:border-accent hover:text-accent transition-colors"
                >
                  {contato.behance}
                </a>
              </dd>
            </div>
          )}
          {contato.linkedin && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted mb-1">
                LinkedIn
              </dt>
              <dd>
                <a
                  href={contato.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl border-b border-fg/40 hover:border-accent hover:text-accent transition-colors"
                >
                  {contato.linkedin}
                </a>
              </dd>
            </div>
          )}
          {contato.instagram && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted mb-1">
                Instagram
              </dt>
              <dd>
                <a
                  href={contato.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl border-b border-fg/40 hover:border-accent hover:text-accent transition-colors"
                >
                  {contato.instagram}
                </a>
              </dd>
            </div>
          )}
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted mb-1">
              Localização
            </dt>
            <dd className="text-xl">{contato.localizacao}</dd>
          </div>
        </dl>
      </FadeIn>
    </div>
  );
}
