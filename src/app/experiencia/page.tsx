import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { getExperience, getProjects } from "@/lib/content";

export const metadata = {
  title: "Experiência — Jefferson Oliveira",
};

export default function ExperienciaPage() {
  const experiencias = getExperience();
  const projetos = getProjects();

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10 pt-16 pb-28">
      <h1 className="font-serif text-4xl mb-4">Experiência</h1>
      <p className="text-muted max-w-xl mb-16">
        Trajetória profissional entre agência, marketing digital e design de marca.
      </p>

      <div className="space-y-16">
        {experiencias.map((exp) => {
          const progressao = exp.cargos.length > 1;
          return (
            <FadeIn key={exp.empresa}>
              <div className="border-t border-border pt-8">
                <div className="flex flex-wrap items-baseline gap-x-3 mb-2">
                  <h2 className="font-serif text-2xl">{exp.empresa}</h2>
                  {exp.tipo && (
                    <span className="text-sm text-muted">{exp.tipo}</span>
                  )}
                </div>
                {progressao && (
                  <p className="text-xs uppercase tracking-widest text-accent mb-6">
                    Progressão interna — {exp.cargos.length} posições
                  </p>
                )}

                <div
                  className={
                    progressao
                      ? "space-y-8 relative pl-6 border-l border-border ml-1 mt-6"
                      : "space-y-8"
                  }
                >
                  {exp.cargos.map((cargo, i) => (
                    <div
                      key={cargo.cargo}
                      className="grid md:grid-cols-[1fr_2fr] gap-3 md:gap-10 relative"
                    >
                      {progressao && (
                        <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-accent" />
                      )}
                      <div>
                        <p className="text-fg font-medium">{cargo.cargo}</p>
                        <p className="text-sm text-muted">{cargo.periodo}</p>
                        {progressao && (
                          <p className="text-xs text-muted/70 mt-1">
                            Etapa {i + 1} de {exp.cargos.length}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-fg/90 leading-relaxed max-w-2xl">
                          {cargo.descricao}
                        </p>

                        {cargo.clientesDestaque && cargo.clientesDestaque.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {cargo.clientesDestaque.map((c) => (
                              <span
                                key={c}
                                className="text-xs border border-accent/40 text-accent px-2.5 py-1 rounded-full"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        )}

                        {cargo.projetosRelacionados && cargo.projetosRelacionados.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-4">
                            {cargo.projetosRelacionados.map((slug) => {
                              const p = projetos.find((pr) => pr.slug === slug);
                              if (!p) return null;
                              return (
                                <Link
                                  key={slug}
                                  href={`/projetos/${slug}`}
                                  className="text-sm border-b border-fg/40 hover:border-accent hover:text-accent transition-colors"
                                >
                                  Ver case: {p.titulo} →
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
