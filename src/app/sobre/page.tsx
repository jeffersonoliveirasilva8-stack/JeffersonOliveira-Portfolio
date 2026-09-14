import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { getExperienceSummary, getProfile, getProjects } from "@/lib/content";

export const metadata = {
  title: "Sobre — Jefferson Oliveira",
};

export default function SobrePage() {
  const profile = getProfile();
  const experiencias = getExperienceSummary();
  const totalProjetos = getProjects().length;
  const totalMarcas = profile.marcasAtendidas.length;

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10 pt-16 pb-28">
      <h1 className="font-serif text-4xl mb-14">Sobre</h1>

      <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 mb-20 items-start">
        {profile.foto && (
          <FadeIn>
            <div className="relative aspect-[4/5] w-full max-w-[280px] mx-auto md:mx-0 rounded-[28px] overflow-hidden bg-surface border border-border">
              <Image
                src={profile.foto}
                alt={profile.nome}
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
          </FadeIn>
        )}

        <FadeIn delay={60}>
          <p className="font-serif italic text-2xl md:text-3xl text-fg/90 leading-snug mb-10 max-w-2xl">
            &ldquo;{profile.fraseCurta}&rdquo;
          </p>

          <div className="grid grid-cols-3 gap-6 max-w-md pt-8 border-t border-border">
            <div>
              <p className="font-serif text-3xl md:text-4xl text-accent">4+</p>
              <p className="text-xs text-muted uppercase tracking-widest mt-1">
                Anos de experiência
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-accent">{totalMarcas}</p>
              <p className="text-xs text-muted uppercase tracking-widest mt-1">
                Marcas atendidas
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-accent">{totalProjetos}</p>
              <p className="text-xs text-muted uppercase tracking-widest mt-1">
                Projetos no portfólio
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="grid md:grid-cols-[1fr_1fr] gap-14 mb-24">
        <FadeIn>
          <div className="space-y-5 max-w-xl">
            {profile.bio.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-fg/90">
                {p}
              </p>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div>
            <h2 className="text-sm uppercase tracking-widest text-muted mb-5">
              Experiência
            </h2>
            <ul className="space-y-4 mb-6">
              {experiencias.map((exp) => (
                <li key={exp.empresa}>
                  <p className="font-serif text-lg">{exp.empresa}</p>
                  <p className="text-sm text-fg/70">{exp.cargo}</p>
                  <p className="text-xs text-muted">{exp.periodo}</p>
                </li>
              ))}
            </ul>
            <Link
              href="/experiencia"
              className="text-sm border-b border-fg pb-0.5 hover:border-accent hover:text-accent transition-colors"
            >
              Ver trajetória completa →
            </Link>

            <h2 className="text-xs uppercase tracking-widest text-muted mt-12 mb-3">
              Formação
            </h2>
            <ul className="space-y-2">
              {profile.formacao.map((f) => (
                <li key={f.curso}>
                  <p className="text-sm text-fg/80">{f.curso}</p>
                  <p className="text-xs text-muted">
                    {f.instituicao} — {f.periodo}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>

      <div className="grid md:grid-cols-3 gap-10 pt-14 border-t border-border">
        <FadeIn>
          <h2 className="text-sm uppercase tracking-widest text-muted mb-5">
            Design
          </h2>
          <ul className="space-y-2 text-fg/90">
            {profile.competenciasDesign.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn delay={80}>
          <h2 className="text-sm uppercase tracking-widest text-muted mb-5">
            Ferramentas
          </h2>
          <ul className="space-y-2 text-fg/90">
            {profile.ferramentas.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn delay={160}>
          <h2 className="text-sm uppercase tracking-widest text-muted mb-5">
            Complementares
          </h2>
          <ul className="space-y-2 text-fg/90">
            {profile.competenciasComplementares.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </FadeIn>
      </div>

      <FadeIn delay={200}>
        <div className="mt-24 pt-14 border-t border-border flex flex-wrap items-center justify-between gap-6">
          <p className="font-serif text-xl md:text-2xl text-fg/90 max-w-lg">
            Vamos conversar sobre o próximo projeto?
          </p>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link
              href="/contato"
              className="border-b border-fg pb-0.5 hover:border-accent hover:text-accent transition-colors"
            >
              Ir para contato →
            </Link>
            {profile.contato.behance && (
              <a
                href={`https://${profile.contato.behance}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-fg pb-0.5 hover:border-accent hover:text-accent transition-colors"
              >
                Ver Behance →
              </a>
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
