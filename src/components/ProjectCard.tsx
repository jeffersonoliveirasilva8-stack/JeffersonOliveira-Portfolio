import Link from "next/link";
import Image from "next/image";
import PlaceholderBox from "./PlaceholderBox";
import { isVideo } from "@/lib/content";
import type { Projeto } from "@/lib/types";

export default function ProjectCard({
  projeto,
  compact = false,
}: {
  projeto: Projeto;
  compact?: boolean;
}) {
  const categoria = projeto.categorias[0] ?? "Projeto";

  return (
    <Link href={`/projetos/${projeto.slug}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface">
        {projeto.thumbnail ? (
          isVideo(projeto.thumbnail) ? (
            <video
              src={projeto.thumbnail}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <Image
              src={projeto.thumbnail}
              alt={projeto.titulo}
              width={800}
              height={1000}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          )
        ) : (
          <div className="absolute inset-0">
            <PlaceholderBox
              label={projeto.pendente ? "Imagem a inserir" : projeto.titulo}
              aspect="aspect-[4/5]"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        <div className={compact ? "absolute inset-x-0 bottom-0 p-3 sm:p-4" : "absolute inset-x-0 bottom-0 p-4 sm:p-5"}>
          <span
            className={
              compact
                ? "inline-block max-w-full truncate bg-accent text-bg text-[8px] sm:text-[10px] uppercase tracking-wide px-2 py-1 rounded-full mb-2"
                : "inline-block max-w-full truncate bg-accent text-bg text-[10px] sm:text-xs uppercase tracking-wide px-2 sm:px-2.5 py-1 rounded-full mb-2"
            }
          >
            {categoria}
          </span>
          <h3
            className={
              compact
                ? "font-serif text-sm sm:text-base text-white line-clamp-2"
                : "font-serif text-base sm:text-xl text-white line-clamp-2"
            }
          >
            {projeto.titulo}
          </h3>
        </div>
      </div>
    </Link>
  );
}
