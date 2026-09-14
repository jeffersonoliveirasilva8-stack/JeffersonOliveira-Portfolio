import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PlaceholderBox from "@/components/PlaceholderBox";
import FadeIn from "@/components/FadeIn";
import ProjectGallery from "@/components/ProjectGallery";
import { getProjectBySlug, getProjects, isVideo } from "@/lib/content";

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projeto = getProjectBySlug(slug);
  return { title: projeto ? `${projeto.titulo} — Jefferson Oliveira` : "Projeto" };
}

function Block({ titulo, texto }: { titulo: string; texto?: string }) {
  if (!texto) return null;
  return (
    <FadeIn className="grid md:grid-cols-[160px_1fr] gap-4 md:gap-10 py-10 border-t border-border">
      <h2 className="text-sm uppercase tracking-widest text-muted">{titulo}</h2>
      <p className="max-w-2xl text-fg/90 leading-relaxed whitespace-pre-line">
        {texto}
      </p>
    </FadeIn>
  );
}

export default async function ProjetoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projeto = getProjectBySlug(slug);
  if (!projeto) notFound();

  const temGaleria =
    (projeto.grupos && projeto.grupos.length > 0) ||
    (projeto.galeriaAplicacoes && projeto.galeriaAplicacoes.length > 0);

  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 md:px-10 pt-16 pb-10">
        <Link href="/projetos" className="text-sm text-muted hover:text-accent">
          ← Projetos
        </Link>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-serif text-4xl md:text-5xl">{projeto.titulo}</h1>
          <p className="text-sm text-muted text-right">{projeto.cliente}</p>
        </div>
        <p className="mt-3 text-sm text-muted">
          <span className="text-fg/70">{projeto.tipo}</span>
          {" · "}
          {projeto.categorias.length > 0
            ? projeto.categorias.join(" · ")
            : "Categoria a definir"}
          {" — "}
          {projeto.papel}
        </p>
        {projeto.linkExterno && (
          <a
            href={projeto.linkExterno.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm border-b border-fg/40 hover:border-accent hover:text-accent transition-colors"
          >
            {projeto.linkExterno.label} →
          </a>
        )}
      </div>

      {projeto.prototipoEmbedUrl && (
        <div className="mx-auto max-w-6xl px-6 md:px-10 mb-4">
          <div className="w-full h-[560px] sm:h-[640px] md:h-[760px] overflow-hidden rounded-2xl border border-border bg-surface">
            <iframe
              src={projeto.prototipoEmbedUrl}
              className="w-full h-full"
              allow="fullscreen"
              loading="lazy"
            />
          </div>
          <p className="mt-3 text-xs text-muted text-center">
            Protótipo interativo — clique para navegar pelas telas
          </p>
        </div>
      )}

      {!projeto.prototipoEmbedUrl && (
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          {projeto.imagemPrincipal ? (
            isVideo(projeto.imagemPrincipal) ? (
              <div className="w-full aspect-video overflow-hidden rounded-2xl bg-surface">
                <video
                  src={projeto.imagemPrincipal}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-video overflow-hidden rounded-2xl bg-surface">
                <Image
                  src={projeto.imagemPrincipal}
                  alt={projeto.titulo}
                  width={1600}
                  height={900}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            )
          ) : (
            <PlaceholderBox label="Imagem principal a inserir" aspect="aspect-video" />
          )}
        </div>
      )}

      <div className="mx-auto max-w-6xl px-6 md:px-10 pb-16">
        <Block titulo="Contexto" texto={projeto.contexto} />
        <Block titulo="Desenvolvimento" texto={projeto.desenvolvimento} />
        <Block titulo="Solução" texto={projeto.solucao} />
        <Block titulo="Resultado" texto={projeto.resultado} />
        <Block titulo="Créditos" texto={projeto.creditos} />
      </div>

      {projeto.videosDestaque && projeto.videosDestaque.length > 0 && (
        <div className="mx-auto max-w-6xl px-6 md:px-10 pb-16 space-y-14">
          {projeto.videosDestaque.map((video) => (
            <div key={video.src}>
              {video.titulo && (
                <h3 className="text-sm uppercase tracking-widest text-muted mb-2">
                  {video.titulo}
                </h3>
              )}
              {video.descricao && (
                <p className="text-sm text-fg/70 mb-5 max-w-2xl">{video.descricao}</p>
              )}
              <div className="w-full aspect-video overflow-hidden rounded-2xl bg-surface">
                <video
                  src={video.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {temGaleria ? (
        <div className="mx-auto max-w-6xl px-6 md:px-10 pb-28">
          <h2 className="text-sm uppercase tracking-widest text-muted mb-6">
            Aplicações
          </h2>
          <ProjectGallery
            titulo={projeto.titulo}
            grupos={projeto.grupos}
            itens={projeto.galeriaAplicacoes}
          />
        </div>
      ) : projeto.pendente ? (
        <div className="mx-auto max-w-6xl px-6 md:px-10 pb-28">
          <h2 className="text-sm uppercase tracking-widest text-muted mb-6">
            Aplicações
          </h2>
          <PlaceholderBox label="Galeria de aplicações a inserir" />
        </div>
      ) : null}
    </div>
  );
}
