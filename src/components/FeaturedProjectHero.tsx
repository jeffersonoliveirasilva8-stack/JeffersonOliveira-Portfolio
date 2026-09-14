import Link from "next/link";
import Image from "next/image";
import { isVideo } from "@/lib/content";
import type { Projeto } from "@/lib/types";

export default function FeaturedProjectHero({ projeto }: { projeto: Projeto }) {
  const categoria = projeto.categorias[0] ?? "Projeto";
  const capa = projeto.imagemPrincipal ?? projeto.thumbnail;

  return (
    <Link href={`/projetos/${projeto.slug}`} className="group block">
      <div className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-surface">
        {capa ? (
          isVideo(capa) ? (
            <video
              src={capa}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <Image
              src={capa}
              alt={projeto.titulo}
              fill
              sizes="(min-width: 768px) 1152px, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          )
        ) : (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent, transparent 11px, var(--color-border) 11px, var(--color-border) 12px)",
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent md:from-black/85 md:via-black/20" />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-12 text-center">
          <span className="inline-block max-w-full truncate bg-accent text-bg text-[10px] sm:text-xs uppercase tracking-wide px-2.5 sm:px-3 py-1 rounded-full mb-3 md:mb-4">
            {categoria}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-5xl text-white mb-2 md:mb-3 line-clamp-2">
            {projeto.titulo}
          </h3>
          {projeto.contexto && (
            <p className="hidden md:block text-sm md:text-base text-white/75 max-w-xl mx-auto">
              {projeto.contexto}
            </p>
          )}
        </div>
      </div>

      {projeto.contexto && (
        <p className="md:hidden mt-4 text-sm text-fg/70 leading-relaxed">
          {projeto.contexto}
        </p>
      )}
    </Link>
  );
}
